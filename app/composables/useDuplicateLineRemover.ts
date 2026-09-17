export interface DedupeOptions {
  caseSensitive: boolean;
  trimLines: boolean;
  removeEmptyLines: boolean;
}

/**
 * Menghapus baris duplikat sambil mempertahankan urutan kemunculan pertama.
 */
export function useDuplicateLineRemover(text: Ref<string>) {
  const options = reactive<DedupeOptions>({
    caseSensitive: true,
    trimLines: true,
    removeEmptyLines: true,
  });

  const resultLines = computed(() => {
    const lines = text.value.split(/\r?\n/);
    const seen = new Set<string>();
    const output: string[] = [];

    for (const rawLine of lines) {
      const processed = options.trimLines ? rawLine.trim() : rawLine;

      if (options.removeEmptyLines && processed.length === 0) continue;

      const key = options.caseSensitive ? processed : processed.toLowerCase();
      if (seen.has(key)) continue;

      seen.add(key);
      output.push(processed);
    }

    return output;
  });

  const result = computed(() => resultLines.value.join("\n"));

  const totalLines = computed(
    () =>
      text.value
        .split(/\r?\n/)
        .filter((l) => l.trim().length > 0 || !options.removeEmptyLines).length,
  );

  const duplicatesRemoved = computed(() =>
    Math.max(0, totalLines.value - resultLines.value.length),
  );

  return { options, result, duplicatesRemoved };
}
