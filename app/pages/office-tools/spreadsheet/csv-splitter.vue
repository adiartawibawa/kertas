<script setup lang="ts">
const { t, tm, rt } = useI18n()

const text = ref('')
const { mode, rowsPerFile, fileCount, keepHeaderInEachFile, parts, totalRows } = useCsvSplitter(text)

async function onFiles(files: File[]) {
  const file = files[0]
  if (!file) return
  text.value = await file.text()
}

function downloadPart(name: string, csv: string) {
  downloadTextFile(name, csv, 'text/csv')
}

function downloadAll() {
  parts.value.forEach((part) => downloadTextFile(part.name, part.csv, 'text/csv'))
}

function clearAll() {
  text.value = ''
}

const features = computed(() =>
  (tm('toolPages.csv-splitter.features') as { title: string; description: string }[]).map((item) => ({
    title: rt(item.title),
    description: rt(item.description),
  })),
)
const steps = computed(() => (tm('toolPages.csv-splitter.steps') as string[]).map((item) => rt(item)))
const useCase = computed(() => (tm('toolPages.csv-splitter.useCase') as string[]).map((item) => rt(item)))
const faqItems = computed(() =>
  (tm('toolPages.csv-splitter.faq') as { question: string; answer: string }[]).map((item) => ({
    question: rt(item.question),
    answer: rt(item.answer),
  })),
)

const relatedTools = computed(() => [
  { name: t('tools.csv-viewer'), href: '/office-tools/spreadsheet/csv-viewer' },
  { name: t('tools.csv-cleaner'), href: '/office-tools/spreadsheet/csv-cleaner' },
  { name: t('tools.csv-merger'), href: '/office-tools/spreadsheet/csv-merger' },
  { name: t('tools.csv-to-xlsx'), href: '/office-tools/spreadsheet/csv-to-xlsx' },
])

useSeoMeta({
  title: () => t('toolPages.csv-splitter.seoTitle'),
  description: () => t('toolPages.csv-splitter.seoDescription'),
})

useHead(() => ({
  script: [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'SoftwareApplication',
        name: t('toolPages.csv-splitter.schemaName'),
        applicationCategory: 'UtilitiesApplication',
        operatingSystem: 'Any (Web Browser)',
        offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
        description: t('toolPages.csv-splitter.schemaDescription'),
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
      {{ t('tools.csv-splitter') }}
    </p>

    <h1 class="mt-3 max-w-[24ch] text-3xl font-semibold leading-tight text-ink sm:text-4xl">
      {{ t('toolPages.csv-splitter.title') }}
    </h1>
    <p class="mt-2 max-w-[52ch] text-base text-ink-soft">
      {{ t('toolPages.csv-splitter.lede') }}
    </p>

    <div class="mt-7">
      <FileDropzone accept=".csv,text/csv" :label="t('toolPages.csv-splitter.dropzoneLabel')" @files="onFiles" />
    </div>

    <div v-if="totalRows > 0" class="mt-5 rounded-md border border-slate-200 bg-white p-4">
      <div class="flex flex-wrap gap-2">
        <button class="rounded-md border px-3.5 py-2 text-sm font-medium transition-colors"
          :class="mode === 'rowsPerFile' ? 'border-accent bg-accent text-white' : 'border-slate-300 bg-white text-ink hover:bg-slate-50'"
          @click="mode = 'rowsPerFile'">
          {{ t('toolPages.csv-splitter.modeRowsLabel') }}
        </button>
        <button class="rounded-md border px-3.5 py-2 text-sm font-medium transition-colors"
          :class="mode === 'fileCount' ? 'border-accent bg-accent text-white' : 'border-slate-300 bg-white text-ink hover:bg-slate-50'"
          @click="mode = 'fileCount'">
          {{ t('toolPages.csv-splitter.modeFilesLabel') }}
        </button>
      </div>

      <div class="mt-4 flex flex-wrap items-end gap-4">
        <div v-if="mode === 'rowsPerFile'">
          <label class="mb-1.5 block text-xs font-medium uppercase tracking-wide text-ink-soft">{{
            t('toolPages.csv-splitter.rowsPerFileLabel') }}</label>
          <input v-model.number="rowsPerFile" type="number" min="1"
            class="w-32 rounded-md border border-slate-300 px-3 py-2 text-sm text-ink focus:outline-none focus-visible:ring-2 focus-visible:ring-accent">
        </div>
        <div v-else>
          <label class="mb-1.5 block text-xs font-medium uppercase tracking-wide text-ink-soft">{{
            t('toolPages.csv-splitter.fileCountLabel') }}</label>
          <input v-model.number="fileCount" type="number" min="1"
            class="w-32 rounded-md border border-slate-300 px-3 py-2 text-sm text-ink focus:outline-none focus-visible:ring-2 focus-visible:ring-accent">
        </div>
        <OptionToggle v-model="keepHeaderInEachFile" :label="t('toolPages.csv-splitter.keepHeaderLabel')" />
      </div>

      <p class="mt-3 text-sm text-ink-soft">{{ t('toolPages.csv-splitter.splitSummary', {
        rows: totalRows, files:
          parts.length }) }}</p>
    </div>

    <div v-if="parts.length > 0" class="mt-5 overflow-hidden rounded-md border border-slate-200 bg-white">
      <div v-for="part in parts" :key="part.name"
        class="flex items-center justify-between border-b border-slate-100 px-4 py-3 last:border-b-0">
        <div>
          <p class="text-sm font-medium text-ink">{{ part.name }}</p>
          <p class="text-xs text-ink-soft">{{ t('common.rowsCount', { rows: part.rowCount }) }}</p>
        </div>
        <button
          class="rounded-md border border-slate-300 bg-white px-3.5 py-2 text-sm font-medium text-ink hover:bg-slate-50"
          @click="downloadPart(part.name, part.csv)">
          {{ t('toolPages.csv-splitter.downloadPartButton') }}
        </button>
      </div>
    </div>

    <div v-if="parts.length > 0" class="mt-4 flex flex-wrap items-center gap-3">
      <button class="rounded-md bg-accent px-4 py-2.5 text-sm font-medium text-white hover:brightness-95"
        @click="downloadAll">
        {{ t('toolPages.csv-splitter.downloadAllButton', { count: parts.length }) }}
      </button>
      <button
        class="rounded-md border border-slate-300 bg-white px-4 py-2.5 text-sm font-medium text-ink hover:bg-slate-50"
        @click="clearAll">
        {{ t('common.clear') }}
      </button>
    </div>

    <p class="mt-3.5 text-sm text-ink-soft">
      <span class="mr-1.5 inline-block h-1.5 w-1.5 rounded-full bg-accent align-middle" />
      {{ t('common.privacyNoteFile') }}
    </p>

    <section class="mt-14">
      <h2 class="text-xl font-semibold text-ink">{{ t('toolPages.csv-splitter.featuresTitle') }}</h2>
      <ul class="mt-4 grid gap-3.5">
        <li v-for="(feature, i) in features" :key="i" class="border-l-2 border-accent pl-4 text-sm text-ink-soft">
          <strong class="font-semibold text-ink">{{ feature.title }}.</strong>
          {{ feature.description }}
        </li>
      </ul>
    </section>

    <section class="mt-14">
      <h2 class="text-xl font-semibold text-ink">{{ t('toolPages.csv-splitter.howToTitle') }}</h2>
      <ol class="mt-4 grid list-decimal gap-2.5 pl-5 marker:font-mono marker:text-accent-dark">
        <li v-for="(step, i) in steps" :key="i" class="text-sm text-ink-soft">{{ step }}</li>
      </ol>
    </section>

    <section class="mt-14">
      <h2 class="text-xl font-semibold text-ink">{{ t('toolPages.csv-splitter.useCaseTitle') }}</h2>
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
