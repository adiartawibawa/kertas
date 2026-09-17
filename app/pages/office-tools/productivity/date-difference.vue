<script setup lang="ts">
const { startDate, endDate, breakdown } = useDateDifference()

const faqItems = [
  {
    question: 'Apakah urutan tanggal awal dan akhir harus benar?',
    answer: 'Tidak masalah. Kalau tanggal akhir dimasukkan lebih awal dari tanggal awal, tool ini otomatis membalik urutannya.',
  },
  {
    question: 'Kenapa breakdown tahun/bulan/hari bisa berbeda dari total hari dibagi 30?',
    answer:
      'Karena breakdown memperhitungkan jumlah hari aktual di tiap bulan (28-31 hari), bukan asumsi rata-rata 30 hari per bulan.',
  },
  {
    question: 'Apakah tanggal awal dan akhir ikut dihitung?',
    answer: 'Perhitungan berbasis selisih waktu murni antara dua tanggal, sesuai standar perhitungan kalender.',
  },
  {
    question: 'Apakah tanggal saya disimpan di server?',
    answer: 'Tidak. Semua perhitungan berjalan langsung di browser Anda.',
  },
]

const relatedTools = [
  { name: 'Percentage', href: '/office-tools/productivity/percentage' },
  { name: 'Business Days', href: '/office-tools/productivity/business-days' },
  { name: 'Working Hours', href: '/office-tools/productivity/working-hours' },
  { name: 'Time Calculator', href: '/office-tools/productivity/time-calculator' },
]

useSeoMeta({
  title: 'Date Difference Calculator — Hitung Selisih Tanggal Gratis',
  description:
    'Hitung selisih dua tanggal dalam tahun, bulan, hari, dan total hari secara instan di browser Anda.',
})

useHead({
  script: [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'SoftwareApplication',
        name: 'Date Difference Calculator',
        applicationCategory: 'UtilitiesApplication',
        operatingSystem: 'Any (Web Browser)',
        offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
        description: 'Menghitung selisih dua tanggal dalam breakdown tahun, bulan, hari, dan total hari.',
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
      Date Difference
    </p>

    <h1 class="mt-3 max-w-[24ch] text-3xl font-semibold leading-tight text-ink sm:text-4xl">
      Date Difference — hitung selisih dua tanggal secara instan
    </h1>
    <p class="mt-2 max-w-[52ch] text-base text-ink-soft">
      Isi dua tanggal, dapatkan selisihnya dalam tahun, bulan, hari, dan total hari.
    </p>

    <div class="mt-7 rounded-md border border-slate-200 bg-white p-6">
      <div class="grid gap-4 sm:grid-cols-2">
        <div>
          <label class="mb-1.5 block text-xs font-medium uppercase tracking-wide text-ink-soft">Tanggal awal</label>
          <input
            v-model="startDate"
            type="date"
            class="w-full rounded-md border border-slate-300 px-3.5 py-2.5 text-base text-ink focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
          >
        </div>
        <div>
          <label class="mb-1.5 block text-xs font-medium uppercase tracking-wide text-ink-soft">Tanggal akhir</label>
          <input
            v-model="endDate"
            type="date"
            class="w-full rounded-md border border-slate-300 px-3.5 py-2.5 text-base text-ink focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
          >
        </div>
      </div>

      <div v-if="breakdown" class="mt-6 grid grid-cols-2 divide-x divide-slate-200 border-t border-slate-200 pt-5 sm:grid-cols-5 sm:divide-x">
        <div class="px-3 py-1 sm:px-4">
          <span class="block font-mono text-xl font-medium text-accent-dark">{{ breakdown.years }}</span>
          <span class="mt-0.5 block text-xs text-ink-soft">Tahun</span>
        </div>
        <div class="px-3 py-1 sm:px-4">
          <span class="block font-mono text-xl font-medium text-accent-dark">{{ breakdown.months }}</span>
          <span class="mt-0.5 block text-xs text-ink-soft">Bulan</span>
        </div>
        <div class="px-3 py-1 sm:px-4">
          <span class="block font-mono text-xl font-medium text-accent-dark">{{ breakdown.days }}</span>
          <span class="mt-0.5 block text-xs text-ink-soft">Hari</span>
        </div>
        <div class="px-3 py-1 sm:px-4">
          <span class="block font-mono text-xl font-medium text-accent-dark">{{ breakdown.totalWeeks }}</span>
          <span class="mt-0.5 block text-xs text-ink-soft">Total minggu</span>
        </div>
        <div class="px-3 py-1 sm:px-4">
          <span class="block font-mono text-xl font-medium text-accent-dark">{{ breakdown.totalDays }}</span>
          <span class="mt-0.5 block text-xs text-ink-soft">Total hari</span>
        </div>
      </div>
      <p v-else class="mt-6 border-t border-slate-200 pt-5 text-sm text-ink-soft">
        Isi kedua tanggal untuk melihat hasilnya.
      </p>
    </div>

    <p class="mt-3.5 text-sm text-ink-soft">
      <span class="mr-1.5 inline-block h-1.5 w-1.5 rounded-full bg-accent align-middle" />
      Data Anda tidak pernah meninggalkan browser ini.
    </p>

    <section class="mt-14">
      <h2 class="text-xl font-semibold text-ink">Kenapa menggunakan Date Difference ini?</h2>
      <ul class="mt-4 grid gap-3.5">
        <li class="border-l-2 border-accent pl-4 text-sm text-ink-soft">
          <strong class="font-semibold text-ink">Breakdown lengkap.</strong>
          Tahun, bulan, hari, total minggu, dan total hari sekaligus dalam satu tampilan.
        </li>
        <li class="border-l-2 border-accent pl-4 text-sm text-ink-soft">
          <strong class="font-semibold text-ink">Akurat per kalender.</strong>
          Memperhitungkan jumlah hari aktual tiap bulan, bukan pembulatan kasar.
        </li>
        <li class="border-l-2 border-accent pl-4 text-sm text-ink-soft">
          <strong class="font-semibold text-ink">Privasi terjaga.</strong>
          Semua perhitungan berjalan di browser Anda.
        </li>
      </ul>
    </section>

    <section class="mt-14">
      <h2 class="text-xl font-semibold text-ink">Cara menghitung selisih tanggal</h2>
      <ol class="mt-4 grid list-decimal gap-2.5 pl-5 marker:font-mono marker:text-accent-dark">
        <li class="text-sm text-ink-soft">Isi tanggal awal di kolom pertama.</li>
        <li class="text-sm text-ink-soft">Isi tanggal akhir di kolom kedua.</li>
        <li class="text-sm text-ink-soft">Hasil breakdown muncul otomatis di bagian bawah.</li>
      </ol>
    </section>

    <section class="mt-14">
      <h2 class="text-xl font-semibold text-ink">Kapan Anda membutuhkan kalkulator ini?</h2>
      <div class="mt-4 grid gap-3.5">
        <p class="max-w-[62ch] text-sm text-ink-soft">
          Berguna untuk menghitung usia tepat sampai hari, lama masa kerja seorang karyawan, atau berapa hari lagi
          menuju sebuah tenggat waktu atau acara penting.
        </p>
        <p class="max-w-[62ch] text-sm text-ink-soft">
          Juga sering dipakai untuk menghitung durasi proyek yang sudah berjalan, masa berlaku kontrak, atau jangka
          waktu garansi produk dari tanggal pembelian.
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
