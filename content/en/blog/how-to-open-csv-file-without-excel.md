---
title: How to Open a CSV File Without Excel
description: Five free ways to open a CSV file without Excel. Open CSV file through browser, text editor, Google Sheets, LibreOffice, and terminal. Plus fixes for garbled text and one-column data.
publishedAt: "2026-10-12"
translationKey: open-csv-without-excel
relatedToolPath: /office-tools/spreadsheet/csv-viewer
coverImage: /img/blog/open-csv-file.jpg
---

You downloaded a `.csv` file from your bank or an online store, and your computer has no Excel. Or Excel opens the file and the data looks broken. You can open a CSV file without Excel in five free ways.

## Open a CSV File Without Excel in Your Browser

[CSV Viewer](/office-tools/spreadsheet/csv-viewer) on Kertaas opens a CSV file in a browser tab. The data appears as a searchable table. Processing runs on your device, so the file never reaches a server. That makes it a good fit for payroll lists, customer data, and bank statements.

Because the file skips Excel, values such as the zip code 00123 keep their leading zeros.

1. Open [CSV Viewer](/office-tools/spreadsheet/csv-viewer).
2. Select the CSV file from your computer.
3. Search the table to find the rows you need.

## Open a CSV File With a Text Editor

CSV is plain text, so Notepad on Windows, TextEdit on Mac, and VS Code all open it. Right-click the file, choose **Open with**, and pick the editor. You see the raw data with commas between the values.

This works for checking the header row or the first few lines. Large tables are hard to read because the columns do not line up, and files of several hundred MB make Notepad slow.

On a Mac, double-clicking a CSV file can launch Numbers or Excel. Right-click and choose **Open With** to pick TextEdit.

## Open a CSV File in Google Sheets

1. Open Google Sheets and create a blank spreadsheet.
2. Choose **File**, then **Import**, then **Upload**, and select your CSV file.
3. In the import window, pick the separator type that matches your file.
4. Turn off the option that converts text to numbers, dates, and formulas if you want to keep leading zeros.

Google Sheets uploads the file to your Google account. For sensitive data, use CSV Viewer or one of the offline methods below.

## Open a CSV File in LibreOffice Calc

LibreOffice is free, open source, and available for Windows, macOS, and Linux. Choose **File**, then **Open**, and select the CSV file.

A **Text Import** window appears before the data loads. Set three things there:

- **Character set**: choose UTF-8 so accented letters and special characters display correctly.
- **Separator**: choose comma, semicolon, or tab to match the file.
- **Column type**: set columns such as zip codes and phone numbers to **Text**.

You control encoding and format before the data lands in cells. LibreOffice also works offline.

## Preview a CSV File in the Terminal

Developers and people with huge files can read the first lines without opening the whole file.

Windows PowerShell:

```
Get-Content data.csv -TotalCount 5
```

Mac and Linux:

```
head -n 5 data.csv
```

Both commands print the first five lines, enough to see the header and the separator. Change the 5 to show more lines.

## Which Method Fits

| Method           | Best for                            | Note                                |
| ---------------- | ----------------------------------- | ----------------------------------- |
| CSV Viewer       | Quick checks, sensitive data        | File stays on your device           |
| Text editor      | Header and first few lines          | Columns do not line up              |
| Google Sheets    | Editing and sharing online          | File uploads to your Google account |
| LibreOffice Calc | Control over encoding and separator | Needs installation                  |
| Terminal         | Very large files                    | Needs command line basics           |

## Fix Common Problems When Opening a CSV

**Strange characters such as "Ã©".** The file encoding does not match the app. Reopen the file with UTF-8 encoding. In LibreOffice, choose it in the Text Import window. In VS Code, click the encoding name in the bottom status bar and pick **Reopen with Encoding**.

**All data piles up in column A.** You picked the wrong separator. Try semicolon or tab in the import settings.

**Leading zeros disappear.** Set the column to the **Text** type during import, or view the file in CSV Viewer.

## Handle Large CSV Files

Excel stops at 1,048,576 rows per sheet, and the remaining rows do not load. If your file is longer, split it first with [CSV Splitter](/office-tools/spreadsheet/csv-splitter), then open each part on its own.

## Clean Up or Convert After Opening

Once you can see the data, you may need a next step:

- The file has empty rows or messy data: clean it with [CSV Cleaner](/office-tools/spreadsheet/csv-cleaner).
- A colleague asks for an Excel file: convert it with [CSV to XLSX](/office-tools/spreadsheet/csv-to-xlsx).
- You need the data for an app or an API: convert it with [CSV to JSON](/office-tools/data/csv-to-json).

## Frequently Asked Questions

### Can I open a CSV file on my phone?

Yes. The Google Sheets app for Android and iOS opens CSV files.

### Can I open a CSV file without sending it to the internet?

Yes. CSV Viewer processes the file on your device. Text editors, LibreOffice, and the terminal also work offline.

### Can I edit a CSV file without Excel?

Yes. Edit the file in a text editor or LibreOffice. When you save in LibreOffice, choose **Keep Current Format** so the file stays a CSV.
