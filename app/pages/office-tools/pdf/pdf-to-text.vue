<script setup lang="ts">
const { text, pageCount, isProcessing, error, setFile, clear } = usePdfToText()

function onFiles(files: File[]) {
  const file = files[0]
  if (file) setFile(file)
}

function copyResult() {
  if (import.meta.client && navigator.clipboard && text.value) {
    navigator.clipboard.writeText(text.value).catch(() => { })
  }
}

function downloadResult() {
  if (text.value) downloadTextFile('extracted.txt', text.value, 'text/plain')
}

const faqItems = [
  {
    question: 'Apakah PDF hasil scan (gambar) bisa diekstrak teksnya?',
    answer: 'Belum. Tool ini membaca teks yang sudah ada secara digital di dalam PDF, bukan mengenali teks dari gambar (OCR). PDF hasil scan tanpa lapisan teks akan menghasilkan output kosong.',
  },
  {
    question: 'Apakah format asli (tabel, kolom) ikut terbawa?',
    answer: 'Tidak sepenuhnya. Teks diekstrak berurutan sesuai posisi di halaman, jadi tata letak tabel atau kolom kompleks bisa terlihat berantakan di hasil teks polos.',
  },
  {
    question: 'Kenapa proses butuh koneksi internet padahal katanya privasi terjaga?',
    answer: 'Koneksi internet hanya dipakai untuk memuat kode library pembaca PDF (bukan data Anda). Isi PDF Anda tetap sepenuhnya diproses secara lokal di browser dan tidak pernah dikirim ke server manapun.',
  },
  {
    question: 'Apakah bisa mengekstrak PDF yang dilindungi password?',
    answer: 'Belum didukung. PDF berpassword perlu dibuka kuncinya terlebih dahulu.',
  },
]

const relatedTools = [
  { name: 'Extract Pages', href: '/office-tools/pdf/pdf-extract-pages' },
  { name: 'Merge', href: '/office-tools/pdf/pdf-merge' },
  { name: 'Split', href: '/office-tools/pdf/pdf-split' },
  { name: 'Compress', href: '/office-tools/pdf/pdf-compress' },
]

useSeoMeta({
  title: 'PDF to Text Converter Online — Ekstrak Teks dari PDF Gratis',
  description: 'Ekstrak teks dari file PDF secara instan di browser Anda. Gratis, tanpa upload dokumen ke server.',
})

useHead({
  script: [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'SoftwareApplication',
        name: 'PDF to Text Converter',
        applicationCategory: 'UtilitiesApplication',
        operatingSystem: 'Any (Web Browser)',
        offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
        description: 'Mengekstrak teks dari file PDF yang punya lapisan teks digital.',
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
      PDF → Text
    </p>

    <h1 class="mt-3 max-w-[24ch] text-3xl font-semibold leading-tight text-ink sm:text-4xl">
      PDF to Text — ekstrak teks dari file PDF
    </h1>
    <p class="mt-2 max-w-[52ch] text-base text-ink-soft">
      Upload PDF Anda, teksnya diekstrak otomatis dan siap disalin.
    </p>

    <div class="mt-7">
      <FileDropzone accept="application/pdf" label="Tarik & lepas file PDF di sini" @files="onFiles" />
    </div>

    <p v-if="error" class="mt-3 rounded-md border border-red-200 bg-red-50 px-4 py-2.5 text-sm text-red-700">
      {{ error }}
    </p>

    <p v-if="isProcessing" class="mt-3 text-sm text-ink-soft">Mengekstrak teks…</p>

    <div v-if="text" class="mt-5">
      <p class="mb-1.5 text-xs font-medium uppercase tracking-wide text-ink-soft">{{ pageCount }} halaman diekstrak</p>
      <textarea :value="text" readonly rows="14"
        class="w-full resize-y rounded-md border border-slate-200 bg-slate-50 p-4 font-mono text-xs text-ink focus:outline-none" />
    </div>

    <div v-if="text" class="mt-4 flex flex-wrap items-center gap-3">
      <button class="rounded-md bg-accent px-4 py-2.5 text-sm font-medium text-white hover:brightness-95"
        @click="copyResult">
        Copy teks
      </button>
      <button
        class="rounded-md border border-slate-300 bg-white px-4 py-2.5 text-sm font-medium text-ink hover:bg-slate-50"
        @click="downloadResult">
        Download .txt
      </button>
      <button
        class="rounded-md border border-slate-300 bg-white px-4 py-2.5 text-sm font-medium text-ink hover:bg-slate-50"
        @click="clear">
        Clear
      </button>
    </div>

    <p class="mt-3.5 text-sm text-ink-soft">
      <span class="mr-1.5 inline-block h-1.5 w-1.5 rounded-full bg-accent align-middle" />
      Isi dokumen Anda tidak pernah dikirim ke server manapun.
    </p>

    <section class="mt-14">
      <h2 class="text-xl font-semibold text-ink">Kenapa menggunakan PDF to Text ini?</h2>
      <ul class="mt-4 grid gap-3.5">
        <li class="border-l-2 border-accent pl-4 text-sm text-ink-soft">
          <strong class="font-semibold text-ink">Penanda halaman jelas.</strong>
          Setiap halaman ditandai supaya mudah dilacak asalnya.
        </li>
        <li class="border-l-2 border-accent pl-4 text-sm text-ink-soft">
          <strong class="font-semibold text-ink">Bisa disalin atau diunduh.</strong>
          Hasil teks siap dipakai langsung atau disimpan sebagai file .txt.
        </li>
        <li class="border-l-2 border-accent pl-4 text-sm text-ink-soft">
          <strong class="font-semibold text-ink">Privasi terjaga.</strong>
          Isi dokumen Anda diproses secara lokal, tidak pernah diunggah.
        </li>
      </ul>
    </section>

    <section class="mt-14">
      <h2 class="text-xl font-semibold text-ink">Cara mengekstrak teks dari PDF</h2>
      <ol class="mt-4 grid list-decimal gap-2.5 pl-5 marker:font-mono marker:text-accent-dark">
        <li class="text-sm text-ink-soft">Upload file PDF Anda.</li>
        <li class="text-sm text-ink-soft">Tunggu proses ekstraksi selesai (sebentar).</li>
        <li class="text-sm text-ink-soft">Copy atau download hasil teksnya.</li>
      </ol>
    </section>

    <section class="mt-14">
      <h2 class="text-xl font-semibold text-ink">Kapan Anda membutuhkan tool ini?</h2>
      <div class="mt-4 grid gap-3.5">
        <p class="max-w-[62ch] text-sm text-ink-soft">
          Berguna saat perlu mengutip atau mengolah ulang isi sebuah laporan PDF jadi dokumen baru tanpa harus
          mengetik ulang manual dari awal.
        </p>
        <p class="max-w-[62ch] text-sm text-ink-soft">
          Sering dipakai juga untuk mengekstrak isi kontrak atau makalah panjang agar bisa di-paste ke tool analisis
          teks lain, seperti Word Counter atau Text Compare.
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
