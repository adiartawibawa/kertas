<script setup lang="ts">
const { files, addFiles, removeFile, mergedCsv, totalRows, error } = useCsvMerger()

function onFiles(fileList: File[]) {
  addFiles(fileList)
}

function copyResult() {
  if (import.meta.client && navigator.clipboard && mergedCsv.value) {
    navigator.clipboard.writeText(mergedCsv.value).catch(() => {})
  }
}

function downloadResult() {
  if (mergedCsv.value) downloadTextFile('merged.csv', mergedCsv.value, 'text/csv')
}

function clearAll() {
  files.value = []
}

const faqItems = [
  {
    question: 'Apakah semua file harus punya kolom yang sama persis?',
    answer:
      'Tidak wajib. Semua nama kolom dari seluruh file akan digabung jadi header gabungan. Kalau suatu file tidak punya kolom tertentu, selnya akan dikosongkan.',
  },
  {
    question: 'Berapa banyak file yang bisa digabung sekaligus?',
    answer: 'Tidak ada batas resmi — tambahkan file sebanyak yang dibutuhkan, tool ini akan menggabungnya jadi satu file CSV.',
  },
  {
    question: 'Apakah urutan baris dipertahankan sesuai urutan file diupload?',
    answer: 'Ya, baris dari file pertama akan muncul lebih dulu, diikuti file kedua, dan seterusnya.',
  },
  {
    question: 'Apakah file saya diunggah ke server?',
    answer: 'Tidak. Semua proses penggabungan berjalan langsung di browser Anda.',
  },
]

const relatedTools = [
  { name: 'CSV Viewer', href: '/office-tools/spreadsheet/csv-viewer' },
  { name: 'CSV Cleaner', href: '/office-tools/spreadsheet/csv-cleaner' },
  { name: 'CSV Splitter', href: '/office-tools/spreadsheet/csv-splitter' },
  { name: 'CSV → XLSX', href: '/office-tools/spreadsheet/csv-to-xlsx' },
]

useSeoMeta({
  title: 'CSV Merger Online — Gabungkan Beberapa File CSV Gratis',
  description: 'Gabungkan beberapa file CSV jadi satu file secara instan, kolom berbeda otomatis disesuaikan. Tanpa upload ke server.',
})

useHead({
  script: [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'SoftwareApplication',
        name: 'CSV Merger',
        applicationCategory: 'UtilitiesApplication',
        operatingSystem: 'Any (Web Browser)',
        offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
        description: 'Menggabungkan beberapa file CSV jadi satu file CSV.',
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
      CSV Merger
    </p>

    <h1 class="mt-3 max-w-[24ch] text-3xl font-semibold leading-tight text-ink sm:text-4xl">
      CSV Merger — gabungkan beberapa file CSV jadi satu
    </h1>
    <p class="mt-2 max-w-[52ch] text-base text-ink-soft">
      Upload beberapa file CSV sekaligus, hasil gabungan siap diunduh sebagai satu file.
    </p>

    <div class="mt-7">
      <FileDropzone accept=".csv,text/csv" :multiple="true" label="Tarik & lepas beberapa file CSV di sini" @files="onFiles" />
    </div>

    <p v-if="error" class="mt-3 rounded-md border border-red-200 bg-red-50 px-4 py-2.5 text-sm text-red-700">
      {{ error }}
    </p>

    <div v-if="files.length > 0" class="mt-5 overflow-hidden rounded-md border border-slate-200 bg-white">
      <div
        v-for="file in files"
        :key="file.name"
        class="flex items-center justify-between border-b border-slate-100 px-4 py-3 last:border-b-0"
      >
        <div>
          <p class="text-sm font-medium text-ink">{{ file.name }}</p>
          <p class="text-xs text-ink-soft">{{ Math.max(0, file.rows.length - 1) }} baris</p>
        </div>
        <button class="text-ink-soft hover:text-red-600" aria-label="Hapus file" @click="removeFile(file.name)">✕</button>
      </div>
    </div>

    <div v-if="mergedCsv" class="mt-5">
      <p class="mb-1.5 text-xs font-medium uppercase tracking-wide text-ink-soft">Hasil gabungan</p>
      <textarea
        :value="mergedCsv"
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
        Copy hasil
      </button>
      <button
        class="rounded-md border border-slate-300 bg-white px-4 py-2.5 text-sm font-medium text-ink hover:bg-slate-50"
        @click="downloadResult"
      >
        Download .csv
      </button>
      <button
        class="rounded-md border border-slate-300 bg-white px-4 py-2.5 text-sm font-medium text-ink hover:bg-slate-50"
        @click="clearAll"
      >
        Clear semua
      </button>
      <span v-if="totalRows > 0" class="text-sm text-ink-soft">{{ totalRows }} total baris</span>
    </div>

    <p class="mt-3.5 text-sm text-ink-soft">
      <span class="mr-1.5 inline-block h-1.5 w-1.5 rounded-full bg-accent align-middle" />
      File Anda tidak pernah meninggalkan browser ini.
    </p>

    <section class="mt-14">
      <h2 class="text-xl font-semibold text-ink">Kenapa menggunakan CSV Merger ini?</h2>
      <ul class="mt-4 grid gap-3.5">
        <li class="border-l-2 border-accent pl-4 text-sm text-ink-soft">
          <strong class="font-semibold text-ink">Kolom berbeda otomatis disesuaikan.</strong>
          Tidak perlu menyamakan struktur kolom secara manual dulu.
        </li>
        <li class="border-l-2 border-accent pl-4 text-sm text-ink-soft">
          <strong class="font-semibold text-ink">Upload banyak file sekaligus.</strong>
          Drag & drop beberapa file dalam satu langkah.
        </li>
        <li class="border-l-2 border-accent pl-4 text-sm text-ink-soft">
          <strong class="font-semibold text-ink">Privasi terjaga.</strong>
          Semua file diproses langsung di browser Anda.
        </li>
      </ul>
    </section>

    <section class="mt-14">
      <h2 class="text-xl font-semibold text-ink">Cara menggabungkan file CSV</h2>
      <ol class="mt-4 grid list-decimal gap-2.5 pl-5 marker:font-mono marker:text-accent-dark">
        <li class="text-sm text-ink-soft">Upload beberapa file CSV yang ingin digabung.</li>
        <li class="text-sm text-ink-soft">Hasil gabungan muncul otomatis di bawah.</li>
        <li class="text-sm text-ink-soft">Klik Copy atau Download untuk menyimpan hasilnya.</li>
      </ol>
    </section>

    <section class="mt-14">
      <h2 class="text-xl font-semibold text-ink">Kapan Anda membutuhkan tool ini?</h2>
      <div class="mt-4 grid gap-3.5">
        <p class="max-w-[62ch] text-sm text-ink-soft">
          Berguna saat menerima laporan bulanan terpisah dari beberapa cabang atau tim yang perlu digabung jadi
          satu laporan tahunan untuk dianalisis bersama.
        </p>
        <p class="max-w-[62ch] text-sm text-ink-soft">
          Juga membantu saat mengumpulkan hasil form/survey yang diekspor terpisah per periode waktu jadi satu
          dataset utuh.
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
