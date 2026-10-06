export function useBlogTranslation() {
  return useState<{
    translationKey: string | null;
    alternates: Record<string, string | null>;
  }>("blog-translation", () => ({ translationKey: null, alternates: {} }));
}
