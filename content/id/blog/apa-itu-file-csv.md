---
title: Apa Itu File CSV?
description: Penjelasan format CSV, isi di dalamnya, dan perbedaannya dengan Excel, lengkap dengan contoh dan cara membukanya.
publishedAt: "2026-10-10"
translationKey: what-is-csv
relatedToolPath: /office-tools/spreadsheet/csv-viewer
coverImage: /img/blog/what-is-csv-file.jpg
---

Anda download data dari bank, toko online, atau sistem kantor, lalu filenya berekstensi `.csv`. Dibuka pakai Notepad, isinya cuma baris-baris teks dipisah koma. Dibuka pakai Excel, baru rapi jadi tabel. File ini CSV, dan hampir setiap sistem di dunia bisa membacanya.

## CSV Itu Teks Biasa, Bukan File Khusus

CSV singkatan dari _Comma-Separated Values_. Namanya sudah menjelaskan isinya: data dipisah pakai koma. Tidak ada format rahasia, tidak ada kompresi, tidak ada enkripsi bawaan. Buka file `.csv` pakai aplikasi teks apa saja (Notepad, TextEdit, VS Code), Anda langsung baca isinya persis seperti yang disimpan.

Bandingkan dengan file Excel (`.xlsx`). File itu sebenarnya arsip ZIP berisi puluhan file XML di dalamnya, menyimpan warna sel, rumus, font, bahkan riwayat komentar. Buka `.xlsx` pakai Notepad, Anda cuma dapat karakter acak yang tidak terbaca.

Karena strukturnya sesederhana itu, CSV jadi bahasa universal untuk pertukaran data. Bank, toko online, aplikasi akuntansi, sistem HR, semuanya bisa export dan import CSV, walau masing-masing sistem dibangun pakai teknologi yang beda-beda.

## Bentuk Isinya Seperti Apa

Buka file CSV berisi data siswa, isinya kira-kira begini:

```
Nama,Kelas,Nilai
Budi Santoso,2A,85
Siti Aminah,2B,90
Andi Wijaya,2A,78
```

Baris pertama berisi nama kolom (header). Tiap baris setelahnya satu baris data, dengan nilai antar kolom dipisah koma. Aplikasi spreadsheet membaca pola ini dan otomatis menyusunnya jadi tabel: kolom Nama, Kelas, Nilai, dengan tiga baris data di bawahnya.

Pemisahnya tidak selalu koma. Beberapa negara Eropa pakai titik koma, karena koma dipakai untuk desimal (`85,5` bukan `85.5`). Beberapa sistem lama pakai tab. Karena itu CSV kadang disebut juga _delimiter-separated values_, koma cuma yang paling umum dipakai.

## Kenapa Masih Dipakai Sampai Sekarang

Format ini sudah ada sejak era komputer awal, jauh sebelum Excel lahir. Masih bertahan karena tiga alasan.

Pertama, ukurannya kecil. Tanpa formatting, warna, atau rumus, file CSV berisi ribuan baris data bisa cuma beberapa ratus KB. File Excel dengan data sama bisa beberapa kali lebih besar.

Kedua, hampir semua bahasa pemrograman bisa membaca dan menulis CSV dengan beberapa baris kode saja. Python, JavaScript, PHP, semuanya punya library bawaan untuk ini. Tidak perlu library khusus seperti yang dibutuhkan untuk baca file Excel.

Ketiga, CSV tidak terikat satu aplikasi. File Excel idealnya dibuka pakai Excel atau aplikasi kompatibel. File CSV dibuka pakai apa saja, dari Notepad sampai database, dari Python sampai Google Sheets.

## CSV vs Excel, Pilih yang Mana

Dua format ini sering dianggap saling menggantikan, padahal fungsinya beda.

Pakai CSV kalau Anda butuh **tukar data antar sistem**. Export data pelanggan dari satu platform, import ke platform lain, CSV format yang paling aman karena hampir semua sistem mendukungnya tanpa syarat tambahan.

Pakai Excel kalau Anda butuh **mengolah dan menampilkan data**. Butuh warna untuk menandai status, rumus untuk hitung total otomatis, atau grafik dari data itu, Excel yang tepat. CSV tidak bisa menyimpan hal-hal ini, karena memang cuma menyimpan teks.

Banyak alur kerja gabung keduanya: data diexport sebagai CSV dari satu sistem, lalu diimport ke Excel untuk diolah dan dipresentasikan.

## Masalah yang Sering Muncul Saat Buka CSV

Tiga masalah ini yang paling sering bikin orang bingung.

**Karakter aneh muncul saat dibuka.** Huruf yang seharusnya "é" jadi "Ã©", atau karakter Indonesia seperti "ñ" tampil rusak. Ini soal _encoding_, cara komputer menerjemahkan byte jadi karakter. File CSV yang disimpan pakai encoding UTF-8 tapi dibuka pakai aplikasi yang asumsi encoding lain akan menampilkan karakter rusak begini.

**Semua data masuk satu kolom.** Buka file CSV pakai Excel, kadang semua data malah numpuk di kolom A, tidak terpisah sama sekali. Penyebabnya biasanya delimiter file itu titik koma, sementara Excel Anda diset default koma (atau sebaliknya).

**Angka berubah format.** Kode pos "00123" jadi "123" begitu dibuka di Excel, karena Excel otomatis membaca itu sebagai angka dan membuang nol di depan. Nomor telepon panjang berubah jadi notasi ilmiah seperti "6.28E+11". Ini salah satu alasan kenapa data sensitif (ID, kode pos, nomor telepon) sering berantakan setelah lewat Excel.

## Cara Paling Simpel Buka CSV

Kalau Anda cuma perlu mengecek isi file CSV dengan cepat, tanpa risiko Excel mengacak format angka, buka langsung lewat [CSV Viewer](/office-tools/spreadsheet/csv-viewer). Upload file, isinya langsung tampil sebagai tabel yang bisa dicari, tanpa data terkirim ke server mana pun.

Kalau Anda perlu mengubahnya jadi file Excel yang bisa diformat lebih lanjut, [CSV to XLSX](/office-tools/spreadsheet/csv-to-xlsx) mengonversinya langsung di browser Anda.
