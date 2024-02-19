import { PrismaClient } from "@prisma/client";

/*
 * Prisma Client is auto-generated based on your Prisma schema.
 * Prisma Client is a query builder that makes it easy to access your database in a type-safe way.
 * Prisma Client is used to access your database in your application code.
 * Prisma Client is used to perform CRUD operations on your database.
 * Prisma Client is used to perform migrations on your database.
 */

// Instantiate Prisma Client
const prisma = new PrismaClient();

// Define a main function to run your Prisma Client queries
async function main() {
  // ... you will write your Prisma Client queries here
}

// Run the `main` function and exit
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });

/*
 * CRUD Operations
 * Create: Create a new record in your database
 * Read: Read a record from your database
 * Update: Update a record in your database
 * Delete: Delete a record from your database
 */

// Create a new blog post
export const createBlogPost = async (
  title: string,
  content: string,
  author: string
) => {
  const newPost = await prisma.blogPost.create({
    data: {
      title,
      content,
      author,
    },
  });

  return newPost;
};

// Get all blog posts
export const getAllBlogPosts = async () => {
  const posts = await prisma.blogPost.findMany();
  return posts;
};

// Get a single blog post
export const getBlogPost = async (id: number) => {
  const post = await prisma.blogPost.findUnique({
    where: { id },
  });
  return post;
};

// Update a blog post
export const updateBlogPost = async (
  id: number,
  title: string,
  content: string
) => {
  const updatedPost = await prisma.blogPost.update({
    where: { id },
    data: {
      title,
      content,
    },
  });

  return updatedPost;
};

// Delete a blog post
export const deleteBlogPost = async (id: number) => {
  const deletedPost = await prisma.blogPost.delete({
    where: { id },
  });

  return deletedPost;
};
