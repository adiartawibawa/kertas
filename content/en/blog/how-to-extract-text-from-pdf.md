---
title: How to Extract Text From a PDF File
description: Copy text from a PDF online with a PDF text extractor that runs in your browser, then tidy the result. Includes a fix for scanned PDFs.
publishedAt: "2026-10-19"
translationKey: extract-text-from-pdf
relatedToolPath: /office-tools/pdf/pdf-to-text
coverImage: /img/blog/extract-text-from-pdf-file.jpg
---

You need to quote a paragraph from a PDF report, or move the contents of a contract into another document without retyping it. You select the text, copy it, paste it, and the result is full of broken lines and double spaces. There is a cleaner route: use a PDF text extractor that runs in your browser, then tidy the output with one extra step.

## Check Whether Your PDF Contains Text

PDFs come in two kinds. A digital PDF stores real text, and a scanned PDF stores only pictures of pages. To tell them apart, open the file and try to select one sentence with your cursor. If the sentence highlights, your PDF contains text. If the cursor selects the whole page as one block, your PDF is a scan and needs OCR (optical character recognition).

Every method below uses real text, except the Google Docs section.

## Copy Text From a PDF Online With PDF to Text

[PDF to Text](/office-tools/pdf/pdf-to-text) on Kertaas extracts text from a PDF in a browser tab. It suits long documents, because you do not have to select each page by hand.

1. Open [PDF to Text](/office-tools/pdf/pdf-to-text).
2. Choose your PDF file or drag it onto the page.
3. Wait for the extraction to finish.
4. Copy the text, or download it as a `.txt` file.

Each page gets a marker, so you always know which page a sentence came from. Your browser processes the document on your device and sends nothing to a server.

## Copy Directly From a PDF Reader

For a short quote, copying directly is the fastest route. Open the PDF in Adobe Acrobat Reader, Chrome, Edge, Firefox, or Preview on a Mac. Drag the cursor to select text, then press `Ctrl+C` on Windows or `Cmd+C` on a Mac. To copy the whole document, press `Ctrl+A` or `Cmd+A` first.

This method has drawbacks. Lines often break mid-sentence, page numbers come along, and two-column documents sometimes mix together. For long documents, PDF to Text works better.

## Extract Only the Pages You Need

If you need a few pages from a thick document, pull those pages out first with [Extract Pages](/office-tools/pdf/pdf-extract-pages). You get a small PDF, then you extract its text with PDF to Text. The output is shorter and easier to check.

## Tidy the Result With Text Cleaner

Text copied from a PDF often carries double spaces, extra blank lines, and hidden tabs. [Text Cleaner](/office-tools/documents/text-cleaner) clears all of them in one pass.

1. Paste your text into the **Original text** column.
2. Tick the options you need.
3. Copy the result from the **Cleaned result** column.

Five options are available:

- **Trim leading/trailing spaces:** remove spaces at the start and end of lines.
- **Remove double spaces:** turn double spaces into single spaces.
- **Remove blank lines:** delete empty lines.
- **Convert tabs to spaces:** replace tabs with spaces.
- **Merge into a single line:** join all the text into one line.

The last option removes paragraph breaks. Turn it on only when you want one long block of text. Your original text stays untouched, so you can switch options at any time.

## Extract Text From a Scanned PDF

PDF to Text reads text that already exists inside the file, not text recognized from images. A scanned PDF with no text layer produces empty output.

For those files you need OCR. One free route: upload the PDF to Google Drive, right-click the file, choose **Open with**, then **Google Docs**. Google Docs reads the images and places the text in a new document. Keep in mind that the file uploads to your Google account, so this route does not suit confidential documents.

## Which Method Fits

| Method                 | Best for                   | Note                                |
| ---------------------- | -------------------------- | ----------------------------------- |
| Select in a PDF reader | Short quotes               | Lines often break                   |
| PDF to Text            | Long documents, many pages | Scanned PDFs produce empty output   |
| Google Docs            | Scanned PDFs               | File uploads to your Google account |

## Common Problems

**Empty output.** Your PDF is a scan with no text layer. Use OCR, as in the Google Docs route above.

**Tables and columns look jumbled.** The text comes out in reading order based on position on the page, so tables and columns can look random in plain text. Check the result and rebuild table sections by hand.

**A password-protected PDF fails.** PDF to Text does not support protected files yet. Remove the password from the PDF before you process it.

**Broken lines and double spaces.** Clean them with Text Cleaner using the remove double spaces and remove blank lines options.

## After Extracting the Text

- Count the words with [Word Counter](/office-tools/documents/word-counter).
- Compare two versions of a document with [Text Compare](/office-tools/documents/text-compare).
- Change letter case with [Case Converter](/office-tools/documents/case-converter).

## Frequently Asked Questions

### Is it safe to copy text from a PDF online?

PDF to Text processes the document in your browser, and the contents never reach a server. The page needs an internet connection only to load the code of the PDF-reading library.

### Can I extract text from a scanned PDF?

Not yet. PDF to Text reads digital text inside the file, not text from images. For a scanned PDF, use OCR.

### Does the original layout carry over?

Not fully. Text comes out in reading order based on position on the page, so complex tables and columns can look jumbled.

### Can I save the result?

Yes. Copy the text, or download it as a `.txt` file.
