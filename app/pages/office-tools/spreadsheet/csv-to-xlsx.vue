<script setup lang="ts">
const text = ref('')
const { previewRows, isConverting, error, downloadXlsx } = useCsvToXlsx(text)

async function onFiles(files: File[]) {
  const file = files[0]
  if (!file) return
  text.value = await file.text()
}

function clearAll() {
  text.value = ''
}

const faqItems = [
  {
    question: 'Apakah hasil XLSX bisa dibuka di Excel dan Google Sheets?',
    answer: 'Ya, file .xlsx yang dihasilkan adalah format standar Excel modern dan bisa dibuka di Excel, Google Sheets, maupun LibreOffice Calc.',
  },
  {
    question: 'Apakah tipe data seperti angka dan tanggal otomatis dikenali?',
    answer: 'Nilai dimasukkan sebagai teks apa adanya dari CSV. Excel biasanya tetap otomatis mendeteksi angka, tapi format tanggal khusus mungkin perlu diformat ulang secara manual di Excel.',
  },
  {
    question: 'Apakah ada batas ukuran file yang bisa dikonversi?',
    answer: 'Tidak ada batas resmi, tapi file yang sangat besar (ratusan ribu baris) bisa memperlambat proses karena semua diproses di browser Anda.',
  },
  {
    question: 'Apakah data saya diunggah ke server?',
    answer: 'Tidak. Konversi berjalan sepenuhnya di browser Anda menggunakan library yang dimuat saat dibutuhkan saja.',
  },
]

const relatedTools = [
  { name: 'XLSX → CSV', href: '/office-tools/spreadsheet/xlsx-to-csv' },
  { name: 'CSV Viewer', href: '/office-tools/spreadsheet/csv-viewer' },
  { name: 'CSV Cleaner', href: '/office-tools/spreadsheet/csv-cleaner' },
  { name: 'CSV Merger', href: '/office-tools/spreadsheet/csv-merger' },
]

useSeoMeta({
  title: 'CSV to XLSX Converter Online — Gratis, Tanpa Upload',
  description: 'Konversi file CSV ke format Excel (.xlsx) secara instan di browser Anda. Gratis, tanpa upload ke server.',
})

useHead({
  script: [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'SoftwareApplication',
        name: 'CSV to XLSX Converter',
        applicationCategory: 'UtilitiesApplication',
        operatingSystem: 'Any (Web Browser)',
        offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
        description: 'Mengonversi file CSV ke format Excel (.xlsx).',
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
      CSV → XLSX
    </p>

    <h1 class="mt-3 max-w-[24ch] text-3xl font-semibold leading-tight text-ink sm:text-4xl">
      CSV to XLSX — konversi CSV ke file Excel
    </h1>
    <p class="mt-2 max-w-[52ch] text-base text-ink-soft">
      Upload CSV Anda, unduh langsung sebagai file .xlsx siap dibuka di Excel.
    </p>

    <div class="mt-7">
      <FileDropzone accept=".csv,text/csv" label="Tarik & lepas file CSV di sini" @files="onFiles" />
    </div>

    <div v-if="previewRows.length > 0" class="mt-5 max-h-72 overflow-auto rounded-md border border-slate-200 bg-white">
      <table class="w-full text-left text-sm">
        <tbody>
          <tr v-for="(row, ri) in previewRows.slice(0, 8)" :key="ri" class="border-b border-slate-100 last:border-b-0">
            <td v-for="(cell, ci) in row" :key="ci" class="px-3 py-2 text-ink">{{ cell }}</td>
          </tr>
        </tbody>
      </table>
    </div>

    <p v-if="error" class="mt-3 rounded-md border border-red-200 bg-red-50 px-4 py-2.5 text-sm text-red-700">
      {{ error }}
    </p>

    <div class="mt-4 flex flex-wrap items-center gap-3">
      <button
        class="rounded-md bg-accent px-4 py-2.5 text-sm font-medium text-white hover:brightness-95 disabled:opacity-50"
        :disabled="previewRows.length === 0 || isConverting"
        @click="downloadXlsx()"
      >
        {{ isConverting ? 'Mengonversi…' : 'Download .xlsx' }}
      </button>
      <button
        class="rounded-md border border-slate-300 bg-white px-4 py-2.5 text-sm font-medium text-ink hover:bg-slate-50"
        @click="clearAll"
      >
        Clear
      </button>
      <span v-if="previewRows.length > 0" class="text-sm text-ink-soft">{{ Math.max(0, previewRows.length - 1) }} baris data</span>
    </div>

    <p class="mt-3.5 text-sm text-ink-soft">
      <span class="mr-1.5 inline-block h-1.5 w-1.5 rounded-full bg-accent align-middle" />
      File Anda tidak pernah meninggalkan browser ini.
    </p>

    <section class="mt-14">
      <h2 class="text-xl font-semibold text-ink">Kenapa menggunakan CSV to XLSX ini?</h2>
      <ul class="mt-4 grid gap-3.5">
        <li class="border-l-2 border-accent pl-4 text-sm text-ink-soft">
          <strong class="font-semibold text-ink">Hasil file Excel asli.</strong>
          Bukan CSV yang di-rename, tapi file .xlsx sungguhan yang bisa langsung diformat di Excel.
        </li>
        <li class="border-l-2 border-accent pl-4 text-sm text-ink-soft">
          <strong class="font-semibold text-ink">Preview sebelum download.</strong>
          Lihat dulu beberapa baris data sebelum benar-benar mengonversi.
        </li>
        <li class="border-l-2 border-accent pl-4 text-sm text-ink-soft">
          <strong class="font-semibold text-ink">Privasi terjaga.</strong>
          File diproses langsung di browser Anda.
        </li>
      </ul>
    </section>

    <section class="mt-14">
      <h2 class="text-xl font-semibold text-ink">Cara mengonversi CSV ke Excel</h2>
      <ol class="mt-4 grid list-decimal gap-2.5 pl-5 marker:font-mono marker:text-accent-dark">
        <li class="text-sm text-ink-soft">Upload file CSV Anda.</li>
        <li class="text-sm text-ink-soft">Periksa preview data yang muncul.</li>
        <li class="text-sm text-ink-soft">Klik "Download .xlsx" untuk mengunduh hasilnya.</li>
      </ol>
    </section>

    <section class="mt-14">
      <h2 class="text-xl font-semibold text-ink">Kapan Anda membutuhkan tool ini?</h2>
      <div class="mt-4 grid gap-3.5">
        <p class="max-w-[62ch] text-sm text-ink-soft">
          Berguna saat data yang Anda punya dalam format CSV, tapi rekan kerja atau klien meminta file Excel yang
          bisa langsung diformat, diberi warna, atau ditambahkan rumus.
        </p>
        <p class="max-w-[62ch] text-sm text-ink-soft">
          Sering dipakai juga saat mengunggah data ke sistem yang hanya menerima format .xlsx, bukan CSV.
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
