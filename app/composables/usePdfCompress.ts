/**
 * PENTING: kompresi ini bersifat "best-effort" — hanya memadatkan struktur
 * internal PDF (object streams) dan menghapus metadata. TIDAK mengompres
 * atau menurunkan resolusi gambar di dalam PDF, karena itu butuh library
 * jauh lebih berat (re-encoding gambar). Untuk PDF yang didominasi gambar
 * beresolusi tinggi, pengurangan ukurannya bisa sangat kecil atau nyaris
 * tidak ada.
 */
export function usePdfCompress() {
  const file = ref<File | null>(null);
  const originalSize = ref(0);
  const compressedBytes = ref<Uint8Array | null>(null);
  const isProcessing = ref(false);
  const error = ref("");

  function setFile(f: File) {
    file.value = f;
    originalSize.value = f.size;
    compressedBytes.value = null;
    error.value = "";
  }

  async function runCompress() {
    if (!file.value) return;
    error.value = "";
    isProcessing.value = true;

    try {
      const { PDFDocument } = await import("pdf-lib");
      const bytes = await file.value.arrayBuffer();
      const doc = await PDFDocument.load(bytes, { updateMetadata: false });

      doc.setTitle("");
      doc.setAuthor("");
      doc.setSubject("");
      doc.setKeywords([]);
      doc.setProducer("");
      doc.setCreator("");

      compressedBytes.value = await doc.save({ useObjectStreams: true });
    } catch {
      error.value =
        "Gagal mengompres PDF. Pastikan file valid dan tidak terenkripsi.";
    } finally {
      isProcessing.value = false;
    }
  }

  const compressedSize = computed(() => compressedBytes.value?.length ?? 0);

  const savedPercent = computed(() => {
    if (!originalSize.value || !compressedSize.value) return 0;
    return Math.max(
      0,
      Math.round((1 - compressedSize.value / originalSize.value) * 100),
    );
  });

  return {
    file,
    originalSize,
    compressedBytes,
    compressedSize,
    savedPercent,
    isProcessing,
    error,
    setFile,
    runCompress,
  };
}
