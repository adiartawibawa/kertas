<script setup lang="ts">
const props = defineProps<{
  tools: { href: string; name?: string }[]
}>()

const { t } = useI18n()

function slugFromHref(href: string): string {
  return href.split('/').filter(Boolean).pop() ?? ''
}
</script>

<template>
  <div class="flex flex-wrap gap-x-6 gap-y-2">
    <NuxtLinkLocale
      v-for="tool in props.tools"
      :key="tool.href"
      :to="tool.href"
      class="border-b border-slate-300 pb-0.5 text-sm text-ink hover:border-accent hover:text-accent-dark"
    >
      {{ t(`tools.${slugFromHref(tool.href)}`) }}
    </NuxtLinkLocale>
  </div>
</template>
