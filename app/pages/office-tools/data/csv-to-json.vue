<script setup lang="ts">
const text = ref('')
const { json, error, recordCount, columnCount } = useCsvToJson(text)

function copyResult() {
  if (import.meta.client && navigator.clipboard && json.value) {
    navigator.clipboard.writeText(json.value).catch(() => {})
  }
}

function downloadResult() {
  if (json.value) downloadTextFile('data.json', json.value, 'application/json')
}

function clearText() {
  text.value = ''
}

const faqItems = [
  {
    question: 'Apakah baris pertama harus berisi nama kolom?',
    answer: 'Ya, baris pertama CSV dianggap sebagai header dan dipakai sebagai key/nama field di JSON hasil.',
  },
  {
    question: 'Bagaimana kalau ada koma di dalam salah satu sel?',
    answer:
      'Bungkus sel tersebut dengan tanda kutip ganda ("teks, dengan koma") — ini format CSV standar dan tool ini sudah mendukungnya.',
  },
  {
    question: 'Apakah tipe data seperti angka otomatis dikenali?',
    answer:
      'Tidak, semua nilai diperlakukan sebagai teks (string) di JSON hasil, karena CSV sendiri tidak punya informasi tipe data.',
  },
  {
    question: 'Apakah data saya diunggah ke server?',
    answer: 'Tidak. Konversi sepenuhnya berjalan di browser Anda.',
  },
]

const relatedTools = [
  { name: 'JSON → CSV', href: '/office-tools/data/json-to-csv' },
  { name: 'XML → CSV', href: '/office-tools/data/xml-to-csv' },
  { name: 'Data Formatter', href: '/office-tools/data/data-formatter' },
]

useSeoMeta({
  title: 'CSV to JSON Converter Online — Gratis, Tanpa Upload',
  description: 'Konversi CSV ke format JSON secara instan langsung di browser Anda. Gratis, tanpa upload file.',
})

useHead({
  script: [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'SoftwareApplication',
        name: 'CSV to JSON Converter',
        applicationCategory: 'UtilitiesApplication',
        operatingSystem: 'Any (Web Browser)',
        offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
        description: 'Mengonversi data CSV ke format JSON menggunakan baris pertama sebagai header.',
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
      <NuxtLink to="/" class="hover:text-accent-dark">Home</NuxtLink> /
      <NuxtLink to="/office-tools" class="hover:text-accent-dark">Office Tools</NuxtLink> /
      <NuxtLink to="/office-tools/data" class="hover:text-accent-dark">Data</NuxtLink> /
      CSV → JSON
    </p>

    <h1 class="mt-3 max-w-[24ch] text-3xl font-semibold leading-tight text-ink sm:text-4xl">
      CSV to JSON — konversi tabel CSV ke JSON
    </h1>
    <p class="mt-2 max-w-[52ch] text-base text-ink-soft">
      Tempel data CSV Anda, hasil JSON siap pakai muncul otomatis.
    </p>

    <div class="mt-7 grid gap-4 sm:grid-cols-2">
      <div>
        <p class="mb-1.5 text-xs font-medium uppercase tracking-wide text-ink-soft">CSV</p>
        <textarea
          v-model="text"
          rows="12"
          placeholder="nama,kota&#10;Andi,Bandung&#10;Budi,Jakarta"
          class="w-full resize-y rounded-md border border-slate-200 bg-white p-4 font-mono text-xs text-ink placeholder:text-ink-soft focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
        />
      </div>
      <div>
        <p class="mb-1.5 text-xs font-medium uppercase tracking-wide text-ink-soft">JSON</p>
        <textarea
          :value="json"
          readonly
          rows="12"
          class="w-full resize-y rounded-md border border-slate-200 bg-slate-50 p-4 font-mono text-xs text-ink focus:outline-none"
        />
      </div>
    </div>

    <p v-if="error" class="mt-3 rounded-md border border-red-200 bg-red-50 px-4 py-2.5 text-sm text-red-700">
      {{ error }}
    </p>

    <div class="mt-4 flex flex-wrap items-center gap-3">
      <button
        class="rounded-md bg-accent px-4 py-2.5 text-sm font-medium text-white hover:brightness-95"
        @click="copyResult"
      >
        Copy JSON
      </button>
      <button
        class="rounded-md border border-slate-300 bg-white px-4 py-2.5 text-sm font-medium text-ink hover:bg-slate-50"
        @click="downloadResult"
      >
        Download .json
      </button>
      <button
        class="rounded-md border border-slate-300 bg-white px-4 py-2.5 text-sm font-medium text-ink hover:bg-slate-50"
        @click="clearText"
      >
        Clear
      </button>
      <span v-if="recordCount > 0" class="text-sm text-ink-soft">{{ recordCount }} baris, {{ columnCount }} kolom</span>
    </div>

    <p class="mt-3.5 text-sm text-ink-soft">
      <span class="mr-1.5 inline-block h-1.5 w-1.5 rounded-full bg-accent align-middle" />
      Data Anda tidak pernah meninggalkan browser ini.
    </p>

    <section class="mt-14">
      <h2 class="text-xl font-semibold text-ink">Kenapa menggunakan CSV to JSON ini?</h2>
      <ul class="mt-4 grid gap-3.5">
        <li class="border-l-2 border-accent pl-4 text-sm text-ink-soft">
          <strong class="font-semibold text-ink">Mendukung CSV kompleks.</strong>
          Field dengan koma atau tanda kutip di dalamnya tetap terbaca benar.
        </li>
        <li class="border-l-2 border-accent pl-4 text-sm text-ink-soft">
          <strong class="font-semibold text-ink">JSON rapi.</strong>
          Hasil sudah diformat dengan indentasi, siap dipakai langsung.
        </li>
        <li class="border-l-2 border-accent pl-4 text-sm text-ink-soft">
          <strong class="font-semibold text-ink">Bisa langsung diunduh.</strong>
          Hasil JSON bisa di-download sebagai file .json.
        </li>
      </ul>
    </section>

    <section class="mt-14">
      <h2 class="text-xl font-semibold text-ink">Cara mengonversi CSV ke JSON</h2>
      <ol class="mt-4 grid list-decimal gap-2.5 pl-5 marker:font-mono marker:text-accent-dark">
        <li class="text-sm text-ink-soft">Tempel data CSV Anda di kolom kiri (baris pertama harus header).</li>
        <li class="text-sm text-ink-soft">Hasil JSON muncul otomatis di kolom kanan.</li>
        <li class="text-sm text-ink-soft">Klik Copy untuk menyalin, atau Download untuk menyimpan sebagai file .json.</li>
      </ol>
    </section>

    <section class="mt-14">
      <h2 class="text-xl font-semibold text-ink">Kapan Anda membutuhkan tool ini?</h2>
      <div class="mt-4 grid gap-3.5">
        <p class="max-w-[62ch] text-sm text-ink-soft">
          Berguna saat perlu mengubah data yang diekspor dari Excel/Google Sheets jadi format JSON untuk dipakai
          sebagai data seed aplikasi, config file, atau input testing API.
        </p>
        <p class="max-w-[62ch] text-sm text-ink-soft">
          Developer sering memakainya untuk mengubah data spreadsheet sederhana jadi array object siap pakai di
          kode tanpa perlu menulis parser manual.
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
