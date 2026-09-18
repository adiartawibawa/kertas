export type SplitMode = 'rowsPerFile' | 'fileCount'

export interface CsvPart {
  name: string
  csv: string
  rowCount: number
}

export function useCsvSplitter(text: Ref<string>) {
  const mode = ref<SplitMode>('rowsPerFile')
  const rowsPerFile = ref(100)
  const fileCount = ref(2)
  const keepHeaderInEachFile = ref(true)

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
  const dataRows = computed(() => parsed.value.slice(1))

  const parts = computed<CsvPart[]>(() => {
    const rows = dataRows.value
    if (rows.length === 0) return []

    const chunks: string[][][] = []

    if (mode.value === 'rowsPerFile') {
      const size = Math.max(1, Math.floor(rowsPerFile.value) || 1)
      for (let i = 0; i < rows.length; i += size) {
        chunks.push(rows.slice(i, i + size))
      }
    } else {
      const count = Math.max(1, Math.floor(fileCount.value) || 1)
      const size = Math.ceil(rows.length / count)
      for (let i = 0; i < rows.length; i += size) {
        chunks.push(rows.slice(i, i + size))
      }
    }

    return chunks.map((chunk, i) => {
      const outputRows = keepHeaderInEachFile.value && header.value.length ? [header.value, ...chunk] : chunk
      return {
        name: `bagian-${i + 1}.csv`,
        csv: toCsv(outputRows),
        rowCount: chunk.length,
      }
    })
  })

  const totalRows = computed(() => dataRows.value.length)

  return { mode, rowsPerFile, fileCount, keepHeaderInEachFile, parts, totalRows }
}
