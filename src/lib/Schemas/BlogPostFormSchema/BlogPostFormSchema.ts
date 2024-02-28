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
  categories: z.array(z.string().min(3).max(100)),
  tags: z.array(z.string().min(3).max(100)),
  author: z.string().min(3).max(100),
});
