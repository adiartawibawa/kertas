export function downloadTextFile(
  filename: string,
  content: string,
  mimeType = "text/plain",
): void {
  if (typeof window === "undefined") return;

  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

/**
 * Sama seperti downloadTextFile tapi untuk konten biner (Uint8Array/
 * ArrayBuffer) — dipakai untuk file PDF hasil olahan pdf-lib.
 */
export function downloadBinaryFile(
  filename: string,
  data: Uint8Array | ArrayBuffer,
  mimeType = "application/octet-stream",
): void {
  if (typeof window === "undefined") return;

  let buffer: ArrayBuffer;

  if (data instanceof Uint8Array) {
    buffer = new ArrayBuffer(data.byteLength);
    new Uint8Array(buffer).set(data);
  } else {
    buffer = data;
  }

  const blob = new Blob([buffer], { type: mimeType });
  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.href = url;
  link.download = filename;

  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

  URL.revokeObjectURL(url);
}
