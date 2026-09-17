<script setup lang="ts">
const { mode, input, indentSize, formatted, minified, error } =
  useDataFormatter();

function copyFormatted() {
  if (import.meta.client && navigator.clipboard && formatted.value) {
    navigator.clipboard.writeText(formatted.value).catch(() => { });
  }
}

const placeholderText = computed(() =>
  mode.value === "json"
    ? '{"nama":"Andi","umur":30}'
    : "<root><nama>Andi</nama></root>",
);

function copyMinified() {
  if (import.meta.client && navigator.clipboard && minified.value) {
    navigator.clipboard.writeText(minified.value).catch(() => { });
  }
}

function downloadResult() {
  if (!formatted.value) return;
  const ext = mode.value === "json" ? "json" : "xml";
  const mimeType =
    mode.value === "json" ? "application/json" : "application/xml";
  downloadTextFile(`formatted.${ext}`, formatted.value, mimeType);
}

function clearInput() {
  input.value = "";
}

const faqItems = [
  {
    question: "Apakah tool ini juga memvalidasi JSON/XML saya?",
    answer:
      "Ya. Kalau data yang Anda masukkan tidak valid, pesan error akan muncul menjelaskan bahwa formatnya bermasalah, sekaligus mencegah hasil yang salah ditampilkan.",
  },
  {
    question: 'Apa bedanya "Format" dan "Minify"?',
    answer:
      "Format merapikan data dengan indentasi supaya mudah dibaca manusia. Minify melakukan kebalikannya — menghapus semua spasi dan baris baru supaya ukuran file lebih kecil, cocok untuk production.",
  },
  {
    question: "Apakah minify tersedia untuk XML juga?",
    answer:
      "Saat ini minify hanya tersedia untuk mode JSON. Untuk XML, tool ini fokus pada perapian indentasi.",
  },
  {
    question: "Apakah data saya diunggah ke server?",
    answer:
      "Tidak. Semua proses format dan validasi berjalan langsung di browser Anda.",
  },
];

const relatedTools = [
  { name: "JSON → CSV", href: "/office-tools/data/json-to-csv" },
  { name: "CSV → JSON", href: "/office-tools/data/csv-to-json" },
  { name: "XML → CSV", href: "/office-tools/data/xml-to-csv" },
];

useSeoMeta({
  title: "Data Formatter Online — Rapikan & Validasi JSON/XML Gratis",
  description:
    "Format, validasi, dan minify JSON atau XML secara instan di browser Anda. Gratis, tanpa upload data.",
});

useHead({
  script: [
    {
      type: "application/ld+json",
      innerHTML: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        name: "Data Formatter",
        applicationCategory: "UtilitiesApplication",
        operatingSystem: "Any (Web Browser)",
        offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
        description: "Merapikan, memvalidasi, dan meminify data JSON atau XML.",
      }),
    },
    {
      type: "application/ld+json",
      innerHTML: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: faqItems.map((item) => ({
          "@type": "Question",
          name: item.question,
          acceptedAnswer: { "@type": "Answer", text: item.answer },
        })),
      }),
    },
  ],
});
</script>

<template>
  <div>
    <p class="pt-7 text-sm text-ink-soft">
      <NuxtLink to="/" class="hover:text-accent-dark">Home</NuxtLink> /
      <NuxtLink to="/office-tools" class="hover:text-accent-dark">Office Tools</NuxtLink>
      /
      <NuxtLink to="/office-tools/data" class="hover:text-accent-dark">Data</NuxtLink>
      / Data Formatter
    </p>

    <h1 class="mt-3 max-w-[24ch] text-3xl font-semibold leading-tight text-ink sm:text-4xl">
      Data Formatter — rapikan dan validasi JSON atau XML
    </h1>
    <p class="mt-2 max-w-[52ch] text-base text-ink-soft">
      Tempel data yang berantakan, dapatkan versi rapi dengan indentasi —
      sekaligus tahu kalau ada yang tidak valid.
    </p>

    <div class="mt-7 flex flex-wrap items-center justify-between gap-3">
      <div class="flex flex-wrap gap-2">
        <button class="rounded-md border px-3.5 py-2 text-sm font-medium transition-colors" :class="mode === 'json'
            ? 'border-accent bg-accent text-white'
            : 'border-slate-300 bg-white text-ink hover:bg-slate-50'
          " @click="mode = 'json'">
          JSON
        </button>
        <button class="rounded-md border px-3.5 py-2 text-sm font-medium transition-colors" :class="mode === 'xml'
            ? 'border-accent bg-accent text-white'
            : 'border-slate-300 bg-white text-ink hover:bg-slate-50'
          " @click="mode = 'xml'">
          XML
        </button>
      </div>

      <div class="flex items-center gap-2 text-sm text-ink-soft">
        <span>Indentasi:</span>
        <button class="rounded-md border px-2.5 py-1 text-xs font-medium" :class="indentSize === 2
            ? 'border-accent bg-accent-tint text-accent-dark'
            : 'border-slate-300 bg-white text-ink hover:bg-slate-50'
          " @click="indentSize = 2">
          2 spasi
        </button>
        <button class="rounded-md border px-2.5 py-1 text-xs font-medium" :class="indentSize === 4
            ? 'border-accent bg-accent-tint text-accent-dark'
            : 'border-slate-300 bg-white text-ink hover:bg-slate-50'
          " @click="indentSize = 4">
          4 spasi
        </button>
      </div>
    </div>

    <div class="mt-4 grid gap-4 sm:grid-cols-2">
      <div>
        <p class="mb-1.5 text-xs font-medium uppercase tracking-wide text-ink-soft">
          Input
        </p>
        <textarea v-model="input" rows="14" :placeholder="placeholderText"
          class="w-full resize-y rounded-md border border-slate-200 bg-white p-4 font-mono text-xs text-ink placeholder:text-ink-soft focus:outline-none focus-visible:ring-2 focus-visible:ring-accent" />
      </div>
      <div>
        <p class="mb-1.5 text-xs font-medium uppercase tracking-wide text-ink-soft">
          Hasil rapi
        </p>
        <textarea :value="formatted" readonly rows="14"
          class="w-full resize-y rounded-md border border-slate-200 bg-slate-50 p-4 font-mono text-xs text-ink focus:outline-none" />
      </div>
    </div>

    <p v-if="error" class="mt-3 rounded-md border border-red-200 bg-red-50 px-4 py-2.5 text-sm text-red-700">
      {{ error }}
    </p>

    <div class="mt-4 flex flex-wrap items-center gap-3">
      <button class="rounded-md bg-accent px-4 py-2.5 text-sm font-medium text-white hover:brightness-95"
        @click="copyFormatted">
        Copy hasil rapi
      </button>
      <button v-if="mode === 'json'"
        class="rounded-md border border-slate-300 bg-white px-4 py-2.5 text-sm font-medium text-ink hover:bg-slate-50"
        @click="copyMinified">
        Copy minified
      </button>
      <button
        class="rounded-md border border-slate-300 bg-white px-4 py-2.5 text-sm font-medium text-ink hover:bg-slate-50"
        @click="downloadResult">
        Download
      </button>
      <button
        class="rounded-md border border-slate-300 bg-white px-4 py-2.5 text-sm font-medium text-ink hover:bg-slate-50"
        @click="clearInput">
        Clear
      </button>
    </div>

    <p class="mt-3.5 text-sm text-ink-soft">
      <span class="mr-1.5 inline-block h-1.5 w-1.5 rounded-full bg-accent align-middle" />
      Data Anda tidak pernah meninggalkan browser ini.
    </p>

    <section class="mt-14">
      <h2 class="text-xl font-semibold text-ink">
        Kenapa menggunakan Data Formatter ini?
      </h2>
      <ul class="mt-4 grid gap-3.5">
        <li class="border-l-2 border-accent pl-4 text-sm text-ink-soft">
          <strong class="font-semibold text-ink">Validasi otomatis.</strong>
          Kalau data tidak valid, Anda langsung diberitahu, bukan hasil yang
          salah.
        </li>
        <li class="border-l-2 border-accent pl-4 text-sm text-ink-soft">
          <strong class="font-semibold text-ink">Format & minify sekaligus.</strong>
          Rapikan untuk dibaca, atau padatkan untuk production dalam satu
          tempat.
        </li>
        <li class="border-l-2 border-accent pl-4 text-sm text-ink-soft">
          <strong class="font-semibold text-ink">Mendukung JSON dan XML.</strong>
          Dua format data paling umum tersedia dalam satu tool.
        </li>
      </ul>
    </section>

    <section class="mt-14">
      <h2 class="text-xl font-semibold text-ink">
        Cara merapikan JSON atau XML
      </h2>
      <ol class="mt-4 grid list-decimal gap-2.5 pl-5 marker:font-mono marker:text-accent-dark">
        <li class="text-sm text-ink-soft">Pilih mode JSON atau XML.</li>
        <li class="text-sm text-ink-soft">Tempel data Anda di kolom input.</li>
        <li class="text-sm text-ink-soft">
          Hasil rapi muncul otomatis di kolom kanan.
        </li>
        <li class="text-sm text-ink-soft">
          Klik Copy atau Download untuk menyimpan hasilnya.
        </li>
      </ol>
    </section>

    <section class="mt-14">
      <h2 class="text-xl font-semibold text-ink">
        Kapan Anda membutuhkan tool ini?
      </h2>
      <div class="mt-4 grid gap-3.5">
        <p class="max-w-[62ch] text-sm text-ink-soft">
          Berguna saat menerima response API dalam satu baris panjang yang sulit
          dibaca, atau saat perlu memeriksa apakah file konfigurasi JSON/XML
          valid sebelum dipakai di aplikasi.
        </p>
        <p class="max-w-[62ch] text-sm text-ink-soft">
          Fitur minify juga membantu mengecilkan ukuran file JSON sebelum
          dikirim ke production, mengurangi ukuran payload tanpa mengubah
          datanya.
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
      <h2 class="text-xl font-semibold text-ink">
        Tool lain yang mungkin Anda butuhkan
      </h2>
      <div class="mt-4">
        <RelatedTools :tools="relatedTools" />
      </div>
    </section>
  </div>
</template>
