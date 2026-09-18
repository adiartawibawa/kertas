<script setup lang="ts">
const { fileName, csvResult, isConverting, error, handleFile, clear, rowCount } = useXlsxToCsv()

function onFiles(files: File[]) {
  const file = files[0]
  if (file) handleFile(file)
}

function copyResult() {
  if (import.meta.client && navigator.clipboard && csvResult.value) {
    navigator.clipboard.writeText(csvResult.value).catch(() => {})
  }
}

function downloadResult() {
  if (csvResult.value) downloadTextFile('data.csv', csvResult.value, 'text/csv')
}

const faqItems = [
  {
    question: 'Sheet mana yang dikonversi kalau file Excel saya punya beberapa sheet?',
    answer: 'Saat ini hanya sheet pertama (paling kiri) yang dikonversi ke CSV.',
  },
  {
    question: 'Apakah format sel seperti warna atau rumus ikut terbawa?',
    answer: 'Tidak. CSV hanya menyimpan nilai teks/angka polos — rumus akan dikonversi jadi hasil hitungnya, format visual seperti warna dan border tidak ikut.',
  },
  {
    question: 'Apakah file .xls (format lama) juga didukung, bukan hanya .xlsx?',
    answer: 'Ya, format .xls lama maupun .xlsx modern keduanya didukung.',
  },
  {
    question: 'Apakah file saya diunggah ke server?',
    answer: 'Tidak. File dibaca dan dikonversi langsung di browser Anda.',
  },
]

const relatedTools = [
  { name: 'CSV → XLSX', href: '/office-tools/spreadsheet/csv-to-xlsx' },
  { name: 'CSV Viewer', href: '/office-tools/spreadsheet/csv-viewer' },
  { name: 'CSV Cleaner', href: '/office-tools/spreadsheet/csv-cleaner' },
  { name: 'CSV Merger', href: '/office-tools/spreadsheet/csv-merger' },
]

useSeoMeta({
  title: 'XLSX to CSV Converter Online — Gratis, Tanpa Upload',
  description: 'Konversi file Excel (.xlsx/.xls) ke format CSV secara instan di browser Anda. Gratis, tanpa upload ke server.',
})

useHead({
  script: [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'SoftwareApplication',
        name: 'XLSX to CSV Converter',
        applicationCategory: 'UtilitiesApplication',
        operatingSystem: 'Any (Web Browser)',
        offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
        description: 'Mengonversi file Excel (.xlsx/.xls) ke format CSV.',
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
      XLSX → CSV
    </p>

    <h1 class="mt-3 max-w-[24ch] text-3xl font-semibold leading-tight text-ink sm:text-4xl">
      XLSX to CSV — konversi file Excel ke CSV
    </h1>
    <p class="mt-2 max-w-[52ch] text-base text-ink-soft">
      Upload file Excel Anda, hasil CSV dari sheet pertama muncul otomatis.
    </p>

    <div class="mt-7">
      <FileDropzone accept=".xlsx,.xls" label="Tarik & lepas file Excel di sini" @files="onFiles" />
    </div>

    <p v-if="fileName" class="mt-3 text-sm text-ink-soft">File: <span class="font-medium text-ink">{{ fileName }}</span></p>

    <p v-if="error" class="mt-3 rounded-md border border-red-200 bg-red-50 px-4 py-2.5 text-sm text-red-700">
      {{ error }}
    </p>

    <div v-if="csvResult" class="mt-5">
      <p class="mb-1.5 text-xs font-medium uppercase tracking-wide text-ink-soft">Hasil CSV</p>
      <textarea
        :value="csvResult"
        readonly
        rows="10"
        class="w-full resize-y rounded-md border border-slate-200 bg-slate-50 p-4 font-mono text-xs text-ink focus:outline-none"
      />
    </div>

    <div class="mt-4 flex flex-wrap items-center gap-3">
      <button
        class="rounded-md bg-accent px-4 py-2.5 text-sm font-medium text-white hover:brightness-95"
        @click="copyResult"
      >
        Copy CSV
      </button>
      <button
        class="rounded-md border border-slate-300 bg-white px-4 py-2.5 text-sm font-medium text-ink hover:bg-slate-50"
        @click="downloadResult"
      >
        Download .csv
      </button>
      <button
        class="rounded-md border border-slate-300 bg-white px-4 py-2.5 text-sm font-medium text-ink hover:bg-slate-50"
        @click="clear"
      >
        Clear
      </button>
      <span v-if="rowCount > 0" class="text-sm text-ink-soft">{{ rowCount }} baris</span>
      <span v-if="isConverting" class="text-sm text-ink-soft">Mengonversi…</span>
    </div>

    <p class="mt-3.5 text-sm text-ink-soft">
      <span class="mr-1.5 inline-block h-1.5 w-1.5 rounded-full bg-accent align-middle" />
      File Anda tidak pernah meninggalkan browser ini.
    </p>

    <section class="mt-14">
      <h2 class="text-xl font-semibold text-ink">Kenapa menggunakan XLSX to CSV ini?</h2>
      <ul class="mt-4 grid gap-3.5">
        <li class="border-l-2 border-accent pl-4 text-sm text-ink-soft">
          <strong class="font-semibold text-ink">Mendukung .xls dan .xlsx.</strong>
          Baik format Excel lama maupun modern.
        </li>
        <li class="border-l-2 border-accent pl-4 text-sm text-ink-soft">
          <strong class="font-semibold text-ink">Hasil instan.</strong>
          Tidak perlu install Excel untuk sekadar mengubah format.
        </li>
        <li class="border-l-2 border-accent pl-4 text-sm text-ink-soft">
          <strong class="font-semibold text-ink">Privasi terjaga.</strong>
          File dibaca dan dikonversi langsung di browser Anda.
        </li>
      </ul>
    </section>

    <section class="mt-14">
      <h2 class="text-xl font-semibold text-ink">Cara mengonversi Excel ke CSV</h2>
      <ol class="mt-4 grid list-decimal gap-2.5 pl-5 marker:font-mono marker:text-accent-dark">
        <li class="text-sm text-ink-soft">Upload file .xlsx atau .xls Anda.</li>
        <li class="text-sm text-ink-soft">Hasil CSV dari sheet pertama muncul otomatis.</li>
        <li class="text-sm text-ink-soft">Klik Copy atau Download untuk menyimpan hasilnya.</li>
      </ol>
    </section>

    <section class="mt-14">
      <h2 class="text-xl font-semibold text-ink">Kapan Anda membutuhkan tool ini?</h2>
      <div class="mt-4 grid gap-3.5">
        <p class="max-w-[62ch] text-sm text-ink-soft">
          Berguna saat menerima laporan dalam format Excel tapi sistem tujuan (misal tool import data atau script)
          hanya menerima CSV.
        </p>
        <p class="max-w-[62ch] text-sm text-ink-soft">
          Developer juga sering memakainya untuk mengubah data Excel jadi CSV yang lebih mudah diproses oleh kode
          atau di-commit ke version control.
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
