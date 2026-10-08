---
title: How to Reorder Pages in a PDF
description: Reorder pages in a PDF with Preview on Mac, Acrobat, code, or a no-upload browser method that combines PDF Split and PDF Merge.
publishedAt: "2026-10-30"
translationKey: reorder-pdf-pages
relatedToolPath: /office-tools/pdf/pdf-merge
coverImage: /img/blog/reorder-pdf-pages.jpg
---

You scan a contract, and page five belongs at the front. Or you combine several documents and the pages land in the wrong order. You can reorder pages in a PDF without buying a paid PDF editor, and one method runs in your browser with no upload.

## Reorder PDF Pages With PDF Split and PDF Merge

Kertaas currently has no tool that moves pages one at a time. But [PDF Split](/office-tools/pdf/pdf-split) and [PDF Merge](/office-tools/pdf/pdf-merge) can stand in for one. Cut the document into parts, then stack the parts in a new order.

Example: a ten-page PDF where page 5 must move to the very front.

1. Open [PDF Split](/office-tools/pdf/pdf-split) and choose your PDF file.
2. Pick **Custom ranges** and write one line for each part:

```
5
1-4
6-10
```

3. Click **Split PDF**, then download each part. **Download all** fetches every part in sequence.
4. Open [PDF Merge](/office-tools/pdf/pdf-merge) and choose the three files you just downloaded.
5. Set the order with the up and down arrows on each file: page 5 first, pages 1 to 4 second, pages 6 to 10 third.
6. Click **Download merged file**.

The names of the split files may differ from what you expect. Open each file to confirm its contents before you set the order in PDF Merge.

Group the pages that stay put into one line, like `1-4` in the example. That way you handle three files instead of ten. Pick **Each page separate** only when almost every page changes position.

PDF Split copies pages as-is with no recompression. PDF Merge adds no watermark. Your browser processes both files on your device, so the document never reaches a server.

### Why Extract Pages Does Not Work Here

[Extract Pages](/office-tools/pdf/pdf-extract-pages) pulls chosen pages into one new file. The result always follows the original document order, whatever order you type the numbers in. That means it cannot swap page positions.

## Reorder Pages With Preview on a Mac

Preview comes with every Mac and reorders pages with drag and drop.

1. Duplicate the file first so the original stays safe.
2. Open the copy in Preview.
3. Choose **View**, then **Thumbnails**.
4. Drag a page thumbnail to its new position in the sidebar.
5. Choose **File**, then **Save**.

## Reorder Pages With Adobe Acrobat Pro

Acrobat Pro is a paid product. Open the PDF, choose the **Organize Pages** tool, and drag page thumbnails to their new positions. Save the file once the order is right.

## Change the Order in the Source Document

If your PDF came from Word or Google Docs, change the order in the source document and export a new PDF. This keeps the text editable and updates automatic page numbers.

## Reorder PDF Pages With Code

For terminal users, `qpdf` assembles pages in the order you write. This command moves page 5 to the front:

```
qpdf --empty --pages input.pdf 5,1-4,6-10 -- output.pdf
```

In Python, the pypdf library adds pages one at a time. Index numbers start at 0, so page 5 has index 4:

```python
from pypdf import PdfReader, PdfWriter

reader = PdfReader("input.pdf")
writer = PdfWriter()

for i in [4, 0, 1, 2, 3, 5, 6, 7, 8, 9]:
    writer.add_page(reader.pages[i])

writer.write("output.pdf")
```

## Which Method Fits

| Method                  | Best for                        | Note                       |
| ----------------------- | ------------------------------- | -------------------------- |
| PDF Split and PDF Merge | No upload, any operating system | Takes two stages           |
| Preview on Mac          | Mac users, drag and drop        | Mac only                   |
| Acrobat Pro             | Acrobat users, many adjustments | Paid                       |
| Source document         | PDFs made in Word or Docs       | Needs the source file      |
| `qpdf` or pypdf         | Repeated jobs and many files    | Needs a terminal or Python |

## Check the Result After Reordering

1. **Order.** Open the resulting PDF and page through it.
2. **Page count.** Confirm the total matches the original.
3. **Printed page numbers.** Numbers written inside the pages, such as "Page 5" in a footer, do not change to match the new order.
4. **Bookmarks and internal links.** Test any clickable table of contents. Splitting and merging a file can leave those elements behind.
5. **Original file.** Keep the original in a separate place.

## After the Order Is Right

- The file is too large to send: shrink it with [PDF Compress](/office-tools/pdf/pdf-compress).
- A page sits crooked: turn it with [PDF Rotate](/office-tools/pdf/pdf-rotate).

## Frequently Asked Questions

### Does Kertaas have a tool that moves PDF pages directly?

Right now the route is PDF Split plus PDF Merge. PDF Merge has arrow buttons that set the order of files, and PDF Split prepares the parts.

### Can I use Extract Pages to change the order?

No. Extract Pages output follows the original document order, whatever order you type the numbers in.

### What if I need to delete a page instead of moving it?

Use [Extract Pages](/office-tools/pdf/pdf-extract-pages) and write the pages you want to keep. To drop page 5 from a ten-page document, type `1-4,6-10`.

### Does page quality drop after splitting and merging?

PDF Split copies pages as-is with no recompression, and PDF Merge adds no watermark.

### Does my file upload to a server?

No. PDF Split, PDF Merge, and Extract Pages run in your browser.
