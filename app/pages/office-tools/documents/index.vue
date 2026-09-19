<script setup lang="ts">
const { t } = useI18n()

const toolSlugs = ['word-counter', 'text-cleaner', 'case-converter', 'text-compare', 'duplicate-line-remover']

useSeoMeta({
  title: t('hubTitle.documents'),
  description: t('categories.documents.description'),
})

useHead({
  script: [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'CollectionPage',
        name: t('hubTitle.documents'),
        description: t('hubIntro.documents'),
        hasPart: toolSlugs.map((slug) => ({
          '@type': 'SoftwareApplication',
          name: t(`tools.${slug}`),
          applicationCategory: 'UtilitiesApplication',
          url: `https://domainanda.com/office-tools/documents/${slug}`,
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
            name: t('categories.documents.name'),
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
      <NuxtLinkLocale to="/" class="hover:text-accent-dark">Home</NuxtLinkLocale> /
      <NuxtLinkLocale to="/office-tools" class="hover:text-accent-dark">Office Tools</NuxtLinkLocale> /
      {{ t('categories.documents.name') }}
    </p>

    <h1 class="mt-3 max-w-[24ch] text-3xl font-semibold leading-tight text-ink sm:text-4xl">
      {{ t('hubTitle.documents') }}
    </h1>
    <p class="mt-2 max-w-[56ch] text-base text-ink-soft">
      {{ t('categories.documents.description') }}
    </p>

    <section class="mt-8">
      <p class="max-w-[68ch] text-sm text-ink-soft">{{ t('hubIntro.documents') }}</p>
    </section>

    <section class="mt-10 grid gap-4 pb-16">
      <article
        v-for="slug in toolSlugs"
        :key="slug"
        class="flex flex-col justify-between gap-4 rounded-md border border-slate-200 bg-white p-5 sm:flex-row sm:items-center"
      >
        <div>
          <h2 class="text-base font-semibold text-ink">
            <NuxtLinkLocale :to="`/office-tools/documents/${slug}`" class="hover:text-accent-dark">
              {{ t(`tools.${slug}`) }}
            </NuxtLinkLocale>
          </h2>
          <p class="mt-1 max-w-[52ch] text-sm text-ink-soft">{{ t(`toolDescriptions.${slug}`) }}</p>
        </div>
        <NuxtLinkLocale
          :to="`/office-tools/documents/${slug}`"
          class="inline-block shrink-0 rounded-md border border-slate-300 px-4 py-2 text-sm font-medium text-ink hover:border-accent hover:text-accent-dark"
        >
          {{ t('common.openTool') }}
        </NuxtLinkLocale>
      </article>
    </section>

    <section class="pb-16">
      <NuxtLinkLocale to="/office-tools" class="border-b border-slate-300 pb-0.5 text-sm font-medium text-ink hover:border-accent hover:text-accent-dark">
        {{ t('common.backToCategories') }}
      </NuxtLinkLocale>
    </section>
  </div>
</template>
