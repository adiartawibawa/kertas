<script setup lang="ts">
const { t, tm, rt } = useI18n()

const text = ref('')
const { previewRows, isConverting, error, downloadXlsx } = useCsvToXlsx(text)

async function onFiles(files: File[]) {
  const file = files[0]
  if (!file) return
  text.value = await file.text()
}

function clearAll() {
  text.value = ''
}

const features = computed(() =>
  (tm('toolPages.csv-to-xlsx.features') as { title: string; description: string }[]).map((item) => ({
    title: rt(item.title),
    description: rt(item.description),
  })),
)
const steps = computed(() => (tm('toolPages.csv-to-xlsx.steps') as string[]).map((item) => rt(item)))
const useCase = computed(() => (tm('toolPages.csv-to-xlsx.useCase') as string[]).map((item) => rt(item)))
const faqItems = computed(() =>
  (tm('toolPages.csv-to-xlsx.faq') as { question: string; answer: string }[]).map((item) => ({
    question: rt(item.question),
    answer: rt(item.answer),
  })),
)

const relatedTools = computed(() => [
  { name: t('tools.xlsx-to-csv'), href: '/office-tools/spreadsheet/xlsx-to-csv' },
  { name: t('tools.csv-viewer'), href: '/office-tools/spreadsheet/csv-viewer' },
  { name: t('tools.csv-cleaner'), href: '/office-tools/spreadsheet/csv-cleaner' },
  { name: t('tools.csv-merger'), href: '/office-tools/spreadsheet/csv-merger' },
])

useSeoMeta({
  title: () => t('toolPages.csv-to-xlsx.seoTitle'),
  description: () => t('toolPages.csv-to-xlsx.seoDescription'),
})

useHead(() => ({
  script: [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'SoftwareApplication',
        name: t('toolPages.csv-to-xlsx.schemaName'),
        applicationCategory: 'UtilitiesApplication',
        operatingSystem: 'Any (Web Browser)',
        offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
        description: t('toolPages.csv-to-xlsx.schemaDescription'),
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
  ],
}))
</script>

<template>
  <div>
    <p class="pt-7 text-sm text-ink-soft">
      <NuxtLinkLocale to="/" class="hover:text-accent-dark">{{ t('common.breadcrumbHome') }}</NuxtLinkLocale> /
      <NuxtLinkLocale to="/office-tools" class="hover:text-accent-dark">{{ t('common.breadcrumbOfficeTools') }}
      </NuxtLinkLocale> /
      <NuxtLinkLocale to="/office-tools/spreadsheet" class="hover:text-accent-dark">{{ t('nav.spreadsheet') }}
      </NuxtLinkLocale> /
      {{ t('tools.csv-to-xlsx') }}
    </p>

    <h1 class="mt-3 max-w-[24ch] text-3xl font-semibold leading-tight text-ink sm:text-4xl">
      {{ t('toolPages.csv-to-xlsx.title') }}
    </h1>
    <p class="mt-2 max-w-[52ch] text-base text-ink-soft">
      {{ t('toolPages.csv-to-xlsx.lede') }}
    </p>

    <div class="mt-7">
      <FileDropzone accept=".csv,text/csv" :label="t('toolPages.csv-to-xlsx.dropzoneLabel')" @files="onFiles" />
    </div>

    <div v-if="previewRows.length > 0" class="mt-5 max-h-72 overflow-auto rounded-md border border-slate-200 bg-white">
      <table class="w-full text-left text-sm">
        <tbody>
          <tr v-for="(row, ri) in previewRows.slice(0, 8)" :key="ri" class="border-b border-slate-100 last:border-b-0">
            <td v-for="(cell, ci) in row" :key="ci" class="px-3 py-2 text-ink">{{ cell }}</td>
          </tr>
        </tbody>
      </table>
    </div>

    <p v-if="error" class="mt-3 rounded-md border border-red-200 bg-red-50 px-4 py-2.5 text-sm text-red-700">
      {{ error }}
    </p>

    <div class="mt-4 flex flex-wrap items-center gap-3">
      <button
        class="rounded-md bg-accent px-4 py-2.5 text-sm font-medium text-white hover:brightness-95 disabled:opacity-50"
        :disabled="previewRows.length === 0 || isConverting" @click="downloadXlsx()">
        {{ isConverting ? t('common.converting') : t('toolPages.csv-to-xlsx.downloadButton') }}
      </button>
      <button
        class="rounded-md border border-slate-300 bg-white px-4 py-2.5 text-sm font-medium text-ink hover:bg-slate-50"
        @click="clearAll">
        {{ t('common.clear') }}
      </button>
      <span v-if="previewRows.length > 0" class="text-sm text-ink-soft">
        {{ t('toolPages.csv-to-xlsx.dataRowsLabel', { count: Math.max(0, previewRows.length - 1) }) }}
      </span>
    </div>

    <p class="mt-3.5 text-sm text-ink-soft">
      <span class="mr-1.5 inline-block h-1.5 w-1.5 rounded-full bg-accent align-middle" />
      {{ t('common.privacyNoteFile') }}
    </p>

    <section class="mt-14">
      <h2 class="text-xl font-semibold text-ink">{{ t('toolPages.csv-to-xlsx.featuresTitle') }}</h2>
      <ul class="mt-4 grid gap-3.5">
        <li v-for="(feature, i) in features" :key="i" class="border-l-2 border-accent pl-4 text-sm text-ink-soft">
          <strong class="font-semibold text-ink">{{ feature.title }}.</strong>
          {{ feature.description }}
        </li>
      </ul>
    </section>

    <section class="mt-14">
      <h2 class="text-xl font-semibold text-ink">{{ t('toolPages.csv-to-xlsx.howToTitle') }}</h2>
      <ol class="mt-4 grid list-decimal gap-2.5 pl-5 marker:font-mono marker:text-accent-dark">
        <li v-for="(step, i) in steps" :key="i" class="text-sm text-ink-soft">{{ step }}</li>
      </ol>
    </section>

    <section class="mt-14">
      <h2 class="text-xl font-semibold text-ink">{{ t('toolPages.csv-to-xlsx.useCaseTitle') }}</h2>
      <div class="mt-4 grid gap-3.5">
        <p v-for="(item, i) in useCase" :key="i" class="max-w-[62ch] text-sm text-ink-soft">
          {{ item }}
        </p>
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
