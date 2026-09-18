<script setup lang="ts">
const { files, addFiles, removeFile, moveUp, moveDown, isMerging, error, downloadMerged } = usePdfMerge()

function onFiles(fileList: File[]) {
  addFiles(fileList)
}

const faqItems = [
  {
    question: 'Bagaimana urutan file hasil gabungan ditentukan?',
    answer:
      'Sesuai urutan file di daftar. Gunakan tombol panah atas/bawah di tiap file untuk mengatur urutannya sebelum digabungkan.',
  },
  {
    question: 'Berapa banyak file PDF yang bisa digabung sekaligus?',
    answer: 'Tidak ada batas resmi, tapi semakin banyak dan besar file, semakin lama proses penggabungan karena semua berjalan di browser Anda.',
  },
  {
    question: 'Apakah PDF yang terkunci password bisa digabungkan?',
    answer: 'Belum didukung. PDF yang dilindungi password perlu dibuka kuncinya terlebih dahulu sebelum diproses di sini.',
  },
  {
    question: 'Apakah file saya diunggah ke server?',
    answer: 'Tidak. Semua proses penggabungan berjalan langsung di browser Anda.',
  },
]

const relatedTools = [
  { name: 'Split', href: '/office-tools/pdf/pdf-split' },
  { name: 'Extract Pages', href: '/office-tools/pdf/pdf-extract-pages' },
  { name: 'Rotate', href: '/office-tools/pdf/pdf-rotate' },
  { name: 'Compress', href: '/office-tools/pdf/pdf-compress' },
]

useSeoMeta({
  title: 'PDF Merge Online — Gabungkan Banyak PDF Gratis',
  description: 'Gabungkan beberapa file PDF jadi satu secara instan di browser Anda. Gratis, tanpa upload ke server, tanpa watermark.',
})

useHead({
  script: [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'SoftwareApplication',
        name: 'PDF Merge',
        applicationCategory: 'UtilitiesApplication',
        operatingSystem: 'Any (Web Browser)',
        offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
        description: 'Menggabungkan beberapa file PDF jadi satu file.',
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
      Merge
    </p>

    <h1 class="mt-3 max-w-[24ch] text-3xl font-semibold leading-tight text-ink sm:text-4xl">
      PDF Merge — gabungkan beberapa PDF jadi satu file
    </h1>
    <p class="mt-2 max-w-[52ch] text-base text-ink-soft">
      Upload beberapa file PDF, atur urutannya, unduh sebagai satu file gabungan.
    </p>

    <div class="mt-7">
      <FileDropzone accept="application/pdf" :multiple="true" label="Tarik & lepas beberapa file PDF di sini"
        @files="onFiles" />
    </div>

    <p v-if="error" class="mt-3 rounded-md border border-red-200 bg-red-50 px-4 py-2.5 text-sm text-red-700">
      {{ error }}
    </p>

    <div v-if="files.length > 0" class="mt-5 overflow-hidden rounded-md border border-slate-200 bg-white">
      <div v-for="(entry, i) in files" :key="entry.id"
        class="flex items-center justify-between border-b border-slate-100 px-4 py-3 last:border-b-0">
        <div class="flex items-center gap-3">
          <span class="font-mono text-xs text-ink-soft">{{ i + 1 }}</span>
          <p class="text-sm font-medium text-ink">{{ entry.name }}</p>
        </div>
        <div class="flex items-center gap-1.5">
          <button class="text-ink-soft hover:text-ink disabled:opacity-30" :disabled="i === 0" aria-label="Naik"
            @click="moveUp(entry.id)">↑</button>
          <button class="text-ink-soft hover:text-ink disabled:opacity-30" :disabled="i === files.length - 1"
            aria-label="Turun" @click="moveDown(entry.id)">↓</button>
          <button class="ml-2 text-ink-soft hover:text-red-600" aria-label="Hapus"
            @click="removeFile(entry.id)">✕</button>
        </div>
      </div>
    </div>

    <div class="mt-4 flex flex-wrap items-center gap-3">
      <button
        class="rounded-md bg-accent px-4 py-2.5 text-sm font-medium text-white hover:brightness-95 disabled:opacity-50"
        :disabled="files.length < 2 || isMerging" @click="downloadMerged()">
        {{ isMerging ? 'Menggabungkan…' : 'Download hasil gabungan' }}
      </button>
      <span v-if="files.length > 0" class="text-sm text-ink-soft">{{ files.length }} file dipilih</span>
    </div>

    <p class="mt-3.5 text-sm text-ink-soft">
      <span class="mr-1.5 inline-block h-1.5 w-1.5 rounded-full bg-accent align-middle" />
      File Anda tidak pernah meninggalkan browser ini.
    </p>

    <section class="mt-14">
      <h2 class="text-xl font-semibold text-ink">Kenapa menggunakan PDF Merge ini?</h2>
      <ul class="mt-4 grid gap-3.5">
        <li class="border-l-2 border-accent pl-4 text-sm text-ink-soft">
          <strong class="font-semibold text-ink">Urutan bisa diatur.</strong>
          Susun ulang file sebelum digabungkan tanpa perlu upload ulang.
        </li>
        <li class="border-l-2 border-accent pl-4 text-sm text-ink-soft">
          <strong class="font-semibold text-ink">Tanpa watermark.</strong>
          Hasil gabungan bersih tanpa tambahan logo atau tanda air.
        </li>
        <li class="border-l-2 border-accent pl-4 text-sm text-ink-soft">
          <strong class="font-semibold text-ink">Privasi terjaga.</strong>
          Dokumen Anda diproses langsung di browser, tidak pernah diunggah.
        </li>
      </ul>
    </section>

    <section class="mt-14">
      <h2 class="text-xl font-semibold text-ink">Cara menggabungkan PDF</h2>
      <ol class="mt-4 grid list-decimal gap-2.5 pl-5 marker:font-mono marker:text-accent-dark">
        <li class="text-sm text-ink-soft">Upload minimal 2 file PDF.</li>
        <li class="text-sm text-ink-soft">Atur urutan file dengan tombol panah kalau perlu.</li>
        <li class="text-sm text-ink-soft">Klik "Download hasil gabungan".</li>
      </ol>
    </section>

    <section class="mt-14">
      <h2 class="text-xl font-semibold text-ink">Kapan Anda membutuhkan tool ini?</h2>
      <div class="mt-4 grid gap-3.5">
        <p class="max-w-[62ch] text-sm text-ink-soft">
          Berguna saat perlu menggabungkan beberapa dokumen scan (KTP, kontrak, lampiran) jadi satu file PDF untuk
          dikirim sebagai satu berkas ke instansi atau klien.
        </p>
        <p class="max-w-[62ch] text-sm text-ink-soft">
          Sering dipakai juga untuk menyatukan beberapa bab laporan atau proposal yang dikerjakan terpisah oleh
          tim berbeda jadi satu dokumen final.
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
