<script setup lang="ts">
const text = ref('')
const { options, result, duplicatesRemoved } = useDuplicateLineRemover(text)

function copyResult() {
  if (import.meta.client && navigator.clipboard) {
    navigator.clipboard.writeText(result.value).catch(() => { })
  }
}

function clearText() {
  text.value = ''
}

const faqItems = [
  {
    question: 'Apakah urutan baris tetap dipertahankan?',
    answer:
      'Ya. Baris yang muncul pertama kali dipertahankan posisinya, kemunculan berikutnya yang sama akan dihapus.',
  },
  {
    question: 'Apa bedanya mode case-sensitive dan tidak?',
    answer:
      'Dengan case-sensitive aktif, "Apel" dan "apel" dianggap dua baris berbeda. Jika dimatikan, keduanya dianggap sama dan salah satunya akan dihapus sebagai duplikat.',
  },
  {
    question: 'Apakah spasi di awal/akhir baris memengaruhi deteksi duplikat?',
    answer:
      'Jika opsi "Trim spasi tiap baris" aktif, spasi di awal/akhir baris diabaikan saat membandingkan — jadi "kata " dan "kata" dianggap sama.',
  },
  {
    question: 'Apakah teks saya diunggah ke server?',
    answer: 'Tidak. Seluruh proses berjalan di browser Anda, tidak ada data yang dikirim ke server manapun.',
  },
]

const relatedTools = [
  { name: 'Word Counter', href: '/office-tools/documents/word-counter' },
  { name: 'Text Cleaner', href: '/office-tools/documents/text-cleaner' },
  { name: 'Case Converter', href: '/office-tools/documents/case-converter' },
  { name: 'Text Compare', href: '/office-tools/documents/text-compare' },
]

useSeoMeta({
  title: 'Duplicate Line Remover Online — Hapus Baris Duplikat Gratis',
  description:
    'Hapus baris duplikat dari daftar teks secara instan, urutan tetap dipertahankan. Tanpa upload, 100% diproses di browser Anda.',
})

useHead({
  script: [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'SoftwareApplication',
        name: 'Duplicate Line Remover',
        applicationCategory: 'UtilitiesApplication',
        operatingSystem: 'Any (Web Browser)',
        offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
        description: 'Menghapus baris duplikat dari daftar teks secara instan di browser, urutan tetap dipertahankan.',
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
      <NuxtLinkLocale to="/office-tools/documents" class="hover:text-accent-dark">Documents</NuxtLinkLocale> /
      Duplicate Line Remover
    </p>

    <h1 class="mt-3 max-w-[24ch] text-3xl font-semibold leading-tight text-ink sm:text-4xl">
      Duplicate Line Remover — hapus baris duplikat dari daftar teks
    </h1>
    <p class="mt-2 max-w-[52ch] text-base text-ink-soft">
      Tempel daftar teks Anda, baris yang berulang otomatis dihapus, urutan tetap dipertahankan.
    </p>

    <div class="mt-7 grid gap-4 sm:grid-cols-2">
      <div>
        <p class="mb-1.5 text-xs font-medium uppercase tracking-wide text-ink-soft">Daftar asli</p>
        <textarea v-model="text" rows="10" placeholder="Tempel daftar teks, satu item per baris…"
          class="w-full resize-y rounded-md border border-slate-200 bg-white p-4 text-sm text-ink placeholder:text-ink-soft focus:outline-none focus-visible:ring-2 focus-visible:ring-accent" />
      </div>
      <div>
        <p class="mb-1.5 text-xs font-medium uppercase tracking-wide text-ink-soft">Tanpa duplikat</p>
        <textarea :value="result" readonly rows="10"
          class="w-full resize-y rounded-md border border-slate-200 bg-slate-50 p-4 text-sm text-ink focus:outline-none" />
      </div>
    </div>

    <div class="mt-5 flex flex-wrap gap-x-6 gap-y-3 rounded-md border border-slate-200 bg-white p-4">
      <OptionToggle v-model="options.caseSensitive" label='Case-sensitive ("Apel" ≠ "apel")' />
      <OptionToggle v-model="options.trimLines" label="Trim spasi tiap baris" />
      <OptionToggle v-model="options.removeEmptyLines" label="Hapus baris kosong" />
    </div>

    <div class="mt-4 flex flex-wrap items-center gap-3">
      <button class="rounded-md bg-accent px-4 py-2.5 text-sm font-medium text-white hover:brightness-95"
        @click="copyResult">
        Copy hasil
      </button>
      <button
        class="rounded-md border border-slate-300 bg-white px-4 py-2.5 text-sm font-medium text-ink hover:bg-slate-50"
        @click="clearText">
        Clear
      </button>
      <span class="text-sm text-ink-soft">{{ duplicatesRemoved }} baris duplikat dihapus</span>
    </div>

    <p class="mt-3.5 text-sm text-ink-soft">
      <span class="mr-1.5 inline-block h-1.5 w-1.5 rounded-full bg-accent align-middle" />
      Teks Anda tidak pernah meninggalkan browser ini.
    </p>

    <section class="mt-14">
      <h2 class="text-xl font-semibold text-ink">Kenapa menggunakan Duplicate Line Remover ini?</h2>
      <ul class="mt-4 grid gap-3.5">
        <li class="border-l-2 border-accent pl-4 text-sm text-ink-soft">
          <strong class="font-semibold text-ink">Urutan tetap terjaga.</strong>
          Baris pertama yang muncul dipertahankan, bukan diacak ulang.
        </li>
        <li class="border-l-2 border-accent pl-4 text-sm text-ink-soft">
          <strong class="font-semibold text-ink">Opsi fleksibel.</strong>
          Atur sendiri apakah perbandingan case-sensitive dan bagaimana baris kosong diperlakukan.
        </li>
        <li class="border-l-2 border-accent pl-4 text-sm text-ink-soft">
          <strong class="font-semibold text-ink">Privasi terjaga.</strong>
          Semua proses berjalan di browser Anda.
        </li>
      </ul>
    </section>

    <section class="mt-14">
      <h2 class="text-xl font-semibold text-ink">Cara menghapus baris duplikat</h2>
      <ol class="mt-4 grid list-decimal gap-2.5 pl-5 marker:font-mono marker:text-accent-dark">
        <li class="text-sm text-ink-soft">Tempel daftar teks Anda, satu item per baris.</li>
        <li class="text-sm text-ink-soft">Atur opsi case-sensitive, trim spasi, dan baris kosong sesuai kebutuhan.</li>
        <li class="text-sm text-ink-soft">Hasil tanpa duplikat muncul otomatis di kolom kanan.</li>
        <li class="text-sm text-ink-soft">Klik Copy untuk menyalin hasil ke clipboard.</li>
      </ol>
    </section>

    <section class="mt-14">
      <h2 class="text-xl font-semibold text-ink">Kapan Anda membutuhkan tool ini?</h2>
      <div class="mt-4 grid gap-3.5">
        <p class="max-w-[62ch] text-sm text-ink-soft">
          Sering dipakai untuk membersihkan daftar email, daftar kontak, atau daftar kata kunci yang tanpa sengaja
          punya entri berulang setelah digabung dari beberapa sumber.
        </p>
        <p class="max-w-[62ch] text-sm text-ink-soft">
          Developer juga memakainya untuk merapikan file log atau daftar dependency yang punya baris identik
          sebelum diproses lebih lanjut.
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
