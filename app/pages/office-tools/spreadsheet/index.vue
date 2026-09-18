<script setup lang="ts">
interface ToolItem {
  name: string
  slug: string
  description: string
}

const tools: ToolItem[] = [
  { name: 'CSV Viewer', slug: 'csv-viewer', description: 'Buka dan cari data CSV sebagai tabel langsung di browser.' },
  { name: 'CSV Cleaner', slug: 'csv-cleaner', description: 'Hapus baris kosong, duplikat, dan kolom kosong dari CSV.' },
  { name: 'CSV Splitter', slug: 'csv-splitter', description: 'Pecah file CSV besar jadi beberapa file lebih kecil.' },
  { name: 'CSV Merger', slug: 'csv-merger', description: 'Gabungkan beberapa file CSV jadi satu file.' },
  { name: 'CSV → XLSX', slug: 'csv-to-xlsx', description: 'Konversi file CSV ke format Excel (.xlsx).' },
  { name: 'XLSX → CSV', slug: 'xlsx-to-csv', description: 'Konversi file Excel (.xlsx/.xls) ke format CSV.' },
]

useSeoMeta({
  title: 'Spreadsheet — Tool CSV & Excel Online Gratis',
  description:
    'Kumpulan tool spreadsheet: lihat, bersihkan, pecah, gabung, dan konversi CSV maupun Excel. Semua gratis, tanpa upload.',
})

useHead({
  script: [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'CollectionPage',
        name: 'Spreadsheet — Office Tools',
        description: 'Kumpulan tool spreadsheet yang berjalan sepenuhnya di browser.',
        hasPart: tools.map((tool) => ({
          '@type': 'SoftwareApplication',
          name: tool.name,
          applicationCategory: 'UtilitiesApplication',
          url: `https://domainanda.com/office-tools/spreadsheet/${tool.slug}`,
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
          { '@type': 'ListItem', position: 2, name: 'Office Tools', item: 'https://domainanda.com/office-tools' },
          {
            '@type': 'ListItem',
            position: 3,
            name: 'Spreadsheet',
            item: 'https://domainanda.com/office-tools/spreadsheet',
          },
        ],
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
      Spreadsheet
    </p>

    <h1 class="mt-3 max-w-[24ch] text-3xl font-semibold leading-tight text-ink sm:text-4xl">
      Spreadsheet — tool CSV dan Excel online
    </h1>
    <p class="mt-2 max-w-[56ch] text-base text-ink-soft">
      Lihat, bersihkan, dan konversi file CSV maupun XLSX. Tanpa upload, tanpa akun, gratis digunakan.
    </p>

    <section class="mt-8">
      <p class="max-w-[68ch] text-sm text-ink-soft">
        Kategori Spreadsheet berisi tool untuk kebutuhan kerja sehari-hari dengan data tabular — mulai dari
        sekadar melihat isi file CSV tanpa perlu membuka Excel, membersihkan data yang berantakan, memecah file
        besar jadi beberapa bagian, menggabungkan beberapa file jadi satu, hingga konversi bolak-balik antara
        format CSV dan Excel. Semua file diproses langsung di browser Anda — tidak ada yang diunggah ke server,
        aman dipakai untuk data internal maupun sensitif.
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
            <NuxtLinkLocale :to="`/office-tools/spreadsheet/${tool.slug}`" class="hover:text-accent-dark">{{ tool.name }}</NuxtLinkLocale>
          </h2>
          <p class="mt-1 max-w-[52ch] text-sm text-ink-soft">{{ tool.description }}</p>
        </div>
        <NuxtLinkLocale
          :to="`/office-tools/spreadsheet/${tool.slug}`"
          class="inline-block shrink-0 rounded-md border border-slate-300 px-4 py-2 text-sm font-medium text-ink hover:border-accent hover:text-accent-dark"
        >
          Buka tool
        </NuxtLinkLocale>
      </article>
    </section>

    <section class="pb-16">
      <NuxtLinkLocale to="/office-tools" class="border-b border-slate-300 pb-0.5 text-sm font-medium text-ink hover:border-accent hover:text-accent-dark">
        Lihat semua kategori Office Tools
      </NuxtLinkLocale>
    </section>
  </div>
</template>
