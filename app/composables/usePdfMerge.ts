export interface PdfFileEntry {
  id: string;
  name: string;
  file: File;
}

let idCounter = 0;
function nextId(): string {
  idCounter += 1;
  return `pdf-${idCounter}`;
}

/**
 * Library `pdf-lib` di-import secara dinamis, hanya saat dibutuhkan —
 * supaya tidak ikut membengkakkan bundle awal halaman.
 */
export function usePdfMerge() {
  const files = ref<PdfFileEntry[]>([]);
  const isMerging = ref(false);
  const error = ref("");

  function addFiles(fileList: File[]) {
    for (const file of fileList) {
      files.value.push({ id: nextId(), name: file.name, file });
    }
  }

  function removeFile(id: string) {
    files.value = files.value.filter((f) => f.id !== id);
  }

  function moveUp(id: string) {
    const index = files.value.findIndex((f) => f.id === id);
    if (index <= 0) return;
    const arr = [...files.value];
    const prev = arr[index - 1];
    const current = arr[index];
    if (!prev || !current) return;
    arr[index - 1] = current;
    arr[index] = prev;
    files.value = arr;
  }

  function moveDown(id: string) {
    const index = files.value.findIndex((f) => f.id === id);
    if (index < 0 || index >= files.value.length - 1) return;
    const arr = [...files.value];
    const current = arr[index];
    const next = arr[index + 1];
    if (!current || !next) return;
    arr[index] = next;
    arr[index + 1] = current;
    files.value = arr;
  }

  async function downloadMerged(filename = "merged.pdf") {
    error.value = "";
    if (files.value.length < 2) {
      error.value = "Upload minimal 2 file PDF untuk digabungkan.";
      return;
    }

    isMerging.value = true;
    try {
      const { PDFDocument } = await import("pdf-lib");
      const mergedPdf = await PDFDocument.create();

      for (const entry of files.value) {
        const bytes = await entry.file.arrayBuffer();
        const sourcePdf = await PDFDocument.load(bytes);
        const copiedPages = await mergedPdf.copyPages(
          sourcePdf,
          sourcePdf.getPageIndices(),
        );
        copiedPages.forEach((page) => mergedPdf.addPage(page));
      }

      const mergedBytes = await mergedPdf.save();
      downloadBinaryFile(filename, mergedBytes, "application/pdf");
    } catch {
      error.value =
        "Gagal menggabungkan PDF. Pastikan semua file adalah PDF yang valid dan tidak terenkripsi.";
    } finally {
      isMerging.value = false;
    }
  }

  return {
    files,
    addFiles,
    removeFile,
    moveUp,
    moveDown,
    isMerging,
    error,
    downloadMerged,
  };
}
