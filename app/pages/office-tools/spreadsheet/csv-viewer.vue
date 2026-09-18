<script setup lang="ts">
const text = ref('')
const { search, header, filteredRows, rowCount, columnCount } = useCsvViewer(text)

async function onFiles(files: File[]) {
  const file = files[0]
  if (!file) return
  text.value = await file.text()
}

function clearAll() {
  text.value = ''
  search.value = ''
}

const faqItems = [
  {
    question: 'Berapa ukuran file maksimal yang bisa dibuka?',
    answer:
      'Tidak ada batas resmi karena semua diproses di browser Anda — batasnya bergantung pada kemampuan perangkat. Untuk file berukuran puluhan ribu baris masih akan lancar.',
  },
  {
    question: 'Apakah saya bisa mengedit data di tabel ini?',
    answer: 'Belum, tool ini fokus untuk melihat (viewing) dan mencari data saja, bukan mengedit.',
  },
  {
    question: 'Bagaimana cara mencari data tertentu?',
    answer: 'Gunakan kotak pencarian di atas tabel — tabel akan otomatis menampilkan hanya baris yang cocok di kolom manapun.',
  },
  {
    question: 'Apakah file saya diunggah ke server?',
    answer: 'Tidak. File dibaca langsung di browser Anda menggunakan File API, tidak pernah dikirim keluar.',
  },
]

const relatedTools = [
  { name: 'CSV Cleaner', href: '/office-tools/spreadsheet/csv-cleaner' },
  { name: 'CSV Splitter', href: '/office-tools/spreadsheet/csv-splitter' },
  { name: 'CSV Merger', href: '/office-tools/spreadsheet/csv-merger' },
  { name: 'CSV → XLSX', href: '/office-tools/spreadsheet/csv-to-xlsx' },
]

useSeoMeta({
  title: 'CSV Viewer Online — Buka & Cari Data CSV Gratis',
  description: 'Buka file CSV dan lihat isinya sebagai tabel, lengkap dengan pencarian instan. Tanpa upload ke server.',
})

useHead({
  script: [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'SoftwareApplication',
        name: 'CSV Viewer',
        applicationCategory: 'UtilitiesApplication',
        operatingSystem: 'Any (Web Browser)',
        offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
        description: 'Membuka dan menampilkan isi file CSV sebagai tabel dengan fitur pencarian.',
      }),
    },
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: faqItems.map((item) => ({
          '@type': 'Question',
          name: item.question,
          acceptedAnswer: { '@type': 'Answer', text: item.answer },
        })),
      }),
    },
  ],
})
</script>

<template>
  <div>
    <p class="pt-7 text-sm text-ink-soft">
      <NuxtLinkLocale to="/" class="hover:text-accent-dark">Home</NuxtLinkLocale> /
      <NuxtLinkLocale to="/office-tools" class="hover:text-accent-dark">Office Tools</NuxtLinkLocale> /
      <NuxtLinkLocale to="/office-tools/spreadsheet" class="hover:text-accent-dark">Spreadsheet</NuxtLinkLocale> /
      CSV Viewer
    </p>

    <h1 class="mt-3 max-w-[24ch] text-3xl font-semibold leading-tight text-ink sm:text-4xl">
      CSV Viewer — buka dan cari data CSV langsung di browser
    </h1>
    <p class="mt-2 max-w-[52ch] text-base text-ink-soft">
      Upload file CSV, lihat isinya sebagai tabel rapi, lengkap dengan pencarian instan.
    </p>

    <div class="mt-7">
      <FileDropzone accept=".csv,text/csv" label="Tarik & lepas file CSV di sini" @files="onFiles" />
    </div>

    <template v-if="header.length > 0">
      <div class="mt-5 flex flex-wrap items-center gap-3">
        <input
          v-model="search"
          type="text"
          placeholder="Cari data di semua kolom…"
          class="w-full max-w-xs rounded-md border border-slate-300 px-3.5 py-2 text-sm text-ink focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
        >
        <span class="text-sm text-ink-soft">{{ filteredRows.length }} / {{ rowCount }} baris · {{ columnCount }} kolom</span>
        <button
          class="ml-auto rounded-md border border-slate-300 bg-white px-3.5 py-2 text-sm font-medium text-ink hover:bg-slate-50"
          @click="clearAll"
        >
          Clear
        </button>
      </div>

      <div class="mt-3 max-h-[480px] overflow-auto rounded-md border border-slate-200 bg-white">
        <table class="w-full text-left text-sm">
          <thead class="sticky top-0 bg-slate-50">
            <tr>
              <th v-for="(col, i) in header" :key="i" class="border-b border-slate-200 px-3 py-2 font-medium text-ink-soft">
                {{ col }}
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(row, ri) in filteredRows" :key="ri" class="border-b border-slate-100 last:border-b-0">
              <td v-for="(cell, ci) in row" :key="ci" class="px-3 py-2 text-ink">{{ cell }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </template>

    <p class="mt-3.5 text-sm text-ink-soft">
      <span class="mr-1.5 inline-block h-1.5 w-1.5 rounded-full bg-accent align-middle" />
      File Anda tidak pernah meninggalkan browser ini.
    </p>

    <section class="mt-14">
      <h2 class="text-xl font-semibold text-ink">Kenapa menggunakan CSV Viewer ini?</h2>
      <ul class="mt-4 grid gap-3.5">
        <li class="border-l-2 border-accent pl-4 text-sm text-ink-soft">
          <strong class="font-semibold text-ink">Tampilan tabel rapi.</strong>
          Tidak perlu buka Excel hanya untuk mengecek isi CSV.
        </li>
        <li class="border-l-2 border-accent pl-4 text-sm text-ink-soft">
          <strong class="font-semibold text-ink">Pencarian instan.</strong>
          Ketik kata kunci, baris yang cocok langsung tersaring.
        </li>
        <li class="border-l-2 border-accent pl-4 text-sm text-ink-soft">
          <strong class="font-semibold text-ink">Privasi terjaga.</strong>
          File dibaca langsung di browser, tidak ada yang diunggah.
        </li>
      </ul>
    </section>

    <section class="mt-14">
      <h2 class="text-xl font-semibold text-ink">Cara membuka file CSV</h2>
      <ol class="mt-4 grid list-decimal gap-2.5 pl-5 marker:font-mono marker:text-accent-dark">
        <li class="text-sm text-ink-soft">Tarik file CSV ke area upload, atau klik "Pilih file".</li>
        <li class="text-sm text-ink-soft">Data akan tampil sebagai tabel secara otomatis.</li>
        <li class="text-sm text-ink-soft">Gunakan kotak pencarian untuk menyaring baris tertentu.</li>
      </ol>
    </section>

    <section class="mt-14">
      <h2 class="text-xl font-semibold text-ink">Kapan Anda membutuhkan tool ini?</h2>
      <div class="mt-4 grid gap-3.5">
        <p class="max-w-[62ch] text-sm text-ink-soft">
          Berguna saat menerima file CSV dari klien atau sistem lain dan hanya perlu cek cepat isinya, tanpa perlu
          membuka aplikasi spreadsheet yang lebih berat seperti Excel atau Google Sheets.
        </p>
        <p class="max-w-[62ch] text-sm text-ink-soft">
          Developer juga sering memakainya untuk quick-check hasil export database dalam bentuk CSV sebelum
          diproses lebih lanjut.
        </p>
      </div>
    </section>

    <section class="mt-14 pb-4">
      <h2 class="text-xl font-semibold text-ink">Pertanyaan umum</h2>
      <div class="mt-2">
        <FaqAccordion :items="faqItems" />
      </div>
    </section>

    <section class="mt-14 pb-16">
      <h2 class="text-xl font-semibold text-ink">Tool lain yang mungkin Anda butuhkan</h2>
      <div class="mt-4">
        <RelatedTools :tools="relatedTools" />
      </div>
    </section>
  </div>
</template>
