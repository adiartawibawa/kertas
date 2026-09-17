<script setup lang="ts">
interface Category {
  name: string
  slug: string
  description: string
  tools: { name: string; slug: string }[]
}

const categories: Category[] = [
  {
    name: 'Documents',
    slug: 'documents',
    description: 'Bersihkan, hitung, dan bandingkan teks tanpa install apapun.',
    tools: [
      { name: 'Word Counter', slug: 'word-counter' },
      { name: 'Text Cleaner', slug: 'text-cleaner' },
      { name: 'Case Converter', slug: 'case-converter' },
      { name: 'Text Compare', slug: 'text-compare' },
      { name: 'Duplicate Line Remover', slug: 'duplicate-line-remover' },
    ],
  },
  {
    name: 'PDF',
    slug: 'pdf',
    description: 'Gabung, pisah, kompres, dan olah PDF langsung di browser.',
    tools: [
      { name: 'Merge', slug: 'pdf-merge' },
      { name: 'Split', slug: 'pdf-split' },
      { name: 'Compress', slug: 'pdf-compress' },
      { name: 'Rotate', slug: 'pdf-rotate' },
      { name: 'Extract Pages', slug: 'pdf-extract-pages' },
      { name: 'PDF → Text', slug: 'pdf-to-text' },
    ],
  },
  {
    name: 'Spreadsheet',
    slug: 'spreadsheet',
    description: 'Lihat, bersihkan, dan konversi file CSV maupun XLSX.',
    tools: [
      { name: 'CSV Viewer', slug: 'csv-viewer' },
      { name: 'CSV Cleaner', slug: 'csv-cleaner' },
      { name: 'CSV Splitter', slug: 'csv-splitter' },
      { name: 'CSV Merger', slug: 'csv-merger' },
      { name: 'CSV → XLSX', slug: 'csv-to-xlsx' },
      { name: 'XLSX → CSV', slug: 'xlsx-to-csv' },
    ],
  },
  {
    name: 'Data',
    slug: 'data',
    description: 'Konversi antar format data untuk kebutuhan development.',
    tools: [
      { name: 'JSON → CSV', slug: 'json-to-csv' },
      { name: 'CSV → JSON', slug: 'csv-to-json' },
      { name: 'XML → CSV', slug: 'xml-to-csv' },
      { name: 'Data Formatter', slug: 'data-formatter' },
    ],
  },
  {
    name: 'Productivity',
    slug: 'productivity',
    description: 'Kalkulator harian untuk kebutuhan kerja dan bisnis.',
    tools: [
      { name: 'Percentage', slug: 'percentage' },
      { name: 'Business Days', slug: 'business-days' },
      { name: 'Date Difference', slug: 'date-difference' },
      { name: 'Working Hours', slug: 'working-hours' },
      { name: 'Time Calculator', slug: 'time-calculator' },
    ],
  },
]

useSeoMeta({
  title: 'Kertas — Office Tools Privasi-First, Tanpa Upload',
  description:
    'Kumpulan tool dokumen, PDF, spreadsheet, dan data yang berjalan sepenuhnya di browser Anda. Tanpa upload, tanpa daftar akun, gratis dan cepat.',
  ogTitle: 'Kertas — Office Tools Privasi-First, Tanpa Upload',
  ogDescription: 'Tool office harian yang berjalan di browser Anda — tanpa upload, tanpa akun, gratis.',
})

useHead({
  script: [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        name: 'Kertas',
        description:
          'A privacy-first web utility platform for everyday document, spreadsheet, text, PDF, and data workflows.',
      }),
    },
  ],
})
</script>

<template>
  <div>
    <section class="pt-14 sm:pt-20">
      <h1 class="max-w-[18ch] text-4xl font-semibold leading-tight text-ink sm:text-5xl">
        Office tools yang bekerja di browser Anda, bukan di server kami
      </h1>
      <p class="mt-4 max-w-[56ch] text-base text-ink-soft sm:text-lg">
        Hitung kata, olah PDF, bersihkan CSV, atau konversi data — semua diproses lokal di perangkat Anda.
        Tanpa upload, tanpa daftar akun, dan tanpa biaya.
      </p>

      <div class="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-sm text-ink-soft">
        <span class="inline-flex items-center gap-1.5">
          <span class="h-1.5 w-1.5 rounded-full bg-accent" /> Tidak ada upload file
        </span>
        <span class="inline-flex items-center gap-1.5">
          <span class="h-1.5 w-1.5 rounded-full bg-accent" /> Tanpa daftar akun
        </span>
        <span class="inline-flex items-center gap-1.5">
          <span class="h-1.5 w-1.5 rounded-full bg-accent" /> Gratis digunakan
        </span>
      </div>
    </section>

    <section class="mt-16 grid gap-5 pb-20 sm:grid-cols-2">
      <article v-for="category in categories" :key="category.slug"
        class="rounded-md border border-slate-200 bg-white p-6">
        <h2 class="text-lg font-semibold text-ink">
          <NuxtLink :to="`/office-tools/${category.slug}`" class="hover:text-accent-dark">
            {{ category.name }}
          </NuxtLink>
        </h2>
        <p class="mt-1.5 text-sm text-ink-soft">{{ category.description }}</p>

        <ul class="mt-4 grid gap-1.5">
          <li v-for="tool in category.tools" :key="tool.slug">
            <NuxtLink :to="`/tools/${tool.slug}`" class="text-sm text-ink-soft hover:text-accent-dark hover:underline">
              {{ tool.name }}
            </NuxtLink>
          </li>
        </ul>

        <NuxtLink :to="`/office-tools/${category.slug}`"
          class="mt-5 inline-block border-b border-slate-300 pb-0.5 text-sm font-medium text-ink hover:border-accent hover:text-accent-dark">
          Lihat semua tool {{ category.name }}
        </NuxtLink>
      </article>
    </section>
  </div>
</template>
