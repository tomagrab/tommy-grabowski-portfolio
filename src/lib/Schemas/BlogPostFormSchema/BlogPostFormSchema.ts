import { z } from 'zod';

export const BlogPostFormSchema = z.object({
  title: z
    .string()
    .min(3, {
      message: 'Title must be at least 3 characters long',
    })
    .max(50, {
      message: 'Title must be at most 50 characters long',
    }),
  content: z
    .string()
    .min(10, {
      message: 'Content must be at least 10 characters long',
    })
    .max(10000, {
      message: 'Content must be at most 1000 characters long',
    }),
  categories: z.union([
    z.string().transform(val => val.split(',').map(item => item.trim())),
    z.string(),
  ]),
  tags: z.union([
    z.string().transform(val => val.split(',').map(item => item.trim())),
    z.string(),
  ]),

  author: z.string().min(3).max(100),
});
