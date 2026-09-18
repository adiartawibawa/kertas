<script setup lang="ts">
interface ToolItem {
  name: string
  slug: string
  description: string
}

const tools: ToolItem[] = [
  { name: 'Merge', slug: 'pdf-merge', description: 'Gabungkan beberapa file PDF jadi satu file, urutan bisa diatur.' },
  { name: 'Split', slug: 'pdf-split', description: 'Pecah PDF jadi beberapa file, per halaman atau rentang kustom.' },
  { name: 'Compress', slug: 'pdf-compress', description: 'Perkecil ukuran file PDF dengan memadatkan struktur internal.' },
  { name: 'Rotate', slug: 'pdf-rotate', description: 'Putar orientasi halaman PDF 90°, 180°, atau 270°.' },
  { name: 'Extract Pages', slug: 'pdf-extract-pages', description: 'Ambil halaman tertentu dari PDF jadi satu file baru.' },
  { name: 'PDF → Text', slug: 'pdf-to-text', description: 'Ekstrak teks dari file PDF yang punya lapisan teks digital.' },
]

useSeoMeta({
  title: 'PDF Tools — Gabung, Pisah, Kompres PDF Gratis',
  description:
    'Kumpulan tool PDF: gabung, pisah, kompres, putar, ekstrak halaman, dan ekstrak teks. Semua gratis, tanpa upload.',
})

useHead({
  script: [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'CollectionPage',
        name: 'PDF — Office Tools',
        description: 'Kumpulan tool PDF yang berjalan sepenuhnya di browser.',
        hasPart: tools.map((tool) => ({
          '@type': 'SoftwareApplication',
          name: tool.name,
          applicationCategory: 'UtilitiesApplication',
          url: `https://domainanda.com/office-tools/pdf/${tool.slug}`,
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
          { '@type': 'ListItem', position: 3, name: 'PDF', item: 'https://domainanda.com/office-tools/pdf' },
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
      PDF
    </p>

    <h1 class="mt-3 max-w-[24ch] text-3xl font-semibold leading-tight text-ink sm:text-4xl">
      PDF — gabung, pisah, dan olah PDF online
    </h1>
    <p class="mt-2 max-w-[56ch] text-base text-ink-soft">
      Gabung, pisah, kompres, dan olah file PDF langsung di browser. Tanpa upload, tanpa akun, gratis digunakan.
    </p>

    <section class="mt-8">
      <p class="max-w-[68ch] text-sm text-ink-soft">
        Kategori PDF berisi tool untuk kebutuhan dokumen sehari-hari — menggabungkan beberapa file jadi satu,
        memecah dokumen panjang jadi beberapa bagian, memperkecil ukuran file untuk keperluan email, memutar
        halaman yang hasil scan-nya terbalik, mengambil halaman tertentu saja, hingga mengekstrak teks dari
        dokumen. Semua file diproses langsung di browser Anda — cocok untuk dokumen yang bersifat pribadi atau
        rahasia seperti kontrak dan KTP scan.
      </p>
    </section>

    <section class="mt-10 grid gap-4 pb-16">
      <article v-for="tool in tools" :key="tool.slug"
        class="flex flex-col justify-between gap-4 rounded-md border border-slate-200 bg-white p-5 sm:flex-row sm:items-center">
        <div>
          <h2 class="text-base font-semibold text-ink">
            <NuxtLinkLocale :to="`/office-tools/pdf/${tool.slug}`" class="hover:text-accent-dark">{{ tool.name }}
            </NuxtLinkLocale>
          </h2>
          <p class="mt-1 max-w-[52ch] text-sm text-ink-soft">{{ tool.description }}</p>
        </div>
        <NuxtLinkLocale :to="`/office-tools/pdf/${tool.slug}`"
          class="inline-block shrink-0 rounded-md border border-slate-300 px-4 py-2 text-sm font-medium text-ink hover:border-accent hover:text-accent-dark">
          Buka tool
        </NuxtLinkLocale>
      </article>
    </section>

    <section class="pb-16">
      <NuxtLinkLocale to="/office-tools"
        class="border-b border-slate-300 pb-0.5 text-sm font-medium text-ink hover:border-accent hover:text-accent-dark">
        Lihat semua kategori Office Tools
      </NuxtLinkLocale>
    </section>
  </div>
</template>
