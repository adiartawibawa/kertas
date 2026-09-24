<script setup lang="ts">
const { t, tm, rt } = useI18n()

const brand = computed(() => t('brand.name'))

const usageItems = computed(() => (tm('terms.acceptableUse.items') as string[]).map((item) => rt(item)))

useSeoMeta({
  title: () => t('terms.seoTitle', { brand: brand.value }),
  description: () => t('terms.seoDescription', { brand: brand.value }),
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
          { '@type': 'ListItem', position: 2, name: t('terms.title'), item: '/terms' },
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
      {{ t('terms.title') }}
    </p>

    <h1 class="mt-3 text-3xl font-semibold leading-tight text-ink sm:text-4xl">{{ t('terms.title') }}</h1>
    <p class="mt-2 text-sm text-ink-soft">{{ t('terms.lastUpdated') }}</p>

    <section class="mt-8">
      <h2 class="text-xl font-semibold text-ink">{{ t('terms.acceptance.title') }}</h2>
      <p class="mt-3 max-w-6xl text-sm text-ink-soft">
        {{ t('terms.acceptance.text', { brand }) }}
      </p>
    </section>

    <section class="mt-10">
      <h2 class="text-xl font-semibold text-ink">{{ t('terms.service.title') }}</h2>
      <p class="mt-3 max-w-6xl text-sm text-ink-soft">
        {{ t('terms.service.text', { brand }) }}
      </p>
    </section>

    <section class="mt-10">
      <h2 class="text-xl font-semibold text-ink">{{ t('terms.acceptableUse.title') }}</h2>
      <p class="mt-3 max-w-6xl text-sm text-ink-soft">{{ t('terms.acceptableUse.intro') }}</p>
      <ul class="mt-3 grid gap-2 pl-5 text-sm text-ink-soft marker:text-accent-dark" style="list-style-type: disc;">
        <li v-for="(item, i) in usageItems" :key="i">{{ item }}</li>
      </ul>
    </section>

    <section class="mt-10">
      <h2 class="text-xl font-semibold text-ink">{{ t('terms.disclaimer.title') }}</h2>
      <p class="mt-3 max-w-6xl text-sm text-ink-soft">
        {{ t('terms.disclaimer.p1') }}
      </p>
      <p class="mt-3 max-w-6xl text-sm text-ink-soft">
        {{ t('terms.disclaimer.p2') }}
      </p>
    </section>

    <section class="mt-10">
      <h2 class="text-xl font-semibold text-ink">{{ t('terms.liability.title') }}</h2>
      <p class="mt-3 max-w-6xl text-sm text-ink-soft">
        {{ t('terms.liability.text', { brand }) }}
      </p>
    </section>

    <section class="mt-10">
      <h2 class="text-xl font-semibold text-ink">{{ t('terms.ip.title') }}</h2>
      <p class="mt-3 max-w-6xl text-sm text-ink-soft">
        {{ t('terms.ip.text', { brand }) }}
      </p>
    </section>

    <section class="mt-10">
      <h2 class="text-xl font-semibold text-ink">{{ t('terms.ads.title') }}</h2>
      <p class="mt-3 max-w-6xl text-sm text-ink-soft">
        {{ t('terms.ads.text') }}
      </p>
    </section>

    <section class="mt-10">
      <h2 class="text-xl font-semibold text-ink">{{ t('terms.changes.title') }}</h2>
      <p class="mt-3 max-w-6xl text-sm text-ink-soft">
        {{ t('terms.changes.text') }}
      </p>
    </section>

    <section class="mt-10">
      <h2 class="text-xl font-semibold text-ink">{{ t('terms.law.title') }}</h2>
      <p class="mt-3 max-w-6xl text-sm text-ink-soft">
        {{ t('terms.law.text') }}
      </p>
    </section>

    <section class="mt-10 pb-16">
      <h2 class="text-xl font-semibold text-ink">{{ t('terms.contact.title') }}</h2>
      <i18n-t keypath="terms.contact.text" scope="global" tag="p" class="mt-3 max-w-6xl text-sm text-ink-soft">
        <template #email>
          <a href="mailto:surat.buat.adi@gmail.com"
            class="text-accent-dark underline hover:text-accent">surat.buat.adi@gmail.com</a>
        </template>
      </i18n-t>
    </section>
  </div>
</template>