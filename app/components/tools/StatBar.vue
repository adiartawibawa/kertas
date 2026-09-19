<script setup lang="ts">
import type { TextStats } from '~/composables/useTextStats'

defineProps<{ stats: TextStats }>()

const { t } = useI18n()
</script>

<template>
  <div class="flex flex-wrap border-t border-slate-200">
    <div class="min-w-[110px] flex-1 border-r border-slate-200 px-4 py-3 last:border-r-0">
      <span class="block font-mono text-xl font-medium text-accent-dark">{{ stats.words }}</span>
      <span class="mt-0.5 block text-xs text-ink-soft">{{ t('statBar.words') }}</span>
    </div>
    <div class="min-w-[110px] flex-1 border-r border-slate-200 px-4 py-3 last:border-r-0">
      <span class="block font-mono text-xl font-medium text-accent-dark">{{ stats.characters }}</span>
      <span class="mt-0.5 block text-xs text-ink-soft">{{ t('statBar.characters') }}</span>
    </div>
    <div class="min-w-[110px] flex-1 border-r border-slate-200 px-4 py-3 last:border-r-0">
      <span class="block font-mono text-xl font-medium text-accent-dark">{{ stats.charactersNoSpaces }}</span>
      <span class="mt-0.5 block text-xs text-ink-soft">{{ t('statBar.charactersNoSpaces') }}</span>
    </div>
    <div class="min-w-[110px] flex-1 border-r border-slate-200 px-4 py-3 last:border-r-0">
      <span class="block font-mono text-xl font-medium text-accent-dark">{{ stats.sentences }}</span>
      <span class="mt-0.5 block text-xs text-ink-soft">{{ t('statBar.sentences') }}</span>
    </div>
    <div class="min-w-[110px] flex-1 border-r border-slate-200 px-4 py-3 last:border-r-0">
      <span class="block font-mono text-xl font-medium text-accent-dark">{{ stats.paragraphs }}</span>
      <span class="mt-0.5 block text-xs text-ink-soft">{{ t('statBar.paragraphs') }}</span>
    </div>
    <div class="min-w-[110px] flex-1 px-4 py-3">
      <span class="block font-mono text-xl font-medium text-accent-dark">{{ stats.readMinutes }} {{ t('statBar.minuteAbbr') }}</span>
      <span class="mt-0.5 block text-xs text-ink-soft">{{ t('statBar.readTime') }}</span>
    </div>
  </div>
</template>
