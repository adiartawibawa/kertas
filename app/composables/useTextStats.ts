export interface TextStats {
  words: number
  characters: number
  charactersNoSpaces: number
  sentences: number
  paragraphs: number
  readMinutes: number
}

/**
 * Menghitung statistik teks (kata, karakter, kalimat, paragraf, estimasi
 * waktu baca) secara reaktif. Semua kalkulasi berjalan di client — tidak
 * ada request keluar sama sekali.
 */
export function useTextStats(text: Ref<string> | ComputedRef<string>) {
  const stats = computed<TextStats>(() => {
    const raw = unref(text)
    const trimmed = raw.trim()

    const words = trimmed.length ? trimmed.split(/\s+/).length : 0
    const characters = raw.length
    const charactersNoSpaces = raw.replace(/\s/g, '').length

    const sentences = trimmed.length
      ? (trimmed.match(/[^.!?]+[.!?]+|\s*[^.!?]+$/g) ?? []).filter((s) => s.trim().length).length
      : 0

    const paragraphs = trimmed.length
      ? trimmed.split(/\n\s*\n/).filter((p) => p.trim().length).length
      : 0

    const readMinutes = words ? Math.max(1, Math.round(words / 200)) : 0

    return { words, characters, charactersNoSpaces, sentences, paragraphs, readMinutes }
  })

  return { stats }
}
