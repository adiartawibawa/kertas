export default defineNuxtConfig({
  devtools: { enabled: true },

  modules: ["@nuxtjs/tailwindcss", "@nuxtjs/i18n", "@nuxtjs/sitemap"],

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
  routeRules: {
    "/office-tools/**": { prerender: true },
  },

  compatibilityDate: "2026-01-01",

  i18n: {
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
  // WAJIB diisi domain asli sebelum production
  site: {
    url: "https://kertaas.com",
  },

  // @nuxtjs/sitemap otomatis mendeteksi @nuxtjs/i18n (karena didaftarkan
  // setelahnya di atas) dan menghasilkan entri per-locale dengan tag
  // hreflang alternate secara otomatis — tidak perlu konfigurasi manual
  // untuk route localized.
  sitemap: {},
});
