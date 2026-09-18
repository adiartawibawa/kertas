<script setup lang="ts">
const { totalPages, pagesInput, resultBytes, isProcessing, error, setFile, runExtract } = usePdfExtractPages()

function onFiles(files: File[]) {
  const file = files[0]
  if (file) setFile(file)
}

function downloadResult() {
  if (resultBytes.value) downloadBinaryFile('extracted.pdf', resultBytes.value, 'application/pdf')
}

const faqItems = [
  {
    question: 'Bagaimana format penulisan halaman yang diekstrak?',
    answer: 'Gunakan tanda hubung untuk rentang ("1-3") atau koma untuk halaman terpisah ("1,4,7"), bisa dikombinasikan misal "1-3,7,10-12".',
  },
  {
    question: 'Apakah urutan halaman di hasil sesuai urutan yang saya tulis atau urutan asli?',
    answer: 'Hasil selalu mengikuti urutan asli di dokumen sumber, terlepas dari urutan penulisan nomor halaman di input.',
  },
  {
    question: 'Apa bedanya dengan PDF Split?',
    answer: 'Extract Pages menghasilkan SATU file PDF berisi halaman-halaman terpilih. PDF Split menghasilkan BEBERAPA file terpisah dari satu dokumen.',
  },
  {
    question: 'Apakah file saya diunggah ke server?',
    answer: 'Tidak. Semua proses ekstraksi berjalan langsung di browser Anda.',
  },
]

const relatedTools = [
  { name: 'Merge', href: '/office-tools/pdf/pdf-merge' },
  { name: 'Split', href: '/office-tools/pdf/pdf-split' },
  { name: 'Rotate', href: '/office-tools/pdf/pdf-rotate' },
  { name: 'PDF → Text', href: '/office-tools/pdf/pdf-to-text' },
]

useSeoMeta({
  title: 'PDF Extract Pages Online — Ambil Halaman Tertentu Gratis',
  description: 'Ambil halaman tertentu dari PDF jadi satu file baru secara instan di browser Anda. Gratis, tanpa upload ke server.',
})

useHead({
  script: [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'SoftwareApplication',
        name: 'PDF Extract Pages',
        applicationCategory: 'UtilitiesApplication',
        operatingSystem: 'Any (Web Browser)',
        offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
        description: 'Mengambil halaman tertentu dari PDF jadi satu file baru.',
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
      Extract Pages
    </p>

    <h1 class="mt-3 max-w-[24ch] text-3xl font-semibold leading-tight text-ink sm:text-4xl">
      PDF Extract Pages — ambil halaman tertentu dari PDF
    </h1>
    <p class="mt-2 max-w-[52ch] text-base text-ink-soft">
      Upload PDF Anda, tentukan halaman yang diinginkan, unduh sebagai satu file baru.
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
        <label class="mb-1.5 block text-xs font-medium uppercase tracking-wide text-ink-soft">Halaman yang
          diambil</label>
        <input v-model="pagesInput" type="text" placeholder="Misal: 1-3,7,10-12"
          class="w-full max-w-xs rounded-md border border-slate-300 px-3.5 py-2 text-sm text-ink focus:outline-none focus-visible:ring-2 focus-visible:ring-accent">
      </div>

      <button
        class="mt-4 rounded-md bg-accent px-4 py-2.5 text-sm font-medium text-white hover:brightness-95 disabled:opacity-50"
        :disabled="isProcessing" @click="runExtract">
        {{ isProcessing ? 'Memproses…' : 'Ekstrak Halaman' }}
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
      <h2 class="text-xl font-semibold text-ink">Kenapa menggunakan PDF Extract Pages ini?</h2>
      <ul class="mt-4 grid gap-3.5">
        <li class="border-l-2 border-accent pl-4 text-sm text-ink-soft">
          <strong class="font-semibold text-ink">Format rentang fleksibel.</strong>
          Kombinasikan rentang dan halaman tunggal dalam satu input.
        </li>
        <li class="border-l-2 border-accent pl-4 text-sm text-ink-soft">
          <strong class="font-semibold text-ink">Hasil satu file rapi.</strong>
          Semua halaman terpilih digabung jadi satu dokumen baru.
        </li>
        <li class="border-l-2 border-accent pl-4 text-sm text-ink-soft">
          <strong class="font-semibold text-ink">Privasi terjaga.</strong>
          File diproses langsung di browser Anda.
        </li>
      </ul>
    </section>

    <section class="mt-14">
      <h2 class="text-xl font-semibold text-ink">Cara mengambil halaman tertentu</h2>
      <ol class="mt-4 grid list-decimal gap-2.5 pl-5 marker:font-mono marker:text-accent-dark">
        <li class="text-sm text-ink-soft">Upload file PDF sumber.</li>
        <li class="text-sm text-ink-soft">Tulis nomor atau rentang halaman yang diinginkan.</li>
        <li class="text-sm text-ink-soft">Klik "Ekstrak Halaman", lalu download hasilnya.</li>
      </ol>
    </section>

    <section class="mt-14">
      <h2 class="text-xl font-semibold text-ink">Kapan Anda membutuhkan tool ini?</h2>
      <div class="mt-4 grid gap-3.5">
        <p class="max-w-[62ch] text-sm text-ink-soft">
          Berguna saat hanya perlu membagikan bab tertentu dari sebuah laporan panjang, atau mengambil halaman
          lampiran tanpa perlu membagikan keseluruhan dokumen.
        </p>
        <p class="max-w-[62ch] text-sm text-ink-soft">
          Sering dipakai juga untuk membuat ringkasan dokumen dengan hanya mengambil halaman-halaman penting dari
          sebuah kontrak atau proposal.
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
