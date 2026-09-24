<script setup lang="ts">
const { t, tm, rt } = useI18n()
const { url: siteUrl } = useSiteConfig()

const slug = 'percentage'
const categorySlug = 'productivity'

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
  { href: '/office-tools/productivity/business-days' },
  { href: '/office-tools/productivity/date-difference' },
  { href: '/office-tools/productivity/working-hours' },
  { href: '/office-tools/productivity/time-calculator' },
]

const { mode, valueA, valueB, operation, result } = usePercentageCalculator()

const modeButtons = computed(() => percentageModes.map((m) => ({ value: m.value, label: tp(`modes.${m.value}`) })))

const labelA = computed(() => tp(`labelA.${mode.value}`))
const labelB = computed(() => tp(`labelB.${mode.value}`))

const resultLabel = computed(() => {
  if (mode.value === 'addSubtract') {
    return operation.value === 'add' ? tp('resultLabelAdd') : tp('resultLabelSubtract')
  }
  return tp(`resultLabel.${mode.value}`)
})

const resultDisplay = computed(() => {
  if (result.value === null) return '—'
  const rounded = Math.round(result.value * 100) / 100
  if (mode.value === 'isWhatPercent' || mode.value === 'change') return `${rounded}%`
  return `${rounded}`
})

const changeDirection = computed(() => {
  if (mode.value !== 'change' || result.value === null) return null
  if (result.value > 0) return tp('directionUp')
  if (result.value < 0) return tp('directionDown')
  return null
})

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
          { '@type': 'ListItem', position: 3, name: categoryName(), item: `${siteUrl}/office-tools/productivity` },
          { '@type': 'ListItem', position: 4, name: toolName(), item: `${siteUrl}/office-tools/productivity/${slug}` },
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
      <NuxtLinkLocale to="/office-tools/productivity" class="hover:text-accent-dark">{{ categoryName() }}
      </NuxtLinkLocale> /
      {{ toolName() }}
    </p>

    <h1 class="mt-3 max-w-[24ch] text-3xl font-semibold leading-tight text-ink sm:text-4xl">{{ tp('title') }}</h1>
    <p class="mt-2 max-w-[52ch] text-base text-ink-soft">{{ tp('lede') }}</p>

    <div class="mt-7 flex flex-wrap gap-2">
      <button v-for="opt in modeButtons" :key="opt.value"
        class="rounded-md border px-3.5 py-2 text-sm font-medium transition-colors"
        :class="mode === opt.value ? 'border-accent bg-accent text-white' : 'border-slate-300 bg-white text-ink hover:bg-slate-50'"
        @click="mode = opt.value">
        {{ opt.label }}
      </button>
    </div>

    <div class="mt-5 rounded-md border border-slate-200 bg-white p-6">
      <div class="grid gap-4 sm:grid-cols-2">
        <div>
          <label class="mb-1.5 block text-xs font-medium uppercase tracking-wide text-ink-soft">{{ labelA }}</label>
          <input v-model.number="valueA" type="number"
            class="w-full rounded-md border border-slate-300 px-3.5 py-2.5 text-base text-ink focus:outline-none focus-visible:ring-2 focus-visible:ring-accent">
        </div>
        <div>
          <label class="mb-1.5 block text-xs font-medium uppercase tracking-wide text-ink-soft">{{ labelB }}</label>
          <input v-model.number="valueB" type="number"
            class="w-full rounded-md border border-slate-300 px-3.5 py-2.5 text-base text-ink focus:outline-none focus-visible:ring-2 focus-visible:ring-accent">
        </div>
      </div>

      <div v-if="mode === 'addSubtract'" class="mt-4 flex gap-4">
        <label class="flex cursor-pointer items-center gap-2 text-sm text-ink-soft">
          <input v-model="operation" type="radio" value="add" class="text-accent focus:ring-accent">
          {{ tp('operationAdd') }}
        </label>
        <label class="flex cursor-pointer items-center gap-2 text-sm text-ink-soft">
          <input v-model="operation" type="radio" value="subtract" class="text-accent focus:ring-accent">
          {{ tp('operationSubtract') }}
        </label>
      </div>

      <div class="mt-6 border-t border-slate-200 pt-5">
        <p class="text-xs font-medium uppercase tracking-wide text-ink-soft">{{ resultLabel }}</p>
        <p class="mt-1 font-mono text-3xl font-medium text-accent-dark">
          {{ resultDisplay }}
          <span v-if="changeDirection" class="text-base text-ink-soft">({{ changeDirection }})</span>
        </p>
      </div>
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
