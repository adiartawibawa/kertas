<script setup lang="ts">
const { t, tm, rt } = useI18n()
const { url: siteUrl } = useSiteConfig()

const slug = 'data-formatter'
const categorySlug = 'data'

function tp(key: string) {
  return t(`toolPages.${slug}.${key}`)
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
  { href: '/office-tools/data/json-to-csv' },
  { href: '/office-tools/data/csv-to-json' },
  { href: '/office-tools/data/xml-to-csv' },
]

const { mode, input, indentSize, formatted, minified, error } = useDataFormatter()

function copyFormatted() {
  if (import.meta.client && navigator.clipboard && formatted.value) {
    navigator.clipboard.writeText(formatted.value).catch(() => { })
  }
}

function copyMinified() {
  if (import.meta.client && navigator.clipboard && minified.value) {
    navigator.clipboard.writeText(minified.value).catch(() => { })
  }
}

function downloadResult() {
  if (!formatted.value) return
  const ext = mode.value === 'json' ? 'json' : 'xml'
  const mimeType = mode.value === 'json' ? 'application/json' : 'application/xml'
  downloadTextFile(`formatted.${ext}`, formatted.value, mimeType)
}

function clearInput() {
  input.value = ''
}

const placeholderText = computed(() => (mode.value === 'json' ? tp('placeholderJson') : tp('placeholderXml')))

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
          { '@type': 'ListItem', position: 3, name: categoryName(), item: `${siteUrl}/office-tools/data` },
          { '@type': 'ListItem', position: 4, name: toolName(), item: `${siteUrl}/office-tools/data/${slug}` },
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
      <NuxtLinkLocale to="/office-tools/data" class="hover:text-accent-dark">{{ categoryName() }}</NuxtLinkLocale> /
      {{ toolName() }}
    </p>

    <h1 class="mt-3 max-w-[24ch] text-3xl font-semibold leading-tight text-ink sm:text-4xl">{{ tp('title') }}</h1>
    <p class="mt-2 max-w-[52ch] text-base text-ink-soft">{{ tp('lede') }}</p>

    <div class="mt-7 flex flex-wrap items-center justify-between gap-3">
      <div class="flex flex-wrap gap-2">
        <button class="rounded-md border px-3.5 py-2 text-sm font-medium transition-colors"
          :class="mode === 'json' ? 'border-accent bg-accent text-white' : 'border-slate-300 bg-white text-ink hover:bg-slate-50'"
          @click="mode = 'json'">
          {{ tp('modeJsonLabel') }}
        </button>
        <button class="rounded-md border px-3.5 py-2 text-sm font-medium transition-colors"
          :class="mode === 'xml' ? 'border-accent bg-accent text-white' : 'border-slate-300 bg-white text-ink hover:bg-slate-50'"
          @click="mode = 'xml'">
          {{ tp('modeXmlLabel') }}
        </button>
      </div>

      <div class="flex items-center gap-2 text-sm text-ink-soft">
        <span>{{ tp('indentLabel') }}</span>
        <button class="rounded-md border px-2.5 py-1 text-xs font-medium"
          :class="indentSize === 2 ? 'border-accent bg-accent-tint text-accent-dark' : 'border-slate-300 bg-white text-ink hover:bg-slate-50'"
          @click="indentSize = 2">
          {{ tp('indent2Label') }}
        </button>
        <button class="rounded-md border px-2.5 py-1 text-xs font-medium"
          :class="indentSize === 4 ? 'border-accent bg-accent-tint text-accent-dark' : 'border-slate-300 bg-white text-ink hover:bg-slate-50'"
          @click="indentSize = 4">
          {{ tp('indent4Label') }}
        </button>
      </div>
    </div>

    <div class="mt-4 grid gap-4 sm:grid-cols-2">
      <div>
        <p class="mb-1.5 text-xs font-medium uppercase tracking-wide text-ink-soft">{{ tp('inputLabel') }}</p>
        <textarea v-model="input" rows="14" :placeholder="placeholderText"
          class="w-full resize-y rounded-md border border-slate-200 bg-white p-4 font-mono text-xs text-ink placeholder:text-ink-soft focus:outline-none focus-visible:ring-2 focus-visible:ring-accent" />
      </div>
      <div>
        <p class="mb-1.5 text-xs font-medium uppercase tracking-wide text-ink-soft">{{ tp('outputLabel') }}</p>
        <textarea :value="formatted" readonly rows="14"
          class="w-full resize-y rounded-md border border-slate-200 bg-slate-50 p-4 font-mono text-xs text-ink focus:outline-none" />
      </div>
    </div>

    <p v-if="error" class="mt-3 rounded-md border border-red-200 bg-red-50 px-4 py-2.5 text-sm text-red-700">
      {{ error }}
    </p>

    <div class="mt-4 flex flex-wrap items-center gap-3">
      <button class="rounded-md bg-accent px-4 py-2.5 text-sm font-medium text-white hover:brightness-95"
        @click="copyFormatted">
        {{ tp('copyFormattedButton') }}
      </button>
      <button v-if="mode === 'json'"
        class="rounded-md border border-slate-300 bg-white px-4 py-2.5 text-sm font-medium text-ink hover:bg-slate-50"
        @click="copyMinified">
        {{ tp('copyMinifiedButton') }}
      </button>
      <button
        class="rounded-md border border-slate-300 bg-white px-4 py-2.5 text-sm font-medium text-ink hover:bg-slate-50"
        @click="downloadResult">
        {{ tp('downloadButton') }}
      </button>
      <button
        class="rounded-md border border-slate-300 bg-white px-4 py-2.5 text-sm font-medium text-ink hover:bg-slate-50"
        @click="clearInput">
        {{ t('common.clear') }}
      </button>
    </div>

    <p class="mt-3.5 text-sm text-ink-soft">
      <span class="mr-1.5 inline-block h-1.5 w-1.5 rounded-full bg-accent align-middle" />
      {{ t('common.privacyNoteData') }}
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
