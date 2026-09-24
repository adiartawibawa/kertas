<script setup lang="ts">
const { t, tm, rt } = useI18n()
const { url: siteUrl } = useSiteConfig()

const slug = 'time-calculator'
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
  { href: '/office-tools/productivity/percentage' },
  { href: '/office-tools/productivity/business-days' },
  { href: '/office-tools/productivity/date-difference' },
  { href: '/office-tools/productivity/working-hours' },
]

const {
  mode,
  durations,
  addDuration,
  removeDuration,
  totalMinutesSum,
  startTime,
  durationHours,
  durationMinutes,
  resultClock,
} = useTimeCalculator()

const sumFormatted = computed(() => {
  const h = Math.floor(totalMinutesSum.value / 60)
  const m = totalMinutesSum.value % 60
  return tp('sumFormat', { h, m })
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
      <button class="rounded-md border px-3.5 py-2 text-sm font-medium transition-colors"
        :class="mode === 'sum' ? 'border-accent bg-accent text-white' : 'border-slate-300 bg-white text-ink hover:bg-slate-50'"
        @click="mode = 'sum'">
        {{ tp('modeSumLabel') }}
      </button>
      <button class="rounded-md border px-3.5 py-2 text-sm font-medium transition-colors"
        :class="mode === 'addToClock' ? 'border-accent bg-accent text-white' : 'border-slate-300 bg-white text-ink hover:bg-slate-50'"
        @click="mode = 'addToClock'">
        {{ tp('modeAddToClockLabel') }}
      </button>
    </div>

    <div class="mt-5 rounded-md border border-slate-200 bg-white p-6">
      <template v-if="mode === 'sum'">
        <div class="grid gap-3">
          <div v-for="duration in durations" :key="duration.id" class="flex items-center gap-3">
            <input v-model.number="duration.hours" type="number" min="0"
              class="w-20 rounded-md border border-slate-300 px-2.5 py-2 text-sm text-ink focus:outline-none focus-visible:ring-2 focus-visible:ring-accent">
            <span class="text-sm text-ink-soft">{{ tp('hoursUnitLabel') }}</span>
            <input v-model.number="duration.minutes" type="number" min="0" max="59"
              class="w-20 rounded-md border border-slate-300 px-2.5 py-2 text-sm text-ink focus:outline-none focus-visible:ring-2 focus-visible:ring-accent">
            <span class="text-sm text-ink-soft">{{ tp('minutesUnitLabel') }}</span>
            <button v-if="durations.length > 1" class="ml-auto text-ink-soft hover:text-red-600"
              aria-label="Hapus durasi" @click="removeDuration(duration.id)">
              ✕
            </button>
          </div>
        </div>

        <button
          class="mt-4 rounded-md border border-slate-300 bg-white px-4 py-2.5 text-sm font-medium text-ink hover:bg-slate-50"
          @click="addDuration">
          {{ tp('addDurationButton') }}
        </button>

        <div class="mt-6 border-t border-slate-200 pt-5">
          <p class="text-xs font-medium uppercase tracking-wide text-ink-soft">{{ tp('totalDurationLabel') }}</p>
          <p class="mt-1 font-mono text-3xl font-medium text-accent-dark">{{ sumFormatted }}</p>
        </div>
      </template>

      <template v-else>
        <div class="grid gap-4 sm:grid-cols-3">
          <div>
            <label class="mb-1.5 block text-xs font-medium uppercase tracking-wide text-ink-soft">{{
              tp('startTimeLabel') }}</label>
            <input v-model="startTime" type="time"
              class="w-full rounded-md border border-slate-300 px-3.5 py-2.5 text-base text-ink focus:outline-none focus-visible:ring-2 focus-visible:ring-accent">
          </div>
          <div>
            <label class="mb-1.5 block text-xs font-medium uppercase tracking-wide text-ink-soft">{{ tp('addHoursLabel')
              }}</label>
            <input v-model.number="durationHours" type="number" min="0"
              class="w-full rounded-md border border-slate-300 px-3.5 py-2.5 text-base text-ink focus:outline-none focus-visible:ring-2 focus-visible:ring-accent">
          </div>
          <div>
            <label class="mb-1.5 block text-xs font-medium uppercase tracking-wide text-ink-soft">{{
              tp('addMinutesLabel') }}</label>
            <input v-model.number="durationMinutes" type="number" min="0" max="59"
              class="w-full rounded-md border border-slate-300 px-3.5 py-2.5 text-base text-ink focus:outline-none focus-visible:ring-2 focus-visible:ring-accent">
          </div>
        </div>

        <div class="mt-6 border-t border-slate-200 pt-5">
          <p class="text-xs font-medium uppercase tracking-wide text-ink-soft">{{ tp('resultTimeLabel') }}</p>
          <p class="mt-1 font-mono text-3xl font-medium text-accent-dark">
            {{ resultClock?.time ?? '—' }}
            <span v-if="resultClock && resultClock.daysOver > 0" class="text-base text-ink-soft">
              {{ tp('daysOverLabel', { count: resultClock.daysOver }) }}
            </span>
          </p>
        </div>
      </template>
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
