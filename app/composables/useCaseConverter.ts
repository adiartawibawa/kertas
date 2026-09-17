export type CaseType =
  | "upper"
  | "lower"
  | "title"
  | "sentence"
  | "camel"
  | "pascal"
  | "snake"
  | "kebab";

export interface CaseOption {
  value: CaseType;
  label: string;
}

export const caseOptions: CaseOption[] = [
  { value: "upper", label: "UPPERCASE" },
  { value: "lower", label: "lowercase" },
  { value: "title", label: "Title Case" },
  { value: "sentence", label: "Sentence case" },
  { value: "camel", label: "camelCase" },
  { value: "pascal", label: "PascalCase" },
  { value: "snake", label: "snake_case" },
  { value: "kebab", label: "kebab-case" },
];

function toWords(text: string): string[] {
  return text
    .replace(/([a-z0-9])([A-Z])/g, "$1 $2")
    .replace(/[_-]+/g, " ")
    .trim()
    .split(/\s+/)
    .filter(Boolean);
}

/**
 * Mengonversi teks ke salah satu dari 8 format kapitalisasi. `activeCase`
 * bersifat reaktif — ganti nilainya untuk langsung melihat hasil berbeda
 * tanpa perlu menekan tombol apapun.
 */
export function useCaseConverter(text: Ref<string>) {
  const activeCase = ref<CaseType>("upper");

  const converted = computed(() => {
    const raw = text.value;
    const words = toWords(raw);

    switch (activeCase.value) {
      case "upper":
        return raw.toUpperCase();
      case "lower":
        return raw.toLowerCase();
      case "title":
        return words
          .map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
          .join(" ");
      case "sentence":
        return raw
          .toLowerCase()
          .replace(/(^\s*\w|[.!?]\s*\w)/g, (m) => m.toUpperCase());
      case "camel":
        return words
          .map((w, i) =>
            i === 0
              ? w.toLowerCase()
              : w.charAt(0).toUpperCase() + w.slice(1).toLowerCase(),
          )
          .join("");
      case "pascal":
        return words
          .map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
          .join("");
      case "snake":
        return words.map((w) => w.toLowerCase()).join("_");
      case "kebab":
        return words.map((w) => w.toLowerCase()).join("-");
      default:
        return raw;
    }
  });

  return { activeCase, converted };
}
