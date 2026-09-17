export type FormatterMode = "json" | "xml";

function formatXml(xml: string, indentSize: number): string {
  const padding = " ".repeat(indentSize);
  const withBreaks = xml.replace(/(>)(<)(\/*)/g, "$1\r\n$2$3");
  let depth = 0;

  return withBreaks
    .split("\r\n")
    .map((line) => {
      let extraIndent = 0;
      if (/^<\/\w/.test(line)) {
        depth = Math.max(0, depth - 1);
      } else if (/^<\w[^>]*[^/]>.*$/.test(line) && !/^<\?/.test(line)) {
        extraIndent = 1;
      }
      const currentPad = padding.repeat(depth);
      depth += extraIndent;
      return currentPad + line;
    })
    .join("\n")
    .trim();
}

/**
 * Format & validasi JSON atau XML. Untuk JSON, hasil formatting dijamin
 * benar karena pakai JSON.parse/stringify bawaan. Untuk XML, formatting
 * berbasis heuristik regex sederhana — cukup untuk merapikan indentasi,
 * bukan validator XML penuh.
 */
export function useDataFormatter() {
  const mode = ref<FormatterMode>("json");
  const input = ref("");
  const indentSize = ref(2);
  const error = ref("");

  const formatted = computed(() => {
    error.value = "";
    const raw = input.value.trim();
    if (!raw) return "";

    if (mode.value === "json") {
      try {
        const parsed = JSON.parse(raw);
        return JSON.stringify(parsed, null, indentSize.value);
      } catch {
        error.value =
          "JSON tidak valid. Periksa kembali tanda kurung, koma, dan tanda kutip.";
        return "";
      }
    }

    if (typeof DOMParser === "undefined") return "";
    try {
      const parser = new DOMParser();
      const doc = parser.parseFromString(raw, "application/xml");
      if (doc.querySelector("parsererror")) {
        error.value = "XML tidak valid. Periksa kembali tag pembuka/penutup.";
        return "";
      }
      return formatXml(raw.replace(/>\s+</g, "><").trim(), indentSize.value);
    } catch {
      error.value = "Gagal memformat XML.";
      return "";
    }
  });

  const minified = computed(() => {
    if (mode.value !== "json") return "";
    const raw = input.value.trim();
    if (!raw) return "";
    try {
      return JSON.stringify(JSON.parse(raw));
    } catch {
      return "";
    }
  });

  return { mode, input, indentSize, formatted, minified, error };
}
