export interface DiffCell {
  type: 'same' | 'added' | 'removed'
  text: string
}

export interface DiffRow {
  left: DiffCell | null
  right: DiffCell | null
}

function computeDiff(a: string[], b: string[]): DiffRow[] {
  const n = a.length
  const m = b.length
  const lcs: number[][] = Array.from({ length: n + 1 }, () => new Array(m + 1).fill(0))

  for (let i = n - 1; i >= 0; i--) {
    for (let j = m - 1; j >= 0; j--) {
      lcs[i][j] = a[i] === b[j] ? lcs[i + 1][j + 1] + 1 : Math.max(lcs[i + 1][j], lcs[i][j + 1])
    }
  }

  const rows: DiffRow[] = []
  let i = 0
  let j = 0

  while (i < n && j < m) {
    if (a[i] === b[j]) {
      rows.push({ left: { type: 'same', text: a[i] }, right: { type: 'same', text: b[j] } })
      i++
      j++
    } else if (lcs[i + 1][j] >= lcs[i][j + 1]) {
      rows.push({ left: { type: 'removed', text: a[i] }, right: null })
      i++
    } else {
      rows.push({ left: null, right: { type: 'added', text: b[j] } })
      j++
    }
  }
  while (i < n) {
    rows.push({ left: { type: 'removed', text: a[i] }, right: null })
    i++
  }
  while (j < m) {
    rows.push({ left: null, right: { type: 'added', text: b[j] } })
    j++
  }

  return rows
}

/**
 * Diff berbasis baris (line-by-line), bukan character-level. Cukup untuk
 * membandingkan paragraf, konfigurasi, atau daftar teks. Kompleksitas
 * O(n*m) — cocok untuk dokumen berukuran wajar (ratusan baris), bukan
 * file raksasa.
 */
export function useTextDiff(textA: Ref<string>, textB: Ref<string>) {
  const rows = computed(() => computeDiff(textA.value.split(/\r?\n/), textB.value.split(/\r?\n/)))

  const stats = computed(() => ({
    added: rows.value.filter((r) => r.right?.type === 'added').length,
    removed: rows.value.filter((r) => r.left?.type === 'removed').length,
  }))

  return { rows, stats }
}
