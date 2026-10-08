type MinimalNode = string | [string, Record<string, unknown>, ...MinimalNode[]];

function extractText(node: MinimalNode): string {
  if (typeof node === "string") return `${node} `;
  const children = node.slice(2) as MinimalNode[];
  return children.map(extractText).join("");
}

export function getReadingMinutes(
  body: unknown,
  wordsPerMinute = 200,
): number | null {
  const nodes = (body as { value?: MinimalNode[] } | undefined)?.value;
  if (!Array.isArray(nodes)) return null;

  const text = nodes.map(extractText).join(" ");
  const wordCount = text.trim().split(/\s+/).filter(Boolean).length;
  if (!wordCount) return null;

  return Math.max(1, Math.round(wordCount / wordsPerMinute));
}
