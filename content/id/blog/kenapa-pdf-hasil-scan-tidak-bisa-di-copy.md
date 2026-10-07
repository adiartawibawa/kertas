---
title: Kenapa File PDF Hasil Scan Tidak Bisa Di-copy Teksnya ?
description: Kenapa PDF hasil scan tidak bisa di-copy teksnya? Karena isinya gambar. Pelajari cara mengeceknya, mengubahnya jadi teks dengan OCR, dan merapikan hasilnya.
publishedAt: "2026-10-28"
translationKey: cannot-copy-text-scanned-pdf
relatedToolPath: /office-tools/pdf/pdf-split
coverImage: /img/blog/cannot-copy-text-scanned-pdf.jpg
---

Anda menyeret kursor di atas paragraf PDF, dan yang terseleksi adalah satu blok biru seukuran halaman, atau tidak ada yang terseleksi sama sekali. Tombol copy tidak menghasilkan apa-apa. PDF Anda hampir pasti hasil scan, dan masalahnya ada di isi filenya, bukan di komputer Anda.

## Kenapa PDF Hasil Scan Tidak Bisa Di-copy

Scanner memotret kertas. PDF hasil scan menyimpan satu foto untuk setiap halaman. Foto itu terdiri dari titik-titik warna, tanpa satu pun karakter huruf di dalamnya.

Bayangkan foto papan pengumuman. Mata Anda membaca hurufnya, tapi komputer hanya melihat piksel. PDF digital berbeda: file itu menyimpan huruf sebagai karakter yang bisa diseleksi, dicari, dan disalin. Karakter itu disebut lapisan teks. PDF hasil scan tidak punya lapisan teks.

## Cek Dulu: Gambar atau Teks

Dua tes ini memberi jawaban dalam setengah menit:

1. **Seleksi kalimat.** Seret kursor di atas satu kalimat. Kalau kalimat terseleksi per kata, PDF Anda punya teks. Kalau seluruh halaman terseleksi sebagai blok, PDF Anda gambar.
2. **Cari kata.** Tekan `Ctrl+F` di Windows atau `Cmd+F` di Mac, lalu cari kata yang jelas terlihat di halaman. Kalau hasilnya nol, halaman itu tidak punya lapisan teks.

Tes ini perlu Anda ulangi di beberapa halaman. Satu PDF bisa berisi halaman digital dan halaman scan sekaligus.

## Dua Penyebab Lain Teks Tidak Bisa Disalin

Tidak semua kegagalan copy berasal dari scan.

**Pemilik dokumen membatasi penyalinan.** PDF bisa memakai pengaturan keamanan yang menonaktifkan copy. Hubungi pembuat dokumen dan minta versi tanpa pembatasan.

**Teks tersalin sebagai karakter aneh.** Font di dalam PDF tidak memetakan karakter dengan benar, sehingga hasil salinan berupa kotak atau simbol acak. Coba buka file di PDF reader lain. Kalau hasilnya sama, jalankan OCR pada halaman itu.

## Ubah PDF Hasil Scan Jadi Teks dengan OCR

OCR (optical character recognition) membaca gambar huruf dan mengubahnya jadi teks sungguhan. Ada beberapa jalur:

- **Google Docs.** Unggah PDF ke Google Drive, klik kanan file, pilih **Open with**, lalu **Google Docs**. Hasilnya dokumen berisi teks. File terunggah ke akun Google, dan layanan OCR gratis sering membatasi jumlah halaman atau ukuran file.
- **Adobe Acrobat Pro.** Fitur **Scan & OCR** menambahkan lapisan teks ke PDF Anda. Fitur ini berbayar.
- **OCRmyPDF.** Alat gratis dan open source yang berjalan di komputer Anda, jadi file tidak keluar dari perangkat.
- **Kamera ponsel untuk satu halaman.** Live Text di iPhone atau Google Lens di Android menyalin teks dari foto halaman.

Perintah OCRmyPDF berbentuk seperti ini:

```
ocrmypdf -l ind+eng hasil_scan.pdf hasil_ocr.pdf
```

Opsi `-l ind+eng` memilih bahasa Indonesia dan Inggris. Paket bahasa Indonesia untuk Tesseract perlu terpasang lebih dulu.

Kalau Anda memakai OCRmyPDF atau Acrobat, hasilnya PDF dengan lapisan teks. Setelah itu [PDF to Text](/office-tools/pdf/pdf-to-text) bisa mengambil teksnya, karena alat itu membaca teks yang sudah ada di dalam file. PDF to Text sendiri tidak melakukan OCR.

## Pecah PDF Besar dengan PDF Split Sebelum OCR

[PDF Split](/office-tools/pdf/pdf-split) di Kertaas membagi PDF jadi beberapa file di browser. Halaman disalin apa adanya tanpa kompresi ulang, jadi kualitas scan tetap utuh. File tidak terkirim ke server.

1. Buka [PDF Split](/office-tools/pdf/pdf-split).
2. Pilih file PDF atau seret ke halaman.
3. Pilih **Each page separate** atau **Custom ranges**.
4. Klik **Split PDF**, lalu unduh tiap bagian. **Download all** mengunduh semuanya berurutan.

Di **Custom ranges**, tulis satu baris untuk setiap file hasil. Pakai tanda hubung untuk rentang (`1-3`) dan koma untuk halaman terpisah (`1,4,7`):

```
1-10
11-20
21-30
```

Tiga baris di atas menghasilkan tiga file, masing-masing sepuluh halaman. Ada dua alasan memecah PDF sebelum OCR:

- **Batas layanan OCR.** Kalau layanan gratis menolak file tebal, kirim bagian-bagian kecil satu per satu.
- **PDF campuran.** Pisahkan halaman digital dari halaman scan. Ambil teks halaman digital lewat PDF to Text, dan jalankan OCR hanya pada halaman scan.

## Rapikan Hasil OCR dengan Text Cleaner

Teks hasil OCR sering membawa spasi ganda, baris kosong berlebih, dan tab tersembunyi. [Text Cleaner](/office-tools/documents/text-cleaner) membersihkannya dalam satu proses.

1. Tempel teks di kolom **Original text**.
2. Centang opsi yang Anda butuhkan.
3. Klik **Copy result** untuk menyalin isi kolom **Cleaned result**.

Lima opsi tersedia: **Trim leading/trailing spaces**, **Remove double spaces**, **Remove blank lines**, **Convert tabs to spaces**, dan **Merge into a single line**. Opsi terakhir menghapus pemisah antarparagraf, jadi aktifkan hanya kalau Anda ingin satu blok teks. Teks asli Anda tidak berubah, dan Anda bisa mengganti opsi kapan saja. Semuanya berjalan di browser.

## Periksa Salah Baca Hasil OCR

OCR tidak 100 persen akurat, dan Text Cleaner tidak memperbaiki huruf yang salah dibaca. Kualitas scan menentukan hasilnya. Salah baca yang sering muncul: "rn" terbaca "m", angka 0 tertukar dengan huruf O, dan angka 1 tertukar dengan huruf l.

Baca ulang bagian yang tidak boleh salah, yaitu nama, nomor, tanggal, dan nominal uang. Bandingkan dengan halaman aslinya.

## Alur Lengkap dari Scan sampai Teks Rapi

1. Cek apakah PDF berisi gambar atau teks.
2. Pecah file dengan PDF Split kalau terlalu besar atau berisi halaman campuran.
3. Jalankan OCR untuk menambahkan lapisan teks.
4. Ambil teksnya dengan PDF to Text, atau langsung dari hasil OCR.
5. Rapikan dengan Text Cleaner.
6. Baca ulang bagian penting.

## Pertanyaan Umum

### Bisakah PDF to Text membaca PDF hasil scan?

Belum. PDF to Text membaca teks digital di dalam file, bukan teks dari gambar. PDF hasil scan tanpa lapisan teks menghasilkan output kosong.

### Apakah PDF Split menurunkan kualitas halaman?

Tidak. Halaman disalin apa adanya tanpa kompresi ulang.

### Apakah OCR menghasilkan teks yang akurat?

Akurasi bergantung pada kualitas scan. Scan yang tajam dan lurus menghasilkan teks yang lebih bersih. Tetap baca ulang nama, angka, dan tanggal.

### Apakah file saya aman?

PDF Split dan Text Cleaner berjalan di browser Anda, dan tidak ada yang terunggah ke server. Google Docs mengunggah file ke akun Google. Untuk dokumen rahasia, pakai OCR yang berjalan di komputer Anda, seperti OCRmyPDF.
