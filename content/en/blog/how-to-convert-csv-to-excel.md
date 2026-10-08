---
title: How to Convert CSV to Excel (and Back)
description: A guide to converting CSV to XLSX and XLSX back to CSV right in your browser, including what survives the conversion and what doesn't.
publishedAt: "2026-10-14"
translationKey: csv-excel-convert
relatedToolPath: /office-tools/spreadsheet/csv-to-xlsx
coverImage: /img/blog/convert-csv-to-excel.jpg
---

A client asks for a report in Excel so they can color-code it and add their own formulas, but your data sits as a CSV. Or the reverse: you've got a clean Excel file, but the target system only accepts CSV uploads. Both directions come up often, and the good news is neither needs any software installed.

## CSV to Excel: When You Need It

This direction usually comes up when data moves from "just data" to "a document that needs more work". A CSV only stores plain text, there's no room for color, formulas, or charts. Once that data needs formatting, automatic calculations, or a presentation-ready layout, Excel becomes the better fit.

The most common example: an accounting system exports transaction data as CSV, then the finance team opens it in Excel to add category totals and a monthly trend chart.

### How to Convert CSV to XLSX

[CSV to XLSX](/office-tools/spreadsheet/csv-to-xlsx) handles this in three steps:

1. **Upload your CSV file.** The tool shows a preview of the first several rows right away.
2. **Check the preview.** Confirm the columns read correctly before moving on, especially if the file uses a separator other than a comma.
3. **Download as .xlsx.** The output is a genuine Excel file, ready to open and format in Excel, Google Sheets, or LibreOffice Calc.

## Excel to CSV: When You Need It

The reverse direction usually comes from a limitation on the receiving end. Plenty of platforms, from database import tools to email marketing services, only accept CSV because the simpler format is easier for machines to process. A heavily formatted Excel file becomes an obstacle rather than an advantage in this case.

### How to Convert XLSX to CSV

[XLSX to CSV](/office-tools/spreadsheet/xlsx-to-csv) runs the same process in reverse:

1. **Upload your Excel file** (works with both the older `.xls` format and the modern `.xlsx`).
2. **The CSV from the first sheet appears right away.** No extra waiting.
3. **Copy or download the result.**

One thing worth knowing: if your Excel file has multiple sheets, only the **first sheet (leftmost)** gets converted. Data on other sheets doesn't come along automatically, you'll need to move it to the first sheet manually, or convert each sheet separately if you need all of them.

## What's Lost When Converting to CSV

This is the part that catches people off guard. CSV is a plain text format, so these elements don't survive the trip when Excel turns into CSV:

- **Cell colors and formatting.** All visual styling disappears, leaving just text and numbers.
- **Formulas.** A formula like `=SUM(A1:A10)` becomes just its calculated result (say, "450"), not the formula itself.
- **Charts and images.** Any visual element outside of cells has no place in the CSV format.
- **Borders and merged cells.** Complex table structures flatten into plain rows and columns.

If you'll need the formulas or formatting again later, always keep the original `.xlsx` file as a backup before converting to CSV.

## What to Watch for When Converting to Excel

The reverse direction (CSV to XLSX) has its own quirks too, even if they're less obvious.

**Dates can land in the wrong format.** A CSV stores a date as plain text, say "10/14/2026". Once it's in Excel, that date sometimes needs reformatting manually before it reads as a real date rather than just text.

**Numbers with leading zeros can change.** A zip code or account number like "00123" can lose its leading zero the moment Excel reads that column as a number. This isn't a flaw in the conversion itself, it's just Excel's default behavior whenever it opens data that looks numeric.

## About Privacy

Data converted through either tool never leaves your device. The conversion, whether CSV to Excel or the other way around, runs entirely in your browser, with no file sent to any server.
