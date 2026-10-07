---
title: Cara Membuka File CSV Tanpa Excel
description: Lima cara membuka file CSV tanpa Excel. Membuka file CSV melaui browser, editor teks, Google Sheets, LibreOffice, dan terminal. Plus solusi untuk karakter rusak dan data menumpuk di satu kolom.
publishedAt: "2026-10-12"
translationKey: open-csv-without-excel
relatedToolPath: /office-tools/spreadsheet/csv-viewer
coverImage: /img/blog/open-csv-file.jpg
---

Anda menerima file `.csv` dari bank atau toko online, tapi komputer Anda tidak punya Excel. Atau Excel terbuka dan isinya berantakan. File CSV bisa dibuka tanpa Excel dengan lima cara gratis.

## Buka CSV Tanpa Excel Lewat Browser

[CSV Viewer](/office-tools/spreadsheet/csv-viewer) di Kertaas membuka file CSV di tab browser. Isinya tampil sebagai tabel yang bisa dicari. Proses berjalan di perangkat Anda, jadi file tidak terkirim ke server mana pun. Cara ini cocok untuk data sensitif seperti daftar gaji, data pelanggan, atau mutasi rekening.

Karena file tidak lewat Excel, angka seperti kode pos 00123 tetap utuh dengan nol di depannya.

1. Buka [CSV Viewer](/office-tools/spreadsheet/csv-viewer).
2. Pilih file CSV dari komputer Anda.
3. Cari baris yang Anda butuhkan lewat fitur pencarian tabel.

## Buka CSV Pakai Editor Teks

CSV adalah teks biasa, jadi Notepad di Windows, TextEdit di Mac, dan VS Code bisa membukanya. Klik kanan file, pilih **Open with**, lalu pilih editor. Anda melihat data mentah dengan koma di antara nilai.

Cara ini pas untuk mengecek baris header atau beberapa baris pertama. Tabel besar sulit dibaca karena kolom tidak sejajar, dan file ratusan MB membuat Notepad lambat.

Di Mac, klik dua kali pada file CSV bisa membuka Numbers atau Excel. Klik kanan dan pilih **Open With** untuk memilih TextEdit.

## Buka CSV di Google Sheets

1. Buka Google Sheets dan buat spreadsheet kosong.
2. Pilih **File**, lalu **Import**, lalu **Upload**, dan pilih file CSV Anda.
3. Di jendela import, pilih jenis pemisah yang sesuai dengan file.
4. Matikan opsi konversi teks menjadi angka, tanggal, dan formula kalau Anda ingin nol di depan angka tetap ada.

Google Sheets mengunggah file ke akun Google Anda. Untuk data sensitif, pakai CSV Viewer atau salah satu cara offline di bawah.

## Buka CSV di LibreOffice Calc

LibreOffice gratis, open source, dan tersedia untuk Windows, macOS, dan Linux. Pilih **File**, lalu **Open**, dan pilih file CSV.

Jendela **Text Import** muncul sebelum data dimuat. Atur tiga hal di sana:

- **Character set**: pilih UTF-8 supaya huruf berakson dan karakter khusus tampil benar.
- **Separator**: pilih koma, titik koma, atau tab sesuai isi file.
- **Column type**: ubah kolom seperti kode pos dan nomor telepon menjadi **Text**.

Anda mengatur encoding dan format sebelum data masuk ke sel. LibreOffice juga berjalan offline.

## Lihat Isi CSV Lewat Terminal

Developer dan pengguna file besar bisa mengintip baris pertama tanpa membuka seluruh file.

Windows PowerShell:

```
Get-Content data.csv -TotalCount 5
```

Mac dan Linux:

```
head -n 5 data.csv
```

Kedua perintah menampilkan lima baris pertama, cukup untuk melihat header dan jenis pemisah. Ganti angka 5 untuk menampilkan lebih banyak baris.

## Pilih Cara yang Paling Cocok

| Cara             | Cocok untuk                   | Catatan                       |
| ---------------- | ----------------------------- | ----------------------------- |
| CSV Viewer       | Cek isi cepat, data sensitif  | File tidak terkirim ke server |
| Editor teks      | Cek header dan beberapa baris | Kolom tidak sejajar           |
| Google Sheets    | Edit dan berbagi online       | File diunggah ke akun Google  |
| LibreOffice Calc | Kontrol encoding dan pemisah  | Perlu instalasi               |
| Terminal         | File besar                    | Perlu paham command line      |

## Atasi Masalah Saat Membuka CSV

**Karakter aneh seperti "Ã©".** Encoding file tidak cocok dengan aplikasi. Buka ulang dengan encoding UTF-8. Di LibreOffice, pilih di jendela Text Import. Di VS Code, klik nama encoding di bilah status bawah, lalu pilih **Reopen with Encoding**.

**Semua data menumpuk di kolom A.** Pemisah yang Anda pilih salah. Coba titik koma atau tab di pengaturan import.

**Nol di depan angka hilang.** Atur kolom ke tipe **Text** saat import, atau lihat file di CSV Viewer.

## Pecah File CSV yang Terlalu Besar

Excel memuat sampai 1.048.576 baris per sheet, dan baris sisanya tidak ikut terbuka. Kalau file Anda lebih panjang dari itu, pecah dulu lewat [CSV Splitter](/office-tools/spreadsheet/csv-splitter), lalu buka tiap bagian secara terpisah.

## Rapikan atau Ubah Format Setelah Dibuka

Setelah isinya terlihat, Anda mungkin butuh langkah berikutnya:

- File berisi baris kosong atau data berantakan: bersihkan dengan [CSV Cleaner](/office-tools/spreadsheet/csv-cleaner).
- Rekan kerja meminta file Excel: ubah lewat [CSV to XLSX](/office-tools/spreadsheet/csv-to-xlsx).
- Anda butuh data untuk aplikasi atau API: ubah lewat [CSV to JSON](/office-tools/data/csv-to-json).

## Pertanyaan Umum

### Apakah file CSV bisa dibuka di HP?

Bisa. Aplikasi Google Sheets untuk Android dan iOS membuka file CSV.

### Apakah file CSV bisa dibuka tanpa terkirim ke internet?

Bisa. CSV Viewer memproses file di perangkat Anda. Editor teks, LibreOffice, dan terminal juga berjalan offline.

### Apakah file CSV bisa diedit tanpa Excel?

Bisa. Edit file di editor teks atau LibreOffice. Saat menyimpan di LibreOffice, pilih **Keep Current Format** supaya file tetap berformat CSV.
