<script setup lang="ts">
const { t, tm, rt } = useI18n()

const brand = computed(() => t('brand.name'))

const dataItems = computed(() => (tm('privacyPolicy.dataCollected.items') as string[]).map((item) => rt(item)))

useSeoMeta({
  title: () => t('privacyPolicy.seoTitle', { brand: brand.value }),
  description: () => t('privacyPolicy.seoDescription', { brand: brand.value }),
})

useHead(() => ({
  script: [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: '/' },
          { '@type': 'ListItem', position: 2, name: t('privacyPolicy.title'), item: '/privacy-policy' },
        ],
      }),
    },
  ],
}))
</script>

<template>
  <div>
    <p class="pt-7 text-sm text-ink-soft">
      <NuxtLinkLocale to="/" class="hover:text-accent-dark">Home</NuxtLinkLocale> /
      {{ t('privacyPolicy.title') }}
    </p>

    <h1 class="mt-3 text-3xl font-semibold leading-tight text-ink sm:text-4xl">{{ t('privacyPolicy.title') }}</h1>
    <p class="mt-2 text-sm text-ink-soft">{{ t('privacyPolicy.lastUpdated') }}</p>

    <div class="mt-8 rounded-md border border-accent bg-accent-tint px-5 py-4">
      <p class="text-sm text-ink">
        <strong class="font-semibold">{{ t('privacyPolicy.summaryLabel') }}</strong>
        <i18n-t keypath="privacyPolicy.summary" scope="global" tag="span">
          <template #brand>{{ brand }}</template>
          <template #emphasis>
            <strong class="font-semibold">{{ t('privacyPolicy.summaryEmphasis') }}</strong>
          </template>
        </i18n-t>
      </p>
    </div>

    <section class="mt-10">
      <h2 class="text-xl font-semibold text-ink">{{ t('privacyPolicy.howItWorks.title') }}</h2>
      <p class="mt-3 max-w-6xl text-sm text-ink-soft">
        {{ t('privacyPolicy.howItWorks.p1', { brand }) }}
      </p>
      <p class="mt-3 max-w-6xl text-sm text-ink-soft">
        {{ t('privacyPolicy.howItWorks.p2') }}
      </p>
    </section>

    <section class="mt-10">
      <h2 class="text-xl font-semibold text-ink">{{ t('privacyPolicy.dataCollected.title') }}</h2>
      <p class="mt-3 max-w-6xl text-sm text-ink-soft">{{ t('privacyPolicy.dataCollected.intro') }}</p>
      <ul class="mt-3 grid gap-2 pl-5 text-sm text-ink-soft marker:text-accent-dark" style="list-style-type: disc;">
        <li v-for="(item, i) in dataItems" :key="i">{{ item }}</li>
      </ul>
      <p class="mt-3 max-w-6xl text-sm text-ink-soft">
        {{ t('privacyPolicy.dataCollected.logs') }}
      </p>
    </section>

    <section class="mt-10">
      <h2 class="text-xl font-semibold text-ink">{{ t('privacyPolicy.cookies.title') }}</h2>
      <i18n-t keypath="privacyPolicy.cookies.p1" scope="global" tag="p" class="mt-3 max-w-6xl text-sm text-ink-soft">
        <template #cookie>
          <code class="rounded bg-slate-100 px-1.5 py-0.5 font-mono text-xs">i18n_redirected</code>
        </template>
      </i18n-t>
      <i18n-t keypath="privacyPolicy.cookies.adsText" scope="global" tag="p"
        class="mt-3 max-w-6xl text-sm text-ink-soft">
        <template #label>
          <strong class="font-semibold text-ink">{{ t('privacyPolicy.cookies.adsLabel') }}</strong>
        </template>
        <template #none>
          <strong class="font-semibold">{{ t('privacyPolicy.cookies.adsNone') }}</strong>
        </template>
        <template #link>
          <a href="https://adssettings.google.com" target="_blank" rel="noopener noreferrer"
            class="text-accent-dark underline hover:text-accent">Google Ads Settings</a>
        </template>
      </i18n-t>
    </section>

    <section class="mt-10">
      <h2 class="text-xl font-semibold text-ink">{{ t('privacyPolicy.thirdParty.title') }}</h2>
      <i18n-t keypath="privacyPolicy.thirdParty.text" scope="global" tag="p"
        class="mt-3 max-w-6xl text-sm text-ink-soft">
        <template #emphasis>
          <strong class="font-semibold">{{ t('privacyPolicy.thirdParty.emphasis') }}</strong>
        </template>
      </i18n-t>
    </section>

    <section class="mt-10">
      <h2 class="text-xl font-semibold text-ink">{{ t('privacyPolicy.security.title') }}</h2>
      <p class="mt-3 max-w-6xl text-sm text-ink-soft">
        {{ t('privacyPolicy.security.text') }}
      </p>
    </section>

    <section class="mt-10">
      <h2 class="text-xl font-semibold text-ink">{{ t('privacyPolicy.changes.title') }}</h2>
      <p class="mt-3 max-w-6xl text-sm text-ink-soft">
        {{ t('privacyPolicy.changes.text') }}
      </p>
    </section>

    <section class="mt-10 pb-16">
      <h2 class="text-xl font-semibold text-ink">{{ t('privacyPolicy.contact.title') }}</h2>
      <i18n-t keypath="privacyPolicy.contact.text" scope="global" tag="p" class="mt-3 max-w-6xl text-sm text-ink-soft">
        <template #email>
          <a href="mailto:surat.buat.adi@gmail.com"
            class="text-accent-dark underline hover:text-accent">surat.buat.adi@gmail.com</a>
        </template>
      </i18n-t>
    </section>
  </div>
</template>