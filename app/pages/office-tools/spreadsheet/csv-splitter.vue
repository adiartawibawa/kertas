<script setup lang="ts">
const text = ref('')
const { mode, rowsPerFile, fileCount, keepHeaderInEachFile, parts, totalRows } = useCsvSplitter(text)

async function onFiles(files: File[]) {
  const file = files[0]
  if (!file) return
  text.value = await file.text()
}

function downloadPart(name: string, csv: string) {
  downloadTextFile(name, csv, 'text/csv')
}

function downloadAll() {
  parts.value.forEach((part) => downloadTextFile(part.name, part.csv, 'text/csv'))
}

function clearAll() {
  text.value = ''
}

const faqItems = [
  {
    question: 'Apa bedanya mode "per jumlah baris" dan "per jumlah file"?',
    answer:
      'Mode "per jumlah baris" membagi file jadi beberapa bagian dengan jumlah baris tetap tiap bagian (misal 100 baris/file). Mode "per jumlah file" membagi rata data jadi sejumlah file yang Anda tentukan.',
  },
  {
    question: 'Apakah header CSV ikut disalin ke tiap file hasil split?',
    answer: 'Bisa diatur — aktifkan opsi "Sertakan header di tiap file" kalau tiap bagian hasil perlu tetap bisa dibaca sebagai CSV mandiri.',
  },
  {
    question: 'Apakah ada opsi download semua sekaligus sebagai ZIP?',
    answer: 'Saat ini setiap bagian di-download satu per satu (atau sekaligus lewat tombol "Download semua"), belum tersedia dalam bentuk ZIP.',
  },
  {
    question: 'Apakah file saya diunggah ke server?',
    answer: 'Tidak. Semua proses split berjalan langsung di browser Anda.',
  },
]

const relatedTools = [
  { name: 'CSV Viewer', href: '/office-tools/spreadsheet/csv-viewer' },
  { name: 'CSV Cleaner', href: '/office-tools/spreadsheet/csv-cleaner' },
  { name: 'CSV Merger', href: '/office-tools/spreadsheet/csv-merger' },
  { name: 'CSV → XLSX', href: '/office-tools/spreadsheet/csv-to-xlsx' },
]

useSeoMeta({
  title: 'CSV Splitter Online — Pecah File CSV Besar Gratis',
  description: 'Pecah file CSV besar jadi beberapa file lebih kecil berdasarkan jumlah baris atau jumlah file. Tanpa upload ke server.',
})

useHead({
  script: [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'SoftwareApplication',
        name: 'CSV Splitter',
        applicationCategory: 'UtilitiesApplication',
        operatingSystem: 'Any (Web Browser)',
        offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
        description: 'Memecah file CSV besar jadi beberapa file lebih kecil.',
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
      CSV Splitter
    </p>

    <h1 class="mt-3 max-w-[24ch] text-3xl font-semibold leading-tight text-ink sm:text-4xl">
      CSV Splitter — pecah file CSV besar jadi beberapa bagian
    </h1>
    <p class="mt-2 max-w-[52ch] text-base text-ink-soft">
      Upload CSV Anda, tentukan cara membaginya, unduh tiap bagian sebagai file terpisah.
    </p>

    <div class="mt-7">
      <FileDropzone accept=".csv,text/csv" label="Tarik & lepas file CSV di sini" @files="onFiles" />
    </div>

    <div v-if="totalRows > 0" class="mt-5 rounded-md border border-slate-200 bg-white p-4">
      <div class="flex flex-wrap gap-2">
        <button
          class="rounded-md border px-3.5 py-2 text-sm font-medium transition-colors"
          :class="mode === 'rowsPerFile' ? 'border-accent bg-accent text-white' : 'border-slate-300 bg-white text-ink hover:bg-slate-50'"
          @click="mode = 'rowsPerFile'"
        >
          Per jumlah baris
        </button>
        <button
          class="rounded-md border px-3.5 py-2 text-sm font-medium transition-colors"
          :class="mode === 'fileCount' ? 'border-accent bg-accent text-white' : 'border-slate-300 bg-white text-ink hover:bg-slate-50'"
          @click="mode = 'fileCount'"
        >
          Per jumlah file
        </button>
      </div>

      <div class="mt-4 flex flex-wrap items-end gap-4">
        <div v-if="mode === 'rowsPerFile'">
          <label class="mb-1.5 block text-xs font-medium uppercase tracking-wide text-ink-soft">Baris per file</label>
          <input
            v-model.number="rowsPerFile"
            type="number"
            min="1"
            class="w-32 rounded-md border border-slate-300 px-3 py-2 text-sm text-ink focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
          >
        </div>
        <div v-else>
          <label class="mb-1.5 block text-xs font-medium uppercase tracking-wide text-ink-soft">Jumlah file</label>
          <input
            v-model.number="fileCount"
            type="number"
            min="1"
            class="w-32 rounded-md border border-slate-300 px-3 py-2 text-sm text-ink focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
          >
        </div>
        <OptionToggle v-model="keepHeaderInEachFile" label="Sertakan header di tiap file" />
      </div>

      <p class="mt-3 text-sm text-ink-soft">Total {{ totalRows }} baris data akan dibagi jadi {{ parts.length }} file.</p>
    </div>

    <div v-if="parts.length > 0" class="mt-5 overflow-hidden rounded-md border border-slate-200 bg-white">
      <div
        v-for="part in parts"
        :key="part.name"
        class="flex items-center justify-between border-b border-slate-100 px-4 py-3 last:border-b-0"
      >
        <div>
          <p class="text-sm font-medium text-ink">{{ part.name }}</p>
          <p class="text-xs text-ink-soft">{{ part.rowCount }} baris</p>
        </div>
        <button
          class="rounded-md border border-slate-300 bg-white px-3.5 py-2 text-sm font-medium text-ink hover:bg-slate-50"
          @click="downloadPart(part.name, part.csv)"
        >
          Download
        </button>
      </div>
    </div>

    <div v-if="parts.length > 0" class="mt-4 flex flex-wrap items-center gap-3">
      <button
        class="rounded-md bg-accent px-4 py-2.5 text-sm font-medium text-white hover:brightness-95"
        @click="downloadAll"
      >
        Download semua ({{ parts.length }} file)
      </button>
      <button
        class="rounded-md border border-slate-300 bg-white px-4 py-2.5 text-sm font-medium text-ink hover:bg-slate-50"
        @click="clearAll"
      >
        Clear
      </button>
    </div>

    <p class="mt-3.5 text-sm text-ink-soft">
      <span class="mr-1.5 inline-block h-1.5 w-1.5 rounded-full bg-accent align-middle" />
      File Anda tidak pernah meninggalkan browser ini.
    </p>

    <section class="mt-14">
      <h2 class="text-xl font-semibold text-ink">Kenapa menggunakan CSV Splitter ini?</h2>
      <ul class="mt-4 grid gap-3.5">
        <li class="border-l-2 border-accent pl-4 text-sm text-ink-soft">
          <strong class="font-semibold text-ink">Dua mode pembagian.</strong>
          Bagi berdasarkan jumlah baris tetap, atau jumlah file yang diinginkan.
        </li>
        <li class="border-l-2 border-accent pl-4 text-sm text-ink-soft">
          <strong class="font-semibold text-ink">Header opsional.</strong>
          Pilih apakah tiap file hasil tetap punya baris header sendiri.
        </li>
        <li class="border-l-2 border-accent pl-4 text-sm text-ink-soft">
          <strong class="font-semibold text-ink">Privasi terjaga.</strong>
          File diproses dan dipecah langsung di browser Anda.
        </li>
      </ul>
    </section>

    <section class="mt-14">
      <h2 class="text-xl font-semibold text-ink">Cara memecah file CSV</h2>
      <ol class="mt-4 grid list-decimal gap-2.5 pl-5 marker:font-mono marker:text-accent-dark">
        <li class="text-sm text-ink-soft">Upload file CSV yang ingin dipecah.</li>
        <li class="text-sm text-ink-soft">Pilih mode pembagian dan atur angkanya.</li>
        <li class="text-sm text-ink-soft">Download tiap bagian satu per satu, atau semuanya sekaligus.</li>
      </ol>
    </section>

    <section class="mt-14">
      <h2 class="text-xl font-semibold text-ink">Kapan Anda membutuhkan tool ini?</h2>
      <div class="mt-4 grid gap-3.5">
        <p class="max-w-[62ch] text-sm text-ink-soft">
          Berguna saat harus mengunggah data ke sistem yang punya batas jumlah baris per file (misal platform
          email marketing atau import tool yang membatasi ukuran file).
        </p>
        <p class="max-w-[62ch] text-sm text-ink-soft">
          Juga membantu saat perlu membagi data ke beberapa tim yang masing-masing hanya perlu sebagian dari
          keseluruhan data.
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
