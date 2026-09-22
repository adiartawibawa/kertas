<script setup lang="ts">
const { t } = useI18n()
const { url: siteUrl } = useSiteConfig()

const categorySlug = 'data'
const toolSlugs = ['json-to-csv', 'csv-to-json', 'xml-to-csv', 'data-formatter']

function categoryName() {
  return t(`categories.${categorySlug}.name`)
}
function categoryDescription() {
  return t(`categories.${categorySlug}.description`)
}
function toolName(slug: string) {
  return t(`tools.${slug}`)
}
function toolDescription(slug: string) {
  return t(`toolDescriptions.${slug}`)
}

// Catatan: lang attribute, canonical, dan hreflang alternate sudah
// di-handle secara global di layouts/default.vue.

useSeoMeta({
  title: t('hubTitle.data'),
  description: categoryDescription(),
})

useHead({
  script: [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'CollectionPage',
        name: t('hubTitle.data'),
        description: t('hubIntro.data'),
        hasPart: toolSlugs.map((slug) => ({
          '@type': 'SoftwareApplication',
          name: toolName(slug),
          applicationCategory: 'UtilitiesApplication',
          url: `${siteUrl}/office-tools/data/${slug}`,
        })),
      }),
    },
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: `${siteUrl}/` },
          { '@type': 'ListItem', position: 2, name: 'Office Tools', item: `${siteUrl}/office-tools` },
          {
            '@type': 'ListItem',
            position: 3,
            name: categoryName(),
            item: `${siteUrl}/office-tools/data`,
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
      {{ categoryName() }}
    </p>

    <h1 class="mt-3 max-w-3xl text-3xl font-semibold leading-tight text-ink sm:text-4xl">
      {{ t('hubTitle.data') }}
    </h1>
    <p class="mt-2 max-w-4xl text-base text-ink-soft">
      {{ categoryDescription() }}
    </p>

    <section class="mt-8">
      <p class="max-w-6xl text-sm text-ink-soft">{{ t('hubIntro.data') }}</p>
    </section>

    <section class="mt-10 grid gap-4 pb-16">
      <article v-for="slug in toolSlugs" :key="slug"
        class="flex flex-col justify-between gap-4 rounded-md border border-slate-200 bg-white p-5 sm:flex-row sm:items-center">
        <div>
          <h2 class="text-base font-semibold text-ink">
            <NuxtLinkLocale :to="`/office-tools/data/${slug}`" class="hover:text-accent-dark">
              {{ toolName(slug) }}
            </NuxtLinkLocale>
          </h2>
          <p class="mt-1 max-w-[52ch] text-sm text-ink-soft">{{ toolDescription(slug) }}</p>
        </div>
        <NuxtLinkLocale :to="`/office-tools/data/${slug}`"
          class="inline-block shrink-0 rounded-md border border-slate-300 px-4 py-2 text-sm font-medium text-ink hover:border-accent hover:text-accent-dark">
          {{ t('common.openTool') }}
        </NuxtLinkLocale>
      </article>
    </section>

    <section class="pb-16">
      <NuxtLinkLocale to="/office-tools"
        class="border-b border-slate-300 pb-0.5 text-sm font-medium text-ink hover:border-accent hover:text-accent-dark">
        {{ t('common.backToCategories') }}
      </NuxtLinkLocale>
    </section>
  </div>
</template>