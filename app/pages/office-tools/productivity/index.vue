<script setup lang="ts">
interface ToolItem {
  name: string
  slug: string
  description: string
}

const tools: ToolItem[] = [
  {
    name: 'Percentage',
    slug: 'percentage',
    description: 'Hitung persentase dari suatu angka, persentase perubahan, atau tambah/kurang persentase.',
  },
  {
    name: 'Business Days',
    slug: 'business-days',
    description: 'Hitung jumlah hari kerja antara dua tanggal, atau tambahkan hari kerja ke tanggal tertentu.',
  },
  {
    name: 'Date Difference',
    slug: 'date-difference',
    description: 'Hitung selisih dua tanggal dalam tahun, bulan, hari, dan total hari.',
  },
  {
    name: 'Working Hours',
    slug: 'working-hours',
    description: 'Hitung total jam kerja dari beberapa shift dengan waktu istirahat.',
  },
  {
    name: 'Time Calculator',
    slug: 'time-calculator',
    description: 'Jumlahkan beberapa durasi waktu atau tambahkan durasi ke jam tertentu.',
  },
]

useSeoMeta({
  title: 'Productivity — Kalkulator Harian untuk Kerja & Bisnis',
  description:
    'Kumpulan kalkulator harian: persentase, hari kerja, selisih tanggal, jam kerja, dan durasi waktu. Semua gratis, tanpa upload.',
})

useHead({
  script: [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'CollectionPage',
        name: 'Productivity — Office Tools',
        description: 'Kumpulan kalkulator harian untuk kebutuhan kerja dan bisnis yang berjalan di browser.',
        hasPart: tools.map((tool) => ({
          '@type': 'SoftwareApplication',
          name: tool.name,
          applicationCategory: 'UtilitiesApplication',
          url: `https://domainanda.com/office-tools/productivity/${tool.slug}`,
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
          {
            '@type': 'ListItem',
            position: 3,
            name: 'Productivity',
            item: 'https://domainanda.com/office-tools/productivity',
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
      <NuxtLink to="/" class="hover:text-accent-dark">Home</NuxtLink> /
      <NuxtLink to="/office-tools" class="hover:text-accent-dark">Office Tools</NuxtLink> /
      Productivity
    </p>

    <h1 class="mt-3 max-w-[24ch] text-3xl font-semibold leading-tight text-ink sm:text-4xl">
      Productivity — kalkulator harian untuk kerja dan bisnis
    </h1>
    <p class="mt-2 max-w-[56ch] text-base text-ink-soft">
      Persentase, hari kerja, selisih tanggal, jam kerja, dan durasi waktu — semua dalam satu tempat.
    </p>

    <section class="mt-8">
      <p class="max-w-[68ch] text-sm text-ink-soft">
        Kategori Productivity berisi kalkulator ringan untuk kebutuhan operasional sehari-hari — mulai dari
        menghitung diskon dan margin bisnis, memproyeksikan deadline berdasarkan hari kerja, mengetahui selisih
        tepat antara dua tanggal, merekap total jam kerja dari beberapa shift, hingga menjumlahkan durasi waktu.
        Semua kalkulasi berjalan langsung di browser Anda tanpa perlu membuka aplikasi spreadsheet terpisah.
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
            <NuxtLink :to="`/office-tools/productivity/${tool.slug}`" class="hover:text-accent-dark">
              {{ tool.name }}
            </NuxtLink>
          </h2>
          <p class="mt-1 max-w-[52ch] text-sm text-ink-soft">{{ tool.description }}</p>
        </div>
        <NuxtLink
          :to="`/office-tools/productivity/${tool.slug}`"
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
