import { defineCollection, defineContentConfig, z } from "@nuxt/content";
import { defaultLocale, locales } from "./locales.config";

const schema = z.object({
  title: z.string(),
  description: z.string(),
  publishedAt: z.string(),
  relatedToolPath: z.string().optional(),
  translationKey: z.string(),
  coverImage: z.string().optional(),
});

function prefixFor(code: string) {
  return code === defaultLocale ? "/blog" : `/${code}/blog`;
}

export default defineContentConfig({
  collections: Object.fromEntries(
    locales.map((l) => [
      `blog_${l.code}`,
      defineCollection({
        type: "page",
        source: {
          include: `${l.code}/blog/**/*.md`,
          prefix: prefixFor(l.code),
        },
        schema,
      }),
    ]),
  ),
});
