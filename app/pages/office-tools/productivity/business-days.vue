<script setup lang="ts">
const { mode, startDate, endDate, daysToAdd, businessDaysCount, resultDate } = useBusinessDays()

const faqItems = [
  {
    question: 'Apakah hari libur nasional diperhitungkan?',
    answer:
      'Tidak. Tool ini hanya mengecualikan akhir pekan (Sabtu & Minggu). Hari libur nasional atau cuti bersama perlu dihitung manual di luar hasil ini.',
  },
  {
    question: 'Apakah tanggal awal dan akhir dihitung sebagai hari kerja?',
    answer:
      'Ya, mode "Hitung hari kerja" bersifat inklusif — jika tanggal awal dan akhir jatuh di hari kerja, keduanya ikut dihitung.',
  },
  {
    question: 'Bisakah menambahkan hari kerja mundur (ke masa lalu)?',
    answer: 'Bisa, masukkan angka negatif pada mode "Tambah hari kerja" untuk mundur ke tanggal sebelumnya.',
  },
  {
    question: 'Apakah data tanggal saya disimpan?',
    answer: 'Tidak. Semua perhitungan berjalan langsung di browser Anda.',
  },
]

const relatedTools = [
  { name: 'Percentage', href: '/office-tools/productivity/percentage' },
  { name: 'Date Difference', href: '/office-tools/productivity/date-difference' },
  { name: 'Working Hours', href: '/office-tools/productivity/working-hours' },
  { name: 'Time Calculator', href: '/office-tools/productivity/time-calculator' },
]

useSeoMeta({
  title: 'Business Days Calculator — Hitung Hari Kerja Gratis',
  description:
    'Hitung jumlah hari kerja antara dua tanggal, atau tambahkan hari kerja ke tanggal tertentu. Tanpa hari libur nasional, hanya akhir pekan.',
})

useHead({
  script: [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'SoftwareApplication',
        name: 'Business Days Calculator',
        applicationCategory: 'UtilitiesApplication',
        operatingSystem: 'Any (Web Browser)',
        offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
        description: 'Menghitung jumlah hari kerja antara dua tanggal atau menambahkan hari kerja ke suatu tanggal.',
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
      Business Days
    </p>

    <h1 class="mt-3 max-w-[24ch] text-3xl font-semibold leading-tight text-ink sm:text-4xl">
      Business Days Calculator — hitung hari kerja tanpa akhir pekan
    </h1>
    <p class="mt-2 max-w-[52ch] text-base text-ink-soft">
      Hitung jumlah hari kerja antara dua tanggal, atau tambahkan hari kerja ke tanggal tertentu.
    </p>

    <div class="mt-7 flex flex-wrap gap-2">
      <button class="rounded-md border px-3.5 py-2 text-sm font-medium transition-colors"
        :class="mode === 'count' ? 'border-accent bg-accent text-white' : 'border-slate-300 bg-white text-ink hover:bg-slate-50'"
        @click="mode = 'count'">
        Hitung hari kerja
      </button>
      <button class="rounded-md border px-3.5 py-2 text-sm font-medium transition-colors"
        :class="mode === 'add' ? 'border-accent bg-accent text-white' : 'border-slate-300 bg-white text-ink hover:bg-slate-50'"
        @click="mode = 'add'">
        Tambah hari kerja
      </button>
    </div>

    <div class="mt-5 rounded-md border border-slate-200 bg-white p-6">
      <template v-if="mode === 'count'">
        <div class="grid gap-4 sm:grid-cols-2">
          <div>
            <label class="mb-1.5 block text-xs font-medium uppercase tracking-wide text-ink-soft">Tanggal awal</label>
            <input v-model="startDate" type="date"
              class="w-full rounded-md border border-slate-300 px-3.5 py-2.5 text-base text-ink focus:outline-none focus-visible:ring-2 focus-visible:ring-accent">
          </div>
          <div>
            <label class="mb-1.5 block text-xs font-medium uppercase tracking-wide text-ink-soft">Tanggal akhir</label>
            <input v-model="endDate" type="date"
              class="w-full rounded-md border border-slate-300 px-3.5 py-2.5 text-base text-ink focus:outline-none focus-visible:ring-2 focus-visible:ring-accent">
          </div>
        </div>

        <div class="mt-6 border-t border-slate-200 pt-5">
          <p class="text-xs font-medium uppercase tracking-wide text-ink-soft">Jumlah hari kerja</p>
          <p class="mt-1 font-mono text-3xl font-medium text-accent-dark">
            {{ businessDaysCount ?? '—' }}
          </p>
        </div>
      </template>

      <template v-else>
        <div class="grid gap-4 sm:grid-cols-2">
          <div>
            <label class="mb-1.5 block text-xs font-medium uppercase tracking-wide text-ink-soft">Tanggal awal</label>
            <input v-model="startDate" type="date"
              class="w-full rounded-md border border-slate-300 px-3.5 py-2.5 text-base text-ink focus:outline-none focus-visible:ring-2 focus-visible:ring-accent">
          </div>
          <div>
            <label class="mb-1.5 block text-xs font-medium uppercase tracking-wide text-ink-soft">Jumlah hari kerja
              (+/-)</label>
            <input v-model.number="daysToAdd" type="number"
              class="w-full rounded-md border border-slate-300 px-3.5 py-2.5 text-base text-ink focus:outline-none focus-visible:ring-2 focus-visible:ring-accent">
          </div>
        </div>

        <div class="mt-6 border-t border-slate-200 pt-5">
          <p class="text-xs font-medium uppercase tracking-wide text-ink-soft">Tanggal hasil</p>
          <p class="mt-1 font-mono text-3xl font-medium text-accent-dark">
            {{ resultDate ?? '—' }}
          </p>
        </div>
      </template>
    </div>

    <p class="mt-3.5 text-sm text-ink-soft">
      <span class="mr-1.5 inline-block h-1.5 w-1.5 rounded-full bg-accent align-middle" />
      Data Anda tidak pernah meninggalkan browser ini.
    </p>

    <section class="mt-14">
      <h2 class="text-xl font-semibold text-ink">Kenapa menggunakan Business Days Calculator ini?</h2>
      <ul class="mt-4 grid gap-3.5">
        <li class="border-l-2 border-accent pl-4 text-sm text-ink-soft">
          <strong class="font-semibold text-ink">Dua mode praktis.</strong>
          Hitung selisih hari kerja atau proyeksikan tanggal deadline.
        </li>
        <li class="border-l-2 border-accent pl-4 text-sm text-ink-soft">
          <strong class="font-semibold text-ink">Akhir pekan otomatis dilewati.</strong>
          Sabtu dan Minggu tidak ikut dihitung sebagai hari kerja.
        </li>
        <li class="border-l-2 border-accent pl-4 text-sm text-ink-soft">
          <strong class="font-semibold text-ink">Privasi terjaga.</strong>
          Tanggal yang Anda masukkan tidak pernah dikirim ke server.
        </li>
      </ul>
    </section>

    <section class="mt-14">
      <h2 class="text-xl font-semibold text-ink">Cara menghitung hari kerja</h2>
      <ol class="mt-4 grid list-decimal gap-2.5 pl-5 marker:font-mono marker:text-accent-dark">
        <li class="text-sm text-ink-soft">Pilih mode "Hitung hari kerja" atau "Tambah hari kerja".</li>
        <li class="text-sm text-ink-soft">Isi tanggal yang diminta.</li>
        <li class="text-sm text-ink-soft">Hasil muncul otomatis di bagian bawah.</li>
      </ol>
    </section>

    <section class="mt-14">
      <h2 class="text-xl font-semibold text-ink">Kapan Anda membutuhkan kalkulator ini?</h2>
      <div class="mt-4 grid gap-3.5">
        <p class="max-w-[62ch] text-sm text-ink-soft">
          Berguna untuk memproyeksikan deadline proyek dari hari ini ("10 hari kerja dari sekarang jatuh tanggal
          berapa"), atau menghitung berapa lama SLA layanan yang dihitung dalam hari kerja, bukan hari kalender.
        </p>
        <p class="max-w-[62ch] text-sm text-ink-soft">
          Tim HR dan admin juga sering memakai perhitungan hari kerja untuk menghitung masa kontrak, notice period,
          atau estimasi pengiriman barang yang dijanjikan dalam hari kerja.
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
