---
title: Cara Membersihkan Data CSV yang Berantakan
description: Cara membersihkan data CSV secara online dengan menghapus baris kosong, duplikat, kolom kosong, dan spasi berlebih di browser. Hasilnya data rapi dan terformat, siap diimpor.
publishedAt: "2026-10-16"
translationKey: clean-messy-csv-data
relatedToolPath: /office-tools/spreadsheet/csv-cleaner
coverImage: /img/blog/cleaning-messy-csv-data.jpg
---

Anda mengekspor data dari sistem lama, atau menggabungkan beberapa sumber, dan hasilnya CSV dengan baris kosong, data ganda, dan spasi yang nyasar di mana-mana. Impor ke database gagal, atau berhasil dengan catatan pelanggan yang muncul dua kali. Anda bisa membersihkan data CSV online dengan beberapa klik, dan file tidak keluar dari browser Anda.

## Masalah Umum pada Data CSV yang Berantakan

Empat masalah ini muncul paling sering:

- **Spasi di awal atau akhir sel.** "Budi" dan "Budi " terlihat sama, tapi komputer membacanya sebagai dua nilai berbeda saat Anda mencari, mengelompokkan, atau mencocokkan data.
- **Baris kosong.** Sisa penggabungan beberapa sumber. Baris ini merusak hitungan jumlah data dan hasil pengurutan.
- **Baris duplikat.** Data yang sama tercatat dua kali atau lebih, sehingga total dan laporan Anda membengkak.
- **Kolom kosong.** Koma berlebih di akhir baris menghasilkan kolom tanpa isi yang tidak berguna.

## Bersihkan Data CSV Online dengan CSV Cleaner

[CSV Cleaner](/office-tools/spreadsheet/csv-cleaner) di Kertaas menangani keempat masalah itu dalam satu proses.

1. Buka [CSV Cleaner](/office-tools/spreadsheet/csv-cleaner).
2. Pilih file CSV atau seret ke halaman.
3. Centang opsi yang Anda butuhkan: potong spasi di tiap sel, hapus baris kosong, hapus baris duplikat, hapus kolom kosong.
4. Salin hasilnya atau unduh sebagai file `.csv`.

Anda bisa menggabungkan keempat opsi, dan efek tiap opsi langsung terlihat saat Anda mengaktifkannya. Browser memproses file di perangkat Anda, jadi tidak ada yang terkirim ke server. Baris header tetap menjadi baris pertama, dan opsi pembersihan berlaku untuk baris data di bawahnya.

## Contoh Sebelum dan Sesudah

Data awal punya koma berlebih di akhir baris, satu baris kosong, dan satu baris ganda. Nama "Budi Santoso" juga membawa spasi di akhir:

```
Nama,Kota,Telepon,
Budi Santoso ,Jakarta,08123456789,
,,,
Siti Aminah,Bandung,08234567890,
Budi Santoso ,Jakarta,08123456789,
```

Setelah keempat opsi aktif, hasilnya:

```
Nama,Kota,Telepon
Budi Santoso,Jakarta,08123456789
Siti Aminah,Bandung,08234567890
```

## Cara Kerja Penghapusan Duplikat

CSV Cleaner menganggap sebuah baris sebagai duplikat kalau semua selnya sama dengan baris yang muncul lebih dulu. Salinan pertama tetap ada, salinan berikutnya dihapus.

Aturan ini punya satu akibat: dua baris yang berbeda hanya karena spasi tidak sama persis. Aktifkan opsi potong spasi bersama opsi hapus duplikat, lalu perhatikan efeknya pada jumlah baris.

## Alternatif: Bersihkan di Spreadsheet

Kalau Anda sudah punya Excel atau Google Sheets, fitur bawaannya juga bisa membantu:

| Masalah        | Excel                                           | Google Sheets                                     |
| -------------- | ----------------------------------------------- | ------------------------------------------------- |
| Spasi berlebih | Fungsi `TRIM`                                   | **Data**, **Data cleanup**, **Trim whitespace**   |
| Duplikat       | **Data**, **Remove Duplicates**                 | **Data**, **Data cleanup**, **Remove duplicates** |
| Baris kosong   | **Go To Special**, **Blanks**, lalu hapus baris | Filter kolom, lalu hapus baris kosong             |

Satu catatan untuk Excel: saat membuka file CSV, Excel mengubah format angka dan bisa membuang nol di depan kode pos atau nomor telepon. Kalau data Anda punya kolom seperti itu, bersihkan lewat CSV Cleaner dan periksa hasilnya di CSV Viewer, supaya file tidak melewati Excel.

## Periksa Hasil Sebelum Mengimpor

Tiga pengecekan ini mencegah kejutan di sistem tujuan:

1. **Jumlah baris.** Bandingkan jumlah baris sebelum dan sesudah. Selisihnya harus sama dengan jumlah baris kosong dan duplikat yang Anda perkirakan.
2. **Kolom penting.** Pastikan nomor telepon dan kode pos masih punya nol di depan. Buka hasilnya di [CSV Viewer](/office-tools/spreadsheet/csv-viewer), bukan di Excel.
3. **Karakter.** Cari nama dengan huruf berakson. Kalau muncul "Ã©", encoding file bermasalah.

## Setelah Bersih: Ubah dan Rapikan Format Data

Data yang sudah bersih siap dipakai ke tahap berikutnya:

- Data berasal dari beberapa file: gabungkan dulu dengan [CSV Merger](/office-tools/spreadsheet/csv-merger), lalu bersihkan sekali jalan. Duplikat antarfile ikut terhapus.
- File terlalu besar untuk dibuka: pecah dengan [CSV Splitter](/office-tools/spreadsheet/csv-splitter).
- Rekan kerja butuh file Excel: ubah lewat [CSV to XLSX](/office-tools/spreadsheet/csv-to-xlsx).
- Aplikasi atau API butuh JSON: ubah lewat [CSV to JSON](/office-tools/data/csv-to-json), lalu rapikan indentasi dan periksa validitasnya dengan [Data Formatter](/office-tools/data/data-formatter).

## Pertanyaan Umum

### Apakah membersihkan data CSV online aman?

CSV Cleaner memproses file di browser Anda. File tidak terunggah ke server mana pun.

### Apakah baris header ikut terhapus?

Tidak. Header tetap menjadi baris pertama. Opsi pembersihan berlaku untuk baris data di bawahnya.

### Bisakah saya memakai beberapa opsi sekaligus?

Bisa. Potong spasi, hapus baris kosong, hapus baris duplikat, dan hapus kolom kosong bekerja bersamaan.
