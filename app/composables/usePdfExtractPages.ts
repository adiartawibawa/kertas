export function usePdfExtractPages() {
  const file = ref<File | null>(null);
  const totalPages = ref(0);
  const pagesInput = ref("");
  const resultBytes = ref<Uint8Array | null>(null);
  const isProcessing = ref(false);
  const error = ref("");

  async function setFile(f: File) {
    error.value = "";
    file.value = f;
    resultBytes.value = null;
    try {
      const { PDFDocument } = await import("pdf-lib");
      const bytes = await f.arrayBuffer();
      const doc = await PDFDocument.load(bytes);
      totalPages.value = doc.getPageCount();
    } catch {
      error.value = "Gagal membaca file PDF.";
      totalPages.value = 0;
    }
  }

  async function runExtract() {
    if (!file.value) return;
    error.value = "";

    const indices = parsePageRanges(pagesInput.value, totalPages.value);
    if (indices.length === 0) {
      error.value =
        "Masukkan nomor atau rentang halaman yang valid, misal: 1-3,5";
      return;
    }

    isProcessing.value = true;
    try {
      const { PDFDocument } = await import("pdf-lib");
      const bytes = await file.value.arrayBuffer();
      const sourceDoc = await PDFDocument.load(bytes);
      const newDoc = await PDFDocument.create();
      const copiedPages = await newDoc.copyPages(sourceDoc, indices);
      copiedPages.forEach((p) => newDoc.addPage(p));
      resultBytes.value = await newDoc.save();
    } catch {
      error.value = "Gagal mengekstrak halaman.";
    } finally {
      isProcessing.value = false;
    }
  }

  return {
    file,
    totalPages,
    pagesInput,
    resultBytes,
    isProcessing,
    error,
    setFile,
    runExtract,
  };
}
