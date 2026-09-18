export function useCsvViewer(text: Ref<string>) {
  const search = ref('')

  const parsed = computed<string[][]>(() => {
    const raw = text.value.trim()
    if (!raw) return []
    try {
      return parseCsv(raw)
    } catch {
      return []
    }
  })

  const header = computed(() => parsed.value[0] ?? [])
  const rows = computed(() => parsed.value.slice(1))

  const filteredRows = computed(() => {
    const query = search.value.trim().toLowerCase()
    if (!query) return rows.value
    return rows.value.filter((row) => row.some((cell) => cell.toLowerCase().includes(query)))
  })

  const rowCount = computed(() => rows.value.length)
  const columnCount = computed(() => header.value.length)

  return { search, header, rows, filteredRows, rowCount, columnCount }
}
