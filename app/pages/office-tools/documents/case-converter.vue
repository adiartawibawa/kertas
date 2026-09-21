<script setup lang="ts">
const { t, tm, rt } = useI18n()
const { url: siteUrl } = useSiteConfig()

const slug = 'case-converter'
const categorySlug = 'documents'

function tp(key: string, params?: Record<string, unknown>) {
  return t(`toolPages.${slug}.${key}`, params ?? {})
}
function categoryName() {
  return t(`categories.${categorySlug}.name`)
}
function toolName() {
  return t(`tools.${slug}`)
}

const features = computed(() => {
  const items = tm(`toolPages.${slug}.features`) as Array<{ title: string; description: string }>
  return items.map((item) => ({
    title: rt(item.title as any),
    description: rt(item.description as any),
  }))
})

const steps = computed(() => {
  const items = tm(`toolPages.${slug}.steps`) as unknown[]

  return items.map((item) => rt(item as any))
})

const useCase = computed(() => {
  const items = tm(`toolPages.${slug}.useCase`) as unknown[]

  return items.map((item) => rt(item as any))
})

const faqItems = computed(() => {
  const items = tm(`toolPages.${slug}.faq`) as Array<{
    question: unknown
    answer: unknown
  }>

  return items.map((item) => ({
    question: rt(item.question as any),
    answer: rt(item.answer as any),
  }))
})

const relatedTools = [
  { href: '/office-tools/documents/word-counter' },
  { href: '/office-tools/documents/text-cleaner' },
  { href: '/office-tools/documents/text-compare' },
  { href: '/office-tools/documents/duplicate-line-remover' },
]

const text = ref('')
const { activeCase, converted } = useCaseConverter(text)

function copyResult() {
  if (import.meta.client && navigator.clipboard) {
    navigator.clipboard.writeText(converted.value).catch(() => { })
  }
}

function clearText() {
  text.value = ''
}

useSeoMeta({
  title: tp('seoTitle'),
  description: tp('seoDescription'),
})

useHead({
  script: [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'SoftwareApplication',
        name: tp('schemaName'),
        applicationCategory: 'UtilitiesApplication',
        operatingSystem: 'Any (Web Browser)',
        offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
        description: tp('schemaDescription'),
      }),
    },
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: faqItems.value.map((item) => ({
          '@type': 'Question',
          name: item.question,
          acceptedAnswer: { '@type': 'Answer', text: item.answer },
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
          { '@type': 'ListItem', position: 3, name: categoryName(), item: `${siteUrl}/office-tools/documents` },
          { '@type': 'ListItem', position: 4, name: toolName(), item: `${siteUrl}/office-tools/documents/${slug}` },
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
      <NuxtLinkLocale to="/office-tools/documents" class="hover:text-accent-dark">{{ categoryName() }}</NuxtLinkLocale>
      /
      {{ toolName() }}
    </p>

    <h1 class="mt-3 max-w-[24ch] text-3xl font-semibold leading-tight text-ink sm:text-4xl">{{ tp('title') }}</h1>
    <p class="mt-2 max-w-[52ch] text-base text-ink-soft">{{ tp('lede') }}</p>

    <div class="mt-7 rounded-md border border-slate-200 bg-white">
      <textarea v-model="text" rows="7" :placeholder="tp('inputPlaceholder')"
        class="w-full resize-y border-0 bg-transparent p-5 text-base text-ink placeholder:text-ink-soft focus:outline-none" />
    </div>

    <div class="mt-4 flex flex-wrap gap-2">
      <button v-for="option in caseOptions" :key="option.value"
        class="rounded-md border px-3.5 py-2 text-sm font-medium transition-colors" :class="activeCase === option.value
            ? 'border-accent bg-accent text-white'
            : 'border-slate-300 bg-white text-ink hover:bg-slate-50'
          " @click="activeCase = option.value">
        {{ option.label }}
      </button>
    </div>

    <div class="mt-5 rounded-md border border-slate-200 bg-slate-50">
      <textarea :value="converted" readonly rows="7"
        class="w-full resize-y border-0 bg-transparent p-5 text-base text-ink focus:outline-none" />
    </div>

    <div class="mt-4 flex gap-2.5">
      <button class="rounded-md bg-accent px-4 py-2.5 text-sm font-medium text-white hover:brightness-95"
        @click="copyResult">
        {{ t('common.copyResult') }}
      </button>
      <button
        class="rounded-md border border-slate-300 bg-white px-4 py-2.5 text-sm font-medium text-ink hover:bg-slate-50"
        @click="clearText">
        {{ t('common.clear') }}
      </button>
    </div>

    <p class="mt-3.5 text-sm text-ink-soft">
      <span class="mr-1.5 inline-block h-1.5 w-1.5 rounded-full bg-accent align-middle" />
      {{ t('common.privacyNoteText') }}
    </p>

    <section class="mt-14">
      <h2 class="text-xl font-semibold text-ink">{{ tp('featuresTitle') }}</h2>
      <ul class="mt-4 grid gap-3.5">
        <li v-for="feature in features" :key="feature.title"
          class="border-l-2 border-accent pl-4 text-sm text-ink-soft">
          <strong class="font-semibold text-ink">{{ feature.title }}.</strong>
          {{ feature.description }}
        </li>
      </ul>
    </section>

    <section class="mt-14">
      <h2 class="text-xl font-semibold text-ink">{{ tp('howToTitle') }}</h2>
      <ol class="mt-4 grid list-decimal gap-2.5 pl-5 marker:font-mono marker:text-accent-dark">
        <li v-for="step in steps" :key="step" class="text-sm text-ink-soft">{{ step }}</li>
      </ol>
    </section>

    <section class="mt-14">
      <h2 class="text-xl font-semibold text-ink">{{ tp('useCaseTitle') }}</h2>
      <div class="mt-4 grid gap-3.5">
        <p v-for="paragraph in useCase" :key="paragraph" class="max-w-[62ch] text-sm text-ink-soft">{{ paragraph }}</p>
      </div>
    </section>

    <section class="mt-14 pb-4">
      <h2 class="text-xl font-semibold text-ink">{{ t('common.faqTitle') }}</h2>
      <div class="mt-2">
        <FaqAccordion :items="faqItems" />
      </div>
    </section>

    <section class="mt-14 pb-16">
      <h2 class="text-xl font-semibold text-ink">{{ t('common.relatedTitle') }}</h2>
      <div class="mt-4">
        <RelatedTools :tools="relatedTools" />
      </div>
    </section>
  </div>
</template>
