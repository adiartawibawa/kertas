/**
 * Mengurai string rentang halaman seperti "1-3,5,7-9" jadi array index
 * halaman (zero-based), diurutkan dan tanpa duplikat. Nomor di luar
 * totalPages otomatis diabaikan.
 */
export function parsePageRanges(input: string, totalPages: number): number[] {
  const indices = new Set<number>();
  const parts = input
    .split(",")
    .map((p) => p.trim())
    .filter(Boolean);

  for (const part of parts) {
    const rangeMatch = /^(\d+)\s*-\s*(\d+)$/.exec(part);
    if (rangeMatch) {
      let start = Number(rangeMatch[1]);
      let end = Number(rangeMatch[2]);
      if (start > end) {
        const tmp = start;
        start = end;
        end = tmp;
      }
      for (let i = start; i <= end; i++) {
        if (i >= 1 && i <= totalPages) indices.add(i - 1);
      }
      continue;
    }

    const single = Number(part);
    if (Number.isInteger(single) && single >= 1 && single <= totalPages) {
      indices.add(single - 1);
    }
  }

  return Array.from(indices).sort((a, b) => a - b);
}
