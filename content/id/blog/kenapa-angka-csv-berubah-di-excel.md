---
title: Kenapa Angka di CSV Berubah Setelah Dibuka di Excel
description: Penjelasan kenapa kode pos, nomor telepon, dan angka lain berubah bentuk saat file CSV dibuka di Excel, lengkap dengan cara mencegahnya.
publishedAt: "2026-10-20"
translationKey: csv-numbers-excel-change
relatedToolPath: /office-tools/spreadsheet/csv-viewer
coverImage: /img/blog/csv-numbers-excel-change.jpg
---

Nomor telepon pelanggan "081234567890" tersimpan rapi di file CSV. Begitu dibuka di Excel, berubah jadi "8.12E+10". Kode pos "00123" kehilangan dua angka nol di depan, jadi cuma "123". Datanya tidak pernah salah, yang berubah cuma caranya ditampilkan, tapi itu cukup bikin panik kalau Anda tidak tahu sebabnya.

## Akar Masalahnya: CSV Tidak Punya Tipe Data

File CSV cuma menyimpan teks, titik. Tidak ada informasi tersimpan tentang mana yang "harus dibaca sebagai angka" dan mana yang "harus dibaca sebagai teks". Semuanya setara, cuma karakter dipisah koma.

Excel yang menentukan sendiri bagaimana tiap kolom seharusnya dibaca, saat file itu dibuka. Kalau isi kolomnya terlihat seperti angka, Excel otomatis memperlakukannya sebagai angka, lengkap dengan aturan tampilan angka milik Excel sendiri. Di sinilah masalahnya muncul, karena aturan tampilan itu tidak selalu cocok dengan maksud aslinya.

## Tiga Kasus yang Paling Sering Terjadi

**Nol di depan hilang.** Kode pos, NIP, atau kode produk yang diawali angka nol, seperti "00123", dibaca Excel sebagai angka 123. Angka tidak pernah punya nol di depan secara matematis (123 dan 00123 nilainya sama), jadi Excel membuang nol itu tanpa bertanya.

**Angka panjang berubah jadi notasi ilmiah.** Nomor telepon, nomor rekening, atau ID transaksi yang panjang (12 digit ke atas) berubah tampilannya jadi bentuk seperti "8.12E+10". Ini perilaku bawaan Excel untuk angka yang dianggap "terlalu besar" untuk ditampilkan penuh di lebar kolom standar, sama seperti bagaimana kalkulator menampilkan angka besar.

**Tanggal terbaca beda dari yang dimaksud.** Teks "03/04/2026" di CSV bisa terbaca sebagai 3 April atau 4 Maret tergantung pengaturan regional Excel Anda, karena CSV cuma menyimpan teks tanggal, bukan nilai tanggal yang sudah punya format baku.

## Kenapa Ini Bukan Salah File CSV-nya

Penting dipahami, perubahan ini terjadi **saat dibuka**, bukan di dalam file itu sendiri. File CSV aslinya tidak berubah sama sekali, isinya tetap "00123" persis seperti sebelumnya. Yang berubah cuma tampilan sementara di Excel, hasil dari Excel menebak tipe data berdasarkan isi kolom.

Masalahnya jadi nyata kalau Anda **menyimpan ulang** file itu dari Excel setelah dibuka. Begitu disimpan, tampilan yang sudah berubah (123 tanpa nol, notasi ilmiah) itu yang jadi nilai permanen di file baru. Di titik ini datanya benar-benar berubah, bukan cuma tampilannya.

## Cara Mencegahnya

**Jangan buka CSV dengan cara double-click.** Cara ini langsung memicu Excel menebak tipe data otomatis untuk semua kolom. Sebagai gantinya, di Excel buka lewat menu **Data > Get Data > From Text/CSV** (atau **From Text** di versi lebih lama). Cara ini menampilkan pratinjau data dan memberi Anda kesempatan mengatur tipe tiap kolom secara manual, termasuk memilih **Text** untuk kolom yang isinya kode pos, nomor telepon, atau ID, sebelum data benar-benar masuk ke sheet.

**Cek dulu isi aslinya sebelum dibuka di Excel.** Kalau Anda cuma perlu memastikan data aslinya benar (misalnya nol di depan memang ada), buka lewat [CSV Viewer](/office-tools/spreadsheet/csv-viewer). Tool ini menampilkan isi CSV persis seperti tersimpan, tanpa tebak-tebakan tipe data, karena memang tidak melakukan konversi apa pun.

**Bersihkan spasi tersembunyi.** Kadang angka terbaca sebagai teks (bukan angka) justru karena ada spasi tak terlihat menempel di depan atau belakang nilainya, hasil export dari sistem lain. Ini kebalikan dari masalah di atas, tapi sama-sama bikin data tidak konsisten. [CSV Cleaner](/office-tools/spreadsheet/csv-cleaner) punya opsi memangkas spasi di tiap sel, berguna untuk merapikan ini sebelum data dipakai lebih lanjut.

## Kalau Sudah Terlanjur Tersimpan Ulang

Kalau file CSV sudah terlanjur dibuka dan disimpan ulang dari Excel, dan nol di depan sudah hilang dari datanya, satu-satunya cara memulihkan adalah kembali ke sumber data asli (sistem yang mengeluarkan CSV itu pertama kali) dan export ulang. Excel tidak menyimpan riwayat nilai sebelum "diperbaiki" otomatis, jadi tidak ada cara mengembalikannya dari file yang sudah tersimpan.
