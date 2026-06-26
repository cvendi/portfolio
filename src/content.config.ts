// 1. Import utilities from `astro:content`
import { defineCollection } from "astro:content";

// 2. Import loader(s)
import { glob, file } from "astro/loaders";

// 3. Import Zod
import { z } from "astro/zod";
import { DraftingCompass } from "@lucide/astro";
import { siGithub } from "simple-icons";

// 4. Define a `loader` and `schema` for each collection
const projects = defineCollection({
  loader: glob({ base: "./src/content/projects", pattern: "**/*.{md,mdx}" }),
  schema: ({ image }) =>
    z.object({
      name: z.string(),
      img: image(),
      imgAlt: z.string().optional(),
      description: z.string(),
      demo: z.boolean().optional(),
      demo_url: z.string().optional(),
      github: z.string().optional(),
      pubDate: z.coerce.date(),
      updatedDate: z.coerce.date().optional(),
      draft: z.boolean().default(false),
    }),
});

// 5. Export a single `collections` object to register your collection(s)
export const collections = { projects };
