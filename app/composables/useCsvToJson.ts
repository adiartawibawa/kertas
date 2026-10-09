export interface CsvToJsonOptions {
  unflatten: boolean;
  convertTypes: boolean;
}

const UNSAFE_KEYS = new Set(["__proto__", "constructor", "prototype"]);

function isIndex(key: string): boolean {
  return /^\d+$/.test(key);
}

function convertValue(raw: string): unknown {
  const s = raw.trim();
  if (s === "true") return true;
  if (s === "false") return false;
  if (s === "null") return null;
  // Hanya angka valid; "007" atau angka di luar batas aman tetap string
  if (/^-?(0|[1-9]\d*)(\.\d+)?([eE][+-]?\d+)?$/.test(s)) {
    const n = Number(s);
    if (
      Number.isFinite(n) &&
      (!Number.isInteger(n) || Number.isSafeInteger(n))
    ) {
      return n;
    }
  }
  return raw;
}

function setDeep(root: Record<string, any>, path: string[], value: unknown) {
  let cur: any = root;
  for (let i = 0; i < path.length; i++) {
    const key = path[i];
    if (key === undefined || UNSAFE_KEYS.has(key)) return;

    if (i === path.length - 1) {
      cur[key] = value;
      return;
    }

    const nextKey = path[i + 1] ?? "";
    if (cur[key] === null || typeof cur[key] !== "object") {
      cur[key] = isIndex(nextKey) ? [] : {};
    }
    cur = cur[key];
  }
}

export function useCsvToJson(text: Ref<string>) {
  const options = reactive<CsvToJsonOptions>({
    unflatten: true,
    convertTypes: true,
  });
  const error = ref("");

  const parsedRows = computed<string[][]>(() => {
    const raw = text.value.trim();
    if (!raw) return [];
    try {
      return parseCsv(raw);
    } catch {
      return [];
    }
  });

  const json = computed(() => {
    error.value = "";
    const rows = parsedRows.value;
    if (rows.length === 0) return "";

    const [header, ...dataRows] = rows;
    if (!header || header.length === 0) {
      error.value = "Baris header CSV tidak ditemukan.";
      return "";
    }

    const records = dataRows.map((row) => {
      const obj: Record<string, any> = {};
      header.forEach((key, i) => {
        const cell = row[i] ?? "";
        const path = options.unflatten ? key.trim().split(".") : [key];

        // Sel kosong di kolom array/nested dilewati agar tidak muncul "" atau array bolong
        if (options.unflatten && cell === "" && path.some(isIndex)) return;

        setDeep(obj, path, options.convertTypes ? convertValue(cell) : cell);
      });
      return obj;
    });

    return JSON.stringify(records, null, 2);
  });

  const recordCount = computed(() => Math.max(0, parsedRows.value.length - 1));
  const columnCount = computed(() => parsedRows.value[0]?.length ?? 0);

  return { options, json, error, recordCount, columnCount };
}
