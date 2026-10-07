---
title: What Is JSON, and How to Convert It to CSV
description: A plain explanation of the JSON format, how it differs from CSV, and how to turn JSON data into a CSV table you can open in Excel.
publishedAt: "2026-10-22"
translationKey: what-is-json-to-csv
relatedToolPath: /office-tools/data/json-to-csv
coverImage: /img/blog/what-is-json-file.jpg
---

An API from the app your team uses returns customer data as JSON. The problem: your team only knows Excel, and your manager wants that data as a plain table for analysis. These two needs collide often, because JSON and a spreadsheet table are built on different ways of thinking about data.

## What JSON Actually Is

JSON stands for _JavaScript Object Notation_. The format exists to store structured data, especially the kind apps and systems use to talk to each other. Nearly every web API returns data this way, since it's easy for machines to parse and still readable enough for humans.

One customer record in JSON looks like this:

```json
{
  "name": "John Carter",
  "email": "john@example.com",
  "address": {
    "city": "Austin",
    "zip": "73301"
  },
  "hobbies": ["reading", "cycling"]
}
```

Look at the structure: data sits inside curly braces (`{}`) for objects, and square brackets (`[]`) for lists of values. One value can hold other values inside it, like `address` carrying its own `city` and `zip`. This is called **nested** data, and it's exactly what makes JSON so different from CSV.

## Why JSON and CSV Don't Line Up Naturally

CSV only understands rows and columns, flat, a single level deep. There's no concept of "a value inside a value" the way JSON has it. One CSV row for the customer record above would look like this:

```
name,email,address_city,address_zip,hobbies
John Carter,john@example.com,Austin,73301,"reading; cycling"
```

Two things happen here. First, `address.city` and `address.zip`, previously nested inside `address`, each become their own column with a combined name (`address_city`, `address_zip`). This process is called **flattening**.

Second, `hobbies`, previously a list (array) of two values, gets joined into a single piece of text separated by semicolons. CSV has no way to store "several values in one cell" other than combining them into text like this.

## When You'd Need This Conversion

**API data needs analysis in Excel.** Developers read JSON easily straight from code, but non-technical teams (sales, marketing, finance) typically work in spreadsheets. Converting to CSV bridges the two needs.

**Exporting from a JSON-based app to another system.** Some apps, especially modern web-based ones, only offer exports in JSON, while your target system only accepts CSV.

**Config or log data needs a quick scan.** JSON-formatted log or config files are sometimes easier to scan as a table than to read line by line in their raw form.

## How to Convert JSON to CSV

[JSON to CSV](/office-tools/data/json-to-csv) handles the flattening process above automatically, you don't need to work out the nested structure yourself:

1. **Upload or paste your JSON data.**
2. **The tool flattens the structure automatically.** Nested objects split into separate columns with combined names, arrays get joined into text within a single cell.
3. **Check the result as a table.** A preview shows up before you download, so you can confirm the columns match what you expected.
4. **Download as a CSV file.** Ready to open in Excel or import into another system.

## Limits Worth Knowing

**Deeply nested data produces long column names.** If your JSON structure nests several levels deep (an object inside an object inside an object), the flattened column names can get long, something like `customer_data_address_city`. That's normal, a direct consequence of flattening a structure that was genuinely complex to begin with.

**Arrays holding multiple objects need special handling.** If one field holds a list of objects (not a simple list of text values), say an order history per customer, the flattened result can come out messier than an array of plain text. In that case, it's often better to split that data into its own CSV, one row per item in the array.

## About Privacy

The JSON data you convert never gets sent to any server. The entire flattening and conversion process runs in your own browser.
