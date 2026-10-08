---
title: How to Reduce PDF File Size Without Losing Quality
description: Reduce PDF file size without losing quality. Compress the PDF structure in your browser, then try other steps when your PDF is full of images.
publishedAt: "2026-10-26"
translationKey: reduce-pdf-file-size
relatedToolPath: /office-tools/pdf/pdf-compress
coverImage: /img/blog/reduce-pdf-size.jpg
---

You prepare a job application, and the online form rejects your PDF for going over the size limit. Or your email fails because the attachment is too large. You can reduce PDF file size without hurting text or image quality, and the process runs in your browser with no upload.

## Why a PDF File Gets Large

Four things inflate a PDF most often:

- **High-resolution images.** Photos and scanned pages take the most space.
- **Embedded fonts.** Every font the document uses gets stored inside the file.
- **Structure and metadata.** The file keeps internal data and document details that never show on the page.
- **Page count.** A long document weighs more than a short one.

## Reduce PDF Size With PDF Compress

[PDF Compress](/office-tools/pdf/pdf-compress) on Kertaas compacts the internal structure of a PDF to shrink the file. It also strips metadata, and it leaves image and text quality alone.

1. Open [PDF Compress](/office-tools/pdf/pdf-compress).
2. Choose your PDF file or drag it onto the page.
3. Click **Compress PDF**.
4. Compare the sizes before and after, then download the result once you are happy with it.

The tool shows the size before and after, along with the percentage saved. Your browser processes the file on your device, so documents such as contracts and payslips never reach a server.

## How Small the Result Gets

The result depends on what the PDF contains. PDF Compress compacts the file structure and does not lower image resolution.

| PDF type                                      | What to expect                                                         |
| --------------------------------------------- | ---------------------------------------------------------------------- |
| Text-based documents                          | The size can drop noticeably                                           |
| PDFs full of high-resolution images, or scans | Limited savings                                                        |
| PDFs exported from modern apps                | The size may barely change, because the structure is already efficient |

If the result drops only a little, your file is already compact, or its images set the size. The next steps help in that case.

## If the File Is Still Too Large

Every option below trims content or image quality, so weigh the result before you use it.

**Keep only the pages you need.** Use [Extract Pages](/office-tools/pdf/pdf-extract-pages) to cut a thick document down to its key pages. A three-page attachment is far smaller than a hundred-page report.

**Split the file into parts.** [PDF Split](/office-tools/pdf/pdf-split) divides a PDF into several parts. Send the parts in separate emails or upload them one at a time.

**Export again with lower image quality.** If you have the source file, save it as a PDF with the minimum size option. In Microsoft Word, choose **File**, **Save As**, pick the PDF format, and set **Optimize for** to **Minimum size**.

**Rescan at a lower resolution.** High-resolution scans make large files. For documents read on screen, 150 to 200 dpi is usually readable.

**Use Preview on a Mac.** Open the PDF in Preview, choose **File**, **Export**, then pick the **Quartz Filter** named **Reduce File Size**. Image quality drops, so check the result before you send it.

## Recommended Order

If you combine several PDFs with [PDF Merge](/office-tools/pdf/pdf-merge), compress the merged file once at the end. That way you do not compress the same file repeatedly.

## Check the Result Before Sending

1. **Size.** Confirm the final size sits under the recipient's limit.
2. **Key pages.** Open the pages with images, signatures, or tables and confirm everything is readable.
3. **Original file.** Keep the original somewhere separate. The compressed copy loses the original's metadata, and you may need the full version later.

## Frequently Asked Questions

### Does PDF quality drop after compression?

No. PDF Compress only compacts the file structure and strips metadata. Image resolution and text quality stay the same.

### Why did the file size barely change?

Your PDF may already be efficient, such as one exported straight from a modern app. Or high-resolution images dominate the file size, and this tool does not shrink images.

### How much can a PDF shrink?

It depends on the contents. A text-based PDF can shrink noticeably, while an image-heavy PDF shrinks less.

### Does my file upload when I use PDF Compress?

No. Compression runs in your browser, and the document never goes to a server.
