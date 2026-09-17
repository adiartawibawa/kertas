<script setup lang="ts">
const text = ref('')
const { csv, error, rowCount } = useXmlToCsv(text)

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
    question: 'Struktur XML seperti apa yang bisa dikonversi?',
    answer:
      'XML yang punya elemen berulang dengan tag sama sebagai anak dari satu root, misal beberapa <item> di dalam <items>. Setiap elemen berulang tersebut akan jadi satu baris tabel.',
  },
  {
    question: 'Bagaimana kalau XML saya tidak punya elemen berulang?',
    answer:
      'Keseluruhan dokumen akan diperlakukan sebagai satu baris tunggal, dengan setiap tag anak jadi satu kolom.',
  },
  {
    question: 'Apakah atribut XML (bukan hanya isi tag) ikut dikonversi?',
    answer:
      'Belum. Versi ini hanya membaca isi teks di dalam tag, atribut pada tag (seperti id="1") belum didukung.',
  },
  {
    question: 'Apakah data saya diunggah ke server?',
    answer: 'Tidak. Konversi sepenuhnya berjalan di browser Anda.',
  },
]

const relatedTools = [
  { name: 'JSON → CSV', href: '/office-tools/data/json-to-csv' },
  { name: 'CSV → JSON', href: '/office-tools/data/csv-to-json' },
  { name: 'Data Formatter', href: '/office-tools/data/data-formatter' },
]

useSeoMeta({
  title: 'XML to CSV Converter Online — Gratis, Tanpa Upload',
  description:
    'Konversi XML dengan elemen berulang ke format CSV secara instan di browser Anda. Gratis, tanpa upload file.',
})

useHead({
  script: [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'SoftwareApplication',
        name: 'XML to CSV Converter',
        applicationCategory: 'UtilitiesApplication',
        operatingSystem: 'Any (Web Browser)',
        offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
        description: 'Mengonversi XML dengan elemen berulang ke format CSV.',
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
      XML → CSV
    </p>

    <h1 class="mt-3 max-w-[24ch] text-3xl font-semibold leading-tight text-ink sm:text-4xl">
      XML to CSV — konversi XML berulang ke tabel CSV
    </h1>
    <p class="mt-2 max-w-[52ch] text-base text-ink-soft">
      Tempel XML dengan elemen berulang, hasil CSV muncul otomatis dengan tiap elemen jadi satu baris.
    </p>

    <div class="mt-7 grid gap-4 sm:grid-cols-2">
      <div>
        <p class="mb-1.5 text-xs font-medium uppercase tracking-wide text-ink-soft">XML</p>
        <textarea v-model="text" rows="12"
          placeholder="<items>&#10;  <item><nama>Kopi</nama><harga>25000</harga></item>&#10;  <item><nama>Teh</nama><harga>15000</harga></item>&#10;</items>"
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
      <span v-if="rowCount > 0" class="text-sm text-ink-soft">{{ rowCount }} baris</span>
    </div>

    <p class="mt-3.5 text-sm text-ink-soft">
      <span class="mr-1.5 inline-block h-1.5 w-1.5 rounded-full bg-accent align-middle" />
      Data Anda tidak pernah meninggalkan browser ini.
    </p>

    <section class="mt-14">
      <h2 class="text-xl font-semibold text-ink">Kenapa menggunakan XML to CSV ini?</h2>
      <ul class="mt-4 grid gap-3.5">
        <li class="border-l-2 border-accent pl-4 text-sm text-ink-soft">
          <strong class="font-semibold text-ink">Deteksi elemen berulang otomatis.</strong>
          Tidak perlu mengatur mapping manual, tool ini otomatis mengenali pola baris.
        </li>
        <li class="border-l-2 border-accent pl-4 text-sm text-ink-soft">
          <strong class="font-semibold text-ink">Mendukung tag bersarang.</strong>
          Tag di dalam tag otomatis diratakan jadi kolom terpisah.
        </li>
        <li class="border-l-2 border-accent pl-4 text-sm text-ink-soft">
          <strong class="font-semibold text-ink">Bisa langsung diunduh.</strong>
          Hasil CSV bisa di-download langsung sebagai file.
        </li>
      </ul>
    </section>

    <section class="mt-14">
      <h2 class="text-xl font-semibold text-ink">Cara mengonversi XML ke CSV</h2>
      <ol class="mt-4 grid list-decimal gap-2.5 pl-5 marker:font-mono marker:text-accent-dark">
        <li class="text-sm text-ink-soft">Tempel XML Anda di kolom kiri.</li>
        <li class="text-sm text-ink-soft">Hasil CSV muncul otomatis di kolom kanan.</li>
        <li class="text-sm text-ink-soft">Klik Copy untuk menyalin, atau Download untuk menyimpan sebagai file .csv.
        </li>
      </ol>
    </section>

    <section class="mt-14">
      <h2 class="text-xl font-semibold text-ink">Kapan Anda membutuhkan tool ini?</h2>
      <div class="mt-4 grid gap-3.5">
        <p class="max-w-[62ch] text-sm text-ink-soft">
          Berguna saat menerima data dari sistem lama (legacy) atau API yang masih memakai format XML, tapi Anda
          perlu menganalisisnya di Excel atau Google Sheets.
        </p>
        <p class="max-w-[62ch] text-sm text-ink-soft">
          Sering dipakai juga untuk mengonversi feed produk atau sitemap berformat XML jadi tabel yang lebih mudah
          dibaca dan diolah lebih lanjut.
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
