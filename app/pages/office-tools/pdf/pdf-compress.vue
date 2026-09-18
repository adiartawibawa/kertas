<script setup lang="ts">
const { originalSize, compressedBytes, compressedSize, savedPercent, isProcessing, error, setFile, runCompress } = usePdfCompress()

function onFiles(files: File[]) {
  const file = files[0]
  if (file) setFile(file)
}

function downloadResult() {
  if (compressedBytes.value) downloadBinaryFile('compressed.pdf', compressedBytes.value, 'application/pdf')
}

function formatSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`
}

const faqItems = [
  {
    question: 'Seberapa besar ukuran file bisa berkurang?',
    answer:
      'Tergantung isi PDF. Untuk PDF berbasis teks, pengurangan bisa cukup terasa karena struktur internal dipadatkan. Untuk PDF yang didominasi gambar beresolusi tinggi, pengurangannya bisa sangat kecil karena tool ini tidak mengompres/menurunkan resolusi gambar.',
  },
  {
    question: 'Apakah kualitas visual PDF berkurang?',
    answer: 'Tidak. Kompresi ini hanya memadatkan struktur file dan menghapus metadata, bukan mengubah kualitas gambar atau teks.',
  },
  {
    question: 'Kenapa hasilnya kadang tidak lebih kecil sama sekali?',
    answer: 'PDF yang sudah dibuat dengan struktur efisien (misal hasil export langsung dari aplikasi modern) mungkin sudah cukup padat, sehingga tidak banyak lagi yang bisa dipangkas.',
  },
  {
    question: 'Apakah file saya diunggah ke server?',
    answer: 'Tidak. Proses kompresi berjalan langsung di browser Anda.',
  },
]

const relatedTools = [
  { name: 'Merge', href: '/office-tools/pdf/pdf-merge' },
  { name: 'Split', href: '/office-tools/pdf/pdf-split' },
  { name: 'Rotate', href: '/office-tools/pdf/pdf-rotate' },
  { name: 'Extract Pages', href: '/office-tools/pdf/pdf-extract-pages' },
]

useSeoMeta({
  title: 'PDF Compress Online — Perkecil Ukuran PDF Gratis',
  description: 'Perkecil ukuran file PDF secara instan di browser Anda. Gratis, tanpa upload ke server.',
})

useHead({
  script: [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'SoftwareApplication',
        name: 'PDF Compress',
        applicationCategory: 'UtilitiesApplication',
        operatingSystem: 'Any (Web Browser)',
        offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
        description: 'Memperkecil ukuran file PDF dengan memadatkan struktur internal.',
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
      Compress
    </p>

    <h1 class="mt-3 max-w-[24ch] text-3xl font-semibold leading-tight text-ink sm:text-4xl">
      PDF Compress — perkecil ukuran file PDF
    </h1>
    <p class="mt-2 max-w-[52ch] text-base text-ink-soft">
      Upload PDF Anda, kami padatkan strukturnya untuk mengurangi ukuran file.
    </p>

    <div class="mt-5 rounded-md border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">
      Catatan: kompresi ini memadatkan struktur internal PDF, bukan menurunkan resolusi gambar. Untuk PDF yang
      didominasi gambar beresolusi tinggi, pengurangan ukurannya bisa terbatas.
    </div>

    <div class="mt-5">
      <FileDropzone accept="application/pdf" label="Tarik & lepas file PDF di sini" @files="onFiles" />
    </div>

    <p v-if="error" class="mt-3 rounded-md border border-red-200 bg-red-50 px-4 py-2.5 text-sm text-red-700">
      {{ error }}
    </p>

    <div v-if="originalSize > 0" class="mt-5 rounded-md border border-slate-200 bg-white p-4">
      <p class="text-sm text-ink-soft">Ukuran asli: <span class="font-medium text-ink">{{ formatSize(originalSize)
          }}</span></p>

      <button
        class="mt-4 rounded-md bg-accent px-4 py-2.5 text-sm font-medium text-white hover:brightness-95 disabled:opacity-50"
        :disabled="isProcessing" @click="runCompress">
        {{ isProcessing ? 'Mengompres…' : 'Kompres PDF' }}
      </button>

      <div v-if="compressedBytes"
        class="mt-5 grid grid-cols-3 divide-x divide-slate-200 border-t border-slate-200 pt-4">
        <div class="px-3">
          <span class="block font-mono text-lg font-medium text-ink">{{ formatSize(originalSize) }}</span>
          <span class="mt-0.5 block text-xs text-ink-soft">Ukuran asli</span>
        </div>
        <div class="px-3">
          <span class="block font-mono text-lg font-medium text-accent-dark">{{ formatSize(compressedSize) }}</span>
          <span class="mt-0.5 block text-xs text-ink-soft">Setelah kompres</span>
        </div>
        <div class="px-3">
          <span class="block font-mono text-lg font-medium text-accent-dark">{{ savedPercent }}%</span>
          <span class="mt-0.5 block text-xs text-ink-soft">Berkurang</span>
        </div>
      </div>

      <button v-if="compressedBytes"
        class="mt-4 rounded-md border border-slate-300 bg-white px-4 py-2.5 text-sm font-medium text-ink hover:bg-slate-50"
        @click="downloadResult">
        Download hasil
      </button>
    </div>

    <p class="mt-3.5 text-sm text-ink-soft">
      <span class="mr-1.5 inline-block h-1.5 w-1.5 rounded-full bg-accent align-middle" />
      File Anda tidak pernah meninggalkan browser ini.
    </p>

    <section class="mt-14">
      <h2 class="text-xl font-semibold text-ink">Kenapa menggunakan PDF Compress ini?</h2>
      <ul class="mt-4 grid gap-3.5">
        <li class="border-l-2 border-accent pl-4 text-sm text-ink-soft">
          <strong class="font-semibold text-ink">Perbandingan jelas.</strong>
          Lihat langsung ukuran sebelum dan sesudah, beserta persentase pengurangan.
        </li>
        <li class="border-l-2 border-accent pl-4 text-sm text-ink-soft">
          <strong class="font-semibold text-ink">Kualitas tidak berubah.</strong>
          Tidak ada penurunan resolusi gambar atau kualitas teks.
        </li>
        <li class="border-l-2 border-accent pl-4 text-sm text-ink-soft">
          <strong class="font-semibold text-ink">Privasi terjaga.</strong>
          File diproses langsung di browser Anda.
        </li>
      </ul>
    </section>

    <section class="mt-14">
      <h2 class="text-xl font-semibold text-ink">Cara mengompres file PDF</h2>
      <ol class="mt-4 grid list-decimal gap-2.5 pl-5 marker:font-mono marker:text-accent-dark">
        <li class="text-sm text-ink-soft">Upload file PDF yang ingin diperkecil.</li>
        <li class="text-sm text-ink-soft">Klik "Kompres PDF".</li>
        <li class="text-sm text-ink-soft">Bandingkan ukuran hasil, lalu download kalau sudah sesuai.</li>
      </ol>
    </section>

    <section class="mt-14">
      <h2 class="text-xl font-semibold text-ink">Kapan Anda membutuhkan tool ini?</h2>
      <div class="mt-4 grid gap-3.5">
        <p class="max-w-[62ch] text-sm text-ink-soft">
          Berguna saat perlu mengirim PDF lewat email yang punya batas ukuran lampiran, atau mengunggah dokumen ke
          formulir online yang membatasi ukuran file.
        </p>
        <p class="max-w-[62ch] text-sm text-ink-soft">
          Untuk PDF hasil scan dengan gambar beresolusi tinggi, hasil kompresi mungkin terbatas — pertimbangkan
          untuk scan ulang dengan resolusi lebih rendah kalau ukuran masih terlalu besar.
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
