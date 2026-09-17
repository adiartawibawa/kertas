<script setup lang="ts">
const text = ref('')
const { activeCase, converted } = useCaseConverter(text)

function copyResult() {
  if (import.meta.client && navigator.clipboard) {
    navigator.clipboard.writeText(converted.value).catch(() => {})
  }
}

function clearText() {
  text.value = ''
}

const faqItems = [
  {
    question: 'Format apa saja yang didukung?',
    answer:
      'Delapan format: UPPERCASE, lowercase, Title Case, Sentence case, camelCase, PascalCase, snake_case, dan kebab-case. Cocok untuk kebutuhan penulisan maupun penamaan variabel di kode.',
  },
  {
    question: 'Apakah camelCase dan PascalCase bisa dipakai untuk teks biasa?',
    answer:
      'Bisa, tapi hasil terbaik untuk kedua format ini adalah frasa pendek tanpa tanda baca — karena keduanya menghilangkan spasi antar kata, sesuai konvensi penamaan variabel dalam pemrograman.',
  },
  {
    question: 'Apakah Sentence case akan merapikan huruf kapital di tengah kalimat?',
    answer:
      'Ya, Sentence case akan mengubah semua huruf jadi kecil terlebih dahulu, lalu mengkapitalkan huruf pertama di awal kalimat dan setelah tanda titik, tanya, atau seru.',
  },
  {
    question: 'Apakah teks saya disimpan di server?',
    answer: 'Tidak. Semua konversi dilakukan langsung di browser Anda tanpa terhubung ke server manapun.',
  },
]

const relatedTools = [
  { name: 'Word Counter', href: '/office-tools/documents/word-counter' },
  { name: 'Text Cleaner', href: '/office-tools/documents/text-cleaner' },
  { name: 'Text Compare', href: '/office-tools/documents/text-compare' },
  { name: 'Duplicate Line Remover', href: '/office-tools/documents/duplicate-line-remover' },
]

useSeoMeta({
  title: 'Case Converter Online — UPPERCASE, camelCase, snake_case Gratis',
  description:
    'Ubah teks jadi UPPERCASE, lowercase, Title Case, camelCase, snake_case, dan format lain secara instan di browser Anda.',
})

useHead({
  script: [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'SoftwareApplication',
        name: 'Case Converter',
        applicationCategory: 'UtilitiesApplication',
        operatingSystem: 'Any (Web Browser)',
        offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
        description: 'Mengonversi teks ke berbagai format kapitalisasi seperti UPPERCASE, camelCase, dan snake_case.',
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
      Case Converter
    </p>

    <h1 class="mt-3 max-w-[24ch] text-3xl font-semibold leading-tight text-ink sm:text-4xl">
      Case Converter online — ubah format huruf dalam satu klik
    </h1>
    <p class="mt-2 max-w-[52ch] text-base text-ink-soft">
      UPPERCASE, camelCase, snake_case, dan format lainnya — pilih formatnya, hasil langsung muncul.
    </p>

    <div class="mt-7 rounded-md border border-slate-200 bg-white">
      <textarea
        v-model="text"
        rows="7"
        placeholder="Ketik atau tempel teks Anda di sini…"
        class="w-full resize-y border-0 bg-transparent p-5 text-base text-ink placeholder:text-ink-soft focus:outline-none"
      />
    </div>

    <div class="mt-4 flex flex-wrap gap-2">
      <button
        v-for="option in caseOptions"
        :key="option.value"
        class="rounded-md border px-3.5 py-2 text-sm font-medium transition-colors"
        :class="
          activeCase === option.value
            ? 'border-accent bg-accent text-white'
            : 'border-slate-300 bg-white text-ink hover:bg-slate-50'
        "
        @click="activeCase = option.value"
      >
        {{ option.label }}
      </button>
    </div>

    <div class="mt-5 rounded-md border border-slate-200 bg-slate-50">
      <textarea
        :value="converted"
        readonly
        rows="7"
        class="w-full resize-y border-0 bg-transparent p-5 text-base text-ink focus:outline-none"
      />
    </div>

    <div class="mt-4 flex gap-2.5">
      <button
        class="rounded-md bg-accent px-4 py-2.5 text-sm font-medium text-white hover:brightness-95"
        @click="copyResult"
      >
        Copy hasil
      </button>
      <button
        class="rounded-md border border-slate-300 bg-white px-4 py-2.5 text-sm font-medium text-ink hover:bg-slate-50"
        @click="clearText"
      >
        Clear
      </button>
    </div>

    <p class="mt-3.5 text-sm text-ink-soft">
      <span class="mr-1.5 inline-block h-1.5 w-1.5 rounded-full bg-accent align-middle" />
      Teks Anda tidak pernah meninggalkan browser ini.
    </p>

    <section class="mt-14">
      <h2 class="text-xl font-semibold text-ink">Kenapa menggunakan Case Converter ini?</h2>
      <ul class="mt-4 grid gap-3.5">
        <li class="border-l-2 border-accent pl-4 text-sm text-ink-soft">
          <strong class="font-semibold text-ink">8 format sekaligus.</strong>
          Dari penulisan formal (Title Case) sampai penamaan variabel kode (camelCase, snake_case).
        </li>
        <li class="border-l-2 border-accent pl-4 text-sm text-ink-soft">
          <strong class="font-semibold text-ink">Ganti format bebas.</strong>
          Klik format lain kapan saja, hasil langsung berubah tanpa perlu ulang input teks.
        </li>
        <li class="border-l-2 border-accent pl-4 text-sm text-ink-soft">
          <strong class="font-semibold text-ink">Privasi terjaga.</strong>
          Semua konversi berjalan di browser Anda.
        </li>
      </ul>
    </section>

    <section class="mt-14">
      <h2 class="text-xl font-semibold text-ink">Cara mengubah format huruf</h2>
      <ol class="mt-4 grid list-decimal gap-2.5 pl-5 marker:font-mono marker:text-accent-dark">
        <li class="text-sm text-ink-soft">Ketik atau tempel teks Anda ke kolom input.</li>
        <li class="text-sm text-ink-soft">Pilih format yang diinginkan dari daftar tombol.</li>
        <li class="text-sm text-ink-soft">Hasil konversi muncul otomatis di kolom bawah.</li>
        <li class="text-sm text-ink-soft">Klik Copy untuk menyalin hasil ke clipboard.</li>
      </ol>
    </section>

    <section class="mt-14">
      <h2 class="text-xl font-semibold text-ink">Kapan Anda membutuhkan Case Converter?</h2>
      <div class="mt-4 grid gap-3.5">
        <p class="max-w-[62ch] text-sm text-ink-soft">
          Developer sering butuh mengubah nama variabel dari format bebas ke camelCase atau snake_case sesuai
          konvensi bahasa pemrograman yang dipakai. Daripada mengetik ulang manual, tempel saja teksnya di sini.
        </p>
        <p class="max-w-[62ch] text-sm text-ink-soft">
          Penulis dan editor juga sering perlu merapikan judul artikel ke Title Case, atau memperbaiki teks yang
          tidak sengaja ter-ketik dengan Caps Lock aktif menjadi format normal kembali.
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
