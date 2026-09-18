/**
 * pdfjs-dist butuh worker script terpisah untuk parsing. Supaya tidak
 * perlu konfigurasi bundler tambahan (copy file worker, dsb), worker
 * dimuat dari CDN cdnjs sesuai versi pdfjs-dist yang terpasang. Ini hanya
 * memuat kode library parsing-nya — isi PDF Anda tetap sepenuhnya diproses
 * secara lokal di browser, tidak pernah dikirim ke mana pun.
 */
export function usePdfToText() {
  const file = ref<File | null>(null);
  const text = ref("");
  const pageCount = ref(0);
  const isProcessing = ref(false);
  const error = ref("");

  async function setFile(f: File) {
    error.value = "";
    text.value = "";
    pageCount.value = 0;
    file.value = f;
    isProcessing.value = true;

    try {
      const pdfjsLib = await import("pdfjs-dist/build/pdf.mjs");
      pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.mjs`;

      const buffer = await f.arrayBuffer();
      const pdf = await pdfjsLib.getDocument({ data: buffer }).promise;
      pageCount.value = pdf.numPages;

      const pageTexts: string[] = [];
      for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i);
        const content = await page.getTextContent();
        const pageText = content.items
          .map((item) => ("str" in item ? item.str : ""))
          .join(" ");
        pageTexts.push(`--- Halaman ${i} ---\n${pageText}`);
      }

      text.value = pageTexts.join("\n\n");
    } catch {
      error.value =
        "Gagal mengekstrak teks dari PDF. Pastikan file tidak rusak atau terenkripsi.";
    } finally {
      isProcessing.value = false;
    }
  }

  function clear() {
    file.value = null;
    text.value = "";
    pageCount.value = 0;
    error.value = "";
  }

  return { file, text, pageCount, isProcessing, error, setFile, clear };
}
