<script setup lang="ts">
const { t } = useI18n()

useSeoMeta({
  title: 'Kebijakan Privasi — Kertaas',
  description: 'Kebijakan privasi Kertaas: bagaimana tool kami bekerja, data apa yang dikumpulkan, dan penggunaan cookie.',
})

useHead({
  script: [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: '/' },
          { '@type': 'ListItem', position: 2, name: 'Kebijakan Privasi', item: '/privacy-policy' },
        ],
      }),
    },
  ],
})
</script>

<template>
  <div>
    <p class="pt-7 text-sm text-ink-soft">
      <NuxtLinkLocale to="/" class="hover:text-accent-dark">Home</NuxtLinkLocale> /
      Kebijakan Privasi
    </p>

    <h1 class="mt-3 text-3xl font-semibold leading-tight text-ink sm:text-4xl">Kebijakan Privasi</h1>
    <p class="mt-2 text-sm text-ink-soft">Terakhir diperbarui: 20 September 2026</p>

    <div class="mt-8 rounded-md border border-accent bg-accent-tint px-5 py-4">
      <p class="text-sm text-ink">
        <strong class="font-semibold">Ringkasan singkat:</strong> Semua tool di {{ t('brand.name') }} memproses file dan
        teks Anda langsung di browser. File yang Anda buka, upload, atau tempel ke tool manapun di situs ini
        <strong class="font-semibold">tidak pernah dikirim atau disimpan di server kami</strong>.
      </p>
    </div>

    <section class="mt-10">
      <h2 class="text-xl font-semibold text-ink">1. Bagaimana Tool Kami Bekerja</h2>
      <p class="mt-3 max-w-[70ch] text-sm text-ink-soft">
        {{ t('brand.name') }} adalah kumpulan tool office (dokumen, PDF, spreadsheet, data, dan kalkulator) yang
        seluruhnya berjalan di sisi klien (client-side) — artinya semua pemrosesan file dan teks terjadi di
        perangkat dan browser Anda sendiri, menggunakan JavaScript yang dimuat ke browser Anda. Kami tidak
        menjalankan server backend untuk memproses file Anda, dan tidak ada mekanisme upload file ke server kami
        di tool manapun.
      </p>
      <p class="mt-3 max-w-[70ch] text-sm text-ink-soft">
        Karena arsitektur ini, kami secara teknis tidak memiliki akses ke isi file, teks, atau data apapun yang
        Anda proses menggunakan tool kami.
      </p>
    </section>

    <section class="mt-10">
      <h2 class="text-xl font-semibold text-ink">2. Data yang Kami Kumpulkan</h2>
      <p class="mt-3 max-w-[70ch] text-sm text-ink-soft">Kami tidak mengumpulkan atau menyimpan:</p>
      <ul class="mt-3 grid gap-2 pl-5 text-sm text-ink-soft marker:text-accent-dark" style="list-style-type: disc;">
        <li>File, dokumen, atau teks yang Anda proses di tool manapun</li>
        <li>Nama, email, atau data identitas pribadi lainnya — situs ini tidak memiliki sistem akun/registrasi</li>
        <li>Riwayat penggunaan tool yang terhubung ke identitas Anda</li>
      </ul>
      <p class="mt-3 max-w-[70ch] text-sm text-ink-soft">
        Server hosting kami secara otomatis mencatat log teknis standar (seperti alamat IP, jenis browser, dan
        halaman yang diakses) sebagaimana lazimnya web server — ini dipakai semata untuk keamanan dan diagnostik
        teknis, bukan untuk melacak individu.
      </p>
    </section>

    <section class="mt-10">
      <h2 class="text-xl font-semibold text-ink">3. Cookie</h2>
      <p class="mt-3 max-w-[70ch] text-sm text-ink-soft">
        Kami menggunakan satu cookie fungsional bernama <code
          class="rounded bg-slate-100 px-1.5 py-0.5 font-mono text-xs">i18n_redirected</code>
        untuk mengingat preferensi bahasa Anda (Indonesia/English) supaya Anda tidak perlu memilih ulang bahasa
        setiap kali berkunjung. Cookie ini tidak dipakai untuk melacak Anda di situs lain.
      </p>
      <p class="mt-3 max-w-[70ch] text-sm text-ink-soft">
        <strong class="font-semibold text-ink">Soal iklan:</strong> Situs ini saat ini <strong
          class="font-semibold">tidak menampilkan iklan</strong>.
        Kami berencana mengintegrasikan Google AdSense di masa depan. Jika itu terjadi, halaman ini akan
        diperbarui terlebih dahulu untuk menjelaskan bahwa Google dan mitra iklannya dapat menggunakan cookie
        untuk menampilkan iklan yang dipersonalisasi berdasarkan kunjungan Anda ke situs ini maupun situs lain.
        Anda akan tetap bisa mengatur preferensi iklan personalisasi lewat
        <a href="https://adssettings.google.com" target="_blank" rel="noopener noreferrer"
          class="text-accent-dark underline hover:text-accent">Google Ads Settings</a>.
      </p>
    </section>

    <section class="mt-10">
      <h2 class="text-xl font-semibold text-ink">4. Layanan Pihak Ketiga</h2>
      <p class="mt-3 max-w-[70ch] text-sm text-ink-soft">
        Beberapa tool memuat kode pustaka (library) teknis dari jaringan CDN pihak ketiga saat dibutuhkan, misalnya
        Google Fonts (untuk tampilan huruf) dan cdnjs (untuk komponen pembaca PDF). Permintaan ini hanya mengunduh
        kode program, <strong class="font-semibold">bukan mengirimkan isi file atau teks Anda</strong> — proses
        file Anda tetap sepenuhnya berjalan lokal di browser.
      </p>
    </section>

    <section class="mt-10">
      <h2 class="text-xl font-semibold text-ink">5. Keamanan</h2>
      <p class="mt-3 max-w-[70ch] text-sm text-ink-soft">
        Karena file Anda tidak pernah meninggalkan perangkat Anda, risiko kebocoran data lewat server kami secara
        praktis tidak ada untuk isi file yang Anda proses. Kami tetap menerapkan koneksi terenkripsi (HTTPS) untuk
        seluruh situs.
      </p>
    </section>

    <section class="mt-10">
      <h2 class="text-xl font-semibold text-ink">6. Perubahan Kebijakan Ini</h2>
      <p class="mt-3 max-w-[70ch] text-sm text-ink-soft">
        Kami dapat memperbarui kebijakan privasi ini dari waktu ke waktu, misalnya saat menambahkan fitur baru
        seperti analitik atau iklan. Tanggal "Terakhir diperbarui" di bagian atas halaman ini akan selalu
        mencerminkan revisi terbaru.
      </p>
    </section>

    <section class="mt-10 pb-16">
      <h2 class="text-xl font-semibold text-ink">7. Hubungi Kami</h2>
      <p class="mt-3 max-w-[70ch] text-sm text-ink-soft">
        Ada pertanyaan soal kebijakan privasi ini? Hubungi kami di
        <a href="mailto:hello@kertaas.com" class="text-accent-dark underline hover:text-accent">hello@kertaas.com</a>.
      </p>
    </section>
  </div>
</template>
