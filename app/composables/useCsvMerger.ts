export interface MergeFileEntry {
  name: string
  rows: string[][]
}

/**
 * Menggabungkan beberapa file CSV jadi satu. Header dari semua file
 * disatukan (union) — kalau ada file dengan kolom berbeda, kolom yang
 * tidak ada di suatu file akan diisi sel kosong, mirip logic JSON to CSV.
 */
export function useCsvMerger() {
  const files = ref<MergeFileEntry[]>([])
  const error = ref('')

  async function addFiles(fileList: File[]) {
    error.value = ''
    for (const file of fileList) {
      try {
        const text = await file.text()
        const rows = parseCsv(text.trim())
        files.value.push({ name: file.name, rows })
      } catch {
        error.value = `Gagal membaca file ${file.name}.`
      }
    }
  }

  function removeFile(name: string) {
    files.value = files.value.filter((f) => f.name !== name)
  }

  const mergedCsv = computed(() => {
    if (files.value.length === 0) return ''

    const allHeaders = new Set<string>()
    for (const file of files.value) {
      const header = file.rows[0] ?? []
      header.forEach((h) => allHeaders.add(h))
    }
    const headers = Array.from(allHeaders)
    if (headers.length === 0) return ''

    const outputRows: string[][] = [headers]

    for (const file of files.value) {
      const [header, ...dataRows] = file.rows
      if (!header) continue
      for (const row of dataRows) {
        const record: Record<string, string> = {}
        header.forEach((h, i) => {
          record[h] = row[i] ?? ''
        })
        outputRows.push(headers.map((h) => record[h] ?? ''))
      }
    }

    return toCsv(outputRows)
  })

  const totalRows = computed(() => {
    if (!mergedCsv.value) return 0
    return Math.max(0, mergedCsv.value.split('\r\n').length - 1)
  })

  return { files, addFiles, removeFile, mergedCsv, totalRows, error }
}
