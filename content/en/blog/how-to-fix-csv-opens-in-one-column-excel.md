---
title: How to Fix a CSV File That Opens in One Column in Excel
description: Fix a CSV file that opens in one column in Excel. Check the separator, use Text to Columns, or import with the right delimiter. Plus a way to preview the file first.
publishedAt: "2026-10-21"
translationKey: fix-csv-one-column-excel
relatedToolPath: /office-tools/spreadsheet/csv-viewer
coverImage: /img/blog/fixing-csv-file.jpg
---

You double-click a CSV file, and Excel puts all the data in column A. Each row holds one long sentence with commas or semicolons inside it. The data is intact. Excel is using a different separator from the one inside the file.

## Why a CSV File Opens in One Column

A CSV file separates values with one character, usually a comma. When you open the file with a double-click, Excel on Windows uses the list separator from your computer's regional settings. Regional settings that use a comma as the decimal mark usually use a semicolon as the list separator.

So a comma-separated file opens in one column on a computer that expects semicolons, and the reverse happens too. Tab-separated files run into the same problem.

## Check What the File Contains First

Before you fix anything, find out which separator your file uses. You have two ways.

**Notepad.** Right-click the file, choose **Open with**, then **Notepad**. Look at the first line:

```
Name,Class,Score
Name;Class;Score
```

The first line uses commas and the second uses semicolons. A tab separator shows up as a wide gap between values.

**CSV Viewer.** [CSV Viewer](/office-tools/spreadsheet/csv-viewer) on Kertaas opens the file in your browser without passing through Excel.

1. Drag the CSV file into the upload area, or click to choose a file.
2. The data appears as a table.
3. Type in the search box to filter rows across every column.

If the table reads cleanly, your file is healthy and the problem lives in Excel's settings. If every value stays in one column, look at the character between the values. That is the separator you need to choose in the methods below.

CSV Viewer displays and searches data only. You cannot edit the table. Your browser reads the file on your device, so nothing uploads to a server.

## Method 1: Split the Column With Text to Columns

This method repairs data that already opened in column A.

1. Click the letter **A** above the column to select the whole column.
2. Open the **Data** tab and click **Text to Columns**.
3. Choose **Delimited** and click **Next**.
4. Tick the matching separator: **Semicolon**, **Comma**, or **Tab**. The preview below shows the result. Click **Next**.
5. On the third screen, click any column that holds zip codes or phone numbers and choose **Text** so leading zeros survive.
6. Click **Finish**.

## Method 2: Import With the Right Delimiter

This route is cleaner, because you pick the separator before the data lands in cells. Excel 2016 and Microsoft 365 have it.

1. Open Excel with a blank sheet.
2. Open the **Data** tab, click **From Text/CSV**, and select your file.
3. In the preview window, set **Delimiter** to comma, semicolon, or tab until the table reads cleanly.
4. Set **File Origin** to **65001: Unicode (UTF-8)** if accented letters look broken.
5. Set **Data Type Detection** to **Do not detect data types** to keep leading zeros.
6. Click **Load**.

Menu names can differ slightly between Excel versions and languages.

## Method 3: Add a sep= Line to the File

Excel for Windows reads a special line at the top of a file as a separator instruction.

1. Open the file in Notepad.
2. Add one line at the very top: `sep=;` for semicolons, or `sep=,` for commas.
3. Save the file and open it in Excel.

Excel uses that line as an instruction and does not display it. Other programs read it as a normal data row, so delete the line before you import the file into another system.

## Method 4: Change the List Separator in Windows

This setting changes Excel's default separator for every CSV file you open with a double-click.

1. Open **Control Panel**, then **Region**.
2. Click **Additional settings**.
3. Change the **List separator** field to `,` or `;`, whichever matches the files you open most.
4. Click **OK**, then reopen your CSV file.

The change applies to every app on the computer. Use it when files from one source always share the same separator.

## Open the File in Google Sheets

Google Sheets asks for the separator when you import.

1. Open a blank spreadsheet.
2. Choose **File**, then **Import**, then **Upload**, and select the CSV file.
3. Pick the matching **Separator type** and click **Import data**.

Google Sheets uploads the file to your Google account. For sensitive data, use the Excel methods above.

## Which Method Fits

| Method          | Best for                             | Note                                       |
| --------------- | ------------------------------------ | ------------------------------------------ |
| Text to Columns | Data already open in column A        | Set columns to Text to keep leading zeros  |
| From Text/CSV   | A clean import with encoding control | Needs Excel 2016 or newer                  |
| `sep=` line     | One file you open often              | Delete the line before importing elsewhere |
| List separator  | Every file from one source           | Changes a setting for the whole computer   |
| CSV Viewer      | Reading the file without Excel       | Cannot edit data                           |

## After the Columns Split

If the data looks tidy but contains blank rows, duplicates, or extra spaces, clean it with [CSV Cleaner](/office-tools/spreadsheet/csv-cleaner).

## Frequently Asked Questions

### Is my CSV data broken if everything lands in column A?

No. The file contents are intact. Excel is using a different separator from the one inside the file.

### How do I know which separator is correct?

Open the file in Notepad and look at the character between values on the first line. Comma, semicolon, and tab are the three most common separators.

### Can CSV Viewer edit data?

No. CSV Viewer shows data as a table and filters rows through search. To edit, open the file in Excel or Google Sheets with the right separator.

### Does my file upload when I use CSV Viewer?

No. Your browser reads the file directly, and no data goes to a server.
