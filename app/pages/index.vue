<script setup lang="ts">
const { t } = useI18n()

interface Category {
  slug: string
  tools: { slug: string }[]
}

// Struktur data tetap statis (slug), teks tampilan diambil dari file locale
const categories: Category[] = [
  {
    slug: 'documents',
    tools: [
      { slug: 'word-counter' },
      { slug: 'text-cleaner' },
      { slug: 'case-converter' },
      { slug: 'text-compare' },
      { slug: 'duplicate-line-remover' },
    ],
  },
  {
    slug: 'pdf',
    tools: [
      { slug: 'pdf-merge' },
      { slug: 'pdf-split' },
      { slug: 'pdf-compress' },
      { slug: 'pdf-rotate' },
      { slug: 'pdf-extract-pages' },
      { slug: 'pdf-to-text' },
    ],
  },
  {
    slug: 'spreadsheet',
    tools: [
      { slug: 'csv-viewer' },
      { slug: 'csv-cleaner' },
      { slug: 'csv-splitter' },
      { slug: 'csv-merger' },
      { slug: 'csv-to-xlsx' },
      { slug: 'xlsx-to-csv' },
    ],
  },
  {
    slug: 'data',
    tools: [
      { slug: 'json-to-csv' },
      { slug: 'csv-to-json' },
      { slug: 'xml-to-csv' },
      { slug: 'data-formatter' },
    ],
  },
  {
    slug: 'productivity',
    tools: [
      { slug: 'percentage' },
      { slug: 'business-days' },
      { slug: 'date-difference' },
      { slug: 'working-hours' },
      { slug: 'time-calculator' },
    ],
  },
]

// Helper untuk ambil teks dari locale berdasarkan slug
function categoryName(slug: string) {
  return t(`categories.${slug}.name`)
}
function categoryDescription(slug: string) {
  return t(`categories.${slug}.description`)
}
function toolName(slug: string) {
  return t(`tools.${slug}`)
}

const i18nHead = useLocaleHead({ seo: true })

useHead({
  htmlAttrs: {
    lang: i18nHead.value.htmlAttrs?.lang,
    dir: i18nHead.value.htmlAttrs?.dir,
  },
  link: [...(i18nHead.value.link || [])],
  meta: [...(i18nHead.value.meta || [])],
})

useSeoMeta({
  title: t('home.seoTitle'),
  description: t('home.seoDescription'),
  ogTitle: t('home.seoTitle'),
  ogDescription: t('home.ogDescription'),
})

useHead({
  script: [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        name: 'Kertas',
        description: t('home.jsonLdDescription'),
      }),
    },
  ],
})
</script>

<template>
  <div>
    <section class="pt-14 sm:pt-20">
      <h1 class="max-w-[18ch] text-4xl font-semibold leading-tight text-ink sm:text-5xl">
        {{ t('home.title') }}
      </h1>
      <p class="mt-4 max-w-[56ch] text-base text-ink-soft sm:text-lg">
        {{ t('home.subtitle') }}
      </p>

      <div class="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-sm text-ink-soft">
        <span class="inline-flex items-center gap-1.5">
          <span class="h-1.5 w-1.5 rounded-full bg-accent" /> {{ t('home.badges.noUpload') }}
        </span>
        <span class="inline-flex items-center gap-1.5">
          <span class="h-1.5 w-1.5 rounded-full bg-accent" /> {{ t('home.badges.noSignup') }}
        </span>
        <span class="inline-flex items-center gap-1.5">
          <span class="h-1.5 w-1.5 rounded-full bg-accent" /> {{ t('home.badges.free') }}
        </span>
      </div>
    </section>

    <section class="mt-16 grid gap-5 pb-20 sm:grid-cols-2">
      <article v-for="category in categories" :key="category.slug"
        class="rounded-md border border-slate-200 bg-white p-6">
        <h2 class="text-lg font-semibold text-ink">
          <NuxtLinkLocale :to="`/office-tools/${category.slug}`" class="hover:text-accent-dark">
            {{ categoryName(category.slug) }}
          </NuxtLinkLocale>
        </h2>
        <p class="mt-1.5 text-sm text-ink-soft">{{ categoryDescription(category.slug) }}</p>

        <ul class="mt-4 grid gap-1.5">
          <li v-for="tool in category.tools" :key="tool.slug">
            <NuxtLinkLocale :to="`/office-tools/${category.slug}/${tool.slug}`"
              class="text-sm text-ink-soft hover:text-accent-dark hover:underline">
              {{ toolName(tool.slug) }}
            </NuxtLinkLocale>
          </li>
        </ul>

        <NuxtLinkLocale :to="`/office-tools/${category.slug}`"
          class="mt-5 inline-block border-b border-slate-300 pb-0.5 text-sm font-medium text-ink hover:border-accent hover:text-accent-dark">
          {{ t('home.viewAll', { category: categoryName(category.slug) }) }}
        </NuxtLinkLocale>
      </article>
    </section>
  </div>
</template>