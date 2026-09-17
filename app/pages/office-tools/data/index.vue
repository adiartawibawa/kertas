<script setup lang="ts">
interface ToolItem {
  name: string
  slug: string
  description: string
}

const tools: ToolItem[] = [
  {
    name: 'JSON → CSV',
    slug: 'json-to-csv',
    description: 'Konversi data JSON ke format CSV, termasuk meratakan struktur bersarang jadi kolom.',
  },
  {
    name: 'CSV → JSON',
    slug: 'csv-to-json',
    description: 'Konversi tabel CSV ke format JSON menggunakan baris pertama sebagai header.',
  },
  {
    name: 'XML → CSV',
    slug: 'xml-to-csv',
    description: 'Konversi XML dengan elemen berulang ke format CSV, satu elemen jadi satu baris.',
  },
  {
    name: 'Data Formatter',
    slug: 'data-formatter',
    description: 'Rapikan, validasi, dan minify data JSON atau XML secara instan.',
  },
]

useSeoMeta({
  title: 'Data — Tool Konversi Data Online Gratis',
  description:
    'Kumpulan tool konversi data: JSON ke CSV, CSV ke JSON, XML ke CSV, dan Data Formatter. Semua gratis, tanpa upload.',
})

useHead({
  script: [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'CollectionPage',
        name: 'Data — Office Tools',
        description: 'Kumpulan tool konversi format data yang berjalan sepenuhnya di browser.',
        hasPart: tools.map((tool) => ({
          '@type': 'SoftwareApplication',
          name: tool.name,
          applicationCategory: 'UtilitiesApplication',
          url: `https://domainanda.com/office-tools/data/${tool.slug}`,
        })),
      }),
    },
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://domainanda.com/' },
          {
            '@type': 'ListItem',
            position: 2,
            name: 'Office Tools',
            item: 'https://domainanda.com/office-tools',
          },
          { '@type': 'ListItem', position: 3, name: 'Data', item: 'https://domainanda.com/office-tools/data' },
        ],
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
      Data
    </p>

    <h1 class="mt-3 max-w-[24ch] text-3xl font-semibold leading-tight text-ink sm:text-4xl">
      Data — tool konversi format data online
    </h1>
    <p class="mt-2 max-w-[56ch] text-base text-ink-soft">
      Konversi antar format data untuk kebutuhan development. Tanpa upload, tanpa akun, gratis digunakan.
    </p>

    <section class="mt-8">
      <p class="max-w-[68ch] text-sm text-ink-soft">
        Kategori Data berisi tool-tool untuk kebutuhan konversi dan pembersihan data yang sering dibutuhkan
        developer maupun analis — mulai dari mengubah response API berformat JSON jadi tabel CSV yang bisa dibuka
        di Excel, mengonversi data spreadsheet jadi JSON untuk dipakai di kode, mengolah data legacy berformat XML,
        hingga merapikan dan memvalidasi struktur data sebelum dipakai lebih lanjut. Semua proses berjalan
        sepenuhnya di browser Anda — cocok untuk data yang bersifat sensitif atau internal.
      </p>
    </section>

    <section class="mt-10 grid gap-4 pb-16">
      <article
        v-for="tool in tools"
        :key="tool.slug"
        class="flex flex-col justify-between gap-4 rounded-md border border-slate-200 bg-white p-5 sm:flex-row sm:items-center"
      >
        <div>
          <h2 class="text-base font-semibold text-ink">
            <NuxtLink :to="`/office-tools/data/${tool.slug}`" class="hover:text-accent-dark">{{ tool.name }}</NuxtLink>
          </h2>
          <p class="mt-1 max-w-[52ch] text-sm text-ink-soft">{{ tool.description }}</p>
        </div>
        <NuxtLink
          :to="`/office-tools/data/${tool.slug}`"
          class="inline-block shrink-0 rounded-md border border-slate-300 px-4 py-2 text-sm font-medium text-ink hover:border-accent hover:text-accent-dark"
        >
          Buka tool
        </NuxtLink>
      </article>
    </section>

    <section class="pb-16">
      <NuxtLink to="/office-tools" class="border-b border-slate-300 pb-0.5 text-sm font-medium text-ink hover:border-accent hover:text-accent-dark">
        Lihat semua kategori Office Tools
      </NuxtLink>
    </section>
  </div>
</template>
