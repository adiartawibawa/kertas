<script setup lang="ts">
const text = ref('')
const { options, cleanedCsv, rowsRemoved } = useCsvCleaner(text)

async function onFiles(files: File[]) {
  const file = files[0]
  if (!file) return
  text.value = await file.text()
}

function copyResult() {
  if (import.meta.client && navigator.clipboard && cleanedCsv.value) {
    navigator.clipboard.writeText(cleanedCsv.value).catch(() => {})
  }
}

function downloadResult() {
  if (cleanedCsv.value) downloadTextFile('cleaned.csv', cleanedCsv.value, 'text/csv')
}

function clearAll() {
  text.value = ''
}

const faqItems = [
  {
    question: 'Apa saja yang bisa dibersihkan dari CSV saya?',
    answer:
      'Trim spasi tiap sel, hapus baris yang seluruh selnya kosong, hapus baris duplikat, dan hapus kolom yang seluruh isinya kosong. Semua opsi bisa dikombinasikan.',
  },
  {
    question: 'Bagaimana cara kerja deteksi baris duplikat?',
    answer: 'Baris dianggap duplikat kalau seluruh sel di baris tersebut sama persis dengan baris lain yang sudah muncul sebelumnya.',
  },
  {
    question: 'Apakah header ikut dihapus kalau kosong?',
    answer: 'Header tetap dipertahankan sebagai baris pertama, opsi pembersihan hanya berlaku untuk baris data di bawahnya.',
  },
  {
    question: 'Apakah file saya diunggah ke server?',
    answer: 'Tidak. Semua proses berjalan langsung di browser Anda.',
  },
]

const relatedTools = [
  { name: 'CSV Viewer', href: '/office-tools/spreadsheet/csv-viewer' },
  { name: 'CSV Splitter', href: '/office-tools/spreadsheet/csv-splitter' },
  { name: 'CSV Merger', href: '/office-tools/spreadsheet/csv-merger' },
  { name: 'CSV → XLSX', href: '/office-tools/spreadsheet/csv-to-xlsx' },
]

useSeoMeta({
  title: 'CSV Cleaner Online — Bersihkan Data CSV Gratis',
  description: 'Hapus baris kosong, duplikat, dan kolom kosong dari file CSV secara instan. Tanpa upload ke server.',
})

useHead({
  script: [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'SoftwareApplication',
        name: 'CSV Cleaner',
        applicationCategory: 'UtilitiesApplication',
        operatingSystem: 'Any (Web Browser)',
        offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
        description: 'Membersihkan data CSV dari baris kosong, duplikat, dan kolom kosong.',
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
      CSV Cleaner
    </p>

    <h1 class="mt-3 max-w-[24ch] text-3xl font-semibold leading-tight text-ink sm:text-4xl">
      CSV Cleaner — bersihkan data CSV yang berantakan
    </h1>
    <p class="mt-2 max-w-[52ch] text-base text-ink-soft">
      Upload CSV Anda, hapus baris kosong, duplikat, dan kolom kosong sekaligus.
    </p>

    <div class="mt-7">
      <FileDropzone accept=".csv,text/csv" label="Tarik & lepas file CSV di sini" @files="onFiles" />
    </div>

    <div class="mt-5 flex flex-wrap gap-x-6 gap-y-3 rounded-md border border-slate-200 bg-white p-4">
      <OptionToggle v-model="options.trimCells" label="Trim spasi tiap sel" />
      <OptionToggle v-model="options.removeEmptyRows" label="Hapus baris kosong" />
      <OptionToggle v-model="options.removeDuplicateRows" label="Hapus baris duplikat" />
      <OptionToggle v-model="options.removeEmptyColumns" label="Hapus kolom kosong" />
    </div>

    <div v-if="cleanedCsv" class="mt-5">
      <p class="mb-1.5 text-xs font-medium uppercase tracking-wide text-ink-soft">Hasil bersih</p>
      <textarea
        :value="cleanedCsv"
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
        Clear
      </button>
      <span v-if="rowsRemoved > 0" class="text-sm text-ink-soft">{{ rowsRemoved }} baris dihapus</span>
    </div>

    <p class="mt-3.5 text-sm text-ink-soft">
      <span class="mr-1.5 inline-block h-1.5 w-1.5 rounded-full bg-accent align-middle" />
      File Anda tidak pernah meninggalkan browser ini.
    </p>

    <section class="mt-14">
      <h2 class="text-xl font-semibold text-ink">Kenapa menggunakan CSV Cleaner ini?</h2>
      <ul class="mt-4 grid gap-3.5">
        <li class="border-l-2 border-accent pl-4 text-sm text-ink-soft">
          <strong class="font-semibold text-ink">4 opsi pembersihan.</strong>
          Kombinasikan sesuai kebutuhan, tidak dipaksa satu mode.
        </li>
        <li class="border-l-2 border-accent pl-4 text-sm text-ink-soft">
          <strong class="font-semibold text-ink">Hasil instan.</strong>
          Setiap opsi yang diaktifkan langsung terlihat efeknya.
        </li>
        <li class="border-l-2 border-accent pl-4 text-sm text-ink-soft">
          <strong class="font-semibold text-ink">Privasi terjaga.</strong>
          File diproses langsung di browser Anda.
        </li>
      </ul>
    </section>

    <section class="mt-14">
      <h2 class="text-xl font-semibold text-ink">Cara membersihkan file CSV</h2>
      <ol class="mt-4 grid list-decimal gap-2.5 pl-5 marker:font-mono marker:text-accent-dark">
        <li class="text-sm text-ink-soft">Upload file CSV Anda.</li>
        <li class="text-sm text-ink-soft">Centang opsi pembersihan yang dibutuhkan.</li>
        <li class="text-sm text-ink-soft">Klik Copy atau Download untuk menyimpan hasilnya.</li>
      </ol>
    </section>

    <section class="mt-14">
      <h2 class="text-xl font-semibold text-ink">Kapan Anda membutuhkan tool ini?</h2>
      <div class="mt-4 grid gap-3.5">
        <p class="max-w-[62ch] text-sm text-ink-soft">
          Berguna saat menerima data ekspor dari sistem yang sering menyisakan baris kosong atau duplikat akibat
          proses gabungan data dari beberapa sumber.
        </p>
        <p class="max-w-[62ch] text-sm text-ink-soft">
          Sebelum data di-import ke database atau spreadsheet lain, membersihkannya terlebih dahulu membantu
          menghindari error atau data yang tidak konsisten.
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
