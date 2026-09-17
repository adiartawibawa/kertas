<script setup lang="ts">
const { shifts, addShift, removeShift, shiftMinutes, totalFormatted } = useWorkingHours()

function formatShiftMinutes(minutes: number): string {
  const h = Math.floor(minutes / 60)
  const m = minutes % 60
  return `${h}j ${m}m`
}

const faqItems = [
  {
    question: 'Bagaimana kalau jam kerja melewati tengah malam?',
    answer:
      'Tool ini otomatis mendeteksi shift yang melewati tengah malam (misal 22:00 - 06:00) dan menghitungnya sebagai satu shift penuh sepanjang 8 jam dikurangi istirahat.',
  },
  {
    question: 'Bisakah menghitung beberapa hari sekaligus?',
    answer:
      'Bisa. Klik "Tambah shift" untuk menambahkan baris baru — cocok untuk merekap total jam kerja mingguan dari beberapa hari kerja berbeda.',
  },
  {
    question: 'Apakah istirahat wajib diisi?',
    answer: 'Tidak wajib, boleh dikosongkan atau diisi 0 jika hari tersebut tidak ada waktu istirahat.',
  },
  {
    question: 'Apakah data jam kerja saya disimpan?',
    answer: 'Tidak. Semua perhitungan berjalan langsung di browser Anda.',
  },
]

const relatedTools = [
  { name: 'Percentage', href: '/office-tools/productivity/percentage' },
  { name: 'Business Days', href: '/office-tools/productivity/business-days' },
  { name: 'Date Difference', href: '/office-tools/productivity/date-difference' },
  { name: 'Time Calculator', href: '/office-tools/productivity/time-calculator' },
]

useSeoMeta({
  title: 'Working Hours Calculator — Hitung Jam Kerja Gratis',
  description:
    'Hitung total jam kerja dari beberapa shift dengan waktu istirahat, termasuk shift yang melewati tengah malam.',
})

useHead({
  script: [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'SoftwareApplication',
        name: 'Working Hours Calculator',
        applicationCategory: 'UtilitiesApplication',
        operatingSystem: 'Any (Web Browser)',
        offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
        description: 'Menghitung total jam kerja dari beberapa shift dengan waktu istirahat.',
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
      <NuxtLinkLocale to="/" class="hover:text-accent-dark">Home</NuxtLinkLocale> /
      <NuxtLinkLocale to="/office-tools" class="hover:text-accent-dark">Office Tools</NuxtLinkLocale> /
      <NuxtLinkLocale to="/office-tools/productivity" class="hover:text-accent-dark">Productivity</NuxtLinkLocale> /
      Working Hours
    </p>

    <h1 class="mt-3 max-w-[24ch] text-3xl font-semibold leading-tight text-ink sm:text-4xl">
      Working Hours Calculator — hitung total jam kerja
    </h1>
    <p class="mt-2 max-w-[52ch] text-base text-ink-soft">
      Isi jam mulai, jam selesai, dan istirahat — total jam kerja dihitung otomatis, bisa untuk beberapa shift.
    </p>

    <div class="mt-7 overflow-hidden rounded-md border border-slate-200 bg-white">
      <div
        class="grid grid-cols-[1fr_1fr_1fr_auto] gap-3 border-b border-slate-200 bg-slate-50 px-4 py-2.5 text-xs font-medium uppercase tracking-wide text-ink-soft">
        <span>Mulai</span>
        <span>Selesai</span>
        <span>Istirahat (menit)</span>
        <span />
      </div>

      <div v-for="(shift, i) in shifts" :key="shift.id"
        class="grid grid-cols-[1fr_1fr_1fr_auto] items-center gap-3 border-b border-slate-100 px-4 py-3 last:border-b-0">
        <input v-model="shift.start" type="time"
          class="w-full rounded-md border border-slate-300 px-2.5 py-2 text-sm text-ink focus:outline-none focus-visible:ring-2 focus-visible:ring-accent">
        <input v-model="shift.end" type="time"
          class="w-full rounded-md border border-slate-300 px-2.5 py-2 text-sm text-ink focus:outline-none focus-visible:ring-2 focus-visible:ring-accent">
        <input v-model.number="shift.breakMinutes" type="number" min="0"
          class="w-full rounded-md border border-slate-300 px-2.5 py-2 text-sm text-ink focus:outline-none focus-visible:ring-2 focus-visible:ring-accent">
        <div class="flex items-center justify-end gap-2">
          <span class="font-mono text-xs text-ink-soft">{{ formatShiftMinutes(shiftMinutes[i]) }}</span>
          <button v-if="shifts.length > 1" class="text-ink-soft hover:text-red-600" aria-label="Hapus shift"
            @click="removeShift(shift.id)">
            ✕
          </button>
        </div>
      </div>
    </div>

    <div class="mt-4 flex flex-wrap items-center justify-between gap-3">
      <button
        class="rounded-md border border-slate-300 bg-white px-4 py-2.5 text-sm font-medium text-ink hover:bg-slate-50"
        @click="addShift">
        + Tambah shift
      </button>
      <div class="text-right">
        <p class="text-xs font-medium uppercase tracking-wide text-ink-soft">Total jam kerja</p>
        <p class="font-mono text-2xl font-medium text-accent-dark">{{ totalFormatted }}</p>
      </div>
    </div>

    <p class="mt-3.5 text-sm text-ink-soft">
      <span class="mr-1.5 inline-block h-1.5 w-1.5 rounded-full bg-accent align-middle" />
      Data Anda tidak pernah meninggalkan browser ini.
    </p>

    <section class="mt-14">
      <h2 class="text-xl font-semibold text-ink">Kenapa menggunakan Working Hours Calculator ini?</h2>
      <ul class="mt-4 grid gap-3.5">
        <li class="border-l-2 border-accent pl-4 text-sm text-ink-soft">
          <strong class="font-semibold text-ink">Multi-shift.</strong>
          Tambahkan beberapa baris untuk merekap jam kerja beberapa hari sekaligus.
        </li>
        <li class="border-l-2 border-accent pl-4 text-sm text-ink-soft">
          <strong class="font-semibold text-ink">Shift lewat tengah malam didukung.</strong>
          Jam kerja seperti 22:00 - 06:00 dihitung dengan benar.
        </li>
        <li class="border-l-2 border-accent pl-4 text-sm text-ink-soft">
          <strong class="font-semibold text-ink">Privasi terjaga.</strong>
          Semua data jam kerja diproses di browser Anda.
        </li>
      </ul>
    </section>

    <section class="mt-14">
      <h2 class="text-xl font-semibold text-ink">Cara menghitung jam kerja</h2>
      <ol class="mt-4 grid list-decimal gap-2.5 pl-5 marker:font-mono marker:text-accent-dark">
        <li class="text-sm text-ink-soft">Isi jam mulai dan jam selesai kerja.</li>
        <li class="text-sm text-ink-soft">Isi durasi istirahat dalam menit (opsional).</li>
        <li class="text-sm text-ink-soft">Klik "Tambah shift" jika perlu menambahkan hari lain.</li>
        <li class="text-sm text-ink-soft">Total jam kerja muncul otomatis di bagian bawah.</li>
      </ol>
    </section>

    <section class="mt-14">
      <h2 class="text-xl font-semibold text-ink">Kapan Anda membutuhkan kalkulator ini?</h2>
      <div class="mt-4 grid gap-3.5">
        <p class="max-w-[62ch] text-sm text-ink-soft">
          Berguna untuk freelancer atau pekerja lepas yang perlu merekap total jam kerja mingguan untuk invoice
          klien, atau karyawan shift yang ingin memverifikasi slip gaji berdasarkan jam kerja aktual.
        </p>
        <p class="max-w-[62ch] text-sm text-ink-soft">
          Tim HR juga bisa memakainya untuk menghitung total jam lembur karyawan dari beberapa hari kerja sekaligus.
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
