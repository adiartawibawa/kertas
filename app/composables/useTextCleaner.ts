export interface CleanOptions {
  trimLines: boolean;
  removeExtraSpaces: boolean;
  removeEmptyLines: boolean;
  removeLineBreaks: boolean;
  convertTabs: boolean;
}

/**
 * Membersihkan teks berdasarkan opsi yang dipilih user. Semua opsi bersifat
 * non-destructive terhadap teks asli — hasil selalu dihitung ulang dari
 * `text` sumber, bukan mutasi in-place.
 */
export function useTextCleaner(text: Ref<string>) {
  const options = reactive<CleanOptions>({
    trimLines: true,
    removeExtraSpaces: true,
    removeEmptyLines: false,
    removeLineBreaks: false,
    convertTabs: true,
  });

  const cleaned = computed(() => {
    let result = text.value;

    if (options.convertTabs) result = result.replace(/\t/g, " ");
    if (options.removeLineBreaks) result = result.replace(/\r?\n/g, " ");

    let lines = result.split(/\r?\n/);

    if (options.trimLines) lines = lines.map((line) => line.trim());
    if (options.removeExtraSpaces)
      lines = lines.map((line) => line.replace(/ {2,}/g, " "));
    if (options.removeEmptyLines)
      lines = lines.filter((line) => line.trim().length > 0);

    return lines.join("\n");
  });

  const charactersRemoved = computed(() =>
    Math.max(0, text.value.length - cleaned.value.length),
  );

  return { options, cleaned, charactersRemoved };
}
