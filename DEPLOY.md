# Tutorial Deploy Aplikasi Nuxt ke Server Sendiri

Panduan lengkap dari nol sampai situs online, terindeks Google, dan siap AdSense.

- **Aplikasi:** Nuxt (static prerender lewat `nuxt generate`) dengan `@nuxtjs/i18n`, `@nuxtjs/sitemap`, `@nuxtjs/robots`
- **Server:** LXC Debian 12 (bookworm), Nginx
- **Akses internet:** Cloudflare Tunnel (tanpa port forward)
- **CI/CD:** GitHub Actions dengan self-hosted runner
- **Domain contoh:** `kertaas.com` (ganti dengan domain Anda)
- **IP server contoh:** `192.168.10.200` (IP LAN)

> Ganti semua placeholder (`USERNAME`, `NAMA-REPO`, `kertaas.com`, `pub-XXXXXXXXXXXXXXXX`) dengan nilai milik Anda.

---

## Daftar isi

1. [Gambaran arsitektur](#1-gambaran-arsitektur)
2. [Prasyarat](#2-prasyarat)
3. [Persiapan proyek Nuxt](#3-persiapan-proyek-nuxt)
4. [Setup server LXC Debian 12](#4-setup-server-lxc-debian-12)
5. [Cloudflare Tunnel](#5-cloudflare-tunnel)
6. [Self-hosted runner GitHub](#6-self-hosted-runner-github)
7. [Workflow CI/CD](#7-workflow-cicd)
8. [Verifikasi end-to-end](#8-verifikasi-end-to-end)
9. [Agar terindeks Google](#9-agar-terindeks-google)
10. [Persiapan dan pemasangan AdSense](#10-persiapan-dan-pemasangan-adsense)
11. [Operasional harian](#11-operasional-harian)
12. [Troubleshooting](#12-troubleshooting)
13. [Checklist akhir](#13-checklist-akhir)

---

## 1. Gambaran arsitektur

```
 Anda ──git push──▶ GitHub ──▶ [job build] di server GitHub
                                   │  npm ci + nuxt generate
                                   ▼
                              artifact "site"
                                   │
              (runner menarik pekerjaan lewat koneksi keluar)
                                   ▼
 LXC Debian 12 (192.168.10.200)
   ├─ runner  ──▶ rsync ke /var/www/kertaas/releases/<commit>
   │              ln -s  ──▶ /var/www/kertaas/current
   ├─ Nginx   ──▶ menyajikan /var/www/kertaas/current di port 80
   └─ cloudflared ──(koneksi keluar terenkripsi)──▶ Cloudflare
                                                        │
 Pengunjung / Googlebot ──HTTPS──▶ kertaas.com ─────────┘
```

Poin penting:

- Situs berupa **file statis** (HTML, JS, CSS). Server tidak menjalankan Node, jadi ringan dan aman.
- **Cloudflare Tunnel** membuat koneksi keluar dari server ke Cloudflare. Tidak ada port yang dibuka di router, dan HTTPS diurus Cloudflare.
- **Self-hosted runner** juga hanya membuat koneksi keluar ke GitHub. GitHub tidak perlu (dan tidak bisa) masuk ke IP LAN Anda.
- Setiap deploy masuk ke folder rilis baru, lalu symlink `current` dipindah secara atomik. Situs tidak putus saat rilis, dan rollback tinggal memindah symlink.

---

## 2. Prasyarat

| Kebutuhan | Keterangan |
|---|---|
| Repo GitHub | Kode Nuxt sudah dipush, branch utama `main` |
| Domain | Milik Anda, dan bisa mengubah nameserver-nya |
| Akun Cloudflare | Gratis |
| Server | LXC Debian 12 dengan akses root, minimal 512 MB RAM (build dikerjakan GitHub, bukan server) |
| Akun Google | Untuk Search Console dan AdSense |
| Komputer lokal | Node.js (samakan versinya dengan workflow) dan Git |

---

## 3. Persiapan proyek Nuxt

### 3.1 Cek `nuxt.config.ts`

Bagian yang penting untuk deploy dan SEO:

```ts
export default defineNuxtConfig({
  modules: ["@nuxtjs/tailwindcss", "@nuxtjs/i18n", "@nuxtjs/sitemap", "@nuxtjs/robots"],

  routeRules: {
    "/office-tools/**": { prerender: true },
    "/en/office-tools/**": { prerender: true },   // tambahkan agar halaman Inggris pasti ikut
  },

  i18n: {
    baseUrl: process.env.NUXT_SITE_URL || "https://domainanda.com",
    // ... locales, strategy: "prefix_except_default", dst
  },

  site: { url: "https://domainanda.com" },  // hanya fallback
})
```

Aturan yang harus dipenuhi:

1. `baseUrl` dan `site.url` dibaca saat **build**. Kalau `NUXT_SITE_URL` tidak diset, sitemap, canonical, dan hreflang akan menunjuk ke `domainanda.com`. Workflow di Bagian 7 mengisinya dan menggagalkan build kalau placeholder masih ada.
2. `@nuxtjs/robots` memblokir indexing di environment non-production. Untuk production **jangan** mengisi `NUXT_SITE_ENV` dengan `staging`.
3. File `.env.production` dan `.env.staging` **tidak dibaca otomatis** oleh Nuxt berdasarkan namanya. Karena itu nilai production diset langsung di workflow.

### 3.2 `.gitignore` dan file env

Pastikan `.env` tidak ikut ke Git:

```
.env
.env.*
!.env.example
.output
.nuxt
node_modules
```

### 3.3 `package.json`

Harus ada script `generate`, dan file `package-lock.json` harus ada (dipakai `npm ci`):

```json
{
  "scripts": {
    "generate": "nuxt generate"
  }
}
```

### 3.4 Uji build di komputer lokal

```bash
NUXT_SITE_URL=https://kertaas.com npm run generate
npx serve .output/public
```

Buka `http://localhost:3000` dan periksa:

- Halaman utama, satu halaman tool, `/privacy-policy`, `/terms`.
- Versi Inggris: `/en/...`.
- Klik kanan, View Page Source: isi halaman harus sudah ada di HTML (bukan `<div id="__nuxt"></div>` kosong).
- Folder `.output/public` memuat `sitemap.xml`, `robots.txt`, dan `404.html`.

Cari sisa placeholder:

```bash
grep -r "domainanda.com" .output/public && echo "MASIH ADA PLACEHOLDER"
```

Halaman yang tidak tertaut dari mana pun tidak ikut dibuat oleh crawler. Kalau ada, daftarkan:

```ts
nitro: {
  prerender: {
    routes: ["/privacy-policy", "/terms", "/en/privacy-policy", "/en/terms"],
  },
},
```

---

## 4. Setup server LXC Debian 12

Semua perintah di bagian ini dijalankan sebagai **root** di dalam LXC.

### 4.1 Update sistem dan pasang paket

```bash
apt update && apt upgrade -y
apt install -y nginx rsync curl tar ca-certificates
```

### 4.2 Buat user untuk runner

```bash
adduser --disabled-password --gecos "" runner
```

### 4.3 Buat folder deploy

```bash
mkdir -p /var/www/kertaas/releases
chown -R runner:runner /var/www/kertaas
chmod 755 /var/www /var/www/kertaas
```

Struktur akhirnya nanti:

```
/var/www/kertaas/
├─ current -> releases/<commit-terbaru>   (symlink)
└─ releases/
   ├─ <commit-lama-1>/
   └─ <commit-terbaru>/
```

### 4.4 Konfigurasi Nginx

Buat `/etc/nginx/sites-available/kertaas`:

```nginx
server {
  listen 80 default_server;
  server_name kertaas.com www.kertaas.com;

  root /var/www/kertaas/current;
  index index.html;

  gzip on;
  gzip_types text/css application/javascript application/json image/svg+xml text/plain application/xml;

  # File hasil build Nuxt bernama hash, aman di-cache lama
  location /_nuxt/ {
    expires 1y;
    add_header Cache-Control "public, immutable";
  }

  location / {
    try_files $uri $uri/index.html $uri.html =404;
  }

  error_page 404 /404.html;
}
```

Aktifkan:

```bash
rm -f /etc/nginx/sites-enabled/default
ln -s /etc/nginx/sites-available/kertaas /etc/nginx/sites-enabled/kertaas
nginx -t
systemctl reload nginx
systemctl enable nginx
```

Jika `.output/public/404.html` tidak ada di hasil build Anda, hapus baris `error_page`.

### 4.5 Tes dari jaringan LAN

Buat halaman sementara:

```bash
mkdir -p /var/www/kertaas/current
echo "<h1>Server OK</h1>" > /var/www/kertaas/current/index.html
```

Dari komputer lain di LAN, buka `http://192.168.10.200`. Muncul "Server OK" berarti Nginx bekerja.

Hapus halaman sementara setelah tes. Deploy pertama akan membuat `current` sebagai symlink, dan folder biasa dengan nama yang sama akan menghalanginya:

```bash
rm -rf /var/www/kertaas/current
```

### 4.6 Keamanan dasar

- Pakai login SSH dengan key dan matikan login password (`PasswordAuthentication no` di `/etc/ssh/sshd_config`).
- Firewall diatur di level host Proxmox atau container. `ufw` di dalam LXC sering tidak berfungsi.
- Karena akses internet lewat tunnel, port 80 tidak perlu dibuka ke publik.
- Aktifkan pembaruan keamanan otomatis:

```bash
apt install -y unattended-upgrades
dpkg-reconfigure -plow unattended-upgrades
```

---

## 5. Cloudflare Tunnel

Cloudflare Tunnel membuat jalur keluar terenkripsi dari server Anda ke Cloudflare. Pengunjung mengakses `kertaas.com`, Cloudflare meneruskannya lewat tunnel ke Nginx di LXC. Nama menu di dashboard Cloudflare bisa berubah dari waktu ke waktu, jadi ikuti istilah yang paling mirip.

### 5.1 Pindahkan domain ke Cloudflare

1. Login ke `dash.cloudflare.com`, klik **Add a domain**, masukkan `kertaas.com`, pilih paket **Free**.
2. Cloudflare memindai record DNS lama. Periksa hasilnya.
3. **Hapus record `A` atau `CNAME` lama untuk `@` dan `www`** yang menunjuk ke hosting sebelumnya. Kalau tidak dihapus, Cloudflare menolak membuat hostname tunnel karena record sudah ada.
4. Cloudflare memberi dua nameserver. Ganti nameserver domain di tempat Anda membeli domain (registrar) dengan dua nameserver itu.
5. Tunggu sampai status domain **Active** (beberapa menit sampai beberapa jam).

### 5.2 Buat tunnel

1. Buka dashboard **Zero Trust** (`one.dash.cloudflare.com`). Kalau pertama kali, Anda diminta membuat nama tim dan memilih paket Free. Kadang Cloudflare meminta metode pembayaran untuk verifikasi walau paketnya gratis.
2. Masuk ke **Networks → Tunnels → Create a tunnel**, pilih **Cloudflared**.
3. Beri nama, misalnya `kertaas-app`, lalu simpan.
4. Pilih sistem operasi **Debian** dan arsitektur **64-bit**. Dashboard menampilkan perintah instalasi lengkap.

### 5.3 Pasang cloudflared di LXC

Salin perintah dari dashboard dan jalankan sebagai root di LXC. Perintah itu memasang `cloudflared` lewat repositori apt Cloudflare, lalu menjalankan `cloudflared service install <TOKEN>` yang mendaftarkannya sebagai service systemd. **Token itu rahasia**, jangan dibagikan atau dikirim ke Git.

Periksa:

```bash
systemctl status cloudflared
```

Statusnya harus `active (running)`. Di dashboard, konektor tunnel berstatus **Connected** atau **Healthy**. Peringatan soal ukuran buffer UDP di log biasanya tidak berbahaya.

### 5.4 Tambah public hostname

Di halaman tunnel, buka tab **Public Hostname** (atau **Published application routes**) lalu tambahkan dua entri:

| Subdomain | Domain | Path | Service |
|---|---|---|---|
| (kosong) | `kertaas.com` | (kosong) | `HTTP` → `localhost:80` |
| `www` | `kertaas.com` | (kosong) | `HTTP` → `localhost:80` |

Cloudflare otomatis membuat record DNS CNAME yang mengarah ke tunnel.

### 5.5 Pengaturan Cloudflare yang disarankan

1. **SSL/TLS → Edge Certificates → Always Use HTTPS**: aktifkan.
2. **Redirect `www` ke domain utama** supaya Google tidak menganggap dua situs kembar. Di **Rules → Redirect Rules**, pakai template *Redirect from WWW to root* (301).
3. **Speed → Optimization**: matikan **Rocket Loader** dan Auto Minify bila ada, karena keduanya bisa mengubah skrip Nuxt dan skrip iklan.
4. Setelah deploy yang mengubah aset, kalau tampilan lama masih muncul, gunakan **Caching → Purge Cache → Purge Everything**.

### 5.6 Tes

Buka `https://kertaas.com` dari jaringan luar (misalnya data seluler). Selama belum ada deploy pertama, Anda mungkin melihat 404 dari Nginx. Itu normal dan membuktikan jalur tunnel sudah tersambung.

---

## 6. Self-hosted runner GitHub

Runner adalah program kecil di LXC yang bertanya ke GitHub lewat koneksi keluar: "ada pekerjaan untuk saya?". Runner **menolak berjalan sebagai root**. Jika Anda menjalankan `./run.sh` sebagai root, muncul pesan `Must not run interactively with sudo`. Runner harus dijalankan oleh user `runner`.

### 6.1 Unduh sebagai user `runner`

Sebagai root:

```bash
su - runner
```

Prompt berubah menjadi `runner@...`. Di repo GitHub, buka **Settings → Actions → Runners → New self-hosted runner**, pilih **Linux** dan **x64**. **Salin perintah dari halaman itu**, karena nomor versi dan hash berubah. Bentuknya:

```bash
mkdir actions-runner && cd actions-runner
curl -o actions-runner-linux-x64-X.Y.Z.tar.gz -L https://github.com/actions/runner/releases/download/vX.Y.Z/actions-runner-linux-x64-X.Y.Z.tar.gz
echo "HASH_DARI_GITHUB  actions-runner-linux-x64-X.Y.Z.tar.gz" | sha256sum -c
tar xzf ./actions-runner-linux-x64-X.Y.Z.tar.gz
```

### 6.2 Pasang dependensi sistem

Keluar ke root (`exit`), lalu:

```bash
/home/runner/actions-runner/bin/installdependencies.sh
su - runner
cd actions-runner
```

### 6.3 Daftarkan runner

```bash
./config.sh --url https://github.com/USERNAME/NAMA-REPO --token TOKEN_DARI_GITHUB
```

Token berlaku sekitar satu jam. Jawaban untuk pertanyaan yang muncul:

| Pertanyaan | Jawaban |
|---|---|
| Runner group | Enter (default) |
| Name of runner | `kertaas-app` |
| Additional labels | `kertaas` |
| Work folder | Enter (`_work`) |

Label `kertaas` wajib sama dengan `runs-on` di workflow.

### 6.4 Tes manual

```bash
./run.sh
```

Harus muncul `Connected to GitHub` dan `Listening for Jobs`. Di halaman Runners, statusnya **Idle**. Hentikan dengan `Ctrl+C`.

### 6.5 Jadikan service

Kembali ke root (`exit`), lalu:

```bash
cd /home/runner/actions-runner
./svc.sh install runner
./svc.sh start
./svc.sh status
```

`runner` di perintah `install` adalah nama user yang menjalankan service. Statusnya harus `active (running)`, dan runner otomatis hidup lagi setelah LXC restart.

### 6.6 Keamanan runner

- Runner di server sendiri menjalankan kode dari workflow Anda. Untuk repo **publik**, jangan memicu workflow ini dari pull request fork. Di **Settings → Actions → General**, atur persetujuan untuk workflow dari kontributor luar.
- Workflow di bawah hanya berjalan pada `push` ke `main`.

---

## 7. Workflow CI/CD

Buat file `.github/workflows/deploy.yml` di repo:

```yaml
name: Deploy

on:
  push:
    branches: [main]      # ganti jika branch utama Anda bernama master
  workflow_dispatch:      # tombol "Run workflow" manual

permissions:
  contents: read

concurrency:
  group: deploy
  cancel-in-progress: false

jobs:
  build:
    runs-on: ubuntu-latest        # server milik GitHub
    timeout-minutes: 15
    env:
      NUXT_SITE_URL: https://kertaas.com
    steps:
      - uses: actions/checkout@v4

      - uses: actions/setup-node@v4
        with:
          node-version: 22        # samakan dengan node -v di komputer Anda
          cache: npm

      - run: npm ci
      - run: npm run generate

      - name: Pastikan domain placeholder tidak ikut terbawa
        run: |
          if grep -rl 'domainanda.com' .output/public; then
            echo "Domain placeholder ditemukan"; exit 1
          fi

      - uses: actions/upload-artifact@v4
        with:
          name: site
          path: .output/public
          retention-days: 7

  deploy:
    needs: build
    runs-on: [self-hosted, kertaas]   # runner di LXC Anda
    timeout-minutes: 10
    env:
      DIR: /var/www/kertaas
    steps:
      - uses: actions/download-artifact@v4
        with:
          name: site
          path: site

      - name: Rilis
        run: |
          REL="$DIR/releases/${GITHUB_SHA}"
          mkdir -p "$REL"
          rsync -a --delete site/ "$REL/"
          chmod -R a+rX "$REL"
          ln -sfn "$REL" "$DIR/current.tmp"
          mv -Tf "$DIR/current.tmp" "$DIR/current"
          ls -1dt "$DIR"/releases/* | tail -n +6 | xargs -r rm -rf

      - name: Cek situs
        run: curl -fsS -H 'Host: kertaas.com' -o /dev/null http://localhost/
```

### Cara kerja per bagian

| Bagian | Fungsi |
|---|---|
| `on: push` ke `main` | Pipeline jalan setiap kali Anda push. `workflow_dispatch` memberi tombol manual. |
| `concurrency` | Dua deploy tidak berjalan bersamaan. |
| Job `build` | Di server GitHub: instal dependensi, `nuxt generate`, cek placeholder, simpan hasil sebagai artifact. |
| Job `deploy` | Menunggu `build`, lalu berjalan di runner Anda karena label `self-hosted` dan `kertaas` cocok. |
| `chmod -R a+rX` | Memastikan Nginx (`www-data`) bisa membaca file, karena artifact tidak selalu menjaga izin file. |
| `ln -sfn` lalu `mv -Tf` | Memindah symlink `current` secara atomik, tanpa jeda. |
| `tail -n +6 ... rm` | Menyimpan 5 rilis terakhir, sisanya dihapus. |
| Langkah "Cek situs" | Pipeline merah kalau Nginx tidak menyajikan halaman utama. |

Commit dan push:

```bash
git add .github/workflows/deploy.yml
git commit -m "Tambah workflow deploy"
git push origin main
```

---

## 8. Verifikasi end-to-end

1. Tab **Actions** di GitHub: dua job (`build`, `deploy`) harus hijau.
2. Di server:

```bash
ls -l /var/www/kertaas/                 # current -> releases/<sha>
curl -H 'Host: kertaas.com' http://localhost/ | head
```

3. Dari jaringan luar, buka `https://kertaas.com` dan `https://kertaas.com/en/`.
4. Periksa file penting:
   - `https://kertaas.com/robots.txt` tidak berisi `Disallow: /`.
   - `https://kertaas.com/sitemap.xml` berisi URL berawalan `https://kertaas.com`, bukan `domainanda.com`.
   - View Page Source: ada `<link rel="canonical">` dan `<link rel="alternate" hreflang=...>`.
5. Uji alur penuh: ubah satu teks kecil, push, dan lihat perubahan muncul di situs.

---

## 9. Agar terindeks Google

### 9.1 Daftarkan di Google Search Console

1. Buka `search.google.com/search-console` dan klik **Add property**.
2. Pilih tipe **Domain** dan masukkan `kertaas.com`.
3. Google memberi sebuah record **TXT**. Tambahkan di Cloudflare: **DNS → Records → Add record**, tipe `TXT`, nama `@`, isi sesuai yang diberikan Google.
4. Kembali ke Search Console dan klik **Verify**.

### 9.2 Kirim sitemap

Di **Sitemaps**, masukkan `sitemap.xml` lalu **Submit**. Jika modul sitemap menghasilkan `sitemap_index.xml`, kirim yang itu. Statusnya harus **Success**, dan jumlah URL yang ditemukan sesuai jumlah halaman Anda (kedua bahasa).

### 9.3 Minta indexing halaman utama

Di kotak **URL Inspection** paling atas, tempel URL berikut satu per satu, tunggu hasilnya, lalu klik **Request indexing**:

- `https://kertaas.com/`
- Halaman tool utama Anda
- `https://kertaas.com/en/`

Untuk domain baru, indexing biasanya makan beberapa hari sampai beberapa minggu. Jangan panik kalau belum muncul di hari pertama.

### 9.4 Checklist SEO teknis

- [ ] Setiap halaman punya `<title>` dan meta description unik (sudah lewat `useSeoMeta`).
- [ ] Ada satu `<h1>` per halaman.
- [ ] Canonical dan hreflang memakai domain asli (butuh `baseUrl` benar).
- [ ] `robots.txt` tidak memblokir `/_nuxt/`, karena Google butuh file itu untuk merender halaman.
- [ ] Semua halaman penting tertaut dari halaman lain (menu, footer, related tools).
- [ ] Halaman yang tidak ada mengembalikan status 404.
- [ ] Hanya satu versi domain yang hidup (apex atau `www`), yang lain redirect 301.
- [ ] Skor mobile dan kecepatan diuji di `pagespeed.web.dev`.
- [ ] Data terstruktur valid (`SoftwareApplication`, `FAQPage`), uji di Rich Results Test.

### 9.5 Pantau berkala

- **Pages** di Search Console menunjukkan halaman yang terindeks dan alasan yang tidak. Status "Discovered - currently not indexed" biasanya butuh waktu dan konten yang lebih kuat, bukan perbaikan teknis.
- Cari `site:kertaas.com` di Google untuk melihat halaman yang sudah muncul.
- Opsional: daftarkan situs di Bing Webmaster Tools.

---

## 10. Persiapan dan pemasangan AdSense

### 10.1 Kesiapan situs

- Domain sendiri dengan HTTPS.
- Pemilik akun berusia minimal 18 tahun.
- Halaman **Kebijakan Privasi** dan **Syarat & Ketentuan** (sudah ada).
- Halaman **Tentang** dan **Kontak**. Tambahkan bila belum ada.
- **Konten yang cukup.** Situs berisi tool dengan teks yang tipis berisiko ditolak sebagai konten kurang bernilai. Setiap halaman tool sebaiknya punya penjelasan, panduan, dan FAQ (sudah ada), dan situs sebaiknya punya cukup banyak tool serta beberapa artikel panduan.
- Situs sudah terindeks dan punya sedikit lalu lintas.

### 10.2 Daftar dan tambahkan situs

1. Daftar di `adsense.google.com`, lalu tambahkan `kertaas.com` di menu **Sites**.
2. Google meminta Anda menghubungkan situs. Pilih salah satu metode verifikasi: kode AdSense di `<head>`, tag meta, atau `ads.txt`. Cara Nuxt di bawah.

**Kode AdSense di `<head>` (`nuxt.config.ts`)**

```ts
app: {
  head: {
    meta: [
      { name: "google-adsense-account", content: "ca-pub-XXXXXXXXXXXXXXXX" },
    ],
    script: [
      {
        src: "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-XXXXXXXXXXXXXXXX",
        async: true,
        crossorigin: "anonymous",
      },
    ],
    // ... link untuk Google Fonts tetap ada
  },
},
```

Gabungkan dengan isi `app.head` yang sudah ada (bagian `link` untuk Google Fonts), jangan menimpanya.

**`ads.txt`**

Buat `public/ads.txt`:

```
google.com, pub-XXXXXXXXXXXXXXXX, DIRECT, f08c47fec0942fa0
```

Nomor `pub-...` ada di akun AdSense Anda. Setelah deploy, file harus terbuka di `https://kertaas.com/ads.txt`. Status ads.txt bisa Anda pantau di daftar situs pada akun AdSense.

Commit, push, tunggu pipeline hijau, lalu klik **Verify** di AdSense.

### 10.3 Perbarui teks kebijakan **sebelum** iklan tampil

Saat ini halaman kebijakan menyatakan situs **tidak menampilkan iklan** dan hanya memakai satu cookie fungsional. Begitu iklan aktif, pernyataan itu salah. Ubah di file locale (`id.json` dan `en.json`):

| Key | Perubahan |
|---|---|
| `privacyPolicy.cookies.p1` | Hapus klaim "satu cookie fungsional" atau ubah menjadi: cookie preferensi bahasa ditambah cookie pihak ketiga dari Google untuk iklan. |
| `privacyPolicy.cookies.adsNone` dan `privacyPolicy.cookies.adsText` | Ganti dengan pernyataan bahwa situs **menampilkan** iklan, dan bahwa Google serta mitranya memakai cookie untuk iklan (termasuk yang dipersonalisasi). Tautkan ke pengaturan iklan Google. |
| `terms.ads.text` | Ganti "di masa depan dapat menampilkan iklan" menjadi kalimat bahwa situs menampilkan iklan pihak ketiga. |
| `privacyPolicy.lastUpdated` dan `terms.lastUpdated` | Ubah tanggalnya. |

Kalau `adsNone` tidak dipakai lagi, hapus juga penggunaannya di `privacy-policy.vue`.

### 10.4 Persetujuan cookie (CMP)

Untuk pengunjung dari Uni Eropa, Inggris, dan Swiss, Google mewajibkan penerbit memakai CMP bersertifikat yang terintegrasi dengan TCF. Cara paling mudah: buat pesan persetujuan lewat menu **Privacy & messaging** di akun AdSense. Aktifkan sebelum iklan tayang. Meskipun target Anda Indonesia, tetap ada pengunjung dari wilayah itu.

### 10.5 Tunggu review

Review situs baru berlangsung beberapa hari sampai beberapa minggu. Selama menunggu, jangan mengubah struktur situs besar-besaran.

### 10.6 Setelah disetujui

Anda bisa memakai **Auto ads** (paling mudah, diatur di akun AdSense) atau unit manual. Contoh komponen unit manual, `components/AdSlot.vue`:

```vue
<script setup lang="ts">
const props = defineProps<{ slot: string }>()
const route = useRoute()

function render() {
  try {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ;((window as any).adsbygoogle = (window as any).adsbygoogle || []).push({})
  } catch {
    // iklan gagal dimuat, abaikan
  }
}

onMounted(render)
</script>

<template>
  <ClientOnly>
    <ins
      :key="route.fullPath"
      class="adsbygoogle block"
      style="display: block; min-height: 250px"
      data-ad-client="ca-pub-XXXXXXXXXXXXXXXX"
      :data-ad-slot="props.slot"
      data-ad-format="auto"
      data-full-width-responsive="true"
    />
  </ClientOnly>
</template>
```

Aturan penempatan:

- Beri tinggi tetap (`min-height`) agar halaman tidak bergeser saat iklan muncul.
- Jauhkan iklan dari tombol upload dan unduh supaya tidak memancing klik tidak sengaja.
- Jangan pernah mengklik iklan sendiri.
- Jangan menaruh iklan di halaman yang hampir tanpa konten.
- Kalau Anda menambah header CSP di Nginx, izinkan domain Google Ads.

---

## 11. Operasional harian

### 11.1 Deploy rutin

```bash
git add .
git commit -m "Pesan perubahan"
git push origin main
```

Pipeline berjalan otomatis. Hasilnya online beberapa menit kemudian.

### 11.2 Rollback

Lihat daftar rilis yang tersimpan (terbaru di atas):

```bash
ls -1dt /var/www/kertaas/releases/*
```

Aktifkan rilis sebelumnya:

```bash
cd /var/www/kertaas
ln -sfn releases/KODE_COMMIT_LAMA current.tmp
mv -Tf current.tmp current
```

Rilis lama tersimpan sampai 5 versi terakhir. Untuk rollback permanen, lakukan `git revert` di repo agar deploy berikutnya tidak menimpa perbaikan Anda.

### 11.3 Melihat log

```bash
journalctl -u cloudflared -f                 # log tunnel
journalctl -u 'actions.runner.*' -f          # log runner
tail -f /var/log/nginx/access.log            # akses Nginx
tail -f /var/log/nginx/error.log             # error Nginx
```

### 11.4 Pemeliharaan

| Tugas | Cara | Frekuensi |
|---|---|---|
| Update OS | `apt update && apt upgrade -y` | Bulanan (atau aktifkan unattended-upgrades) |
| Update cloudflared | Ikut `apt upgrade` karena dipasang lewat repositori apt | Bulanan |
| Update runner | Runner memperbarui dirinya sendiri. Pantau di halaman Runners | Otomatis |
| Update dependensi Nuxt | `npm outdated`, `npm update`, uji lokal, push | Bulanan |
| Backup | Snapshot atau backup LXC di Proxmox | Mingguan |
| Rotasi rahasia | Ganti token runner atau tunnel bila bocor | Saat perlu |

Kode situs sudah tersimpan di GitHub. Yang perlu dibackup dari server hanyalah konfigurasi (Nginx, service cloudflared, runner), dan itu tercakup dalam backup LXC. Simpan juga catatan langkah instalasi ini.

---

## 12. Troubleshooting

| Gejala | Kemungkinan penyebab | Solusi |
|---|---|---|
| `Must not run interactively with sudo` | Runner dijalankan sebagai root | Jalankan sebagai user `runner` (Bagian 6) |
| Job `deploy` menunggu terus | Runner offline atau label tidak cocok | `./svc.sh status`, cek label `kertaas` di halaman Runners |
| `Permission denied` saat `mkdir` atau `rsync` | Pemilik `/var/www/kertaas` bukan `runner` | `chown -R runner:runner /var/www/kertaas` |
| `rsync: command not found` | rsync belum terpasang | `apt install -y rsync` |
| `403 Forbidden` di Nginx | Izin file salah atau `current` belum ada | `chmod -R a+rX` pada rilis, cek `ls -l /var/www/kertaas/current/` |
| `404` di halaman utama | Belum ada deploy, atau `current` menunjuk ke folder kosong | Jalankan ulang workflow, cek isi rilis |
| `npm ci` gagal | `package-lock.json` hilang atau tidak sinkron | `npm install` lokal, commit lock file |
| Build gagal di langkah grep | Ada `domainanda.com` di hasil build | Cari sumbernya, kemungkinan fallback di `nuxt.config.ts` |
| Sitemap atau canonical memakai `domainanda.com` | `NUXT_SITE_URL` tidak terisi saat build | Pastikan env ada di job `build` |
| `robots.txt` berisi `Disallow: /` | Build dianggap non-production | Jangan set `NUXT_SITE_ENV` selain `production`, pastikan build lewat `nuxt generate` |
| Halaman `/en/...` tidak ada | Tidak ikut prerender | Tambah `routeRules` untuk `/en/...` atau `nitro.prerender.routes` |
| `502` atau `Bad gateway` dari Cloudflare | Tunnel mati atau Nginx mati | `systemctl status cloudflared nginx` |
| Error 1033 atau tunnel tidak terhubung | `cloudflared` tidak berjalan | `systemctl restart cloudflared`, cek log |
| `ERR_TOO_MANY_REDIRECTS` | Redirect ganda antara Cloudflare dan Nginx | Pastikan Nginx tidak memaksa redirect ke HTTPS (biarkan Cloudflare yang mengurus) |
| Perubahan tidak muncul di situs | Cache Cloudflare atau browser | Purge Cache di Cloudflare, hard refresh |
| Google belum mengindeks | Situs baru, atau konten dianggap tipis | Cek Search Console → Pages, tambah konten, minta indexing lagi |
| AdSense menolak: konten kurang | Halaman terlalu tipis | Tambah artikel, panduan, dan halaman Tentang serta Kontak, lalu ajukan ulang |

---

## 13. Checklist akhir

**Server**
- [ ] LXC diperbarui, Nginx berjalan, `nginx -t` bersih
- [ ] `/var/www/kertaas` dimiliki `runner`
- [ ] SSH pakai key, login password dimatikan

**Cloudflare**
- [ ] Domain berstatus Active
- [ ] Record DNS lama untuk `@` dan `www` dihapus
- [ ] Tunnel Healthy, public hostname `@` dan `www` mengarah ke `localhost:80`
- [ ] Always Use HTTPS aktif, redirect `www` ke domain utama, Rocket Loader mati

**CI/CD**
- [ ] Runner berjalan sebagai service dan berstatus Idle
- [ ] `deploy.yml` di `main`, kedua job hijau
- [ ] `NUXT_SITE_URL` terisi di job `build`
- [ ] Rollback sudah dicoba sekali

**SEO**
- [ ] `robots.txt`, `sitemap.xml` benar dan memakai domain asli
- [ ] Domain terverifikasi di Search Console, sitemap terkirim
- [ ] Halaman utama dan halaman tool utama sudah diminta indexing

**AdSense**
- [ ] Halaman Tentang dan Kontak ada
- [ ] `ads.txt` tersedia di `/ads.txt`, kode atau meta AdSense terpasang
- [ ] CMP (Privacy & messaging) aktif
- [ ] Teks kebijakan privasi dan syarat sudah diperbarui sebelum iklan tayang
