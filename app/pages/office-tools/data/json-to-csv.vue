<script setup lang="ts">
const text = ref('')
const { csv, error, rowCount, columnCount } = useJsonToCsv(text)

function copyResult() {
  if (import.meta.client && navigator.clipboard && csv.value) {
    navigator.clipboard.writeText(csv.value).catch(() => { })
  }
}

function downloadResult() {
  if (csv.value) downloadTextFile('data.csv', csv.value, 'text/csv')
}

function clearText() {
  text.value = ''
}

const faqItems = [
  {
    question: 'Apakah JSON dengan struktur nested (bersarang) bisa dikonversi?',
    answer:
      'Bisa. Object bersarang otomatis diratakan (flatten) jadi kolom dengan nama gabungan, misal { "alamat": { "kota": "Bandung" } } menjadi kolom "alamat.kota". Ini perlu karena format CSV tidak mengenal struktur bersarang.',
  },
  {
    question: 'Bagaimana kalau tiap object di dalam array punya field yang berbeda-beda?',
    answer:
      'Semua kolom yang muncul di seluruh data akan digabung jadi header. Object yang tidak punya field tertentu akan mendapat sel kosong pada kolom tersebut.',
  },
  {
    question: 'Apakah JSON saya harus berupa array?',
    answer:
      'Tidak wajib. Kalau Anda memasukkan satu object saja (bukan array), tool ini akan otomatis membungkusnya jadi satu baris data.',
  },
  {
    question: 'Apakah data saya diunggah ke server?',
    answer: 'Tidak. Konversi sepenuhnya berjalan di browser Anda.',
  },
]

const relatedTools = [
  { name: 'CSV → JSON', href: '/office-tools/data/csv-to-json' },
  { name: 'XML → CSV', href: '/office-tools/data/xml-to-csv' },
  { name: 'Data Formatter', href: '/office-tools/data/data-formatter' },
]

useSeoMeta({
  title: 'JSON to CSV Converter Online — Gratis, Tanpa Upload',
  description:
    'Konversi JSON ke CSV secara instan, termasuk JSON bersarang yang otomatis diratakan jadi kolom. Gratis, diproses di browser.',
})

useHead({
  script: [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'SoftwareApplication',
        name: 'JSON to CSV Converter',
        applicationCategory: 'UtilitiesApplication',
        operatingSystem: 'Any (Web Browser)',
        offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
        description: 'Mengonversi data JSON ke format CSV, termasuk meratakan struktur bersarang.',
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
      <NuxtLinkLocale to="/office-tools/data" class="hover:text-accent-dark">Data</NuxtLinkLocale> /
      JSON → CSV
    </p>

    <h1 class="mt-3 max-w-[24ch] text-3xl font-semibold leading-tight text-ink sm:text-4xl">
      JSON to CSV — konversi data JSON ke tabel CSV
    </h1>
    <p class="mt-2 max-w-[52ch] text-base text-ink-soft">
      Tempel JSON Anda, hasil CSV siap pakai muncul otomatis — termasuk JSON bersarang.
    </p>

    <div class="mt-7 grid gap-4 sm:grid-cols-2">
      <div>
        <p class="mb-1.5 text-xs font-medium uppercase tracking-wide text-ink-soft">JSON</p>
        <textarea v-model="text" rows="12"
          placeholder='[{"nama":"Andi","kota":"Bandung"},{"nama":"Budi","kota":"Jakarta"}]'
          class="w-full resize-y rounded-md border border-slate-200 bg-white p-4 font-mono text-xs text-ink placeholder:text-ink-soft focus:outline-none focus-visible:ring-2 focus-visible:ring-accent" />
      </div>
      <div>
        <p class="mb-1.5 text-xs font-medium uppercase tracking-wide text-ink-soft">CSV</p>
        <textarea :value="csv" readonly rows="12"
          class="w-full resize-y rounded-md border border-slate-200 bg-slate-50 p-4 font-mono text-xs text-ink focus:outline-none" />
      </div>
    </div>

    <p v-if="error" class="mt-3 rounded-md border border-red-200 bg-red-50 px-4 py-2.5 text-sm text-red-700">
      {{ error }}
    </p>

    <div class="mt-4 flex flex-wrap items-center gap-3">
      <button class="rounded-md bg-accent px-4 py-2.5 text-sm font-medium text-white hover:brightness-95"
        @click="copyResult">
        Copy CSV
      </button>
      <button
        class="rounded-md border border-slate-300 bg-white px-4 py-2.5 text-sm font-medium text-ink hover:bg-slate-50"
        @click="downloadResult">
        Download .csv
      </button>
      <button
        class="rounded-md border border-slate-300 bg-white px-4 py-2.5 text-sm font-medium text-ink hover:bg-slate-50"
        @click="clearText">
        Clear
      </button>
      <span v-if="rowCount > 0" class="text-sm text-ink-soft">{{ rowCount }} baris, {{ columnCount }} kolom</span>
    </div>

    <p class="mt-3.5 text-sm text-ink-soft">
      <span class="mr-1.5 inline-block h-1.5 w-1.5 rounded-full bg-accent align-middle" />
      Data Anda tidak pernah meninggalkan browser ini.
    </p>

    <section class="mt-14">
      <h2 class="text-xl font-semibold text-ink">Kenapa menggunakan JSON to CSV ini?</h2>
      <ul class="mt-4 grid gap-3.5">
        <li class="border-l-2 border-accent pl-4 text-sm text-ink-soft">
          <strong class="font-semibold text-ink">Menangani JSON bersarang.</strong>
          Object di dalam object otomatis diratakan jadi kolom terpisah.
        </li>
        <li class="border-l-2 border-accent pl-4 text-sm text-ink-soft">
          <strong class="font-semibold text-ink">Header otomatis.</strong>
          Semua kolom yang muncul di data digabung jadi header, tidak ada field yang terlewat.
        </li>
        <li class="border-l-2 border-accent pl-4 text-sm text-ink-soft">
          <strong class="font-semibold text-ink">Bisa langsung diunduh.</strong>
          Hasil CSV bisa di-download langsung sebagai file, siap dibuka di Excel/Sheets.
        </li>
      </ul>
    </section>

    <section class="mt-14">
      <h2 class="text-xl font-semibold text-ink">Cara mengonversi JSON ke CSV</h2>
      <ol class="mt-4 grid list-decimal gap-2.5 pl-5 marker:font-mono marker:text-accent-dark">
        <li class="text-sm text-ink-soft">Tempel data JSON Anda di kolom kiri.</li>
        <li class="text-sm text-ink-soft">Hasil CSV muncul otomatis di kolom kanan.</li>
        <li class="text-sm text-ink-soft">Klik Copy untuk menyalin, atau Download untuk menyimpan sebagai file .csv.
        </li>
      </ol>
    </section>

    <section class="mt-14">
      <h2 class="text-xl font-semibold text-ink">Kapan Anda membutuhkan tool ini?</h2>
      <div class="mt-4 grid gap-3.5">
        <p class="max-w-[62ch] text-sm text-ink-soft">
          Berguna saat menerima data dari API dalam format JSON tapi perlu dibuka di Excel atau Google Sheets untuk
          dianalisis oleh tim yang tidak familiar dengan JSON.
        </p>
        <p class="max-w-[62ch] text-sm text-ink-soft">
          Developer juga sering memakainya untuk quick-check isi response API dalam bentuk tabel yang lebih mudah
          dibaca dibanding JSON mentah.
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
