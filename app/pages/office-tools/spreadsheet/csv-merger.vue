<script setup lang="ts">
const { t, tm, rt } = useI18n()

const { files, addFiles, removeFile, mergedCsv, totalRows, error } = useCsvMerger()

function onFiles(fileList: File[]) {
  addFiles(fileList)
}

function copyResult() {
  if (import.meta.client && navigator.clipboard && mergedCsv.value) {
    navigator.clipboard.writeText(mergedCsv.value).catch(() => { })
  }
}

function downloadResult() {
  if (mergedCsv.value) downloadTextFile('merged.csv', mergedCsv.value, 'text/csv')
}

function clearAll() {
  files.value = []
}

const features = computed(() =>
  (tm('toolPages.csv-merger.features') as { title: string; description: string }[]).map((item) => ({
    title: rt(item.title),
    description: rt(item.description),
  })),
)
const steps = computed(() => (tm('toolPages.csv-merger.steps') as string[]).map((item) => rt(item)))
const useCase = computed(() => (tm('toolPages.csv-merger.useCase') as string[]).map((item) => rt(item)))
const faqItems = computed(() =>
  (tm('toolPages.csv-merger.faq') as { question: string; answer: string }[]).map((item) => ({
    question: rt(item.question),
    answer: rt(item.answer),
  })),
)

const relatedTools = computed(() => [
  { name: t('tools.csv-viewer'), href: '/office-tools/spreadsheet/csv-viewer' },
  { name: t('tools.csv-cleaner'), href: '/office-tools/spreadsheet/csv-cleaner' },
  { name: t('tools.csv-splitter'), href: '/office-tools/spreadsheet/csv-splitter' },
  { name: t('tools.csv-to-xlsx'), href: '/office-tools/spreadsheet/csv-to-xlsx' },
])

useSeoMeta({
  title: () => t('toolPages.csv-merger.seoTitle'),
  description: () => t('toolPages.csv-merger.seoDescription'),
})

useHead(() => ({
  script: [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'SoftwareApplication',
        name: t('toolPages.csv-merger.schemaName'),
        applicationCategory: 'UtilitiesApplication',
        operatingSystem: 'Any (Web Browser)',
        offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
        description: t('toolPages.csv-merger.schemaDescription'),
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
      {{ t('tools.csv-merger') }}
    </p>

    <h1 class="mt-3 max-w-[24ch] text-3xl font-semibold leading-tight text-ink sm:text-4xl">
      {{ t('toolPages.csv-merger.title') }}
    </h1>
    <p class="mt-2 max-w-[52ch] text-base text-ink-soft">
      {{ t('toolPages.csv-merger.lede') }}
    </p>

    <div class="mt-7">
      <FileDropzone accept=".csv,text/csv" :multiple="true" :label="t('toolPages.csv-merger.dropzoneLabel')"
        @files="onFiles" />
    </div>

    <p v-if="error" class="mt-3 rounded-md border border-red-200 bg-red-50 px-4 py-2.5 text-sm text-red-700">
      {{ error }}
    </p>

    <div v-if="files.length > 0" class="mt-5 overflow-hidden rounded-md border border-slate-200 bg-white">
      <div v-for="file in files" :key="file.name"
        class="flex items-center justify-between border-b border-slate-100 px-4 py-3 last:border-b-0">
        <div>
          <p class="text-sm font-medium text-ink">{{ file.name }}</p>
          <p class="text-xs text-ink-soft">{{ t('common.rowsCount', { rows: Math.max(0, file.rows.length - 1) }) }}</p>
        </div>
        <button class="text-ink-soft hover:text-red-600" :aria-label="t('toolPages.csv-merger.removeFileLabel')"
          @click="removeFile(file.name)">
          ✕
        </button>
      </div>
    </div>

    <div v-if="mergedCsv" class="mt-5">
      <p class="mb-1.5 text-xs font-medium uppercase tracking-wide text-ink-soft">{{
        t('toolPages.csv-merger.resultLabel') }}</p>
      <textarea :value="mergedCsv" readonly rows="10"
        class="w-full resize-y rounded-md border border-slate-200 bg-slate-50 p-4 font-mono text-xs text-ink focus:outline-none" />
    </div>

    <div class="mt-4 flex flex-wrap items-center gap-3">
      <button class="rounded-md bg-accent px-4 py-2.5 text-sm font-medium text-white hover:brightness-95"
        @click="copyResult">
        {{ t('common.copyResult') }}
      </button>
      <button
        class="rounded-md border border-slate-300 bg-white px-4 py-2.5 text-sm font-medium text-ink hover:bg-slate-50"
        @click="downloadResult">
        {{ t('common.downloadCsv') }}
      </button>
      <button
        class="rounded-md border border-slate-300 bg-white px-4 py-2.5 text-sm font-medium text-ink hover:bg-slate-50"
        @click="clearAll">
        {{ t('toolPages.csv-merger.clearAllButton') }}
      </button>
      <span v-if="totalRows > 0" class="text-sm text-ink-soft">{{ t('toolPages.csv-merger.totalRowsLabel', {
        count:
          totalRows }) }}</span>
    </div>

    <p class="mt-3.5 text-sm text-ink-soft">
      <span class="mr-1.5 inline-block h-1.5 w-1.5 rounded-full bg-accent align-middle" />
      {{ t('common.privacyNoteFile') }}
    </p>

    <section class="mt-14">
      <h2 class="text-xl font-semibold text-ink">{{ t('toolPages.csv-merger.featuresTitle') }}</h2>
      <ul class="mt-4 grid gap-3.5">
        <li v-for="(feature, i) in features" :key="i" class="border-l-2 border-accent pl-4 text-sm text-ink-soft">
          <strong class="font-semibold text-ink">{{ feature.title }}.</strong>
          {{ feature.description }}
        </li>
      </ul>
    </section>

    <section class="mt-14">
      <h2 class="text-xl font-semibold text-ink">{{ t('toolPages.csv-merger.howToTitle') }}</h2>
      <ol class="mt-4 grid list-decimal gap-2.5 pl-5 marker:font-mono marker:text-accent-dark">
        <li v-for="(step, i) in steps" :key="i" class="text-sm text-ink-soft">{{ step }}</li>
      </ol>
    </section>

    <section class="mt-14">
      <h2 class="text-xl font-semibold text-ink">{{ t('toolPages.csv-merger.useCaseTitle') }}</h2>
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
