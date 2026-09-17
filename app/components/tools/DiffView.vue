<script setup lang="ts">
import type { DiffRow, DiffCell } from '~/composables/useTextDiff'

defineProps<{ rows: DiffRow[] }>()

function cellClass(cell: DiffCell | null) {
  if (!cell) return 'bg-slate-50'
  if (cell.type === 'removed') return 'bg-red-50 text-red-700'
  if (cell.type === 'added') return 'bg-accent-tint text-accent-dark'
  return 'text-ink-soft'
}
</script>

<template>
  <div class="max-h-[440px] overflow-y-auto border-t border-slate-200">
    <div v-if="rows.length === 0" class="px-4 py-6 text-center text-sm text-ink-soft">
      Tempel teks di kedua kolom di atas untuk melihat perbedaannya.
    </div>
    <div v-for="(row, i) in rows" :key="i" class="grid grid-cols-2 divide-x divide-slate-200">
      <div class="whitespace-pre-wrap break-words px-4 py-1 font-mono text-xs" :class="cellClass(row.left)">{{ row.left?.text ?? '' }}</div>
      <div class="whitespace-pre-wrap break-words px-4 py-1 font-mono text-xs" :class="cellClass(row.right)">{{ row.right?.text ?? '' }}</div>
    </div>
  </div>
</template>
