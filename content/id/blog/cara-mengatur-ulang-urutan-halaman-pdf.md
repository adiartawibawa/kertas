---
title: Cara Mengatur Ulang Urutan Halaman PDF
description: Cara mengatur ulang urutan halaman PDF lewat Preview di Mac, Acrobat, kode, atau browser tanpa unggahan dengan PDF Split dan PDF Merge.
publishedAt: "2026-10-30"
translationKey: reorder-pdf-pages
relatedToolPath: /office-tools/pdf/pdf-merge
coverImage: /img/blog/reorder-pdf-pages.jpg
---

Anda memindai kontrak, dan halaman lima ternyata harus berada di depan. Atau Anda menyatukan beberapa dokumen, lalu urutan halamannya berantakan. Anda bisa mengatur ulang urutan halaman PDF tanpa membeli editor PDF berbayar, dan salah satu caranya berjalan di browser tanpa unggahan.

## Atur Ulang Halaman PDF dengan PDF Split dan PDF Merge

Saat ini Kertaas tidak punya alat yang menggeser halaman satu per satu. Tapi [PDF Split](/office-tools/pdf/pdf-split) dan [PDF Merge](/office-tools/pdf/pdf-merge) bisa menggantikannya. Pecah dokumen jadi beberapa bagian, lalu susun bagian-bagian itu dengan urutan baru.

Contoh: PDF sepuluh halaman, dan halaman 5 harus pindah ke paling depan.

1. Buka [PDF Split](/office-tools/pdf/pdf-split) dan pilih file PDF Anda.
2. Pilih **Custom ranges**, lalu tulis satu baris untuk setiap bagian:

```
5
1-4
6-10
```

3. Klik **Split PDF**, lalu unduh tiap bagian. **Download all** mengunduh semuanya berurutan.
4. Buka [PDF Merge](/office-tools/pdf/pdf-merge) dan pilih ketiga file hasil pecahan.
5. Atur urutan dengan tombol panah naik dan turun di tiap file: halaman 5 di posisi pertama, halaman 1 sampai 4 kedua, halaman 6 sampai 10 ketiga.
6. Klik **Download merged file**.

Nama file hasil pecahan bisa berbeda dari perkiraan Anda. Buka tiap file untuk memastikan isinya sebelum mengatur urutan di PDF Merge.

Kelompokkan halaman yang tidak berpindah ke satu baris, seperti `1-4` di contoh. Dengan begitu Anda mengurus tiga file, bukan sepuluh. Pilih **Each page separate** hanya kalau hampir semua halaman berganti tempat.

PDF Split menyalin halaman apa adanya tanpa kompresi ulang. PDF Merge tidak menambahkan watermark. Browser memproses kedua file di perangkat Anda, jadi dokumen tidak terkirim ke server.

### Kenapa Extract Pages Tidak Cocok

[Extract Pages](/office-tools/pdf/pdf-extract-pages) mengambil halaman tertentu menjadi satu file baru. Hasilnya selalu mengikuti urutan dokumen asli, apa pun urutan angka yang Anda tulis. Karena itu alat ini tidak bisa menukar posisi halaman.

## Atur Ulang Halaman dengan Preview di Mac

Preview sudah terpasang di setiap Mac dan mengatur ulang halaman lewat seret dan lepas.

1. Duplikat file lebih dulu supaya aslinya aman.
2. Buka salinan di Preview.
3. Pilih **View**, lalu **Thumbnails**.
4. Seret gambar kecil halaman ke posisi baru di panel samping.
5. Pilih **File**, lalu **Save**.

## Atur Ulang Halaman dengan Adobe Acrobat Pro

Acrobat Pro berbayar. Buka PDF, pilih alat **Organize Pages**, lalu seret gambar kecil halaman ke posisi baru. Simpan file setelah urutannya benar.

## Ubah di Dokumen Sumber

Kalau PDF Anda berasal dari Word atau Google Docs, ubah urutannya di dokumen sumber, lalu ekspor ulang sebagai PDF. Cara ini menjaga teks tetap bisa diedit dan nomor halaman otomatis ikut berubah.

## Atur Ulang Halaman Lewat Kode

Untuk pengguna terminal, `qpdf` menyusun halaman dengan urutan yang Anda tulis. Perintah ini memindahkan halaman 5 ke depan:

```
qpdf --empty --pages input.pdf 5,1-4,6-10 -- output.pdf
```

Di Python, library pypdf menambahkan halaman satu per satu. Nomor indeks dimulai dari 0, jadi halaman 5 berindeks 4:

```python
from pypdf import PdfReader, PdfWriter

reader = PdfReader("input.pdf")
writer = PdfWriter()

for i in [4, 0, 1, 2, 3, 5, 6, 7, 8, 9]:
    writer.add_page(reader.pages[i])

writer.write("output.pdf")
```

## Pilih Cara yang Paling Cocok

| Cara                    | Cocok untuk                          | Catatan                    |
| ----------------------- | ------------------------------------ | -------------------------- |
| PDF Split dan PDF Merge | Tanpa unggahan, semua sistem operasi | Perlu dua tahap            |
| Preview di Mac          | Pengguna Mac, seret dan lepas        | Hanya untuk Mac            |
| Acrobat Pro             | Pengguna Acrobat, banyak penyesuaian | Berbayar                   |
| Dokumen sumber          | PDF dari Word atau Docs              | Perlu file sumber          |
| `qpdf` atau pypdf       | Proses berulang dan banyak file      | Perlu terminal atau Python |

## Periksa Hasil Setelah Mengatur Ulang

1. **Urutan.** Buka PDF hasilnya dan telusuri halaman satu per satu.
2. **Jumlah halaman.** Pastikan jumlahnya sama dengan file asli.
3. **Nomor halaman tercetak.** Angka yang tertulis di dalam halaman, misalnya "Halaman 5" di bagian bawah, tidak berubah mengikuti urutan baru.
4. **Bookmark dan tautan internal.** Periksa daftar isi yang bisa diklik. Memecah dan menggabungkan file bisa membuat elemen itu tidak terbawa.
5. **File asli.** Simpan file asli di tempat terpisah.

## Setelah Urutan Benar

- File terlalu besar untuk dikirim: kecilkan dengan [PDF Compress](/office-tools/pdf/pdf-compress).
- Ada halaman yang miring: putar dengan [PDF Rotate](/office-tools/pdf/pdf-rotate).

## Pertanyaan Umum

### Apakah ada alat di Kertaas untuk menggeser halaman PDF langsung?

Saat ini caranya lewat PDF Split dan PDF Merge. PDF Merge punya tombol panah untuk mengatur urutan file, dan PDF Split menyiapkan bagian-bagiannya.

### Bisakah saya memakai Extract Pages untuk mengubah urutan?

Tidak. Hasil Extract Pages mengikuti urutan dokumen asli, apa pun urutan angka yang Anda tulis.

### Bagaimana kalau saya perlu menghapus halaman, bukan memindahkannya?

Pakai [Extract Pages](/office-tools/pdf/pdf-extract-pages) dan tulis halaman yang ingin dipertahankan. Untuk membuang halaman 5 dari dokumen sepuluh halaman, tulis `1-4,6-10`.

### Apakah kualitas halaman turun setelah dipecah dan digabung?

PDF Split menyalin halaman apa adanya tanpa kompresi ulang, dan PDF Merge tidak menambahkan watermark.

### Apakah file saya terunggah ke server?

Tidak. PDF Split, PDF Merge, dan Extract Pages berjalan di browser Anda.
