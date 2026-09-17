<script setup lang="ts">
import type { TextStats } from '~/composables/useTextStats'

const props = defineProps<{ stats: TextStats }>()

const { t } = useI18n()

const items = computed(() => [
  { value: props.stats.words, label: t('statBar.words') },
  { value: props.stats.characters, label: t('statBar.characters') },
  { value: props.stats.charactersNoSpaces, label: t('statBar.charactersNoSpaces') },
  { value: props.stats.sentences, label: t('statBar.sentences') },
  { value: props.stats.paragraphs, label: t('statBar.paragraphs') },
  { value: `${props.stats.readMinutes} ${t('statBar.minuteAbbr')}`, label: t('statBar.readTime') },
])
</script>

<template>
  <div class="flex flex-wrap border-t border-slate-200">
    <div v-for="item in items" :key="item.label"
      class="min-w-[110px] flex-1 border-r border-slate-200 px-4 py-3 last:border-r-0">
      <span class="block font-mono text-xl font-medium text-accent-dark">{{ item.value }}</span>
      <span class="mt-0.5 block text-xs text-ink-soft">{{ item.label }}</span>
    </div>
  </div>
</template>
