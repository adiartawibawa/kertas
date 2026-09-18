export interface CsvCleanOptions {
  trimCells: boolean
  removeEmptyRows: boolean
  removeDuplicateRows: boolean
  removeEmptyColumns: boolean
}

export function useCsvCleaner(text: Ref<string>) {
  const options = reactive<CsvCleanOptions>({
    trimCells: true,
    removeEmptyRows: true,
    removeDuplicateRows: false,
    removeEmptyColumns: false,
  })

  const parsed = computed<string[][]>(() => {
    const raw = text.value.trim()
    if (!raw) return []
    try {
      return parseCsv(raw)
    } catch {
      return []
    }
  })

  const cleanedRows = computed<string[][]>(() => {
    let rows = parsed.value.map((row) => (options.trimCells ? row.map((c) => c.trim()) : row))

    if (options.removeEmptyRows) {
      rows = rows.filter((row) => row.some((cell) => cell.length > 0))
    }

    if (options.removeDuplicateRows) {
      const seen = new Set<string>()
      rows = rows.filter((row) => {
        const key = row.join('\u0000')
        if (seen.has(key)) return false
        seen.add(key)
        return true
      })
    }

    if (options.removeEmptyColumns && rows.length > 0) {
      const colCount = Math.max(...rows.map((r) => r.length))
      const emptyColIndexes: number[] = []
      for (let i = 0; i < colCount; i++) {
        const allEmpty = rows.every((row) => !row[i] || row[i].trim() === '')
        if (allEmpty) emptyColIndexes.push(i)
      }
      if (emptyColIndexes.length > 0) {
        rows = rows.map((row) => row.filter((_, i) => !emptyColIndexes.includes(i)))
      }
    }

    return rows
  })

  const cleanedCsv = computed(() => (cleanedRows.value.length ? toCsv(cleanedRows.value) : ''))

  const rowsRemoved = computed(() => Math.max(0, parsed.value.length - cleanedRows.value.length))

  return { options, cleanedCsv, rowsRemoved }
}
