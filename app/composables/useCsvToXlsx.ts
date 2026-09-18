/**
 * Library `xlsx` (SheetJS) di-import secara dinamis, hanya saat pengguna
 * benar-benar menekan tombol convert/download — supaya library berat ini
 * tidak ikut membengkakkan bundle awal halaman (baik untuk performa & SEO).
 */
export function useCsvToXlsx(text: Ref<string>) {
  const isConverting = ref(false)
  const error = ref('')

  const previewRows = computed<string[][]>(() => {
    const raw = text.value.trim()
    if (!raw) return []
    try {
      return parseCsv(raw)
    } catch {
      return []
    }
  })

  async function downloadXlsx(filename = 'data.xlsx') {
    error.value = ''
    const rows = previewRows.value
    if (rows.length === 0) return

    isConverting.value = true
    try {
      const XLSX = await import('xlsx')
      const worksheet = XLSX.utils.aoa_to_sheet(rows)
      const workbook = XLSX.utils.book_new()
      XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1')
      XLSX.writeFile(workbook, filename)
    } catch {
      error.value = 'Gagal mengonversi CSV ke XLSX. Pastikan format CSV benar.'
    } finally {
      isConverting.value = false
    }
  }

  return { previewRows, isConverting, error, downloadXlsx }
}
