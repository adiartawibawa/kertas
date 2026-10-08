---
title: "What Is a CSV File?"
description: A plain explanation of the CSV format, what's inside one, how it differs from Excel, with examples and ways to open it.
publishedAt: "2026-10-10"
translationKey: what-is-csv
relatedToolPath: /office-tools/spreadsheet/csv-viewer
coverImage: /img/blog/what-is-csv-file.jpg
---

You download a file from your bank, an online store, or a work system, and it ends in `.csv`. Open it in Notepad and you see rows of text split by commas. Open it in Excel and it snaps into a neat table. That file is a CSV, and almost every system on earth can read it.

## A CSV Is Plain Text, Not a Special File

CSV stands for _Comma-Separated Values_. The name tells you exactly what's inside: data split by commas. No hidden format, no compression, no built-in encryption. Open a `.csv` file in any text app, Notepad, TextEdit, VS Code, and you read the raw content exactly as it's stored.

Compare that to an Excel file (`.xlsx`). That file is actually a ZIP archive holding dozens of XML files inside, storing cell colors, formulas, fonts, even comment history. Open an `.xlsx` in Notepad and you get a wall of unreadable characters.

That simplicity makes CSV a universal language for moving data around. Banks, online stores, accounting software, HR systems, they all export and import CSV, even though each one runs on completely different technology.

## What's Actually Inside One

Open a CSV file containing student records and you'll see something like this:

```
Name,Class,Score
John Carter,2A,85
Maria Lopez,2B,90
David Kim,2A,78
```

The first line holds the column names, the header. Every line after that is one row of data, with values between columns split by a comma. Spreadsheet apps read this pattern and arrange it automatically into a table: a Name column, a Class column, a Score column, with three rows underneath.

The separator isn't always a comma. Several European countries use a semicolon instead, because a comma marks decimals there (`85,5` instead of `85.5`). Some older systems use a tab. That's why CSV sometimes gets called _delimiter-separated values_, the comma just happens to be the most common choice.

## Why It's Still Around

The format predates Excel by years. It survives for three reasons.

First, the file size stays small. With no formatting, colors, or formulas, a CSV holding thousands of rows can weigh a few hundred KB. An Excel file with the same data often runs several times larger.

Second, nearly every programming language reads and writes CSV in a handful of lines of code. Python, JavaScript, PHP, all ship with built-in support for it. You don't need a specialized library the way Excel files often require.

Third, CSV doesn't belong to one app. An Excel file is meant to open in Excel or a compatible program. A CSV file opens anywhere, from Notepad to a database, from a Python script to Google Sheets.

## CSV vs Excel: Which One to Use

People treat these two formats as interchangeable, but they serve different jobs.

Reach for CSV when you need to **move data between systems**. Export customer data from one platform, import it into another, CSV is the safest bet because nearly every system accepts it without extra conditions.

Reach for Excel when you need to **work with and present data**. Need colors to flag a status, formulas to auto-calculate totals, or a chart built from that data, Excel handles it. CSV can't store any of that, it only holds text.

Plenty of workflows use both: data gets exported as CSV from one system, then imported into Excel for further work and presentation.

## Common Problems When Opening a CSV

Three issues trip people up most often.

**Strange characters show up.** A letter that should read "é" turns into "Ã©", or a character like "ñ" renders broken. This comes down to _encoding_, the method a computer uses to translate bytes into characters. A CSV saved in UTF-8 but opened by an app that assumes a different encoding will display garbled text like this.

**Everything lands in one column.** Open a CSV in Excel and sometimes the entire row piles into column A, with no split at all. The usual cause: the file's delimiter is a semicolon while your Excel is set to expect a comma, or the other way around.

**Numbers change shape.** A zip code like "00123" turns into "123" the moment it opens in Excel, because Excel reads it as a number and drops the leading zero. A long phone number flips into scientific notation like "6.28E+11". It's one reason sensitive data, IDs, zip codes, phone numbers, so often comes out mangled after a trip through Excel.

## The Simplest Way to Open a CSV

If you just need to check what's inside a CSV file quickly, without Excel reshaping your numbers, open it straight in [CSV Viewer](/office-tools/spreadsheet/csv-viewer). Upload the file and it appears as a searchable table right away, with nothing sent to any server.

Need it as an Excel file you can format further? [CSV to XLSX](/office-tools/spreadsheet/csv-to-xlsx) converts it directly in your browser.
