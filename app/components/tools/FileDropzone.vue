<script setup lang="ts">
const props = defineProps<{
  accept?: string
  multiple?: boolean
  label?: string
}>()

const emit = defineEmits<{
  files: [files: File[]]
}>()

const isDragging = ref(false)
const inputRef = ref<HTMLInputElement | null>(null)

function openPicker() {
  inputRef.value?.click()
}

function handleFiles(fileList: FileList | null) {
  if (!fileList || fileList.length === 0) return
  emit('files', Array.from(fileList))
}

function onDrop(e: DragEvent) {
  isDragging.value = false
  handleFiles(e.dataTransfer?.files ?? null)
}

function onChange(e: Event) {
  handleFiles((e.target as HTMLInputElement).files)
  ;(e.target as HTMLInputElement).value = ''
}
</script>

<template>
  <div
    class="flex flex-col items-center justify-center gap-2 rounded-md border-2 border-dashed px-6 py-10 text-center transition-colors"
    :class="isDragging ? 'border-accent bg-accent-tint' : 'border-slate-300 bg-white'"
    @dragover.prevent="isDragging = true"
    @dragleave.prevent="isDragging = false"
    @drop.prevent="onDrop"
  >
    <p class="text-sm text-ink-soft">{{ props.label ?? 'Tarik & lepas file di sini' }}</p>
    <button
      class="rounded-md border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-ink hover:bg-slate-50"
      @click="openPicker"
    >
      Pilih file
    </button>
    <input
      ref="inputRef"
      type="file"
      :accept="props.accept"
      :multiple="props.multiple"
      class="hidden"
      @change="onChange"
    >
  </div>
</template>
