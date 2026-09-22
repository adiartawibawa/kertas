<script setup lang="ts">
const { t, tm, rt } = useI18n()
const { url: siteUrl } = useSiteConfig()

const slug = 'pdf-split'
const categorySlug = 'pdf'

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
  { href: '/office-tools/pdf/pdf-merge' },
  { href: '/office-tools/pdf/pdf-extract-pages' },
  { href: '/office-tools/pdf/pdf-rotate' },
  { href: '/office-tools/pdf/pdf-compress' },
  { href: '/office-tools/pdf/pdf-to-text' },
]

const { mode, rangesInput, totalPages, parts, isProcessing, error, setFile, runSplit } = usePdfSplit()

function onFiles(files: File[]) {
  const file = files[0]
  if (file) setFile(file)
}

function downloadPart(name: string, bytes: Uint8Array) {
  downloadBinaryFile(name, bytes, 'application/pdf')
}

function downloadAll() {
  parts.value.forEach((part) => downloadBinaryFile(part.name, part.bytes, 'application/pdf'))
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
          { '@type': 'ListItem', position: 3, name: categoryName(), item: `${siteUrl}/office-tools/pdf` },
          { '@type': 'ListItem', position: 4, name: toolName(), item: `${siteUrl}/office-tools/pdf/${slug}` },
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
      <NuxtLinkLocale to="/office-tools/pdf" class="hover:text-accent-dark">{{ categoryName() }}</NuxtLinkLocale> /
      {{ toolName() }}
    </p>

    <h1 class="mt-3 max-w-3xl text-3xl font-semibold leading-tight text-ink sm:text-4xl">{{ tp('title') }}</h1>
    <p class="mt-2 max-w-4xl text-base text-ink-soft">{{ tp('lede') }}</p>

    <div class="mt-7">
      <FileDropzone accept="application/pdf" :label="t('common.dropzoneLabel')" @files="onFiles" />
    </div>

    <p v-if="error" class="mt-3 rounded-md border border-red-200 bg-red-50 px-4 py-2.5 text-sm text-red-700">
      {{ error }}
    </p>

    <div v-if="totalPages > 0" class="mt-5 rounded-md border border-slate-200 bg-white p-4">
      <p class="text-sm text-ink-soft">{{ tp('pageCountLabel', { count: totalPages }) }}</p>

      <div class="mt-3 flex flex-wrap gap-2">
        <button class="rounded-md border px-3.5 py-2 text-sm font-medium transition-colors"
          :class="mode === 'allPages' ? 'border-accent bg-accent text-white' : 'border-slate-300 bg-white text-ink hover:bg-slate-50'"
          @click="mode = 'allPages'">
          {{ tp('modeAllPagesLabel') }}
        </button>
        <button class="rounded-md border px-3.5 py-2 text-sm font-medium transition-colors"
          :class="mode === 'ranges' ? 'border-accent bg-accent text-white' : 'border-slate-300 bg-white text-ink hover:bg-slate-50'"
          @click="mode = 'ranges'">
          {{ tp('modeRangesLabel') }}
        </button>
      </div>

      <div v-if="mode === 'ranges'" class="mt-4">
        <label class="mb-1.5 block text-xs font-medium uppercase tracking-wide text-ink-soft">
          {{ tp('rangesInputLabel') }}
        </label>
        <textarea v-model="rangesInput" rows="4"
          class="w-full rounded-md border border-slate-300 px-3.5 py-2.5 font-mono text-sm text-ink focus:outline-none focus-visible:ring-2 focus-visible:ring-accent" />
      </div>

      <button
        class="mt-4 rounded-md bg-accent px-4 py-2.5 text-sm font-medium text-white hover:brightness-95 disabled:opacity-50"
        :disabled="isProcessing" @click="runSplit">
        {{ isProcessing ? t('common.processing') : tp('runButton') }}
      </button>
    </div>

    <div v-if="parts.length > 0" class="mt-5 overflow-hidden rounded-md border border-slate-200 bg-white">
      <div v-for="part in parts" :key="part.name"
        class="flex items-center justify-between border-b border-slate-100 px-4 py-3 last:border-b-0">
        <div>
          <p class="text-sm font-medium text-ink">{{ part.name }}</p>
          <p class="text-xs text-ink-soft">{{ tp('pageCountShort', { count: part.pageCount }) }}</p>
        </div>
        <button
          class="rounded-md border border-slate-300 bg-white px-3.5 py-2 text-sm font-medium text-ink hover:bg-slate-50"
          @click="downloadPart(part.name, part.bytes)">
          {{ t('common.downloadResult') }}
        </button>
      </div>
    </div>

    <div v-if="parts.length > 0" class="mt-4">
      <button
        class="rounded-md border border-slate-300 bg-white px-4 py-2.5 text-sm font-medium text-ink hover:bg-slate-50"
        @click="downloadAll">
        {{ tp('downloadAllButton', { count: parts.length }) }}
      </button>
    </div>

    <p class="mt-3.5 text-sm text-ink-soft">
      <span class="mr-1.5 inline-block h-1.5 w-1.5 rounded-full bg-accent align-middle" />
      {{ t('common.privacyNoteFile') }}
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
        <p v-for="paragraph in useCase" :key="paragraph" class="max-w-5xl text-sm text-ink-soft">{{ paragraph }}</p>
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
