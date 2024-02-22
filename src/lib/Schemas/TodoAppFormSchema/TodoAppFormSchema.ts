import { z } from 'zod';

export const TodoAppFormSchema = z.object({
  title: z
    .string()
    .min(3, {
      message: 'Title must be at least 3 characters long',
    })
    .max(20, {
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
});
