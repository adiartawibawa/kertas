export function useCsvToJson(text: Ref<string>) {
  const error = ref('')

  const parsedRows = computed<string[][]>(() => {
    const raw = text.value.trim()
    if (!raw) return []
    try {
      return parseCsv(raw)
    } catch {
      return []
    }
  })

  const json = computed(() => {
    error.value = ''
    const rows = parsedRows.value
    if (rows.length === 0) return ''

    const [header, ...dataRows] = rows
    if (!header || header.length === 0) {
      error.value = 'Baris header CSV tidak ditemukan.'
      return ''
    }

    const records = dataRows.map((row) => {
      const obj: Record<string, string> = {}
      header.forEach((key, i) => {
        obj[key] = row[i] ?? ''
      })
      return obj
    })

    return JSON.stringify(records, null, 2)
  })

  const recordCount = computed(() => Math.max(0, parsedRows.value.length - 1))
  const columnCount = computed(() => parsedRows.value[0]?.length ?? 0)

  return { json, error, recordCount, columnCount }
}
