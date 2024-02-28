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
  categories: z
    .string()
    .min(3, { message: 'Categories must be at least 3 characters long' })
    .max(100, { message: 'Categories must be at most 100 characters long' })
    .transform(value => value.split(',').map(item => item.trim())),
  tags: z
    .string()
    .min(3, { message: 'Tags must be at least 3 characters long' })
    .max(100, { message: 'Tags must be at most 100 characters long' })
    .transform(value => value.split(',').map(item => item.trim())),

  author: z.string().min(3).max(100),
});
