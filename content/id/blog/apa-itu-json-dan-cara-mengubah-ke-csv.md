---
title: Apa Itu JSON, dan Cara Mengubahnya ke CSV
description: Penjelasan format JSON, bedanya dengan CSV, dan cara mengubah data JSON jadi tabel CSV yang bisa dibuka di Excel.
publishedAt: "2026-10-22"
translationKey: what-is-json-to-csv
relatedToolPath: /office-tools/data/json-to-csv
coverImage: /img/blog/what-is-json-file.jpg
---

API dari aplikasi yang Anda pakai mengembalikan data pelanggan dalam format JSON. Masalahnya, tim Anda cuma familiar dengan Excel, dan atasan minta datanya dalam bentuk tabel biasa untuk dianalisis. Dua kebutuhan ini sering bentrok, karena JSON dan tabel spreadsheet dibangun dengan cara berpikir yang berbeda.

## JSON Itu Apa

JSON singkatan dari _JavaScript Object Notation_. Formatnya dirancang untuk menyimpan data terstruktur, terutama data yang dipakai aplikasi dan sistem untuk saling berkomunikasi. Hampir semua API web mengembalikan data dalam format ini, karena mudah dibaca mesin dan masih cukup mudah dibaca manusia.

Satu data pelanggan dalam JSON terlihat seperti ini:

```json
{
  "nama": "Budi Santoso",
  "email": "budi@contoh.com",
  "alamat": {
    "kota": "Surabaya",
    "kodepos": "60111"
  },
  "hobi": ["membaca", "bersepeda"]
}
```

Perhatikan strukturnya: data tersusun pakai kurung kurawal (`{}`) untuk objek, dan kurung siku (`[]`) untuk daftar nilai. Satu nilai bisa berisi nilai lain di dalamnya, seperti `alamat` yang punya `kota` dan `kodepos` sendiri. Inilah yang disebut data **bersarang** (nested), dan ini yang bikin JSON beda jauh dari CSV.

## Kenapa JSON dan CSV Tidak Langsung Cocok

CSV cuma mengerti baris dan kolom, bentuknya datar, satu tingkat saja. Tidak ada konsep "nilai di dalam nilai" seperti di JSON. Satu baris CSV untuk data pelanggan di atas akan terlihat begini:

```
nama,email,alamat_kota,alamat_kodepos,hobi
Budi Santoso,budi@contoh.com,Surabaya,60111,"membaca; bersepeda"
```

Dua hal terjadi di sini. Pertama, `alamat.kota` dan `alamat.kodepos` yang tadinya bersarang di dalam `alamat`, sekarang jadi dua kolom terpisah dengan nama digabung (`alamat_kota`, `alamat_kodepos`). Proses ini disebut **flattening** atau perataan struktur.

Kedua, `hobi` yang tadinya daftar (array) berisi dua nilai, sekarang digabung jadi satu teks dengan pemisah titik koma. CSV tidak punya cara menyimpan "banyak nilai dalam satu sel" selain menggabungkannya jadi teks seperti ini.

## Kapan Anda Perlu Konversi Ini

**Data dari API perlu dianalisis di Excel.** Developer bisa membaca JSON dengan mudah lewat kode, tapi tim non-teknis (sales, marketing, finance) biasanya kerja dengan spreadsheet. Konversi ke CSV menjembatani dua kebutuhan ini.

**Export dari aplikasi berbasis JSON ke sistem lain.** Beberapa aplikasi (terutama yang berbasis web modern) cuma menyediakan export dalam format JSON, sementara sistem tujuan Anda cuma menerima CSV.

**Data konfigurasi atau log perlu dibaca cepat.** File log atau konfigurasi berformat JSON kadang lebih mudah dipindai sebagai tabel daripada dibaca baris per baris dalam bentuk aslinya.

## Cara Mengubah JSON ke CSV

[JSON to CSV](/office-tools/data/json-to-csv) menangani proses flattening di atas secara otomatis, Anda tidak perlu memikirkan struktur bersarangnya sendiri:

1. **Upload atau tempel data JSON Anda.**
2. **Tool meratakan strukturnya otomatis.** Objek bersarang dipecah jadi kolom terpisah dengan nama gabungan, array digabung jadi teks dalam satu sel.
3. **Cek hasilnya sebagai tabel.** Pratinjau muncul sebelum Anda download, jadi bisa dicek dulu apakah kolom-kolomnya sudah sesuai ekspektasi.
4. **Download sebagai file CSV.** Siap dibuka di Excel atau diimport ke sistem lain.

## Batasan yang Perlu Diketahui

**Data yang sangat bersarang jadi nama kolom panjang.** Kalau struktur JSON Anda bersarang beberapa tingkat (objek di dalam objek di dalam objek), nama kolom hasil flattening bisa jadi panjang, seperti `data_pelanggan_alamat_kota`. Ini normal, konsekuensi dari meratakan struktur yang memang kompleks.

**Array dengan banyak objek di dalamnya butuh perlakuan khusus.** Kalau satu field berisi daftar objek (bukan daftar teks sederhana), misalnya daftar riwayat pesanan per pelanggan, hasil perataannya bisa kurang rapi dibanding array berisi teks biasa. Untuk kasus ini, kadang lebih baik memisahkan data itu jadi file CSV tersendiri, satu baris per item dalam array.

## Soal Privasi

Data JSON yang Anda konversi tidak pernah terkirim ke server mana pun. Seluruh proses flattening dan konversi berjalan di browser Anda sendiri.
