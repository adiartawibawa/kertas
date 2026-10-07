---
title: Cara Mengatasi CSV yang Terbuka Jadi Satu Kolom di Excel
description: Cara mengatasi CSV yang terbuka jadi satu kolom di Excel. Cek pemisah file, pakai Text to Columns, atau impor dengan delimiter yang benar. Plus cara melihat isi file.
publishedAt: "2026-10-21"
translationKey: fix-csv-one-column-excel
relatedToolPath: /office-tools/spreadsheet/csv-viewer
coverImage: /img/blog/fixing-csv-file.jpg
---

Anda klik dua kali file CSV, dan Excel menaruh semua data di kolom A. Setiap baris berisi satu kalimat panjang dengan koma atau titik koma di tengahnya. Datanya utuh. Excel hanya memakai pemisah yang berbeda dari pemisah di dalam file.

## Kenapa CSV Terbuka Jadi Satu Kolom

File CSV memisahkan nilai dengan satu karakter, biasanya koma. Saat Anda membuka file dengan klik dua kali, Excel di Windows memakai pemisah daftar dari pengaturan regional komputer Anda. Pengaturan regional yang memakai koma sebagai pemisah desimal biasanya memakai titik koma sebagai pemisah daftar.

Akibatnya, file berpemisah koma terbuka jadi satu kolom di komputer yang mengharapkan titik koma, dan sebaliknya. File berpemisah tab mengalami hal yang sama.

## Periksa Isi File Dulu

Sebelum memperbaiki, pastikan pemisah mana yang dipakai file Anda. Ada dua cara.

**Notepad.** Klik kanan file, pilih **Open with**, lalu **Notepad**. Lihat baris pertama:

```
Nama,Kelas,Nilai
Nama;Kelas;Nilai
```

Baris pertama berpemisah koma, baris kedua berpemisah titik koma. Pemisah tab terlihat sebagai jarak lebar di antara nilai.

**CSV Viewer.** [CSV Viewer](/office-tools/spreadsheet/csv-viewer) di Kertaas membuka file di browser tanpa melewati Excel.

1. Seret file CSV ke area unggah, atau klik untuk memilih file.
2. Data muncul sebagai tabel.
3. Ketik di kotak pencarian untuk menyaring baris di semua kolom.

Kalau tabel terbaca rapi, file Anda sehat dan masalahnya ada di pengaturan Excel. Kalau semua nilai tetap berada di satu kolom, perhatikan karakter yang memisahkan nilai itu. Itu pemisah yang perlu Anda pilih di cara-cara di bawah.

CSV Viewer hanya menampilkan dan mencari data. Anda tidak bisa mengedit isi tabelnya. Browser membaca file di perangkat Anda, jadi tidak ada yang terunggah ke server.

## Cara 1: Pisahkan dengan Text to Columns

Cara ini memperbaiki data yang sudah terlanjur terbuka di kolom A.

1. Klik huruf **A** di atas kolom untuk memilih seluruh kolom.
2. Buka tab **Data**, lalu klik **Text to Columns**.
3. Pilih **Delimited**, lalu klik **Next**.
4. Centang pemisah yang sesuai: **Semicolon**, **Comma**, atau **Tab**. Pratinjau di bawahnya menunjukkan hasilnya. Klik **Next**.
5. Di layar ketiga, klik kolom yang berisi kode pos atau nomor telepon, lalu pilih **Text** supaya nol di depan angka tetap ada.
6. Klik **Finish**.

## Cara 2: Impor dengan Delimiter yang Benar

Cara ini lebih bersih, karena Anda memilih pemisah sebelum data masuk ke sel. Excel 2016 dan Microsoft 365 punya fitur ini.

1. Buka Excel dengan lembar kosong.
2. Buka tab **Data**, lalu klik **From Text/CSV**, dan pilih file Anda.
3. Di jendela pratinjau, atur **Delimiter** ke koma, titik koma, atau tab sampai tabel terbaca rapi.
4. Atur **File Origin** ke **65001: Unicode (UTF-8)** kalau huruf berakson tampil rusak.
5. Atur **Data Type Detection** ke **Do not detect data types** untuk menjaga nol di depan angka.
6. Klik **Load**.

Nama menu bisa berbeda sedikit antarversi Excel dan antarbahasa.

## Cara 3: Tambahkan Baris sep= di Awal File

Excel untuk Windows membaca baris khusus di awal file sebagai petunjuk pemisah.

1. Buka file di Notepad.
2. Tambahkan satu baris di paling atas: `sep=;` untuk titik koma, atau `sep=,` untuk koma.
3. Simpan, lalu buka dengan Excel.

Excel memakai baris itu sebagai petunjuk dan tidak menampilkannya. Aplikasi lain membacanya sebagai baris data biasa, jadi hapus baris itu sebelum Anda mengimpor file ke sistem lain.

## Cara 4: Ubah Pemisah Daftar di Windows

Pengaturan ini mengubah pemisah default Excel untuk semua file CSV yang Anda buka dengan klik dua kali.

1. Buka **Control Panel**, lalu **Region**.
2. Klik **Additional settings**.
3. Ubah kolom **List separator** menjadi `,` atau `;`, sesuai file yang paling sering Anda buka.
4. Klik **OK**, lalu buka ulang file CSV Anda.

Perubahan ini berlaku untuk semua aplikasi di komputer. Pakai cara ini kalau file dari satu sumber selalu memakai pemisah yang sama.

## Buka di Google Sheets

Google Sheets menanyakan pemisah saat Anda mengimpor.

1. Buka spreadsheet kosong.
2. Pilih **File**, lalu **Import**, lalu **Upload**, dan pilih file CSV.
3. Pilih **Separator type** yang sesuai, lalu klik **Import data**.

Google Sheets mengunggah file ke akun Google Anda. Untuk data sensitif, pakai cara Excel di atas.

## Pilih Cara yang Paling Cocok

| Cara            | Cocok untuk                        | Catatan                                      |
| --------------- | ---------------------------------- | -------------------------------------------- |
| Text to Columns | Data yang sudah terbuka di kolom A | Atur kolom Text untuk menjaga nol di depan   |
| From Text/CSV   | Impor bersih, kontrol encoding     | Perlu Excel 2016 atau lebih baru             |
| Baris `sep=`    | Satu file yang sering dibuka       | Hapus baris itu sebelum impor ke sistem lain |
| List separator  | Semua file dari satu sumber        | Mengubah pengaturan seluruh komputer         |
| CSV Viewer      | Melihat isi file tanpa Excel       | Tidak bisa mengedit data                     |

## Setelah Kolom Terpisah

Kalau data sudah tampil rapi tapi berisi baris kosong, duplikat, atau spasi berlebih, bersihkan dengan [CSV Cleaner](/office-tools/spreadsheet/csv-cleaner).

## Pertanyaan Umum

### Apakah data CSV saya rusak kalau semuanya masuk kolom A?

Tidak. Isi file utuh. Excel hanya memakai pemisah yang berbeda dari pemisah di dalam file.

### Bagaimana saya tahu pemisah yang benar?

Buka file di Notepad dan lihat karakter di antara nilai pada baris pertama. Koma, titik koma, dan tab adalah tiga pemisah yang paling umum.

### Bisakah CSV Viewer mengedit data?

Tidak. CSV Viewer menampilkan data sebagai tabel dan menyaring baris lewat pencarian. Untuk mengedit, buka file di Excel atau Google Sheets dengan pemisah yang benar.

### Apakah file saya terunggah saat memakai CSV Viewer?

Tidak. Browser Anda membaca file langsung, dan tidak ada data yang terkirim ke server.
