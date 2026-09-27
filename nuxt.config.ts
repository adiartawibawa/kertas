export default defineNuxtConfig({
  devtools: { enabled: true },

  modules: [
    "@nuxtjs/tailwindcss",
    "@nuxtjs/i18n",
    "@nuxtjs/sitemap",
    "@nuxtjs/robots",
    "nuxt-gtag",
  ],

  components: [{ path: "~/components", pathPrefix: false }],

  app: {
    head: {
      htmlAttrs: { lang: "en" },
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

  routeRules: {
    "/office-tools/**": { prerender: true },
  },

  compatibilityDate: "2026-01-01",

  gtag: {
    id: process.env.NUXT_PUBLIC_GTAG_ID || "G-BBHRD2HRHD",
  },

  i18n: {
    baseUrl: process.env.NUXT_SITE_URL || "https://domainanda.com",
    locales: [
      { code: "id", language: "id-ID", name: "Indonesia", file: "id.json" },
      { code: "en", language: "en-US", name: "English", file: "en.json" },
    ],
    defaultLocale: "en",
    strategy: "prefix_except_default",
    langDir: "locales/",
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: "i18n_redirected",
      redirectOn: "root",
    },
  },
  site: {
    url: "https://domainanda.com",
  },

  sitemap: {},

  robots: {},
});
