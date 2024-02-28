import { Prisma } from '@prisma/client';

export type BlogPostWithCategoriesAndTagsType = Prisma.BlogPostGetPayload<{
  include: {
    categories: true;
    tags: true;
  };
}>;
