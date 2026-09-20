export default defineNuxtConfig({
  devtools: { enabled: true },

  modules: [
    "@nuxtjs/tailwindcss",
    "@nuxtjs/i18n",
    "@nuxtjs/sitemap",
    "@nuxtjs/robots",
  ],

  // Supaya <StatBar>, <FaqAccordion>, <RelatedTools> tidak perlu ditulis
  // sebagai <ToolsStatBar>, dst (default Nuxt menambah prefix nama folder).
  components: [{ path: "~/components", pathPrefix: false }],

  app: {
    head: {
      htmlAttrs: { lang: "id" },
      link: [
        { rel: "preconnect", href: "https://fonts.googleapis.com" },
        {
          rel: "preconnect",
          href: "https://fonts.gstatic.com",
          crossorigin: "",
        },
        {
          rel: "stylesheet",
          href: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap",
        },
      ],
    },
  },

  // Halaman tool tidak butuh data server-side, jadi aman untuk di-prerender
  // penuh saat build (nuxt generate) — bagus untuk SEO & indexing cepat.
  // Path disesuaikan dengan struktur nested /office-tools/** yang dipakai.
  routeRules: {
    "/office-tools/**": { prerender: true },
  },

  compatibilityDate: "2026-01-01",

  i18n: {
    // WAJIB untuk useLocaleHead({ seo: true }) — tanpa ini, canonical dan
    // hreflang alternate link akan jadi path relatif (tidak valid untuk
    // SEO). Diambil dari NUXT_SITE_URL yang sama dipakai sitemap/site.url,
    // supaya satu sumber kebenaran untuk domain di seluruh config.
    baseUrl: process.env.NUXT_SITE_URL || "https://domainanda.com",
    locales: [
      { code: "id", language: "id-ID", name: "Indonesia", file: "id.json" },
      { code: "en", language: "en-US", name: "English", file: "en.json" },
    ],
    defaultLocale: "id",
    strategy: "prefix_except_default", // "/" = ID, "/en/..." = EN
    // lazy: true,
    langDir: "locales/",
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: "i18n_redirected",
      redirectOn: "root", // hanya redirect otomatis di halaman root
    },
  },

  // Nilai di bawah ini HANYA fallback kalau env var tidak diset.
  // Domain asli diatur lewat NUXT_SITE_URL di file .env (lihat .env.example)
  // — nuxt-site-config otomatis membaca env var ini tanpa kode tambahan.
  // Dipakai otomatis oleh sitemap.xml, canonical URL, og:url, dan semua
  // schema JSON-LD lewat useSiteConfig().
  site: {
    url: "https://domainanda.com",
  },

  // @nuxtjs/sitemap otomatis mendeteksi @nuxtjs/i18n (karena didaftarkan
  // setelahnya di atas) dan menghasilkan entri per-locale dengan tag
  // hreflang alternate secara otomatis — tidak perlu konfigurasi manual
  // untuk route localized.
  sitemap: {},

  // @nuxtjs/robots otomatis: (1) generate robots.txt yang mereferensikan
  // sitemap.xml, (2) melokalkan path allow/disallow sesuai locale i18n
  // (butuh i18n v8+, sudah terpenuhi), (3) memblokir indexing sepenuhnya
  // di environment non-production (dibaca dari NODE_ENV) — jadi build
  // staging/preview tidak akan ikut ter-index Google secara tidak sengaja.
  // Default (allow semua) sudah pas untuk situs ini, tidak ada halaman
  // admin/backend yang perlu di-disallow.
  robots: {},
});
