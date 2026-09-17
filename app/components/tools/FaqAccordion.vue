<script setup lang="ts">
defineProps<{
  items: { question: string; answer: string }[]
}>()
</script>

<template>
  <div>
    <details v-for="(item, i) in items" :key="item.question"
      class="group border-t border-slate-200 py-3.5 last:border-b" :open="i === 0">
      <summary
        class="flex cursor-pointer list-none items-center justify-between font-medium text-ink [&::-webkit-details-marker]:hidden">
        <span>{{ item.question }}</span>
        <span class="font-mono text-ink-soft group-open:hidden">+</span>
        <span class="hidden font-mono text-ink-soft group-open:inline">–</span>
      </summary>
      <p class="mt-2.5 max-w-[60ch] text-sm text-ink-soft">{{ item.answer }}</p>
    </details>
  </div>
</template>
