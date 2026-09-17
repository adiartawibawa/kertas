<script setup lang="ts">
defineProps<{
  tools: { name: string; href: string }[]
}>()
</script>

<template>
  <div class="flex flex-wrap gap-x-6 gap-y-2">
    <NuxtLink
      v-for="tool in tools"
      :key="tool.href"
      :to="tool.href"
      class="border-b border-slate-300 pb-0.5 text-sm text-ink hover:border-accent hover:text-accent-dark"
    >
      {{ tool.name }}
    </NuxtLink>
  </div>
</template>
