---
title: Why Numbers Change After Opening a CSV in Excel
description: Why zip codes, phone numbers, and other values reshape themselves when a CSV file opens in Excel, and how to stop it from happening.
publishedAt: "2026-10-20"
translationKey: csv-numbers-excel-change
relatedToolPath: /office-tools/spreadsheet/csv-viewer
coverImage: /img/blog/csv-numbers-excel-change.jpg
---

A customer's phone number, "081234567890", sits neatly in a CSV file. Open it in Excel and it turns into "8.12E+10". A zip code like "00123" loses its two leading zeros, becoming just "123". The data was never wrong, only how it gets displayed changed, but that's enough to cause real alarm if you don't know why it's happening.

## The Root Cause: CSV Has No Data Types

A CSV file stores text, period. There's no information saved about which values should read as numbers and which should read as text. Everything sits equal, just characters split by commas.

Excel decides for itself how each column should be read, the moment the file opens. If a column's content looks like a number, Excel automatically treats it as one, complete with Excel's own display rules for numbers. That's exactly where the trouble starts, because those display rules don't always match what the data was meant to represent.

## Three Cases That Come Up Most

**Leading zeros disappear.** A zip code, employee ID, or product code starting with a zero, like "00123", gets read by Excel as the number 123. A number mathematically never carries a leading zero (123 and 00123 hold the same value), so Excel drops it without asking.

**Long numbers turn into scientific notation.** A phone number, account number, or long transaction ID (12 digits or more) reshapes into something like "8.12E+10". This is Excel's default behavior for any number it judges "too large" to display in full within a standard column width, the same way a calculator handles big numbers.

**Dates get read differently than intended.** The text "03/04/2026" in a CSV can read as March 4th or April 3rd depending on your Excel's regional settings, because a CSV only stores the date as text, not as a date value with a defined format.

## Why This Isn't a Flaw in the CSV File Itself

It's worth understanding: this change happens **at the moment of opening**, not inside the file itself. The original CSV doesn't change at all, its content stays "00123" exactly as before. What changes is only the temporary display in Excel, the result of Excel guessing a data type based on column content.

The problem becomes real once you **save the file again** from Excel after opening it. Once saved, that altered display (123 with no leading zero, scientific notation) becomes the permanent value in the new file. At that point the data has genuinely changed, not just its appearance.

## How to Prevent It

**Don't open a CSV by double-clicking it.** That path triggers Excel's automatic type-guessing for every column right away. Instead, open it through **Data > Get Data > From Text/CSV** (or **From Text** in older versions). This shows a preview of the data and gives you the chance to set each column's type manually, including choosing **Text** for columns holding zip codes, phone numbers, or IDs, before the data ever lands in the sheet.

**Check the original content before opening it in Excel.** If you just need to confirm the raw data is correct (say, that the leading zeros really are there), open it with [CSV Viewer](/office-tools/spreadsheet/csv-viewer) instead. It displays CSV content exactly as stored, with no type-guessing involved, since it doesn't convert anything at all.

**Clean up hidden spaces.** Sometimes a number reads as text (not a number) for the opposite reason, an invisible space stuck to the front or back of the value, left over from an export by another system. It causes a different kind of inconsistency, but the same underlying confusion. [CSV Cleaner](/office-tools/spreadsheet/csv-cleaner) has an option to trim spaces from every cell, useful for tidying this up before the data gets used further.

## If It's Already Been Saved Over

If a CSV file has already been opened and resaved from Excel, and the leading zeros are already gone from the data, the only way to recover is to go back to the original source (whatever system produced that CSV in the first place) and export it again. Excel doesn't keep a history of values before it "fixed" them automatically, so there's no way to restore them from a file that's already been saved.
