export type RotateScope = "all" | "specific";
export type RotateAngle = 90 | 180 | 270;

export function usePdfRotate() {
  const file = ref<File | null>(null);
  const totalPages = ref(0);
  const angle = ref<RotateAngle>(90);
  const scope = ref<RotateScope>("all");
  const specificPages = ref("");
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

  async function runRotate() {
    if (!file.value) return;
    error.value = "";
    isProcessing.value = true;

    try {
      const { PDFDocument, degrees } = await import("pdf-lib");
      const bytes = await file.value.arrayBuffer();
      const doc = await PDFDocument.load(bytes);
      const pages = doc.getPages();

      const targetIndices =
        scope.value === "all"
          ? pages.map((_, i) => i)
          : parsePageRanges(specificPages.value, pages.length);

      if (targetIndices.length === 0) {
        error.value = "Tidak ada halaman valid yang dipilih untuk dirotasi.";
        return;
      }

      for (const i of targetIndices) {
        const page = pages[i];
        const currentAngle = page.getRotation().angle;
        page.setRotation(degrees((currentAngle + angle.value) % 360));
      }

      resultBytes.value = await doc.save();
    } catch {
      error.value = "Gagal merotasi PDF.";
    } finally {
      isProcessing.value = false;
    }
  }

  return {
    file,
    totalPages,
    angle,
    scope,
    specificPages,
    resultBytes,
    isProcessing,
    error,
    setFile,
    runRotate,
  };
}
