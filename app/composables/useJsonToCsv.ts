export function useJsonToCsv(text: Ref<string>) {
  const error = ref("");

  const csv = computed(() => {
    error.value = "";
    const raw = text.value.trim();
    if (!raw) return "";

    let parsed: unknown;
    try {
      parsed = JSON.parse(raw);
    } catch {
      error.value =
        "JSON tidak valid. Periksa kembali tanda kurung, koma, dan tanda kutip.";
      return "";
    }

    const records = Array.isArray(parsed) ? parsed : [parsed];
    if (records.length === 0) return "";

    const flatRecords = records.map((r) => flattenObject(r));
    const headers = Array.from(
      new Set(flatRecords.flatMap((r) => Object.keys(r))),
    );

    const rows: string[][] = [headers];
    for (const record of flatRecords) {
      rows.push(headers.map((h) => record[h] ?? ""));
    }

    return toCsv(rows);
  });

  const rowCount = computed(() => {
    if (!csv.value) return 0;
    return Math.max(0, csv.value.split("\r\n").length - 1);
  });

  const columnCount = computed(() => {
    if (!csv.value) return 0;
    return csv.value.split("\r\n")[0]?.split(",").length ?? 0;
  });

  return { csv, error, rowCount, columnCount };
}
