---
title: Cara Menghapus Data Duplikat di File CSV
description: Cara menghapus data duplikat di file CSV secara online lewat browser, di Excel dan Google Sheets, atau dengan Python. Pahami cara baris duplikat dikenali dan cek hasilnya.
publishedAt: "2026-10-23"
translationKey: remove-duplicates-csv
relatedToolPath: /office-tools/spreadsheet/csv-cleaner
coverImage: /img/blog/remove-duplicate-row-csv.jpg
---

Anda menggabungkan beberapa ekspor data pelanggan, dan satu orang muncul tiga kali. Total penjualan membengkak, email promosi terkirim ganda, dan impor ke database berhenti karena kunci yang sama muncul dua kali. Anda bisa menghapus data duplikat di file CSV dalam beberapa klik, tanpa Excel dan tanpa mengunggah file.

## Kenapa Data Duplikat Muncul

Duplikat jarang muncul dari satu kesalahan besar. Biasanya penyebabnya sepele:

- Anda menggabungkan beberapa file ekspor yang tumpang tindih.
- Satu ekspor dijalankan dua kali, atau impor yang gagal diulang.
- Petugas memasukkan data yang sama dua kali.
- Sistem lama mencatat satu transaksi sebagai beberapa baris.

## Cari Duplikat Dulu Sebelum Menghapus

Sebelum membersihkan, pastikan duplikatnya memang ada. [CSV Viewer](/office-tools/spreadsheet/csv-viewer) membuka file di browser, dan kotak pencariannya menyaring baris di semua kolom. Ketik satu email atau satu nomor pesanan. Kalau muncul dua baris atau lebih, data itu tercatat ganda.

## Hapus Duplikat dengan CSV Cleaner

[CSV Cleaner](/office-tools/spreadsheet/csv-cleaner) di Kertaas menghapus baris duplikat langsung di browser.

1. Buka [CSV Cleaner](/office-tools/spreadsheet/csv-cleaner).
2. Pilih file CSV atau seret ke halaman.
3. Centang **Remove duplicate rows**.
4. Centang **Trim spaces in each cell** untuk menangkap duplikat yang berbeda karena spasi.
5. Klik **Copy result**, atau klik **Download .csv** untuk menyimpan file hasilnya.

Setiap opsi menampilkan efeknya begitu Anda mengaktifkannya. Header tetap menjadi baris pertama, dan opsi pembersihan berlaku untuk baris data di bawahnya. Browser memproses file di perangkat Anda, jadi tidak ada yang terunggah ke server.

## Cara Baris Duplikat Dikenali

CSV Cleaner menganggap sebuah baris sebagai duplikat kalau semua selnya cocok dengan baris yang muncul lebih dulu. Salinan pertama tetap ada, dan salinan berikutnya dihapus.

Contohnya, tiga dari empat baris di bawah ini sama persis:

```
Email,Nama,Kota
budi@contoh.com,Budi,Jakarta
siti@contoh.com,Siti,Bandung
budi@contoh.com,Budi,Jakarta
budi@contoh.com,Budi,Jakarta
```

Hasilnya dua baris data:

```
Email,Nama,Kota
budi@contoh.com,Budi,Jakarta
siti@contoh.com,Siti,Bandung
```

Aturan ini punya akibat. Perbedaan sekecil apa pun di salah satu sel, seperti ejaan, format tanggal, atau spasi di akhir teks, membuat baris tidak dianggap duplikat. Aktifkan opsi potong spasi bersama hapus duplikat, lalu periksa jumlah baris di hasil. Kalau jumlahnya tidak turun sesuai perkiraan, jalankan file hasilnya sekali lagi lewat CSV Cleaner.

## Hapus Duplikat Berdasarkan Satu Kolom

Kadang dua baris dianggap duplikat walau tidak semua selnya sama. Misalnya email yang sama muncul dengan nama yang berbeda ejaan. CSV Cleaner mencocokkan seluruh baris, jadi kasus ini perlu alat lain.

**Excel.** Buka CSV dengan **Data**, **From Text/CSV**, lalu pilih seluruh data. Buka tab **Data**, klik **Remove Duplicates**, dan centang hanya kolom Email.

**Google Sheets.** Impor file, lalu pilih **Data**, **Data cleanup**, **Remove duplicates**, dan pilih kolom yang menjadi acuan.

**Python (pandas).** Parameter `subset` menentukan kolom acuan, dan `keep="first"` mempertahankan baris pertama:

```python
import pandas as pd

df = pd.read_csv("data.csv", dtype=str)
df = df.drop_duplicates(subset=["Email"], keep="first")
df.to_csv("data_bersih.csv", index=False)
```

Opsi `dtype=str` menjaga nol di depan angka seperti kode pos 00123.

## Hapus Duplikat Lewat Terminal

Untuk duplikat yang sama persis di Mac dan Linux, satu perintah cukup:

```
awk '!seen[$0]++' data.csv > data_bersih.csv
```

Perintah ini mempertahankan kemunculan pertama setiap baris dan menjaga urutan aslinya. Perintah ini membandingkan baris teks utuh, jadi hanya baris yang sama persis yang terhapus.

## Pilih Cara yang Paling Cocok

| Cara            | Cocok untuk                               | Catatan                                |
| --------------- | ----------------------------------------- | -------------------------------------- |
| CSV Cleaner     | Duplikat persis, tanpa kode               | Mencocokkan seluruh baris              |
| Excel           | Duplikat berdasarkan kolom tertentu       | Membuka CSV bisa mengubah format angka |
| Google Sheets   | Duplikat berdasarkan kolom, kerja bersama | File diunggah ke akun Google           |
| Python (pandas) | File besar, proses berulang               | Perlu Python terpasang                 |
| `awk`           | Duplikat persis di terminal               | Hanya untuk Mac dan Linux              |

## Periksa Hasil Setelah Menghapus

Tiga pengecekan ini mencegah kehilangan data yang salah:

1. **Jumlah baris.** Bandingkan jumlah baris sebelum dan sesudah. Selisihnya harus sama dengan jumlah duplikat yang Anda perkirakan.
2. **Contoh data.** Cari beberapa email atau nomor pesanan yang tadinya ganda di [CSV Viewer](/office-tools/spreadsheet/csv-viewer). Pastikan masing-masing tinggal satu baris.
3. **File asli.** Simpan file asli di tempat terpisah sampai Anda yakin hasilnya benar.

## Setelah Duplikat Hilang

- Data berasal dari beberapa file: gabungkan dulu dengan [CSV Merger](/office-tools/spreadsheet/csv-merger), lalu hapus duplikat sekali jalan. Duplikat antarfile ikut terhapus.
- File terlalu besar untuk dibuka: pecah dengan [CSV Splitter](/office-tools/spreadsheet/csv-splitter).
- Rekan kerja butuh file Excel: ubah lewat [CSV to XLSX](/office-tools/spreadsheet/csv-to-xlsx).

## Pertanyaan Umum

### Baris mana yang dipertahankan saat duplikat dihapus?

CSV Cleaner mempertahankan salinan pertama dan menghapus salinan yang muncul setelahnya.

### Apakah baris header ikut terhapus?

Tidak. Header tetap menjadi baris pertama. Opsi pembersihan berlaku untuk baris data di bawahnya.

### Bisakah saya menghapus duplikat berdasarkan satu kolom saja?

Tidak di CSV Cleaner, karena alat ini mencocokkan semua sel dalam satu baris. Untuk acuan satu kolom, pakai Remove Duplicates di Excel atau Google Sheets, atau `drop_duplicates` di pandas.

### Apakah file saya terunggah saat memakai CSV Cleaner?

Tidak. Semuanya berjalan di browser Anda.
