---
title: How to Split a Large CSV File Into Smaller Parts
description: Learn how to split a large CSV file into smaller parts in your browser, with the terminal, or with Python. Includes tips for keeping headers and checking results.
publishedAt: "2026-10-14"
translationKey: split-large-csv-file
relatedToolPath: /office-tools/spreadsheet/csv-splitter
---

You open a CSV file with 2.5 million rows, and Excel stops loading at row 1,048,576. Or your email client rejects the attachment as too large. Splitting a large CSV file into smaller parts solves both problems, and you can do it without writing code.

## When You Need to Split a CSV File

Four limits push people to split files most often:

- **Excel** loads a maximum of 1,048,576 rows per sheet. The remaining rows do not open.
- **Google Sheets** caps a spreadsheet at 10 million cells.
- **Gmail** caps attachments at 25 MB.
- **Import tools** on many platforms cap the rows or file size per upload.

## Decide How Many Rows Each Part Gets

Divide your total rows by the limit you face. A 2.5 million row file and Excel's 1,048,576 row limit need at least three parts. Leave room under the limit, because the header counts as one row and you may add rows later. With 500,000 rows per part, that file becomes five parts that open without trouble.

## Split a CSV File in Your Browser

[CSV Splitter](/office-tools/spreadsheet/csv-splitter) on Kertaas splits a CSV file in a browser tab. Processing runs on your device, so the file never reaches a server.

1. Open [CSV Splitter](/office-tools/spreadsheet/csv-splitter).
2. Select the CSV file from your computer.
3. Set how you want the file split.
4. Download the resulting parts.

When it finishes, open one part and confirm the header row is there. Every part needs the same header to read as a complete table.

## Split a CSV File in the Terminal on Mac and Linux

The `split` command cuts a file by line count. The three lines below save the header, split the data into 500,000-row chunks, and attach the header to each chunk:

```
head -n 1 data.csv > header.csv
tail -n +2 data.csv | split -l 500000 - part_
for f in part_*; do cat header.csv "$f" > "$f.csv"; rm "$f"; done
```

The output is `part_aa.csv`, `part_ab.csv`, and so on. This command cuts by text line. If a cell contains a line break inside quotes, the cut can land in the middle of that cell. Use Python for files like that.

## Split a CSV File With Python

The pandas library reads a CSV in chunks and writes the header into every part:

```python
import pandas as pd

reader = pd.read_csv("data.csv", chunksize=500_000, dtype=str)

for i, part in enumerate(reader, start=1):
    part.to_csv(f"part_{i}.csv", index=False, encoding="utf-8-sig")
```

The `dtype=str` option keeps leading zeros in values such as the zip code 00123. The `utf-8-sig` option adds a marker that lets Excel read accented letters correctly. Pandas understands CSV structure, so multi-line cells stay intact.

## Which Method Fits

| Method | Best for | Needs |
| --- | --- | --- |
| CSV Splitter | Fast splitting without code | A browser |
| Terminal (`split`) | Large files on Mac and Linux | Command line basics |
| Python (pandas) | Multi-line cells, repeated jobs | Python installed |

## Check the Result

Three checks catch nearly every problem:

1. **Header.** Open each part and look at the first row. [CSV Viewer](/office-tools/spreadsheet/csv-viewer) opens files without Excel and leaves number formats alone.
2. **Row count.** Add the rows of all parts, subtract one header per part, and compare the total with the original file.
3. **Characters.** Look for accented letters or names with special characters. If you see "Ã©", the encoding is wrong.

## Merge the Parts Again if Needed

If you need one file again later, combine the parts with [CSV Merger](/office-tools/spreadsheet/csv-merger). Make sure every part has the same header.

## After Splitting

- A part has empty rows or messy data: clean it with [CSV Cleaner](/office-tools/spreadsheet/csv-cleaner).
- A part must go out as an Excel file: convert it with [CSV to XLSX](/office-tools/spreadsheet/csv-to-xlsx).

## Frequently Asked Questions

### How many rows should each part have?

For Excel, 500,000 rows leaves a safe margin under the 1,048,576 limit. For email or imports into another system, start from their file size or row limit and go a little lower.

### Does splitting a file change the data?

The rows stay the same. Each part needs to carry the header row so the columns make sense.

### Can I join the parts back together?

Yes. [CSV Merger](/office-tools/spreadsheet/csv-merger) combines several CSV files into one.
