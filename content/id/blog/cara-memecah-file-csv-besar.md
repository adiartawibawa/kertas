---
title: Cara Memecah File CSV Besar Jadi Beberapa Bagian
description: Cara memecah file CSV besar jadi beberapa bagian lewat browser, terminal, atau Python. Lengkap dengan tips menjaga header dan memeriksa hasilnya.
publishedAt: "2026-10-14"
translationKey: split-large-csv-file
relatedToolPath: /office-tools/spreadsheet/csv-splitter
coverImage: /img/blog/spliting-large-csv.jpg
---

Anda membuka file CSV berisi 2,5 juta baris, dan Excel berhenti memuat data di baris ke-1.048.576. Atau email menolak lampiran Anda karena terlalu besar. Memecah file CSV besar jadi beberapa bagian menyelesaikan kedua masalah itu, dan Anda bisa melakukannya tanpa menulis kode.

## Kapan Anda Perlu Memecah File CSV

Empat batas ini paling sering memaksa orang memecah file:

- **Excel** memuat maksimal 1.048.576 baris per sheet. Baris sisanya tidak terbuka.
- **Google Sheets** membatasi satu spreadsheet sampai 10 juta sel.
- **Gmail** membatasi lampiran sampai 25 MB.
- **Sistem import** di banyak platform membatasi jumlah baris atau ukuran file per unggahan.

## Tentukan Dulu Jumlah Baris Tiap Bagian

Bagi total baris dengan batas yang Anda hadapi. File 2,5 juta baris dan batas Excel 1.048.576 baris butuh minimal tiga bagian. Beri ruang di bawah batas, karena header dihitung sebagai satu baris dan Anda mungkin menambah baris sendiri nanti. Dengan 500.000 baris per bagian, file tadi menjadi lima bagian yang nyaman dibuka.

## Pecah CSV Lewat Browser

[CSV Splitter](/office-tools/spreadsheet/csv-splitter) di Kertaas memecah file CSV di tab browser. Proses berjalan di perangkat Anda, jadi file tidak terkirim ke server mana pun.

1. Buka [CSV Splitter](/office-tools/spreadsheet/csv-splitter).
2. Pilih file CSV dari komputer Anda.
3. Atur cara pemecahan sesuai kebutuhan Anda.
4. Unduh bagian-bagian hasilnya.

Setelah selesai, buka satu bagian dan pastikan baris header ada di sana. Bagian berikutnya perlu header yang sama supaya bisa dibaca sebagai tabel yang utuh.

## Pecah CSV Lewat Terminal di Mac dan Linux

Perintah `split` memecah file per jumlah baris. Tiga baris di bawah menyimpan header, memecah isinya per 500.000 baris, lalu menempelkan header ke tiap bagian:

```
head -n 1 data.csv > header.csv
tail -n +2 data.csv | split -l 500000 - bagian_
for f in bagian_*; do cat header.csv "$f" > "$f.csv"; rm "$f"; done
```

Hasilnya `bagian_aa.csv`, `bagian_ab.csv`, dan seterusnya. Perintah ini memotong per baris teks. Kalau ada sel yang berisi enter di dalam tanda kutip, potongannya bisa jatuh di tengah sel. Untuk file seperti itu, pakai Python.

## Pecah CSV Pakai Python

Library pandas membaca CSV secara bertahap dan menulis header di setiap bagian:

```python
import pandas as pd

reader = pd.read_csv("data.csv", chunksize=500_000, dtype=str)

for i, bagian in enumerate(reader, start=1):
    bagian.to_csv(f"bagian_{i}.csv", index=False, encoding="utf-8-sig")
```

Opsi `dtype=str` menjaga nol di depan angka, misalnya kode pos 00123. Opsi `utf-8-sig` menambahkan penanda yang membuat Excel membaca huruf berakson dengan benar. Pandas mengenali struktur CSV, jadi sel multibaris tidak terpotong.

## Pilih Cara yang Paling Cocok

| Cara               | Cocok untuk                                 | Perlu              |
| ------------------ | ------------------------------------------- | ------------------ |
| CSV Splitter       | Pemecahan cepat tanpa kode                  | Browser            |
| Terminal (`split`) | File besar di Mac dan Linux                 | Paham command line |
| Python (pandas)    | File dengan sel multibaris, proses berulang | Python terpasang   |

## Periksa Hasil Pemecahan

Tiga pengecekan ini menangkap hampir semua masalah:

1. **Header.** Buka tiap bagian dan lihat baris pertamanya. [CSV Viewer](/office-tools/spreadsheet/csv-viewer) membukanya tanpa Excel dan tanpa mengubah format angka.
2. **Jumlah baris.** Jumlahkan baris semua bagian, kurangi satu header per bagian, lalu bandingkan dengan file asli.
3. **Karakter.** Cari huruf berakson atau nama dengan karakter khusus. Kalau muncul "Ã©", encoding-nya salah.

## Gabungkan Kembali Kalau Perlu

Kalau suatu hari Anda butuh satu file lagi, gabungkan bagian-bagian itu dengan [CSV Merger](/office-tools/spreadsheet/csv-merger). Pastikan semua bagian punya header yang sama.

## Setelah Dipecah

- Bagian berisi baris kosong atau data berantakan: bersihkan dengan [CSV Cleaner](/office-tools/spreadsheet/csv-cleaner).
- Bagian perlu dikirim sebagai file Excel: ubah lewat [CSV to XLSX](/office-tools/spreadsheet/csv-to-xlsx).

## Pertanyaan Umum

### Berapa baris ideal untuk setiap bagian?

Untuk Excel, 500.000 baris memberi ruang aman di bawah batas 1.048.576. Untuk email atau import ke sistem lain, mulai dari batas ukuran file atau jumlah baris yang mereka tetapkan, lalu turunkan sedikit.

### Apakah memecah file mengubah isi data?

Isi baris tetap sama. Setiap bagian hanya perlu membawa baris header supaya kolomnya terbaca.

### Bisakah bagian-bagian itu digabung lagi?

Bisa. [CSV Merger](/office-tools/spreadsheet/csv-merger) menggabungkan beberapa file CSV menjadi satu.
