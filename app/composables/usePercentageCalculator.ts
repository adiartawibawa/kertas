export type PercentageMode = 'of' | 'isWhatPercent' | 'change' | 'addSubtract'

export interface PercentageModeOption {
  value: PercentageMode
  label: string
}

export const percentageModes: PercentageModeOption[] = [
  { value: 'of', label: 'X% dari Y' },
  { value: 'isWhatPercent', label: 'X adalah berapa % dari Y' },
  { value: 'change', label: 'Persentase perubahan' },
  { value: 'addSubtract', label: 'Tambah/Kurang %' },
]

/**
 * Kalkulator persentase serbaguna dengan 4 mode perhitungan yang sering
 * dibutuhkan: proporsi, rasio, perubahan, dan penambahan/pengurangan nilai.
 */
export function usePercentageCalculator() {
  const mode = ref<PercentageMode>('of')
  const valueA = ref<number | null>(null)
  const valueB = ref<number | null>(null)
  const operation = ref<'add' | 'subtract'>('add')

  const result = computed<number | null>(() => {
    const a = valueA.value
    const b = valueB.value
    if (a === null || b === null || Number.isNaN(a) || Number.isNaN(b)) return null

    switch (mode.value) {
      case 'of':
        return (a / 100) * b
      case 'isWhatPercent':
        return b === 0 ? null : (a / b) * 100
      case 'change':
        return a === 0 ? null : ((b - a) / Math.abs(a)) * 100
      case 'addSubtract':
        return operation.value === 'add' ? b + (a / 100) * b : b - (a / 100) * b
      default:
        return null
    }
  })

  return { mode, valueA, valueB, operation, result }
}
