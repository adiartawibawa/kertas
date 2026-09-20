<script setup lang="ts">
const { t } = useI18n()

useSeoMeta({
  title: 'Syarat & Ketentuan — Kertaas',
  description: 'Syarat dan ketentuan penggunaan tool-tool Kertaas.',
})

useHead({
  script: [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: '/' },
          { '@type': 'ListItem', position: 2, name: 'Syarat & Ketentuan', item: '/terms' },
        ],
      }),
    },
  ],
})
</script>

<template>
  <div>
    <p class="pt-7 text-sm text-ink-soft">
      <NuxtLinkLocale to="/" class="hover:text-accent-dark">Home</NuxtLinkLocale> /
      Syarat & Ketentuan
    </p>

    <h1 class="mt-3 text-3xl font-semibold leading-tight text-ink sm:text-4xl">Syarat &amp; Ketentuan</h1>
    <p class="mt-2 text-sm text-ink-soft">Terakhir diperbarui: 20 September 2026</p>

    <section class="mt-8">
      <h2 class="text-xl font-semibold text-ink">1. Penerimaan Ketentuan</h2>
      <p class="mt-3 max-w-[70ch] text-sm text-ink-soft">
        Dengan mengakses dan menggunakan {{ t('brand.name') }} ("Situs", "kami"), Anda menyetujui untuk terikat
        pada syarat dan ketentuan berikut. Jika Anda tidak setuju dengan ketentuan ini, mohon untuk tidak
        menggunakan Situs.
      </p>
    </section>

    <section class="mt-10">
      <h2 class="text-xl font-semibold text-ink">2. Deskripsi Layanan</h2>
      <p class="mt-3 max-w-[70ch] text-sm text-ink-soft">
        {{ t('brand.name') }} menyediakan kumpulan tool office gratis (dokumen, PDF, spreadsheet, data, dan
        kalkulator produktivitas) yang berjalan sepenuhnya di browser Anda. Layanan disediakan "sebagaimana adanya"
        (as-is) tanpa biaya dan tanpa memerlukan pendaftaran akun.
      </p>
    </section>

    <section class="mt-10">
      <h2 class="text-xl font-semibold text-ink">3. Penggunaan yang Diizinkan</h2>
      <p class="mt-3 max-w-[70ch] text-sm text-ink-soft">Anda setuju untuk tidak:</p>
      <ul class="mt-3 grid gap-2 pl-5 text-sm text-ink-soft marker:text-accent-dark" style="list-style-type: disc;">
        <li>Menggunakan Situs untuk tujuan ilegal atau melanggar hukum yang berlaku</li>
        <li>Mencoba merusak, membebani berlebihan (abuse), atau mengganggu operasional Situs</li>
        <li>Melakukan reverse-engineering, scraping otomatis skala besar, atau menyalin ulang seluruh Situs untuk dipublikasikan sebagai milik sendiri</li>
        <li>Menggunakan tool kami untuk memproses konten yang melanggar hak cipta atau hukum pihak lain</li>
      </ul>
    </section>

    <section class="mt-10">
      <h2 class="text-xl font-semibold text-ink">4. Tidak Ada Jaminan (Disclaimer)</h2>
      <p class="mt-3 max-w-[70ch] text-sm text-ink-soft">
        Tool-tool di Situs ini disediakan tanpa jaminan dalam bentuk apapun, baik tersurat maupun tersirat,
        termasuk namun tidak terbatas pada jaminan akurasi hasil konversi/perhitungan, kesesuaian untuk tujuan
        tertentu, atau bebas dari kesalahan (bug). Anda bertanggung jawab untuk memverifikasi sendiri hasil
        keluaran (misalnya hasil konversi file, hasil kalkulasi, atau file PDF hasil olahan) sebelum digunakan
        untuk keperluan penting.
      </p>
      <p class="mt-3 max-w-[70ch] text-sm text-ink-soft">
        Kami menyarankan untuk selalu menyimpan salinan cadangan (backup) dari file asli Anda sebelum
        memprosesnya di tool manapun.
      </p>
    </section>

    <section class="mt-10">
      <h2 class="text-xl font-semibold text-ink">5. Batasan Tanggung Jawab</h2>
      <p class="mt-3 max-w-[70ch] text-sm text-ink-soft">
        Sejauh diizinkan oleh hukum yang berlaku, {{ t('brand.name') }} tidak bertanggung jawab atas kerugian
        langsung, tidak langsung, insidental, atau konsekuensial apapun yang timbul dari penggunaan atau
        ketidakmampuan menggunakan Situs — termasuk namun tidak terbatas pada kehilangan data akibat proses file
        yang gagal atau hasil yang tidak sesuai harapan.
      </p>
    </section>

    <section class="mt-10">
      <h2 class="text-xl font-semibold text-ink">6. Hak Kekayaan Intelektual</h2>
      <p class="mt-3 max-w-[70ch] text-sm text-ink-soft">
        Desain, kode, dan konten Situs (di luar file yang Anda proses sendiri) adalah milik {{ t('brand.name') }}.
        File dan data yang Anda proses menggunakan tool kami sepenuhnya tetap menjadi milik dan tanggung jawab
        Anda — sekali lagi, kami tidak pernah menerima atau menyimpan salinannya.
      </p>
    </section>

    <section class="mt-10">
      <h2 class="text-xl font-semibold text-ink">7. Iklan Pihak Ketiga</h2>
      <p class="mt-3 max-w-[70ch] text-sm text-ink-soft">
        Situs ini dapat menampilkan iklan dari jaringan pihak ketiga (seperti Google AdSense) di masa depan untuk
        mendukung biaya operasional. Konten iklan yang ditampilkan dikelola oleh penyedia iklan tersebut dan
        berada di luar kendali langsung kami — kami tidak bertanggung jawab atas produk, layanan, atau klaim yang
        dipromosikan dalam iklan tersebut.
      </p>
    </section>

    <section class="mt-10">
      <h2 class="text-xl font-semibold text-ink">8. Perubahan Layanan &amp; Ketentuan</h2>
      <p class="mt-3 max-w-[70ch] text-sm text-ink-soft">
        Kami dapat mengubah, menambah, atau menghentikan tool tertentu, serta memperbarui ketentuan ini kapan
        saja. Penggunaan Situs yang berkelanjutan setelah perubahan dianggap sebagai persetujuan Anda terhadap
        ketentuan yang telah diperbarui.
      </p>
    </section>

    <section class="mt-10">
      <h2 class="text-xl font-semibold text-ink">9. Hukum yang Berlaku</h2>
      <p class="mt-3 max-w-[70ch] text-sm text-ink-soft">
        Ketentuan ini diatur dan ditafsirkan sesuai dengan hukum yang berlaku di Republik Indonesia, tanpa
        memperhatikan pertentangan aturan hukum (conflict of law).
      </p>
    </section>

    <section class="mt-10 pb-16">
      <h2 class="text-xl font-semibold text-ink">10. Hubungi Kami</h2>
      <p class="mt-3 max-w-[70ch] text-sm text-ink-soft">
        Ada pertanyaan soal syarat & ketentuan ini? Hubungi kami di
        <a href="mailto:hello@kertaas.com" class="text-accent-dark underline hover:text-accent">hello@kertaas.com</a>.
      </p>
    </section>
  </div>
</template>
