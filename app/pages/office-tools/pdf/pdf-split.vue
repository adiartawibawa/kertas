<script setup lang="ts">
const { mode, rangesInput, totalPages, parts, isProcessing, error, setFile, runSplit } = usePdfSplit()

function onFiles(files: File[]) {
  const file = files[0]
  if (file) setFile(file)
}

function downloadPart(name: string, bytes: Uint8Array) {
  downloadBinaryFile(name, bytes, 'application/pdf')
}

function downloadAll() {
  parts.value.forEach((part) => downloadBinaryFile(part.name, part.bytes, 'application/pdf'))
}

const faqItems = [
  {
    question: 'Apa bedanya mode "Setiap halaman terpisah" dan "Rentang kustom"?',
    answer:
      'Mode "Setiap halaman terpisah" menghasilkan satu file PDF untuk tiap halaman. Mode "Rentang kustom" memakai input yang Anda tulis sendiri, satu baris untuk satu file hasil, misal baris "1-3" jadi satu file berisi halaman 1 sampai 3.',
  },
  {
    question: 'Bagaimana format penulisan rentang halaman?',
    answer: 'Gunakan tanda hubung untuk rentang ("1-3") atau koma untuk halaman terpisah ("1,4,7"), satu baris untuk satu file hasil.',
  },
  {
    question: 'Apakah bisa mendownload semua bagian sekaligus?',
    answer: 'Bisa, klik "Download semua" — tiap bagian akan ter-download satu per satu secara berurutan.',
  },
  {
    question: 'Apakah file saya diunggah ke server?',
    answer: 'Tidak. Semua proses split berjalan langsung di browser Anda.',
  },
]

const relatedTools = [
  { name: 'Merge', href: '/office-tools/pdf/pdf-merge' },
  { name: 'Extract Pages', href: '/office-tools/pdf/pdf-extract-pages' },
  { name: 'Rotate', href: '/office-tools/pdf/pdf-rotate' },
  { name: 'Compress', href: '/office-tools/pdf/pdf-compress' },
]

useSeoMeta({
  title: 'PDF Split Online — Pecah PDF Jadi Beberapa File Gratis',
  description: 'Pecah file PDF jadi beberapa file lebih kecil, per halaman atau per rentang kustom. Tanpa upload ke server.',
})

useHead({
  script: [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'SoftwareApplication',
        name: 'PDF Split',
        applicationCategory: 'UtilitiesApplication',
        operatingSystem: 'Any (Web Browser)',
        offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
        description: 'Memecah file PDF jadi beberapa file lebih kecil.',
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
      Split
    </p>

    <h1 class="mt-3 max-w-[24ch] text-3xl font-semibold leading-tight text-ink sm:text-4xl">
      PDF Split — pecah file PDF jadi beberapa bagian
    </h1>
    <p class="mt-2 max-w-[52ch] text-base text-ink-soft">
      Upload PDF Anda, pilih cara membaginya, unduh tiap bagian sebagai file terpisah.
    </p>

    <div class="mt-7">
      <FileDropzone accept="application/pdf" label="Tarik & lepas file PDF di sini" @files="onFiles" />
    </div>

    <p v-if="error" class="mt-3 rounded-md border border-red-200 bg-red-50 px-4 py-2.5 text-sm text-red-700">
      {{ error }}
    </p>

    <div v-if="totalPages > 0" class="mt-5 rounded-md border border-slate-200 bg-white p-4">
      <p class="text-sm text-ink-soft">File memiliki {{ totalPages }} halaman.</p>

      <div class="mt-3 flex flex-wrap gap-2">
        <button class="rounded-md border px-3.5 py-2 text-sm font-medium transition-colors"
          :class="mode === 'allPages' ? 'border-accent bg-accent text-white' : 'border-slate-300 bg-white text-ink hover:bg-slate-50'"
          @click="mode = 'allPages'">
          Setiap halaman terpisah
        </button>
        <button class="rounded-md border px-3.5 py-2 text-sm font-medium transition-colors"
          :class="mode === 'ranges' ? 'border-accent bg-accent text-white' : 'border-slate-300 bg-white text-ink hover:bg-slate-50'"
          @click="mode = 'ranges'">
          Rentang kustom
        </button>
      </div>

      <div v-if="mode === 'ranges'" class="mt-4">
        <label class="mb-1.5 block text-xs font-medium uppercase tracking-wide text-ink-soft">
          Satu baris = satu file hasil (misal: 1-3)
        </label>
        <textarea v-model="rangesInput" rows="4"
          class="w-full rounded-md border border-slate-300 px-3.5 py-2.5 font-mono text-sm text-ink focus:outline-none focus-visible:ring-2 focus-visible:ring-accent" />
      </div>

      <button
        class="mt-4 rounded-md bg-accent px-4 py-2.5 text-sm font-medium text-white hover:brightness-95 disabled:opacity-50"
        :disabled="isProcessing" @click="runSplit">
        {{ isProcessing ? 'Memproses…' : 'Pecah PDF' }}
      </button>
    </div>

    <div v-if="parts.length > 0" class="mt-5 overflow-hidden rounded-md border border-slate-200 bg-white">
      <div v-for="part in parts" :key="part.name"
        class="flex items-center justify-between border-b border-slate-100 px-4 py-3 last:border-b-0">
        <div>
          <p class="text-sm font-medium text-ink">{{ part.name }}</p>
          <p class="text-xs text-ink-soft">{{ part.pageCount }} halaman</p>
        </div>
        <button
          class="rounded-md border border-slate-300 bg-white px-3.5 py-2 text-sm font-medium text-ink hover:bg-slate-50"
          @click="downloadPart(part.name, part.bytes)">
          Download
        </button>
      </div>
    </div>

    <div v-if="parts.length > 0" class="mt-4">
      <button
        class="rounded-md border border-slate-300 bg-white px-4 py-2.5 text-sm font-medium text-ink hover:bg-slate-50"
        @click="downloadAll">
        Download semua ({{ parts.length }} file)
      </button>
    </div>

    <p class="mt-3.5 text-sm text-ink-soft">
      <span class="mr-1.5 inline-block h-1.5 w-1.5 rounded-full bg-accent align-middle" />
      File Anda tidak pernah meninggalkan browser ini.
    </p>

    <section class="mt-14">
      <h2 class="text-xl font-semibold text-ink">Kenapa menggunakan PDF Split ini?</h2>
      <ul class="mt-4 grid gap-3.5">
        <li class="border-l-2 border-accent pl-4 text-sm text-ink-soft">
          <strong class="font-semibold text-ink">Dua mode pembagian.</strong>
          Pecah per halaman, atau tentukan rentang sendiri.
        </li>
        <li class="border-l-2 border-accent pl-4 text-sm text-ink-soft">
          <strong class="font-semibold text-ink">Kualitas tetap terjaga.</strong>
          Halaman disalin apa adanya tanpa kompresi ulang.
        </li>
        <li class="border-l-2 border-accent pl-4 text-sm text-ink-soft">
          <strong class="font-semibold text-ink">Privasi terjaga.</strong>
          File diproses dan dipecah langsung di browser Anda.
        </li>
      </ul>
    </section>

    <section class="mt-14">
      <h2 class="text-xl font-semibold text-ink">Cara memecah file PDF</h2>
      <ol class="mt-4 grid list-decimal gap-2.5 pl-5 marker:font-mono marker:text-accent-dark">
        <li class="text-sm text-ink-soft">Upload file PDF yang ingin dipecah.</li>
        <li class="text-sm text-ink-soft">Pilih mode "Setiap halaman terpisah" atau "Rentang kustom".</li>
        <li class="text-sm text-ink-soft">Klik "Pecah PDF", lalu download tiap bagian.</li>
      </ol>
    </section>

    <section class="mt-14">
      <h2 class="text-xl font-semibold text-ink">Kapan Anda membutuhkan tool ini?</h2>
      <div class="mt-4 grid gap-3.5">
        <p class="max-w-[62ch] text-sm text-ink-soft">
          Berguna saat perlu mengambil beberapa halaman spesifik dari dokumen panjang, misal memisahkan bab
          tertentu dari sebuah buku digital atau memisahkan lampiran dari dokumen utama.
        </p>
        <p class="max-w-[62ch] text-sm text-ink-soft">
          Sering dipakai juga saat perlu mengirim sebagian halaman saja ke pihak tertentu tanpa membagikan seluruh
          dokumen.
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
