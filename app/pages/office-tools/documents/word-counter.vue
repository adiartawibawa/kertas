<script setup lang="ts">
const text = ref('')
const { stats } = useTextStats(text)

const faqItems = [
  {
    question: 'Apakah spasi dihitung sebagai karakter?',
    answer:
      'Ya, kami menampilkan dua angka terpisah: jumlah karakter termasuk spasi dan tanpa spasi, agar Anda bisa memilih sesuai kebutuhan platform atau instansi yang meminta.',
  },
  {
    question: 'Bagaimana cara menghitung paragraf?',
    answer:
      'Paragraf dihitung berdasarkan baris teks yang dipisahkan oleh baris kosong (enter dua kali). Pastikan format paragraf Anda konsisten agar hasil perhitungan akurat.',
  },
  {
    question: 'Apakah ada batas jumlah teks yang bisa dihitung?',
    answer:
      'Tidak ada batas resmi. Karena semua proses dilakukan di browser Anda, batasnya hanya bergantung pada kemampuan perangkat yang digunakan.',
  },
  {
    question: 'Apakah teks yang saya masukkan disimpan di server?',
    answer:
      'Tidak. Word Counter ini berjalan sepenuhnya di browser Anda. Teks tidak pernah dikirim, diunggah, atau disimpan di server manapun.',
  },
  {
    question: 'Apakah hasilnya sama dengan Word Count di Microsoft Word?',
    answer:
      'Pada umumnya sama, namun bisa ada sedikit perbedaan dalam cara menghitung tanda baca atau paragraf kosong tergantung metode masing-masing aplikasi.',
  },
]

const relatedTools = [
  { name: 'Text Cleaner', href: '/office-tools/documents/text-cleaner' },
  { name: 'Case Converter', href: '/office-tools/documents/case-converter' },
  { name: 'Text Compare', href: '/office-tools/documents/text-compare' },
  { name: 'Duplicate Line Remover', href: '/office-tools/documents/duplicate-line-remover' },
]

function copyResult() {
  const summary = `Kata: ${stats.value.words} | Karakter: ${stats.value.characters} | Kalimat: ${stats.value.sentences} | Paragraf: ${stats.value.paragraphs}`
  if (import.meta.client && navigator.clipboard) {
    navigator.clipboard.writeText(summary).catch(() => {})
  }
}

function clearText() {
  text.value = ''
}

useSeoMeta({
  title: 'Word Counter Online — Hitung Kata & Karakter Gratis',
  description:
    'Hitung jumlah kata, karakter, kalimat, dan paragraf secara instan. Tanpa upload, tanpa login, 100% diproses di browser Anda. Gratis dan tanpa batas.',
  ogTitle: 'Word Counter Online — Hitung Kata & Karakter Gratis',
  ogDescription: 'Hitung jumlah kata, karakter, kalimat, dan paragraf secara instan langsung di browser Anda.',
})

useHead({
  script: [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'SoftwareApplication',
        name: 'Word Counter',
        applicationCategory: 'UtilitiesApplication',
        operatingSystem: 'Any (Web Browser)',
        offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
        description:
          'Hitung jumlah kata, karakter, kalimat, dan paragraf secara instan langsung di browser tanpa upload.',
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
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'HowTo',
        name: 'Cara Menghitung Kata dan Karakter',
        step: [
          { '@type': 'HowToStep', text: 'Tempel atau ketik teks Anda ke kotak yang tersedia.' },
          { '@type': 'HowToStep', text: 'Hasil perhitungan muncul otomatis secara real-time.' },
          { '@type': 'HowToStep', text: 'Gunakan tombol Copy untuk menyalin ringkasan hasil.' },
          { '@type': 'HowToStep', text: 'Klik Clear untuk mengosongkan teks dan memulai ulang.' },
        ],
      }),
    },
  ],
})
</script>

<template>
  <div>
    <p class="pt-7 text-sm text-ink-soft">
      <NuxtLink to="/" class="hover:text-accent-dark">Home</NuxtLink> /
      <NuxtLink to="/office-tools" class="hover:text-accent-dark">Office Tools</NuxtLink> /
      <NuxtLink to="/office-tools/documents" class="hover:text-accent-dark">Documents</NuxtLink> /
      Word Counter
    </p>

    <h1 class="mt-3 max-w-[22ch] text-3xl font-semibold leading-tight text-ink sm:text-4xl">
      Word Counter online — hitung kata &amp; karakter instan
    </h1>
    <p class="mt-2 max-w-[52ch] text-base text-ink-soft">
      Tempel teks Anda, hasil langsung muncul. Tidak ada upload, tidak ada limit, tidak ada iklan yang mengganggu.
    </p>

    <div class="mt-7 rounded-md border border-slate-200 bg-white">
      <textarea
        v-model="text"
        rows="9"
        placeholder="Mulai ketik atau tempel teks Anda di sini…"
        class="w-full resize-y border-0 bg-transparent p-5 text-base text-ink placeholder:text-ink-soft focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-accent"
      />
      <StatBar :stats="stats" />
    </div>

    <div class="mt-4 flex gap-2.5">
      <button
        class="rounded-md bg-accent px-4 py-2.5 text-sm font-medium text-white hover:brightness-95 focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent"
        @click="copyResult"
      >
        Copy hasil
      </button>
      <button
        class="rounded-md border border-slate-300 bg-white px-4 py-2.5 text-sm font-medium text-ink hover:bg-slate-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent"
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
      <h2 class="text-xl font-semibold text-ink">Kenapa menggunakan Word Counter ini?</h2>
      <ul class="mt-4 grid gap-3.5">
        <li class="border-l-2 border-accent pl-4 text-sm text-ink-soft">
          <strong class="font-semibold text-ink">Privasi terjaga.</strong>
          Semua perhitungan dilakukan langsung di browser Anda. Teks tidak pernah dikirim atau disimpan di server manapun.
        </li>
        <li class="border-l-2 border-accent pl-4 text-sm text-ink-soft">
          <strong class="font-semibold text-ink">Tanpa batas karakter.</strong>
          Hitung teks sependek caption Instagram atau sepanjang naskah buku.
        </li>
        <li class="border-l-2 border-accent pl-4 text-sm text-ink-soft">
          <strong class="font-semibold text-ink">Hasil instan.</strong>
          Tidak perlu klik tombol hitung — angka langsung update saat Anda mengetik.
        </li>
        <li class="border-l-2 border-accent pl-4 text-sm text-ink-soft">
          <strong class="font-semibold text-ink">Gratis selamanya.</strong>
          Tanpa daftar akun, tanpa watermark, tanpa iklan.
        </li>
      </ul>
    </section>

    <section class="mt-14">
      <h2 class="text-xl font-semibold text-ink">Cara menghitung kata dan karakter</h2>
      <ol class="mt-4 grid list-decimal gap-2.5 pl-5 marker:font-mono marker:text-accent-dark">
        <li class="text-sm text-ink-soft">Tempel atau ketik teks Anda ke kotak yang tersedia.</li>
        <li class="text-sm text-ink-soft">Hasil kata, karakter, kalimat, dan paragraf muncul otomatis.</li>
        <li class="text-sm text-ink-soft">Gunakan tombol Copy untuk menyalin ringkasan hasil.</li>
        <li class="text-sm text-ink-soft">Klik Clear untuk mengosongkan teks dan mulai perhitungan baru.</li>
      </ol>
    </section>

    <section class="mt-14">
      <h2 class="text-xl font-semibold text-ink">Kapan Anda membutuhkan Word Counter?</h2>
      <div class="mt-4 grid gap-3.5">
        <p class="max-w-[62ch] text-sm text-ink-soft">
          Word Counter sangat berguna saat menulis esai atau tugas kuliah yang memiliki batas kata minimum atau
          maksimum. Daripada menghitung manual, Anda bisa langsung tempel draft ke sini dan lihat hasilnya secara
          real-time.
        </p>
        <p class="max-w-[62ch] text-sm text-ink-soft">
          Bagi content writer, alat ini membantu memastikan artikel SEO memenuhi jumlah kata yang ditargetkan, atau
          caption media sosial tidak melebihi batas karakter platform tertentu.
        </p>
        <p class="max-w-[62ch] text-sm text-ink-soft">
          Word Counter juga sering dipakai untuk keperluan formal seperti cover letter, abstrak jurnal, atau
          deskripsi produk dengan aturan panjang teks tertentu.
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
