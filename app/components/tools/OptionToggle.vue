<script setup lang="ts">
defineProps<{
  modelValue: boolean
  label: string
}>()

defineEmits<{
  'update:modelValue': [value: boolean]
}>()
</script>

<template>
  <label class="flex cursor-pointer items-center gap-2.5 text-sm text-ink-soft">
    <input
      type="checkbox"
      :checked="modelValue"
      class="h-4 w-4 rounded border-slate-300 text-accent focus:ring-accent"
      @change="$emit('update:modelValue', ($event.target as HTMLInputElement).checked)"
    >
    {{ label }}
  </label>
</template>
