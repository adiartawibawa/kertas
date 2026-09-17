<script setup lang="ts">
const { mode, valueA, valueB, operation, result } = usePercentageCalculator()

const labelA = computed(() => {
  switch (mode.value) {
    case 'of':
      return 'Persentase (%)'
    case 'isWhatPercent':
      return 'Angka'
    case 'change':
      return 'Nilai awal'
    case 'addSubtract':
      return 'Persentase (%)'
    default:
      return 'Nilai A'
  }
})

const labelB = computed(() => {
  switch (mode.value) {
    case 'of':
      return 'Dari angka'
    case 'isWhatPercent':
      return 'Dari total'
    case 'change':
      return 'Nilai akhir'
    case 'addSubtract':
      return 'Dari angka'
    default:
      return 'Nilai B'
  }
})

const resultLabel = computed(() => {
  switch (mode.value) {
    case 'of':
      return 'Hasil'
    case 'isWhatPercent':
      return 'Persentase'
    case 'change':
      return 'Perubahan'
    case 'addSubtract':
      return operation.value === 'add' ? 'Hasil setelah ditambah' : 'Hasil setelah dikurangi'
    default:
      return 'Hasil'
  }
})

const resultDisplay = computed(() => {
  if (result.value === null) return '—'
  const rounded = Math.round(result.value * 100) / 100
  if (mode.value === 'isWhatPercent' || mode.value === 'change') return `${rounded}%`
  return `${rounded}`
})

const changeDirection = computed(() => {
  if (mode.value !== 'change' || result.value === null) return null
  if (result.value > 0) return 'naik'
  if (result.value < 0) return 'turun'
  return 'tetap'
})

const faqItems = [
  {
    question: 'Bagaimana rumus "X% dari Y"?',
    answer: 'Rumusnya adalah (X ÷ 100) × Y. Misalnya 20% dari 150.000 = (20 ÷ 100) × 150.000 = 30.000.',
  },
  {
    question: 'Bagaimana menghitung persentase kenaikan atau penurunan?',
    answer:
      'Gunakan mode "Persentase perubahan": masukkan nilai awal dan nilai akhir. Hasil positif berarti naik, hasil negatif berarti turun.',
  },
  {
    question: 'Bisakah menghitung diskon atau kenaikan harga sekaligus?',
    answer:
      'Bisa, gunakan mode "Tambah/Kurang %". Pilih "Kurang" untuk menghitung harga setelah diskon, atau "Tambah" untuk menghitung harga setelah kenaikan.',
  },
  {
    question: 'Apakah data yang saya masukkan disimpan?',
    answer: 'Tidak. Semua perhitungan berjalan langsung di browser Anda, tidak ada data yang dikirim ke server.',
  },
]

const relatedTools = [
  { name: 'Business Days', href: '/office-tools/productivity/business-days' },
  { name: 'Date Difference', href: '/office-tools/productivity/date-difference' },
  { name: 'Working Hours', href: '/office-tools/productivity/working-hours' },
  { name: 'Time Calculator', href: '/office-tools/productivity/time-calculator' },
]

useSeoMeta({
  title: 'Percentage Calculator Online — Hitung Persentase Gratis',
  description:
    'Hitung persentase dari suatu angka, persentase perubahan, atau tambah/kurang persentase secara instan di browser Anda.',
})

useHead({
  script: [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'SoftwareApplication',
        name: 'Percentage Calculator',
        applicationCategory: 'UtilitiesApplication',
        operatingSystem: 'Any (Web Browser)',
        offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
        description: 'Kalkulator persentase dengan berbagai mode: proporsi, rasio, perubahan, dan tambah/kurang.',
      }),
    },
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: faqItems.map((item) => ({
          '@type': 'Question',
          name: item.question,
          acceptedAnswer: { '@type': 'Answer', text: item.answer },
        })),
      }),
    },
  ],
})
</script>

<template>
  <div>
    <p class="pt-7 text-sm text-ink-soft">
      <NuxtLink to="/" class="hover:text-accent-dark">Home</NuxtLink> /
      <NuxtLink to="/office-tools" class="hover:text-accent-dark">Office Tools</NuxtLink> /
      <NuxtLink to="/office-tools/productivity" class="hover:text-accent-dark">Productivity</NuxtLink> /
      Percentage
    </p>

    <h1 class="mt-3 max-w-[24ch] text-3xl font-semibold leading-tight text-ink sm:text-4xl">
      Percentage Calculator — hitung persentase dalam sekali klik
    </h1>
    <p class="mt-2 max-w-[52ch] text-base text-ink-soft">
      Proporsi, rasio, kenaikan/penurunan, sampai diskon — pilih mode yang sesuai kebutuhan Anda.
    </p>

    <div class="mt-7 flex flex-wrap gap-2">
      <button
        v-for="opt in percentageModes"
        :key="opt.value"
        class="rounded-md border px-3.5 py-2 text-sm font-medium transition-colors"
        :class="
          mode === opt.value
            ? 'border-accent bg-accent text-white'
            : 'border-slate-300 bg-white text-ink hover:bg-slate-50'
        "
        @click="mode = opt.value"
      >
        {{ opt.label }}
      </button>
    </div>

    <div class="mt-5 rounded-md border border-slate-200 bg-white p-6">
      <div class="grid gap-4 sm:grid-cols-2">
        <div>
          <label class="mb-1.5 block text-xs font-medium uppercase tracking-wide text-ink-soft">{{ labelA }}</label>
          <input
            v-model.number="valueA"
            type="number"
            class="w-full rounded-md border border-slate-300 px-3.5 py-2.5 text-base text-ink focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
          >
        </div>
        <div>
          <label class="mb-1.5 block text-xs font-medium uppercase tracking-wide text-ink-soft">{{ labelB }}</label>
          <input
            v-model.number="valueB"
            type="number"
            class="w-full rounded-md border border-slate-300 px-3.5 py-2.5 text-base text-ink focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
          >
        </div>
      </div>

      <div v-if="mode === 'addSubtract'" class="mt-4 flex gap-4">
        <label class="flex cursor-pointer items-center gap-2 text-sm text-ink-soft">
          <input v-model="operation" type="radio" value="add" class="text-accent focus:ring-accent">
          Tambah
        </label>
        <label class="flex cursor-pointer items-center gap-2 text-sm text-ink-soft">
          <input v-model="operation" type="radio" value="subtract" class="text-accent focus:ring-accent">
          Kurang
        </label>
      </div>

      <div class="mt-6 border-t border-slate-200 pt-5">
        <p class="text-xs font-medium uppercase tracking-wide text-ink-soft">{{ resultLabel }}</p>
        <p class="mt-1 font-mono text-3xl font-medium text-accent-dark">
          {{ resultDisplay }}
          <span v-if="changeDirection && changeDirection !== 'tetap'" class="text-base text-ink-soft">({{ changeDirection }})</span>
        </p>
      </div>
    </div>

    <p class="mt-3.5 text-sm text-ink-soft">
      <span class="mr-1.5 inline-block h-1.5 w-1.5 rounded-full bg-accent align-middle" />
      Data Anda tidak pernah meninggalkan browser ini.
    </p>

    <section class="mt-14">
      <h2 class="text-xl font-semibold text-ink">Kenapa menggunakan Percentage Calculator ini?</h2>
      <ul class="mt-4 grid gap-3.5">
        <li class="border-l-2 border-accent pl-4 text-sm text-ink-soft">
          <strong class="font-semibold text-ink">4 mode sekaligus.</strong>
          Dari perhitungan sederhana sampai persentase perubahan dan diskon.
        </li>
        <li class="border-l-2 border-accent pl-4 text-sm text-ink-soft">
          <strong class="font-semibold text-ink">Hasil instan.</strong>
          Angka berubah otomatis saat Anda mengetik, tanpa tombol hitung.
        </li>
        <li class="border-l-2 border-accent pl-4 text-sm text-ink-soft">
          <strong class="font-semibold text-ink">Gratis & tanpa akun.</strong>
          Langsung pakai tanpa daftar atau install aplikasi apapun.
        </li>
      </ul>
    </section>

    <section class="mt-14">
      <h2 class="text-xl font-semibold text-ink">Cara menghitung persentase</h2>
      <ol class="mt-4 grid list-decimal gap-2.5 pl-5 marker:font-mono marker:text-accent-dark">
        <li class="text-sm text-ink-soft">Pilih mode perhitungan sesuai kebutuhan Anda.</li>
        <li class="text-sm text-ink-soft">Isi dua kolom angka yang diminta.</li>
        <li class="text-sm text-ink-soft">Hasil muncul otomatis di bagian bawah.</li>
      </ol>
    </section>

    <section class="mt-14">
      <h2 class="text-xl font-semibold text-ink">Kapan Anda membutuhkan kalkulator ini?</h2>
      <div class="mt-4 grid gap-3.5">
        <p class="max-w-[62ch] text-sm text-ink-soft">
          Berguna untuk menghitung diskon belanja, kenaikan gaji, margin keuntungan bisnis, atau berapa persen
          progres suatu pekerjaan sudah selesai — tanpa perlu membuka aplikasi spreadsheet.
        </p>
        <p class="max-w-[62ch] text-sm text-ink-soft">
          Pelajar dan mahasiswa juga sering memakainya untuk menghitung nilai ujian, bobot tugas, atau statistik
          sederhana dalam laporan.
        </p>
      </div>
    </section>

    <section class="mt-14 pb-4">
      <h2 class="text-xl font-semibold text-ink">Pertanyaan umum</h2>
      <div class="mt-2">
        <FaqAccordion :items="faqItems" />
      </div>
    </section>

    <section class="mt-14 pb-16">
      <h2 class="text-xl font-semibold text-ink">Tool lain yang mungkin Anda butuhkan</h2>
      <div class="mt-4">
        <RelatedTools :tools="relatedTools" />
      </div>
    </section>
  </div>
</template>
