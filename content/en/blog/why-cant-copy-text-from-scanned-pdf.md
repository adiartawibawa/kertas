---
title: Why You Can't Copy Text From a Scanned PDF (and How to Fix It)
description: Why can't you copy text from a scanned PDF? The pages are images. Learn how to check, convert them to text with OCR, and clean up the result.
publishedAt: "2026-10-28"
translationKey: cannot-copy-text-scanned-pdf
relatedToolPath: /office-tools/pdf/pdf-split
coverImage: /img/blog/cannot-copy-text-scanned-pdf.jpg
---

You drag the cursor across a paragraph in a PDF, and you get one blue block the size of the page, or nothing at all. The copy command produces nothing. Your PDF is almost certainly a scan, and the problem lives in the file, not in your computer.

## Why You Can't Copy Text From a Scanned PDF

A scanner photographs paper. A scanned PDF stores one picture for each page. That picture is a grid of colored dots, with no letter characters inside it.

Think of a photo of a notice board. Your eyes read the words, but the computer sees pixels. A digital PDF works differently: it stores letters as characters you can select, search, and copy. Those characters form the text layer. A scanned PDF has no text layer.

## Check First: Image or Text

Two tests give you an answer in half a minute:

1. **Select a sentence.** Drag the cursor across one sentence. If it highlights word by word, your PDF has text. If the whole page highlights as one block, your PDF is an image.
2. **Search for a word.** Press `Ctrl+F` on Windows or `Cmd+F` on a Mac, then search for a word you can plainly see on the page. If you get zero results, the page has no text layer.

Repeat the test on a few pages. One PDF can hold digital pages and scanned pages together.

## Two Other Reasons Text Won't Copy

Not every failed copy comes from a scan.

**The document owner restricted copying.** A PDF can carry a security setting that turns copying off. Contact whoever made the document and ask for an unrestricted version.

**Copied text turns into strange characters.** The fonts inside the PDF do not map characters correctly, so the pasted result shows boxes or random symbols. Try a different PDF reader. If the result stays the same, run OCR on those pages.

## Turn a Scanned PDF Into Text With OCR

OCR (optical character recognition) reads the pictures of letters and converts them into real text. You have several routes:

- **Google Docs.** Upload the PDF to Google Drive, right-click the file, choose **Open with**, then **Google Docs**. You get a document containing the text. The file uploads to your Google account, and free OCR services often cap the page count or file size.
- **Adobe Acrobat Pro.** The **Scan & OCR** feature adds a text layer to your PDF. It is a paid feature.
- **OCRmyPDF.** A free, open-source tool that runs on your own computer, so the file never leaves your device.
- **A phone camera for one page.** Live Text on iPhone or Google Lens on Android copies text from a photo of a page.

For OCRmyPDF, the command looks like this:

```
ocrmypdf -l eng+ind scan.pdf scan_ocr.pdf
```

The `-l eng+ind` option selects English and Indonesian. Install the matching Tesseract language packs first.

With OCRmyPDF or Acrobat, the result is a PDF with a text layer. After that, [PDF to Text](/office-tools/pdf/pdf-to-text) can pull out the text, because it reads text that already exists inside the file. PDF to Text does not run OCR itself.

## Split a Large PDF With PDF Split Before OCR

[PDF Split](/office-tools/pdf/pdf-split) on Kertaas divides a PDF into several files in your browser. Pages are copied as-is with no recompression, so your scan quality stays intact. The file never reaches a server.

1. Open [PDF Split](/office-tools/pdf/pdf-split).
2. Choose your PDF file or drag it onto the page.
3. Pick **Each page separate** or **Custom ranges**.
4. Click **Split PDF**, then download each part. **Download all** fetches every part in sequence.

In **Custom ranges**, write one line for each output file. Use a hyphen for a range (`1-3`) and commas for separate pages (`1,4,7`):

```
1-10
11-20
21-30
```

Those three lines produce three files of ten pages each. Two reasons to split a PDF before OCR:

- **OCR service limits.** If a free service rejects a thick file, send small parts one at a time.
- **Mixed PDFs.** Separate the digital pages from the scanned pages. Pull text from the digital pages with PDF to Text, and run OCR on the scanned pages only.

## Tidy the OCR Output With Text Cleaner

OCR text often carries double spaces, extra blank lines, and hidden tabs. [Text Cleaner](/office-tools/documents/text-cleaner) clears them in one pass.

1. Paste the text into the **Original text** column.
2. Tick the options you need.
3. Click **Copy result** to copy the **Cleaned result** column.

Five options are available: **Trim leading/trailing spaces**, **Remove double spaces**, **Remove blank lines**, **Convert tabs to spaces**, and **Merge into a single line**. The last option removes paragraph breaks, so turn it on only when you want one block of text. Your original text stays untouched, and you can switch options at any time. Everything runs in your browser.

## Check the OCR Output for Misreads

OCR is not 100 percent accurate, and Text Cleaner does not fix misread letters. Scan quality sets the result. Common misreads include "rn" read as "m", the digit 0 swapped with the letter O, and the digit 1 swapped with the letter l.

Reread the parts that must be right: names, numbers, dates, and amounts of money. Compare them against the original page.

## The Full Path From Scan to Clean Text

1. Check whether the PDF holds images or text.
2. Split the file with PDF Split if it is too large or has mixed pages.
3. Run OCR to add a text layer.
4. Extract the text with PDF to Text, or take it straight from the OCR result.
5. Tidy it with Text Cleaner.
6. Reread the important parts.

## Frequently Asked Questions

### Can PDF to Text read a scanned PDF?

Not yet. PDF to Text reads digital text inside the file, not text from images. A scanned PDF with no text layer produces empty output.

### Does PDF Split lower page quality?

No. Pages are copied as-is with no recompression.

### Is OCR output accurate?

Accuracy depends on scan quality. A sharp, straight scan gives cleaner text. Still reread names, numbers, and dates.

### Is my file safe?

PDF Split and Text Cleaner run in your browser, and nothing uploads to a server. Google Docs uploads the file to your Google account. For confidential documents, use OCR that runs on your own computer, such as OCRmyPDF.
