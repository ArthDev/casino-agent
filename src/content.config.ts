import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const casinos = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/casinos' }),
  schema: z.object({
    name: z.string(),
    slug: z.string(),
    rating: z.number().min(0).max(5),
    bonus: z.string(),
    description: z.string(),
    affiliateUrl: z.string().url(),
    logo: z.string().optional(),
    pros: z.array(z.string()),
    cons: z.array(z.string()),
    publishedAt: z.coerce.date(),
    updatedAt: z.coerce.date().optional(),
  }),
});

const guides = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/guides' }),
  schema: z.object({
    title: z.string(),
    slug: z.string(),
    description: z.string(),
    category: z.string(),
    publishedAt: z.coerce.date(),
    updatedAt: z.coerce.date().optional(),
  }),
});

export const collections = { casinos, guides };
