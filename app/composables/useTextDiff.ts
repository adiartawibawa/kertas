export interface DiffCell {
  type: "same" | "added" | "removed";
  text: string;
}

export interface DiffRow {
  left: DiffCell | null;
  right: DiffCell | null;
}

function computeDiff(a: string[], b: string[]): DiffRow[] {
  const n = a.length;
  const m = b.length;
  const lcs: number[][] = Array.from({ length: n + 1 }, () =>
    new Array<number>(m + 1).fill(0),
  );
  const get = (x: number, y: number) => lcs[x]?.[y] ?? 0;

  for (let i = n - 1; i >= 0; i--) {
    const row = lcs[i];
    if (!row) continue;
    for (let j = m - 1; j >= 0; j--) {
      row[j] =
        a[i] === b[j]
          ? get(i + 1, j + 1) + 1
          : Math.max(get(i + 1, j), get(i, j + 1));
    }
  }

  const rows: DiffRow[] = [];
  let i = 0;
  let j = 0;

  while (i < n && j < m) {
    const left = a[i] ?? "";
    const right = b[j] ?? "";
    if (left === right) {
      rows.push({
        left: { type: "same", text: left },
        right: { type: "same", text: right },
      });
      i++;
      j++;
    } else if (get(i + 1, j) >= get(i, j + 1)) {
      rows.push({ left: { type: "removed", text: left }, right: null });
      i++;
    } else {
      rows.push({ left: null, right: { type: "added", text: right } });
      j++;
    }
  }
  while (i < n) {
    rows.push({ left: { type: "removed", text: a[i] ?? "" }, right: null });
    i++;
  }
  while (j < m) {
    rows.push({ left: null, right: { type: "added", text: b[j] ?? "" } });
    j++;
  }

  return rows;
}

/**
 * Diff berbasis baris (line-by-line), bukan character-level. Cukup untuk
 * membandingkan paragraf, konfigurasi, atau daftar teks. Kompleksitas
 * O(n*m) — cocok untuk dokumen berukuran wajar (ratusan baris), bukan
 * file raksasa.
 */
export function useTextDiff(textA: Ref<string>, textB: Ref<string>) {
  const rows = computed(() =>
    computeDiff(textA.value.split(/\r?\n/), textB.value.split(/\r?\n/)),
  );

  const stats = computed(() => ({
    added: rows.value.filter((r) => r.right?.type === "added").length,
    removed: rows.value.filter((r) => r.left?.type === "removed").length,
  }));

  return { rows, stats };
}
