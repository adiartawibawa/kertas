<script setup lang="ts">
interface ToolItem {
  name: string
  slug: string
  description: string
}

const tools: ToolItem[] = [
  {
    name: 'Word Counter',
    slug: 'word-counter',
    description: 'Hitung jumlah kata, karakter, kalimat, dan paragraf secara instan saat Anda mengetik.',
  },
  {
    name: 'Text Cleaner',
    slug: 'text-cleaner',
    description: 'Bersihkan spasi ganda, baris kosong, dan tab dari teks hasil copy-paste yang berantakan.',
  },
  {
    name: 'Case Converter',
    slug: 'case-converter',
    description: 'Ubah teks ke UPPERCASE, Title Case, camelCase, snake_case, dan format lainnya.',
  },
  {
    name: 'Text Compare',
    slug: 'text-compare',
    description: 'Bandingkan dua versi teks dan temukan perbedaannya baris demi baris.',
  },
  {
    name: 'Duplicate Line Remover',
    slug: 'duplicate-line-remover',
    description: 'Hapus baris duplikat dari daftar teks, urutan kemunculan pertama tetap dipertahankan.',
  },
]

useSeoMeta({
  title: 'Documents — Tool Teks & Dokumen Online Gratis',
  description:
    'Kumpulan tool teks dan dokumen: hitung kata, bersihkan teks, ubah format huruf, bandingkan dua teks, dan hapus baris duplikat. Semua gratis, tanpa upload.',
})

useHead({
  script: [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'CollectionPage',
        name: 'Documents — Office Tools',
        description: 'Kumpulan tool teks dan dokumen yang berjalan sepenuhnya di browser.',
        hasPart: tools.map((tool) => ({
          '@type': 'SoftwareApplication',
          name: tool.name,
          applicationCategory: 'UtilitiesApplication',
          url: `https://domainanda.com/office-tools/documents/${tool.slug}`,
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
            name: 'Documents',
            item: 'https://domainanda.com/office-tools/documents',
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
      Documents
    </p>

    <h1 class="mt-3 max-w-[24ch] text-3xl font-semibold leading-tight text-ink sm:text-4xl">
      Documents — tool teks dan dokumen online
    </h1>
    <p class="mt-2 max-w-[56ch] text-base text-ink-soft">
      Rapikan, hitung, dan bandingkan teks langsung di browser Anda. Tanpa upload, tanpa daftar akun, gratis
      digunakan.
    </p>

    <section class="mt-8">
      <p class="max-w-[68ch] text-sm text-ink-soft">
        Kategori Documents berisi tool-tool ringan untuk kebutuhan menulis dan mengolah teks sehari-hari — mulai
        dari menghitung jumlah kata untuk esai atau artikel, merapikan teks yang berantakan setelah copy-paste dari
        PDF atau Word, mengubah format kapitalisasi untuk penamaan variabel maupun judul tulisan, hingga
        membandingkan dua draft dokumen atau membersihkan daftar yang punya entri berulang. Semua tool di kategori
        ini memproses teks Anda sepenuhnya di browser — tidak ada yang diunggah ke server manapun, sehingga aman
        dipakai bahkan untuk teks yang bersifat pribadi atau rahasia.
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
            <NuxtLink :to="`/office-tools/documents/${tool.slug}`" class="hover:text-accent-dark">{{ tool.name }}</NuxtLink>
          </h2>
          <p class="mt-1 max-w-[52ch] text-sm text-ink-soft">{{ tool.description }}</p>
        </div>
        <NuxtLink
          :to="`/office-tools/documents/${tool.slug}`"
          class="inline-block shrink-0 rounded-md border border-slate-300 px-4 py-2 text-sm font-medium text-ink hover:border-accent hover:text-accent-dark"
        >
          Buka tool
        </NuxtLink>
      </article>
    </section>

    <section class="pb-16">
      <NuxtLink to="/" class="border-b border-slate-300 pb-0.5 text-sm font-medium text-ink hover:border-accent hover:text-accent-dark">
        Lihat semua kategori Office Tools
      </NuxtLink>
    </section>
  </div>
</template>
