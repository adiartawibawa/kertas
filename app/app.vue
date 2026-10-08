<script setup lang="ts">
const siteUrl = useSiteConfig().url
const { t } = useI18n()

useSeoMeta({
  ogSiteName: () => t('brand.name'),
  ogType: 'website',
  ogImage: () => `${siteUrl}/og-default.jpg`,
  twitterCard: 'summary_large_image',
})
</script>

<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
