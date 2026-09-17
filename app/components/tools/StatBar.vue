<script setup lang="ts">
import type { TextStats } from '~/composables/useTextStats'

defineProps<{ stats: TextStats }>()
</script>

<template>
  <div class="flex flex-wrap border-t border-slate-200">
    <div class="min-w-[110px] flex-1 border-r border-slate-200 px-4 py-3 last:border-r-0">
      <span class="block font-mono text-xl font-medium text-accent-dark">{{ stats.words }}</span>
      <span class="mt-0.5 block text-xs text-ink-soft">Kata</span>
    </div>
    <div class="min-w-[110px] flex-1 border-r border-slate-200 px-4 py-3 last:border-r-0">
      <span class="block font-mono text-xl font-medium text-accent-dark">{{ stats.characters }}</span>
      <span class="mt-0.5 block text-xs text-ink-soft">Karakter</span>
    </div>
    <div class="min-w-[110px] flex-1 border-r border-slate-200 px-4 py-3 last:border-r-0">
      <span class="block font-mono text-xl font-medium text-accent-dark">{{ stats.charactersNoSpaces }}</span>
      <span class="mt-0.5 block text-xs text-ink-soft">Tanpa spasi</span>
    </div>
    <div class="min-w-[110px] flex-1 border-r border-slate-200 px-4 py-3 last:border-r-0">
      <span class="block font-mono text-xl font-medium text-accent-dark">{{ stats.sentences }}</span>
      <span class="mt-0.5 block text-xs text-ink-soft">Kalimat</span>
    </div>
    <div class="min-w-[110px] flex-1 border-r border-slate-200 px-4 py-3 last:border-r-0">
      <span class="block font-mono text-xl font-medium text-accent-dark">{{ stats.paragraphs }}</span>
      <span class="mt-0.5 block text-xs text-ink-soft">Paragraf</span>
    </div>
    <div class="min-w-[110px] flex-1 px-4 py-3">
      <span class="block font-mono text-xl font-medium text-accent-dark">{{ stats.readMinutes }} mnt</span>
      <span class="mt-0.5 block text-xs text-ink-soft">Waktu baca</span>
    </div>
  </div>
</template>
