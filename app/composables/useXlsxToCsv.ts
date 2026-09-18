export function useXlsxToCsv() {
  const fileName = ref('')
  const csvResult = ref('')
  const isConverting = ref(false)
  const error = ref('')

  async function handleFile(file: File) {
    error.value = ''
    csvResult.value = ''
    fileName.value = file.name
    isConverting.value = true

    try {
      const XLSX = await import('xlsx')
      const buffer = await file.arrayBuffer()
      const workbook = XLSX.read(buffer, { type: 'array' })
      const firstSheetName = workbook.SheetNames[0]
      if (!firstSheetName) {
        error.value = 'File XLSX tidak memiliki sheet.'
        return
      }
      const worksheet = workbook.Sheets[firstSheetName]
      csvResult.value = XLSX.utils.sheet_to_csv(worksheet)
    } catch {
      error.value = 'Gagal membaca file. Pastikan file berformat .xlsx atau .xls dan tidak rusak.'
    } finally {
      isConverting.value = false
    }
  }

  function clear() {
    fileName.value = ''
    csvResult.value = ''
    error.value = ''
  }

  const rowCount = computed(() => {
    if (!csvResult.value) return 0
    return Math.max(0, csvResult.value.trim().split(/\r?\n/).length - 1)
  })

  return { fileName, csvResult, isConverting, error, handleFile, clear, rowCount }
}
