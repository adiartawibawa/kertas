export type PdfSplitMode = "allPages" | "ranges";

export interface PdfSplitPart {
  name: string;
  bytes: Uint8Array;
  pageCount: number;
}

export function usePdfSplit() {
  const mode = ref<PdfSplitMode>("allPages");
  const rangesInput = ref("1-3\n4-6");
  const file = ref<File | null>(null);
  const totalPages = ref(0);
  const parts = ref<PdfSplitPart[]>([]);
  const isProcessing = ref(false);
  const error = ref("");

  async function setFile(f: File) {
    error.value = "";
    file.value = f;
    parts.value = [];
    try {
      const { PDFDocument } = await import("pdf-lib");
      const bytes = await f.arrayBuffer();
      const doc = await PDFDocument.load(bytes);
      totalPages.value = doc.getPageCount();
    } catch {
      error.value =
        "Gagal membaca file PDF. Pastikan file valid dan tidak terenkripsi.";
      totalPages.value = 0;
    }
  }

  async function runSplit() {
    error.value = "";
    if (!file.value || totalPages.value === 0) return;

    isProcessing.value = true;
    try {
      const { PDFDocument } = await import("pdf-lib");
      const bytes = await file.value.arrayBuffer();
      const sourceDoc = await PDFDocument.load(bytes);

      const groups: number[][] =
        mode.value === "allPages"
          ? Array.from({ length: totalPages.value }, (_, i) => [i])
          : rangesInput.value
              .split("\n")
              .map((line) => line.trim())
              .filter(Boolean)
              .map((line) => parsePageRanges(line, totalPages.value))
              .filter((indices) => indices.length > 0);

      if (groups.length === 0) {
        error.value = "Tidak ada rentang halaman valid yang bisa diproses.";
        return;
      }

      const results: PdfSplitPart[] = [];
      for (let i = 0; i < groups.length; i++) {
        const indices = groups[i];
        const newDoc = await PDFDocument.create();
        const copiedPages = await newDoc.copyPages(sourceDoc, indices);
        copiedPages.forEach((p) => newDoc.addPage(p));
        const outBytes = await newDoc.save();
        results.push({
          name: `bagian-${i + 1}.pdf`,
          bytes: outBytes,
          pageCount: indices.length,
        });
      }

      parts.value = results;
    } catch {
      error.value =
        "Gagal memecah PDF. Periksa kembali rentang halaman yang dimasukkan.";
    } finally {
      isProcessing.value = false;
    }
  }

  return {
    mode,
    rangesInput,
    file,
    totalPages,
    parts,
    isProcessing,
    error,
    setFile,
    runSplit,
  };
}
