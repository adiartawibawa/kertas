<script setup lang="ts">
const text = ref('')
const { options, cleaned, charactersRemoved } = useTextCleaner(text)

function copyResult() {
  if (import.meta.client && navigator.clipboard) {
    navigator.clipboard.writeText(cleaned.value).catch(() => { })
  }
}

function clearText() {
  text.value = ''
}

const faqItems = [
  {
    question: 'Apa saja yang dibersihkan oleh Text Cleaner ini?',
    answer:
      'Anda bisa memilih sendiri: trim spasi di awal/akhir baris, hapus spasi ganda, hapus baris kosong, ubah tab jadi spasi, atau gabungkan semua jadi satu baris. Aktifkan hanya opsi yang Anda butuhkan.',
  },
  {
    question: 'Apakah teks asli saya berubah permanen?',
    answer:
      'Tidak. Teks yang Anda tempel di kolom input tetap utuh — hasil bersih ditampilkan terpisah di kolom output. Anda bisa ganti-ganti opsi kapan saja tanpa kehilangan teks asli.',
  },
  {
    question: 'Cocok untuk membersihkan teks hasil copy-paste dari PDF atau Word?',
    answer:
      'Sangat cocok. Teks yang ditempel dari PDF atau Word sering membawa spasi ganda, baris kosong berlebih, atau karakter tab tersembunyi — semua bisa dibersihkan sekaligus di sini.',
  },
  {
    question: 'Apakah teks saya diunggah ke server?',
    answer: 'Tidak. Seluruh proses pembersihan berjalan langsung di browser Anda, tidak ada data yang dikirim keluar.',
  },
]

const relatedTools = [
  { name: 'Word Counter', href: '/office-tools/documents/word-counter' },
  { name: 'Case Converter', href: '/office-tools/documents/case-converter' },
  { name: 'Text Compare', href: '/office-tools/documents/text-compare' },
  { name: 'Duplicate Line Remover', href: '/office-tools/documents/duplicate-line-remover' },
]

useSeoMeta({
  title: 'Text Cleaner Online — Bersihkan Spasi & Baris Kosong Gratis',
  description:
    'Hapus spasi ganda, baris kosong, tab, dan rapikan teks secara instan. Tanpa upload, 100% diproses di browser Anda.',
})

useHead({
  script: [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'SoftwareApplication',
        name: 'Text Cleaner',
        applicationCategory: 'UtilitiesApplication',
        operatingSystem: 'Any (Web Browser)',
        offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
        description: 'Membersihkan spasi ganda, baris kosong, dan tab dari teks secara instan di browser.',
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
      Text Cleaner
    </p>

    <h1 class="mt-3 max-w-[24ch] text-3xl font-semibold leading-tight text-ink sm:text-4xl">
      Text Cleaner online — rapikan teks berantakan dalam sekali klik
    </h1>
    <p class="mt-2 max-w-[52ch] text-base text-ink-soft">
      Hapus spasi ganda, baris kosong, dan tab dari teks hasil copy-paste. Semua diproses langsung di browser Anda.
    </p>

    <div class="mt-7 grid gap-4 sm:grid-cols-2">
      <div>
        <p class="mb-1.5 text-xs font-medium uppercase tracking-wide text-ink-soft">Teks asli</p>
        <textarea v-model="text" rows="10" placeholder="Tempel teks yang ingin dibersihkan…"
          class="w-full resize-y rounded-md border border-slate-200 bg-white p-4 text-sm text-ink placeholder:text-ink-soft focus:outline-none focus-visible:ring-2 focus-visible:ring-accent" />
      </div>
      <div>
        <p class="mb-1.5 text-xs font-medium uppercase tracking-wide text-ink-soft">Hasil bersih</p>
        <textarea :value="cleaned" readonly rows="10"
          class="w-full resize-y rounded-md border border-slate-200 bg-slate-50 p-4 text-sm text-ink focus:outline-none" />
      </div>
    </div>

    <div class="mt-5 flex flex-wrap gap-x-6 gap-y-3 rounded-md border border-slate-200 bg-white p-4">
      <OptionToggle v-model="options.trimLines" label="Trim spasi di awal/akhir baris" />
      <OptionToggle v-model="options.removeExtraSpaces" label="Hapus spasi ganda" />
      <OptionToggle v-model="options.removeEmptyLines" label="Hapus baris kosong" />
      <OptionToggle v-model="options.convertTabs" label="Ubah tab jadi spasi" />
      <OptionToggle v-model="options.removeLineBreaks" label="Gabungkan jadi satu baris" />
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
      <span class="text-sm text-ink-soft">{{ charactersRemoved }} karakter dihapus</span>
    </div>

    <p class="mt-3.5 text-sm text-ink-soft">
      <span class="mr-1.5 inline-block h-1.5 w-1.5 rounded-full bg-accent align-middle" />
      Teks Anda tidak pernah meninggalkan browser ini.
    </p>

    <section class="mt-14">
      <h2 class="text-xl font-semibold text-ink">Kenapa menggunakan Text Cleaner ini?</h2>
      <ul class="mt-4 grid gap-3.5">
        <li class="border-l-2 border-accent pl-4 text-sm text-ink-soft">
          <strong class="font-semibold text-ink">Opsi fleksibel.</strong>
          Pilih sendiri jenis pembersihan yang dibutuhkan, tidak dipaksa satu mode.
        </li>
        <li class="border-l-2 border-accent pl-4 text-sm text-ink-soft">
          <strong class="font-semibold text-ink">Hasil instan.</strong>
          Setiap opsi yang dicentang langsung terlihat hasilnya tanpa reload.
        </li>
        <li class="border-l-2 border-accent pl-4 text-sm text-ink-soft">
          <strong class="font-semibold text-ink">Privasi terjaga.</strong>
          Teks tidak pernah dikirim ke server manapun.
        </li>
      </ul>
    </section>

    <section class="mt-14">
      <h2 class="text-xl font-semibold text-ink">Cara membersihkan teks</h2>
      <ol class="mt-4 grid list-decimal gap-2.5 pl-5 marker:font-mono marker:text-accent-dark">
        <li class="text-sm text-ink-soft">Tempel teks yang ingin dibersihkan ke kolom "Teks asli".</li>
        <li class="text-sm text-ink-soft">Centang opsi pembersihan yang Anda butuhkan.</li>
        <li class="text-sm text-ink-soft">Lihat hasilnya secara real-time di kolom "Hasil bersih".</li>
        <li class="text-sm text-ink-soft">Klik Copy untuk menyalin hasil ke clipboard.</li>
      </ol>
    </section>

    <section class="mt-14">
      <h2 class="text-xl font-semibold text-ink">Kapan Anda membutuhkan Text Cleaner?</h2>
      <div class="mt-4 grid gap-3.5">
        <p class="max-w-[62ch] text-sm text-ink-soft">
          Saat menyalin teks dari PDF, Word, atau halaman web, seringkali ikut terbawa spasi ganda, baris kosong
          berlebih, atau karakter tab yang tidak terlihat. Text Cleaner membersihkan semua itu dalam satu langkah
          sebelum teks dipakai di tempat lain.
        </p>
        <p class="max-w-[62ch] text-sm text-ink-soft">
          Berguna juga untuk merapikan data teks sebelum diproses lebih lanjut — misalnya sebelum di-import ke
          spreadsheet, dipakai sebagai input program, atau ditempel ke CMS yang sensitif terhadap format spasi.
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
