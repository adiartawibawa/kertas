---
title: How to Remove Duplicate Rows From a CSV File
description: Remove duplicate rows from a CSV file online in your browser, or with Excel, Google Sheets, and Python. Learn how duplicates are detected and what to check afterward.
publishedAt: "2026-10-23"
translationKey: remove-duplicates-csv
relatedToolPath: /office-tools/spreadsheet/csv-cleaner
coverImage: /img/blog/remove-duplicate-row-csv.jpg
---

You merge several customer exports, and one person appears three times. Sales totals swell, promotional emails go out twice, and a database import stops because the same key shows up twice. You can remove duplicate rows from a CSV file in a few clicks, without Excel and without uploading the file.

## Why Duplicate Data Appears

Duplicates rarely come from one big mistake. The cause is usually mundane:

- You merged several export files that overlap.
- An export ran twice, or a failed import was retried.
- Someone entered the same record twice.
- An older system logged one transaction as several rows.

## Find the Duplicates Before Deleting

Before you clean, confirm the duplicates exist. [CSV Viewer](/office-tools/spreadsheet/csv-viewer) opens the file in your browser, and its search box filters rows across every column. Type one email or one order number. If two or more rows appear, that record is logged more than once.

## Remove Duplicate Rows With CSV Cleaner

[CSV Cleaner](/office-tools/spreadsheet/csv-cleaner) on Kertaas removes duplicate rows right in your browser.

1. Open [CSV Cleaner](/office-tools/spreadsheet/csv-cleaner).
2. Choose your CSV file or drag it onto the page.
3. Tick **Remove duplicate rows**.
4. Tick **Trim spaces in each cell** to catch duplicates that differ by a space.
5. Click **Copy result**, or click **Download .csv** to save the cleaned file.

Each option shows its effect as soon as you switch it on. The header stays as the first row, and the cleaning options apply to the data rows below it. Your browser processes the file on your device, so nothing uploads to a server.

## How Duplicate Rows Are Detected

CSV Cleaner treats a row as a duplicate when all its cells match a row that appeared earlier. The first copy stays and later copies go.

In the file below, three of the four rows are identical:

```
Email,Name,City
budi@example.com,Budi,Jakarta
siti@example.com,Siti,Bandung
budi@example.com,Budi,Jakarta
budi@example.com,Budi,Jakarta
```

The result has two data rows:

```
Email,Name,City
budi@example.com,Budi,Jakarta
siti@example.com,Siti,Bandung
```

This rule has a consequence. A difference of any size in one cell, such as spelling, a date format, or a trailing space, stops two rows from counting as duplicates. Turn on the trim spaces option together with remove duplicates, then check the row count in the result. If the count does not drop as far as you expected, run the output through CSV Cleaner a second time.

## Remove Duplicates Based on One Column

Sometimes two rows count as duplicates even when not every cell matches. The same email might appear with two spellings of a name. CSV Cleaner matches whole rows, so this case needs another tool.

**Excel.** Open the CSV with **Data**, **From Text/CSV**, then select all the data. On the **Data** tab, click **Remove Duplicates** and tick only the Email column.

**Google Sheets.** Import the file, then choose **Data**, **Data cleanup**, **Remove duplicates**, and pick the reference column.

**Python (pandas).** The `subset` parameter sets the reference column, and `keep="first"` retains the first row:

```python
import pandas as pd

df = pd.read_csv("data.csv", dtype=str)
df = df.drop_duplicates(subset=["Email"], keep="first")
df.to_csv("data_clean.csv", index=False)
```

The `dtype=str` option keeps leading zeros in values such as the zip code 00123.

## Remove Duplicates in the Terminal

For exact duplicates on Mac and Linux, one command is enough:

```
awk '!seen[$0]++' data.csv > data_clean.csv
```

This command keeps the first occurrence of each line and preserves the original order. It compares whole lines of text, so only identical lines disappear.

## Which Method Fits

| Method          | Best for                          | Note                                    |
| --------------- | --------------------------------- | --------------------------------------- |
| CSV Cleaner     | Exact duplicates, no code         | Matches whole rows                      |
| Excel           | Duplicates by specific columns    | Opening a CSV can change number formats |
| Google Sheets   | Duplicates by column, shared work | File uploads to your Google account     |
| Python (pandas) | Large files, repeated jobs        | Needs Python installed                  |
| `awk`           | Exact duplicates in a terminal    | Mac and Linux only                      |

## Check the Result After Deleting

Three checks prevent deleting the wrong data:

1. **Row count.** Compare the count before and after. The difference should match the number of duplicates you expected.
2. **Sample records.** Search a few emails or order numbers that were duplicated in [CSV Viewer](/office-tools/spreadsheet/csv-viewer). Confirm each one has a single row.
3. **Original file.** Keep the original file somewhere separate until you trust the result.

## After the Duplicates Are Gone

- Your data comes from several files: merge them first with [CSV Merger](/office-tools/spreadsheet/csv-merger), then remove duplicates in one pass. Duplicates across files disappear too.
- The file is too large to open: split it with [CSV Splitter](/office-tools/spreadsheet/csv-splitter).
- A colleague needs an Excel file: convert it with [CSV to XLSX](/office-tools/spreadsheet/csv-to-xlsx).

## Frequently Asked Questions

### Which row stays when duplicates are removed?

CSV Cleaner keeps the first copy and removes the copies that appear after it.

### Does the cleaner remove my header row?

No. The header stays as the first row. The cleaning options apply to the data rows below it.

### Can I remove duplicates based on a single column?

Not in CSV Cleaner, because it matches every cell in a row. For a single reference column, use Remove Duplicates in Excel or Google Sheets, or `drop_duplicates` in pandas.

### Does my file upload when I use CSV Cleaner?

No. Everything runs in your browser.
