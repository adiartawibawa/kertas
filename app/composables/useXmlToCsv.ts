function elementToValue(el: Element): unknown {
  const children = Array.from(el.children);

  if (children.length === 0) {
    return el.textContent?.trim() ?? "";
  }

  const grouped = new Map<string, Element[]>();
  for (const child of children) {
    const list = grouped.get(child.tagName) ?? [];
    list.push(child);
    grouped.set(child.tagName, list);
  }

  const obj: Record<string, unknown> = {};
  for (const [tag, els] of grouped) {
    obj[tag] =
      els.length > 1
        ? els.map((e) => elementToValue(e))
        : elementToValue(els[0]);
  }
  return obj;
}

function xmlToRecords(xmlText: string): unknown[] {
  const parser = new DOMParser();
  const doc = parser.parseFromString(xmlText, "application/xml");

  if (doc.querySelector("parsererror")) {
    throw new Error("XML tidak valid");
  }

  const root = doc.documentElement;
  const children = Array.from(root.children);

  if (children.length === 0) {
    return [elementToValue(root)];
  }

  // Kalau semua child punya tag sama, anggap sebagai daftar record berulang
  const tagNames = new Set(children.map((c) => c.tagName));
  if (tagNames.size === 1) {
    return children.map((c) => elementToValue(c));
  }

  // Kalau tidak seragam, root sendiri dianggap satu record
  return [elementToValue(root)];
}

/**
 * Mengonversi XML ke CSV dengan asumsi elemen berulang (misal beberapa tag
 * <item> di dalam <items>) merepresentasikan baris tabel. Kalau struktur
 * XML tidak punya pola berulang yang jelas, keseluruhan dokumen diperlakukan
 * sebagai satu baris.
 */
export function useXmlToCsv(text: Ref<string>) {
  const error = ref("");

  const csv = computed(() => {
    error.value = "";
    const raw = text.value.trim();
    if (!raw) return "";
    if (typeof DOMParser === "undefined") return "";

    let records: unknown[];
    try {
      records = xmlToRecords(raw);
    } catch {
      error.value =
        "XML tidak valid, atau strukturnya tidak dikenali. Pastikan tag pembuka/penutup lengkap dan ada elemen berulang untuk dijadikan baris tabel.";
      return "";
    }

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

  return { csv, error, rowCount };
}
