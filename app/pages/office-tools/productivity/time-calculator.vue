<script setup lang="ts">
const {
  mode,
  durations,
  addDuration,
  removeDuration,
  sumFormatted,
  startTime,
  durationHours,
  durationMinutes,
  resultClock,
} = useTimeCalculator()

const faqItems = [
  {
    question: 'Apa bedanya dua mode di tool ini?',
    answer:
      'Mode "Jumlahkan durasi" menjumlahkan beberapa durasi jadi satu total (misal 1j30m + 2j45m). Mode "Tambah ke jam" menambahkan satu durasi ke jam tertentu untuk mendapat jam hasil (misal jam 09:00 + 3 jam 15 menit = 12:15).',
  },
  {
    question: 'Apa artinya "+1 hari" pada hasil mode Tambah ke jam?',
    answer: 'Itu berarti hasil perhitungan melewati tengah malam dan jatuh di hari berikutnya.',
  },
  {
    question: 'Bisakah menjumlahkan lebih dari 2 durasi?',
    answer: 'Bisa, klik "+ Tambah durasi" untuk menambahkan baris input durasi sebanyak yang dibutuhkan.',
  },
  {
    question: 'Apakah data waktu saya disimpan?',
    answer: 'Tidak. Semua perhitungan berjalan langsung di browser Anda.',
  },
]

const relatedTools = [
  { name: 'Percentage', href: '/office-tools/productivity/percentage' },
  { name: 'Business Days', href: '/office-tools/productivity/business-days' },
  { name: 'Date Difference', href: '/office-tools/productivity/date-difference' },
  { name: 'Working Hours', href: '/office-tools/productivity/working-hours' },
]

useSeoMeta({
  title: 'Time Calculator Online — Jumlahkan & Tambah Durasi Waktu Gratis',
  description:
    'Jumlahkan beberapa durasi waktu atau tambahkan durasi ke jam tertentu secara instan di browser Anda.',
})

useHead({
  script: [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'SoftwareApplication',
        name: 'Time Calculator',
        applicationCategory: 'UtilitiesApplication',
        operatingSystem: 'Any (Web Browser)',
        offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
        description: 'Menjumlahkan durasi waktu atau menambahkan durasi ke jam tertentu.',
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
      Time Calculator
    </p>

    <h1 class="mt-3 max-w-[24ch] text-3xl font-semibold leading-tight text-ink sm:text-4xl">
      Time Calculator — jumlahkan dan tambahkan durasi waktu
    </h1>
    <p class="mt-2 max-w-[52ch] text-base text-ink-soft">
      Jumlahkan beberapa durasi, atau tambahkan durasi ke jam tertentu untuk tahu jam hasilnya.
    </p>

    <div class="mt-7 flex flex-wrap gap-2">
      <button
        class="rounded-md border px-3.5 py-2 text-sm font-medium transition-colors"
        :class="mode === 'sum' ? 'border-accent bg-accent text-white' : 'border-slate-300 bg-white text-ink hover:bg-slate-50'"
        @click="mode = 'sum'"
      >
        Jumlahkan durasi
      </button>
      <button
        class="rounded-md border px-3.5 py-2 text-sm font-medium transition-colors"
        :class="mode === 'addToClock' ? 'border-accent bg-accent text-white' : 'border-slate-300 bg-white text-ink hover:bg-slate-50'"
        @click="mode = 'addToClock'"
      >
        Tambah ke jam
      </button>
    </div>

    <div class="mt-5 rounded-md border border-slate-200 bg-white p-6">
      <template v-if="mode === 'sum'">
        <div class="grid gap-3">
          <div
            v-for="duration in durations"
            :key="duration.id"
            class="flex items-center gap-3"
          >
            <input
              v-model.number="duration.hours"
              type="number"
              min="0"
              class="w-20 rounded-md border border-slate-300 px-2.5 py-2 text-sm text-ink focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
            >
            <span class="text-sm text-ink-soft">jam</span>
            <input
              v-model.number="duration.minutes"
              type="number"
              min="0"
              max="59"
              class="w-20 rounded-md border border-slate-300 px-2.5 py-2 text-sm text-ink focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
            >
            <span class="text-sm text-ink-soft">menit</span>
            <button
              v-if="durations.length > 1"
              class="ml-auto text-ink-soft hover:text-red-600"
              aria-label="Hapus durasi"
              @click="removeDuration(duration.id)"
            >
              ✕
            </button>
          </div>
        </div>

        <button
          class="mt-4 rounded-md border border-slate-300 bg-white px-4 py-2.5 text-sm font-medium text-ink hover:bg-slate-50"
          @click="addDuration"
        >
          + Tambah durasi
        </button>

        <div class="mt-6 border-t border-slate-200 pt-5">
          <p class="text-xs font-medium uppercase tracking-wide text-ink-soft">Total durasi</p>
          <p class="mt-1 font-mono text-3xl font-medium text-accent-dark">{{ sumFormatted }}</p>
        </div>
      </template>

      <template v-else>
        <div class="grid gap-4 sm:grid-cols-3">
          <div>
            <label class="mb-1.5 block text-xs font-medium uppercase tracking-wide text-ink-soft">Jam awal</label>
            <input
              v-model="startTime"
              type="time"
              class="w-full rounded-md border border-slate-300 px-3.5 py-2.5 text-base text-ink focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
            >
          </div>
          <div>
            <label class="mb-1.5 block text-xs font-medium uppercase tracking-wide text-ink-soft">Tambah jam</label>
            <input
              v-model.number="durationHours"
              type="number"
              min="0"
              class="w-full rounded-md border border-slate-300 px-3.5 py-2.5 text-base text-ink focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
            >
          </div>
          <div>
            <label class="mb-1.5 block text-xs font-medium uppercase tracking-wide text-ink-soft">Tambah menit</label>
            <input
              v-model.number="durationMinutes"
              type="number"
              min="0"
              max="59"
              class="w-full rounded-md border border-slate-300 px-3.5 py-2.5 text-base text-ink focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
            >
          </div>
        </div>

        <div class="mt-6 border-t border-slate-200 pt-5">
          <p class="text-xs font-medium uppercase tracking-wide text-ink-soft">Jam hasil</p>
          <p class="mt-1 font-mono text-3xl font-medium text-accent-dark">
            {{ resultClock?.time ?? '—' }}
            <span v-if="resultClock && resultClock.daysOver > 0" class="text-base text-ink-soft">
              (+{{ resultClock.daysOver }} hari)
            </span>
          </p>
        </div>
      </template>
    </div>

    <p class="mt-3.5 text-sm text-ink-soft">
      <span class="mr-1.5 inline-block h-1.5 w-1.5 rounded-full bg-accent align-middle" />
      Data Anda tidak pernah meninggalkan browser ini.
    </p>

    <section class="mt-14">
      <h2 class="text-xl font-semibold text-ink">Kenapa menggunakan Time Calculator ini?</h2>
      <ul class="mt-4 grid gap-3.5">
        <li class="border-l-2 border-accent pl-4 text-sm text-ink-soft">
          <strong class="font-semibold text-ink">Dua mode praktis.</strong>
          Jumlahkan durasi atau proyeksikan jam selesai suatu aktivitas.
        </li>
        <li class="border-l-2 border-accent pl-4 text-sm text-ink-soft">
          <strong class="font-semibold text-ink">Deteksi lewat tengah malam.</strong>
          Hasil otomatis menunjukkan jika jatuh di hari berikutnya.
        </li>
        <li class="border-l-2 border-accent pl-4 text-sm text-ink-soft">
          <strong class="font-semibold text-ink">Privasi terjaga.</strong>
          Semua perhitungan berjalan di browser Anda.
        </li>
      </ul>
    </section>

    <section class="mt-14">
      <h2 class="text-xl font-semibold text-ink">Cara menghitung durasi waktu</h2>
      <ol class="mt-4 grid list-decimal gap-2.5 pl-5 marker:font-mono marker:text-accent-dark">
        <li class="text-sm text-ink-soft">Pilih mode "Jumlahkan durasi" atau "Tambah ke jam".</li>
        <li class="text-sm text-ink-soft">Isi kolom jam/menit yang diminta.</li>
        <li class="text-sm text-ink-soft">Hasil muncul otomatis di bagian bawah.</li>
      </ol>
    </section>

    <section class="mt-14">
      <h2 class="text-xl font-semibold text-ink">Kapan Anda membutuhkan kalkulator ini?</h2>
      <div class="mt-4 grid gap-3.5">
        <p class="max-w-[62ch] text-sm text-ink-soft">
          Berguna untuk menghitung total durasi beberapa video atau rekaman yang akan digabung, atau memperkirakan
          jam selesai suatu perjalanan/penerbangan dari jam berangkat ditambah durasi tempuh.
        </p>
        <p class="max-w-[62ch] text-sm text-ink-soft">
          Juga dipakai untuk menghitung jam bangun kalau harus tidur sekian jam dari sekarang, atau memperkirakan
          jam selesai memasak dari waktu mulai ditambah estimasi durasi resep.
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
