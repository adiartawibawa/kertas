<script setup lang="ts">
const { t, locale, locales, setLocale } = useI18n()

const i18nHead = useLocaleHead({ seo: true })

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
</script>

<template>
  <div class="min-h-screen bg-[#F7F8F5] font-sans text-ink antialiased">
    <header class="border-b border-slate-200">
      <div class="mx-auto flex max-w-3xl items-center justify-between px-6 py-4">
        <NuxtLink to="/" class="text-lg font-semibold">Kertas</NuxtLink>

        <nav class="hidden gap-6 text-sm text-ink-soft sm:flex">
          <NuxtLink to="/office-tools/documents" class="hover:text-ink">{{ t('nav.documents') }}</NuxtLink>
          <NuxtLink to="/office-tools/pdf" class="hover:text-ink">{{ t('nav.pdf') }}</NuxtLink>
          <NuxtLink to="/office-tools/spreadsheet" class="hover:text-ink">{{ t('nav.spreadsheet') }}</NuxtLink>
          <NuxtLink to="/office-tools/data" class="hover:text-ink">{{ t('nav.data') }}</NuxtLink>
          <NuxtLink to="/office-tools/productivity" class="hover:text-ink">{{ t('nav.productivity') }}</NuxtLink>
        </nav>

        <select :value="locale" class="rounded border border-slate-200 bg-white px-2 py-1 text-sm text-ink-soft"
          @change="onLocaleChange">
          <option v-for="l in locales" :key="l.code" :value="l.code">
            {{ l.name }}
          </option>
        </select>
      </div>
    </header>

    <main class="mx-auto max-w-3xl px-6">
      <slot />
    </main>

    <footer class="mt-16 border-t border-slate-200 py-8">
      <div class="mx-auto max-w-3xl px-6 text-sm text-ink-soft">
        Kertas — {{ t('footer.tagline') }}
      </div>
    </footer>
  </div>
</template>