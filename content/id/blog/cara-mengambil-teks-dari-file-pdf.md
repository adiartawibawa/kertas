---
title: Cara Mengambil Teks dari File PDF
description: Cara mengambil teks dari file PDF adalah dengan menyalin teks dari PDF online lewat PDF text extractor di browser, lalu rapikan hasilnya. Termasuk solusi untuk PDF hasil scan.
publishedAt: "2026-10-19"
translationKey: extract-text-from-pdf
relatedToolPath: /office-tools/pdf/pdf-to-text
coverImage: /img/blog/extract-text-from-pdf-file.jpg
---

Anda butuh mengutip paragraf dari laporan PDF, atau memindahkan isi kontrak ke dokumen lain tanpa mengetik ulang. Anda menyeleksi teksnya, menyalin, lalu menempel, dan hasilnya penuh baris terputus serta spasi ganda. Ada cara yang lebih rapi dengan menggunakan PDF text extractor yang berjalan di browser, lalu bersihkan hasilnya dalam satu langkah tambahan.

## Cek Dulu Apakah PDF Anda Berisi Teks

PDF punya dua jenis isi. PDF digital menyimpan teks asli, dan PDF hasil scan hanya menyimpan gambar halaman. Cara mengenalinya: buka file, lalu coba seleksi satu kalimat dengan kursor. Kalau kalimat itu terseleksi, PDF Anda berisi teks. Kalau kursor menyeleksi seluruh halaman sebagai satu blok gambar, PDF Anda hasil scan dan butuh OCR (pengenalan teks dari gambar).

Semua cara di bawah memakai teks asli, kecuali bagian Google Docs.

## Salin Teks dari PDF Online dengan PDF to Text

[PDF to Text](/office-tools/pdf/pdf-to-text) di Kertaas mengambil teks dari PDF di tab browser. Cara ini cocok untuk dokumen panjang, karena Anda tidak perlu menyeleksi halaman satu per satu.

1. Buka [PDF to Text](/office-tools/pdf/pdf-to-text).
2. Pilih file PDF atau seret ke halaman.
3. Tunggu proses ekstraksi selesai.
4. Salin teksnya, atau unduh sebagai file `.txt`.

Setiap halaman diberi penanda, jadi Anda selalu tahu sebuah kalimat berasal dari halaman berapa. Browser memproses isi dokumen di perangkat Anda dan tidak mengirimnya ke server mana pun.

## Salin Langsung dari PDF Reader

Untuk kutipan pendek, cara paling cepat adalah menyalin langsung. Buka PDF di Adobe Acrobat Reader, Chrome, Edge, Firefox, atau Preview di Mac. Seret kursor untuk menyeleksi teks, lalu tekan `Ctrl+C` di Windows atau `Cmd+C` di Mac. Untuk menyalin seluruh dokumen, tekan `Ctrl+A` atau `Cmd+A` lebih dulu.

Cara ini punya kelemahan. Baris sering terputus di tengah kalimat, nomor halaman ikut tersalin, dan dokumen dua kolom kadang tercampur. Untuk dokumen panjang, PDF to Text lebih praktis.

## Ambil Halaman yang Dibutuhkan Saja

Kalau Anda hanya butuh beberapa halaman dari dokumen tebal, ambil halaman itu lebih dulu dengan [Extract Pages](/office-tools/pdf/pdf-extract-pages). Hasilnya PDF kecil, lalu Anda ekstrak teksnya lewat PDF to Text. Teks yang keluar lebih pendek dan lebih mudah diperiksa.

## Rapikan Hasilnya dengan Text Cleaner

Teks hasil salinan dari PDF sering membawa spasi ganda, baris kosong berlebih, dan tab tersembunyi. [Text Cleaner](/office-tools/documents/text-cleaner) membersihkan semuanya sekaligus.

1. Tempel teks Anda di kolom **Original text**.
2. Centang opsi yang Anda butuhkan.
3. Salin hasil dari kolom **Cleaned result**.

Lima opsi tersedia:

- **Trim leading/trailing spaces:** hapus spasi di awal dan akhir baris.
- **Remove double spaces:** ubah spasi ganda menjadi satu spasi.
- **Remove blank lines:** hapus baris kosong.
- **Convert tabs to spaces:** ganti tab dengan spasi.
- **Merge into a single line:** gabungkan seluruh teks menjadi satu baris.

Opsi terakhir menghapus pemisah antarparagraf. Aktifkan hanya kalau Anda memang butuh satu blok teks panjang. Teks asli Anda tidak berubah, jadi Anda bisa mengganti opsi kapan saja.

## Ambil Teks dari PDF Hasil Scan

PDF to Text membaca teks yang sudah ada di dalam file, bukan teks dari gambar. PDF hasil scan tanpa lapisan teks menghasilkan output kosong.

Untuk PDF seperti itu, Anda butuh OCR. Salah satu cara gratis: unggah PDF ke Google Drive, klik kanan file, pilih **Open with**, lalu **Google Docs**. Google Docs membaca gambar dan menaruh teksnya di dokumen baru. Perlu diingat bahwa file Anda terunggah ke akun Google, jadi cara ini kurang cocok untuk dokumen rahasia.

## Pilih Cara yang Paling Cocok

| Cara                  | Cocok untuk                     | Catatan                                   |
| --------------------- | ------------------------------- | ----------------------------------------- |
| Seleksi di PDF reader | Kutipan pendek                  | Baris sering terputus                     |
| PDF to Text           | Dokumen panjang, banyak halaman | PDF hasil scan menghasilkan output kosong |
| Google Docs           | PDF hasil scan                  | File diunggah ke akun Google              |

## Masalah yang Sering Muncul

**Output kosong.** PDF Anda hasil scan dan tidak punya lapisan teks. Pakai OCR seperti cara Google Docs di atas.

**Tabel dan kolom berantakan.** Teks diambil berurutan menurut posisi di halaman, jadi tabel dan kolom bisa terlihat acak di hasil teks polos. Periksa hasilnya dan susun ulang bagian tabel secara manual.

**PDF berpassword gagal diproses.** PDF to Text belum mendukung file berpassword. Hapus password dari PDF sebelum Anda memprosesnya.

**Baris terputus dan spasi ganda.** Bersihkan lewat Text Cleaner dengan opsi hapus spasi ganda dan hapus baris kosong.

## Setelah Teks Terambil

- Hitung jumlah kata dengan [Word Counter](/office-tools/documents/word-counter).
- Bandingkan dua versi dokumen dengan [Text Compare](/office-tools/documents/text-compare).
- Ubah huruf besar dan kecil dengan [Case Converter](/office-tools/documents/case-converter).

## Pertanyaan Umum

### Apakah aman menyalin teks dari PDF online?

PDF to Text memproses dokumen di browser Anda, dan isinya tidak terkirim ke server. Halaman butuh koneksi internet hanya untuk memuat kode pustaka pembaca PDF.

### Bisakah teks diambil dari PDF hasil scan?

Belum. PDF to Text membaca teks digital di dalam file, bukan teks dari gambar. Untuk PDF hasil scan, pakai OCR.

### Apakah tata letak asli ikut terbawa?

Tidak sepenuhnya. Teks keluar dalam urutan baca menurut posisi di halaman, jadi tabel dan kolom yang rumit bisa terlihat berantakan.

### Bisakah hasilnya disimpan?

Bisa. Salin teksnya, atau unduh sebagai file `.txt`.
