<script setup lang="ts">
const textA = ref('')
const textB = ref('')
const { rows, stats } = useTextDiff(textA, textB)

function clearAll() {
  textA.value = ''
  textB.value = ''
}

const faqItems = [
  {
    question: 'Apakah ini membandingkan per kata atau per baris?',
    answer:
      'Per baris. Tool ini cocok untuk membandingkan paragraf, konfigurasi, atau daftar teks baris demi baris — bukan untuk mendeteksi perubahan satu-dua huruf di dalam kalimat yang sama.',
  },
  {
    question: 'Apa arti warna merah dan hijau?',
    answer:
      'Baris berwarna merah di kolom kiri berarti baris tersebut hanya ada di teks pertama (dihapus). Baris hijau di kolom kanan berarti baris tersebut hanya ada di teks kedua (ditambahkan).',
  },
  {
    question: 'Bisakah membandingkan dokumen yang sangat panjang?',
    answer:
      'Bisa, namun karena proses perbandingan berjalan di browser Anda, dokumen yang sangat panjang (ribuan baris) bisa memperlambat perangkat dengan spesifikasi rendah.',
  },
  {
    question: 'Apakah kedua teks saya diunggah ke server?',
    answer: 'Tidak. Perbandingan sepenuhnya berjalan di browser Anda, tidak ada data yang terkirim keluar.',
  },
]

const relatedTools = [
  { name: 'Word Counter', href: '/office-tools/documents/word-counter' },
  { name: 'Text Cleaner', href: '/office-tools/documents/text-cleaner' },
  { name: 'Case Converter', href: '/office-tools/documents/case-converter' },
  { name: 'Duplicate Line Remover', href: '/office-tools/documents/duplicate-line-remover' },
]

useSeoMeta({
  title: 'Text Compare Online — Bandingkan Dua Teks Gratis',
  description:
    'Bandingkan dua teks dan temukan perbedaannya baris demi baris secara instan. Tanpa upload, 100% diproses di browser Anda.',
})

useHead({
  script: [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'SoftwareApplication',
        name: 'Text Compare',
        applicationCategory: 'UtilitiesApplication',
        operatingSystem: 'Any (Web Browser)',
        offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
        description: 'Membandingkan dua teks dan menyorot baris yang berbeda secara instan di browser.',
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
      <NuxtLink to="/office-tools/documents" class="hover:text-accent-dark">Documents</NuxtLink> /
      Text Compare
    </p>

    <h1 class="mt-3 max-w-[24ch] text-3xl font-semibold leading-tight text-ink sm:text-4xl">
      Text Compare online — temukan perbedaan dua teks secara instan
    </h1>
    <p class="mt-2 max-w-[52ch] text-base text-ink-soft">
      Tempel dua versi teks, perbedaannya langsung ditandai warna baris demi baris.
    </p>

    <div class="mt-7 grid gap-4 sm:grid-cols-2">
      <div>
        <p class="mb-1.5 text-xs font-medium uppercase tracking-wide text-ink-soft">Teks pertama</p>
        <textarea
          v-model="textA"
          rows="8"
          placeholder="Tempel versi pertama…"
          class="w-full resize-y rounded-md border border-slate-200 bg-white p-4 text-sm text-ink placeholder:text-ink-soft focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
        />
      </div>
      <div>
        <p class="mb-1.5 text-xs font-medium uppercase tracking-wide text-ink-soft">Teks kedua</p>
        <textarea
          v-model="textB"
          rows="8"
          placeholder="Tempel versi kedua…"
          class="w-full resize-y rounded-md border border-slate-200 bg-white p-4 text-sm text-ink placeholder:text-ink-soft focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
        />
      </div>
    </div>

    <div class="mt-5 rounded-md border border-slate-200 bg-white">
      <div class="flex flex-wrap gap-x-5 gap-y-1.5 border-b border-slate-200 px-4 py-2.5 text-xs text-ink-soft">
        <span><span class="mr-1.5 inline-block h-2 w-2 rounded-sm bg-red-200 align-middle" />{{ stats.removed }} baris dihapus</span>
        <span><span class="mr-1.5 inline-block h-2 w-2 rounded-sm bg-accent-tint align-middle" />{{ stats.added }} baris ditambahkan</span>
      </div>
      <DiffView :rows="rows" />
    </div>

    <div class="mt-4">
      <button
        class="rounded-md border border-slate-300 bg-white px-4 py-2.5 text-sm font-medium text-ink hover:bg-slate-50"
        @click="clearAll"
      >
        Clear semua
      </button>
    </div>

    <p class="mt-3.5 text-sm text-ink-soft">
      <span class="mr-1.5 inline-block h-1.5 w-1.5 rounded-full bg-accent align-middle" />
      Kedua teks tidak pernah meninggalkan browser ini.
    </p>

    <section class="mt-14">
      <h2 class="text-xl font-semibold text-ink">Kenapa menggunakan Text Compare ini?</h2>
      <ul class="mt-4 grid gap-3.5">
        <li class="border-l-2 border-accent pl-4 text-sm text-ink-soft">
          <strong class="font-semibold text-ink">Perbandingan visual jelas.</strong>
          Baris yang berbeda langsung disorot warna, tidak perlu membaca manual satu-satu.
        </li>
        <li class="border-l-2 border-accent pl-4 text-sm text-ink-soft">
          <strong class="font-semibold text-ink">Hasil real-time.</strong>
          Perbedaan langsung terlihat saat Anda mengedit salah satu teks.
        </li>
        <li class="border-l-2 border-accent pl-4 text-sm text-ink-soft">
          <strong class="font-semibold text-ink">Privasi terjaga.</strong>
          Kedua teks diproses langsung di browser, tidak ada yang diunggah.
        </li>
      </ul>
    </section>

    <section class="mt-14">
      <h2 class="text-xl font-semibold text-ink">Cara membandingkan dua teks</h2>
      <ol class="mt-4 grid list-decimal gap-2.5 pl-5 marker:font-mono marker:text-accent-dark">
        <li class="text-sm text-ink-soft">Tempel versi pertama di kolom kiri.</li>
        <li class="text-sm text-ink-soft">Tempel versi kedua di kolom kanan.</li>
        <li class="text-sm text-ink-soft">Perbedaan otomatis muncul di panel bawah — merah untuk baris yang dihapus, hijau untuk baris yang ditambahkan.</li>
      </ol>
    </section>

    <section class="mt-14">
      <h2 class="text-xl font-semibold text-ink">Kapan Anda membutuhkan Text Compare?</h2>
      <div class="mt-4 grid gap-3.5">
        <p class="max-w-[62ch] text-sm text-ink-soft">
          Berguna saat membandingkan dua draft dokumen untuk melihat apa saja yang diubah editor, membandingkan
          dua versi file konfigurasi, atau memverifikasi hasil terjemahan dengan naskah aslinya.
        </p>
        <p class="max-w-[62ch] text-sm text-ink-soft">
          Developer juga sering memakai tool seperti ini untuk membandingkan dua potongan kode atau isi file log
          tanpa perlu membuka aplikasi diff terpisah di komputer.
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
