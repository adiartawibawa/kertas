<script setup lang="ts">
const { totalPages, angle, scope, specificPages, resultBytes, isProcessing, error, setFile, runRotate } = usePdfRotate()

function onFiles(files: File[]) {
  const file = files[0]
  if (file) setFile(file)
}

function downloadResult() {
  if (resultBytes.value) downloadBinaryFile('rotated.pdf', resultBytes.value, 'application/pdf')
}

const faqItems = [
  {
    question: 'Apakah rotasi bisa diterapkan ke halaman tertentu saja?',
    answer: 'Bisa, pilih "Halaman tertentu" lalu tulis nomor halamannya, misal "1-3,5". Kalau tidak, semua halaman akan dirotasi.',
  },
  {
    question: 'Apakah rotasi ini bersifat kumulatif dengan rotasi yang sudah ada?',
    answer: 'Ya, kalau halaman sudah punya rotasi sebelumnya (misal dari hasil scan miring), sudut yang Anda pilih akan ditambahkan ke rotasi yang sudah ada.',
  },
  {
    question: 'Apakah bisa merotasi 45 derajat atau sudut custom lainnya?',
    answer: 'Belum, saat ini hanya tersedia rotasi kelipatan 90 derajat (90°, 180°, 270°) sesuai standar orientasi halaman PDF.',
  },
  {
    question: 'Apakah file saya diunggah ke server?',
    answer: 'Tidak. Semua proses rotasi berjalan langsung di browser Anda.',
  },
]

const relatedTools = [
  { name: 'Merge', href: '/office-tools/pdf/pdf-merge' },
  { name: 'Split', href: '/office-tools/pdf/pdf-split' },
  { name: 'Extract Pages', href: '/office-tools/pdf/pdf-extract-pages' },
  { name: 'Compress', href: '/office-tools/pdf/pdf-compress' },
]

useSeoMeta({
  title: 'PDF Rotate Online — Putar Halaman PDF Gratis',
  description: 'Putar halaman PDF 90°, 180°, atau 270° secara instan di browser Anda. Gratis, tanpa upload ke server.',
})

useHead({
  script: [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'SoftwareApplication',
        name: 'PDF Rotate',
        applicationCategory: 'UtilitiesApplication',
        operatingSystem: 'Any (Web Browser)',
        offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
        description: 'Memutar orientasi halaman PDF.',
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
      <NuxtLinkLocale to="/office-tools/pdf" class="hover:text-accent-dark">PDF</NuxtLinkLocale> /
      Rotate
    </p>

    <h1 class="mt-3 max-w-[24ch] text-3xl font-semibold leading-tight text-ink sm:text-4xl">
      PDF Rotate — putar orientasi halaman PDF
    </h1>
    <p class="mt-2 max-w-[52ch] text-base text-ink-soft">
      Upload PDF Anda, pilih sudut rotasi dan halaman yang ingin diputar.
    </p>

    <div class="mt-7">
      <FileDropzone accept="application/pdf" label="Tarik & lepas file PDF di sini" @files="onFiles" />
    </div>

    <p v-if="error" class="mt-3 rounded-md border border-red-200 bg-red-50 px-4 py-2.5 text-sm text-red-700">
      {{ error }}
    </p>

    <div v-if="totalPages > 0" class="mt-5 rounded-md border border-slate-200 bg-white p-4">
      <p class="text-sm text-ink-soft">File memiliki {{ totalPages }} halaman.</p>

      <div class="mt-3">
        <label class="mb-1.5 block text-xs font-medium uppercase tracking-wide text-ink-soft">Sudut rotasi</label>
        <div class="flex flex-wrap gap-2">
          <button v-for="a in [90, 180, 270] as const" :key="a"
            class="rounded-md border px-3.5 py-2 text-sm font-medium transition-colors"
            :class="angle === a ? 'border-accent bg-accent text-white' : 'border-slate-300 bg-white text-ink hover:bg-slate-50'"
            @click="angle = a">
            {{ a }}°
          </button>
        </div>
      </div>

      <div class="mt-4">
        <label class="mb-1.5 block text-xs font-medium uppercase tracking-wide text-ink-soft">Halaman yang
          dirotasi</label>
        <div class="flex flex-wrap gap-2">
          <button class="rounded-md border px-3.5 py-2 text-sm font-medium transition-colors"
            :class="scope === 'all' ? 'border-accent bg-accent text-white' : 'border-slate-300 bg-white text-ink hover:bg-slate-50'"
            @click="scope = 'all'">
            Semua halaman
          </button>
          <button class="rounded-md border px-3.5 py-2 text-sm font-medium transition-colors"
            :class="scope === 'specific' ? 'border-accent bg-accent text-white' : 'border-slate-300 bg-white text-ink hover:bg-slate-50'"
            @click="scope = 'specific'">
            Halaman tertentu
          </button>
        </div>
      </div>

      <div v-if="scope === 'specific'" class="mt-3">
        <input v-model="specificPages" type="text" placeholder="Misal: 1-3,5"
          class="w-full max-w-xs rounded-md border border-slate-300 px-3.5 py-2 text-sm text-ink focus:outline-none focus-visible:ring-2 focus-visible:ring-accent">
      </div>

      <button
        class="mt-4 rounded-md bg-accent px-4 py-2.5 text-sm font-medium text-white hover:brightness-95 disabled:opacity-50"
        :disabled="isProcessing" @click="runRotate">
        {{ isProcessing ? 'Memproses…' : 'Rotasi PDF' }}
      </button>

      <button v-if="resultBytes"
        class="mt-4 ml-3 rounded-md border border-slate-300 bg-white px-4 py-2.5 text-sm font-medium text-ink hover:bg-slate-50"
        @click="downloadResult">
        Download hasil
      </button>
    </div>

    <p class="mt-3.5 text-sm text-ink-soft">
      <span class="mr-1.5 inline-block h-1.5 w-1.5 rounded-full bg-accent align-middle" />
      File Anda tidak pernah meninggalkan browser ini.
    </p>

    <section class="mt-14">
      <h2 class="text-xl font-semibold text-ink">Kenapa menggunakan PDF Rotate ini?</h2>
      <ul class="mt-4 grid gap-3.5">
        <li class="border-l-2 border-accent pl-4 text-sm text-ink-soft">
          <strong class="font-semibold text-ink">Rotasi selektif.</strong>
          Putar semua halaman, atau hanya halaman tertentu yang miring.
        </li>
        <li class="border-l-2 border-accent pl-4 text-sm text-ink-soft">
          <strong class="font-semibold text-ink">Kualitas tetap terjaga.</strong>
          Rotasi hanya mengubah orientasi tampilan, bukan me-render ulang konten.
        </li>
        <li class="border-l-2 border-accent pl-4 text-sm text-ink-soft">
          <strong class="font-semibold text-ink">Privasi terjaga.</strong>
          File diproses langsung di browser Anda.
        </li>
      </ul>
    </section>

    <section class="mt-14">
      <h2 class="text-xl font-semibold text-ink">Cara memutar halaman PDF</h2>
      <ol class="mt-4 grid list-decimal gap-2.5 pl-5 marker:font-mono marker:text-accent-dark">
        <li class="text-sm text-ink-soft">Upload file PDF Anda.</li>
        <li class="text-sm text-ink-soft">Pilih sudut rotasi dan halaman yang ingin diputar.</li>
        <li class="text-sm text-ink-soft">Klik "Rotasi PDF", lalu download hasilnya.</li>
      </ol>
    </section>

    <section class="mt-14">
      <h2 class="text-xl font-semibold text-ink">Kapan Anda membutuhkan tool ini?</h2>
      <div class="mt-4 grid gap-3.5">
        <p class="max-w-[62ch] text-sm text-ink-soft">
          Berguna saat hasil scan dokumen ada yang terbalik atau miring 90 derajat karena posisi kertas yang salah
          saat di-scan.
        </p>
        <p class="max-w-[62ch] text-sm text-ink-soft">
          Juga membantu saat menggabungkan dokumen dari sumber berbeda yang punya orientasi halaman tidak
          konsisten (ada yang potret, ada yang lanskap).
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
