<script setup lang="ts">
const { t, locale, locales, setLocale } = useI18n()

const i18nHead = useLocaleHead({ seo: true })

const currentYear = new Date().getFullYear();

useHead({
  htmlAttrs: {
    lang: i18nHead.value.htmlAttrs?.lang,
    dir: i18nHead.value.htmlAttrs?.dir,
  },
  link: [...(i18nHead.value.link || [])],
  meta: [...(i18nHead.value.meta || [])],
})

function onLocaleChange(event: Event) {
  const target = event.target as HTMLSelectElement
  setLocale(target.value as typeof locale.value)
}

// Fungsi untuk mengubah kode bahasa (misal: 'en', 'id') menjadi emoji bendera
function getFlagEmoji(countryCode: string) {
  const codeMap: Record<string, string> = {
    en: '🇺🇸', // Atau '🇬🇧' untuk UK
    id: '🇮🇩',
  }
  return codeMap[countryCode] || '🌐'
}
</script>

<template>
  <div class="min-h-screen bg-[#F7F8F5] font-sans text-ink antialiased">
    <header class="border-b border-slate-200">
      <div class="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <NuxtLinkLocale to="/" class="text-lg font-semibold">
          <img class="w-24" src="/kertas.png" alt="logo-kertas" srcset="">
        </NuxtLinkLocale>

        <nav class="hidden gap-6 text-sm text-ink-soft sm:flex">
          <NuxtLinkLocale to="/office-tools/documents"
            class="hover:text-accent [&.router-link-active]:font-semibold [&.router-link-active]:text-accent">
            {{ t('nav.documents') }}
          </NuxtLinkLocale>
          <NuxtLinkLocale to="/office-tools/pdf"
            class="hover:text-accent [&.router-link-active]:font-semibold [&.router-link-active]:text-accent">
            {{ t('nav.pdf') }}
          </NuxtLinkLocale>
          <NuxtLinkLocale to="/office-tools/spreadsheet"
            class="hover:text-accent [&.router-link-active]:font-semibold [&.router-link-active]:text-accent">
            {{ t('nav.spreadsheet') }}
          </NuxtLinkLocale>
          <NuxtLinkLocale to="/office-tools/data"
            class="hover:text-accent [&.router-link-active]:font-semibold [&.router-link-active]:text-accent">
            {{ t('nav.data') }}
          </NuxtLinkLocale>
          <NuxtLinkLocale to="/office-tools/productivity"
            class="hover:text-accent [&.router-link-active]:font-semibold [&.router-link-active]:text-accent">
            {{ t('nav.productivity') }}
          </NuxtLinkLocale>
        </nav>

        <select :value="locale" class="rounded border border-slate-200 bg-white px-2 py-1 text-sm text-ink-soft"
          @change="onLocaleChange">
          <option v-for="l in locales" :key="l.code" :value="l.code">
            {{ getFlagEmoji(l.code) }} {{ l.name || l.code.toUpperCase() }}
          </option>
        </select>
      </div>
    </header>

    <main class="mx-auto max-w-6xl px-6">
      <slot />
    </main>

    <footer class="mt-16 border-t border-slate-200 py-8">
      <div class="mx-auto max-w-6xl px-6">
        <p class="text-sm text-ink-soft">© {{ currentYear }} {{ t('brand.name') }} — {{ t('footer.tagline') }}</p>
        <div class="mt-3 flex flex-wrap gap-x-5 gap-y-1.5 text-sm text-ink-soft">
          <NuxtLinkLocale to="/privacy-policy"
            class="hover:text-accent [&.router-link-active]:font-semibold [&.router-link-active]:text-accent hover:underline">
            Kebijakan Privasi</NuxtLinkLocale>
          <NuxtLinkLocale to="/terms"
            class="hover:text-accent [&.router-link-active]:font-semibold [&.router-link-active]:text-accent hover:underline">
            Syarat &amp; Ketentuan</NuxtLinkLocale>
        </div>
      </div>
    </footer>
  </div>
</template>