/**
 * Parser CSV sederhana yang menangani field bertanda kutip, koma di dalam
 * kutip, dan tanda kutip ganda yang di-escape ("").
 */
export function parseCsv(text: string): string[][] {
  const rows: string[][] = [];
  let row: string[] = [];
  let field = "";
  let inQuotes = false;

  for (let i = 0; i < text.length; i++) {
    const char = text[i];
    const next = text[i + 1];

    if (inQuotes) {
      if (char === '"' && next === '"') {
        field += '"';
        i++;
      } else if (char === '"') {
        inQuotes = false;
      } else {
        field += char;
      }
    } else if (char === '"') {
      inQuotes = true;
    } else if (char === ",") {
      row.push(field);
      field = "";
    } else if (char === "\n" || char === "\r") {
      if (char === "\r" && next === "\n") i++;
      row.push(field);
      rows.push(row);
      row = [];
      field = "";
    } else {
      field += char;
    }
  }

  if (field.length > 0 || row.length > 0) {
    row.push(field);
    rows.push(row);
  }

  return rows.filter((r) => !(r.length === 1 && r[0] === ""));
}

function escapeCsvField(value: string): string {
  if (/[",\n\r]/.test(value)) {
    return `"${value.replace(/"/g, '""')}"`;
  }
  return value;
}

export function toCsv(rows: string[][]): string {
  return rows.map((row) => row.map(escapeCsvField).join(",")).join("\r\n");
}

/**
 * Meratakan (flatten) object/array bersarang jadi satu level dengan key
 * dot-notation, misal { a: { b: 1 } } menjadi { "a.b": 1 }. Diperlukan
 * karena format tabel (CSV) tidak punya konsep nested field.
 */
export function flattenObject(
  obj: unknown,
  prefix = "",
): Record<string, string> {
  const result: Record<string, string> = {};

  if (obj === null || obj === undefined) {
    if (prefix) result[prefix] = "";
    return result;
  }

  if (Array.isArray(obj)) {
    obj.forEach((item, index) => {
      Object.assign(
        result,
        flattenObject(item, prefix ? `${prefix}.${index}` : String(index)),
      );
    });
    return result;
  }

  if (typeof obj === "object") {
    for (const [key, value] of Object.entries(obj as Record<string, unknown>)) {
      Object.assign(
        result,
        flattenObject(value, prefix ? `${prefix}.${key}` : key),
      );
    }
    return result;
  }

  result[prefix] = String(obj);
  return result;
}
