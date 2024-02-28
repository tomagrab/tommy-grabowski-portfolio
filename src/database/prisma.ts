import { BlogPostFormSchema } from '@/lib/Schemas/BlogPostFormSchema/BlogPostFormSchema';
import { currentUser } from '@clerk/nextjs';
import { Category, PrismaClient } from '@prisma/client';
import { z } from 'zod';

/*
 * Prisma Client is auto-generated based on your Prisma schema.
 * Prisma Client is a query builder that makes it easy to access your database in a type-safe way.
 * Prisma Client is used to access your database in your application code.
 * Prisma Client is used to perform CRUD operations on your database.
 * Prisma Client is used to perform migrations on your database.
 */

// Instantiate Prisma Client
export const prisma = new PrismaClient();

// Define a main function to run your Prisma Client queries
async function main() {
  // ... you will write your Prisma Client queries here
}

// Run the `main` function and exit
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async e => {
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

/*
 * Blog Post CRUD
 */

// Create a new blog post
export const createBlogPost = async (
  values: z.infer<typeof BlogPostFormSchema>,
) => {
  const user = await currentUser();

  if (!user) {
    throw new Error('You must be logged in to create a post');
  }

  const userId = user?.id;

  try {
    const newPost = await prisma.blogPost.create({
      data: {
        userId,
        title: values.title,
        content: values.content,
        author: values.author,
        categories: {
          connectOrCreate: values.categories.map(category => ({
            where: { name: category },
            create: { name: category },
          })),
        },
        tags: {
          connectOrCreate: values.tags.map(tag => ({
            where: { name: tag },
            create: { name: tag },
          })),
        },
      },
    });

    return newPost;
  } catch (error) {
    console.error(error);
  }
};

// Get all blog posts
export const getAllBlogPosts = async () => {
  try {
    const posts = await prisma.blogPost.findMany({
      orderBy: { createdAt: 'desc' },
      include: {
        categories: true,
        tags: true,
      },
    });

    return posts;
  } catch (error) {
    console.error(error);
  }
};

// Get a single blog post
export const getBlogPost = async (id: number) => {
  try {
    const post = await prisma.blogPost.findUnique({
      where: { id },
      include: {
        categories: true,
        tags: true,
      },
    });

    if (!post) return null;

    return post;
  } catch (error) {
    console.error(error);
  }
};

// Update a blog post
export const updateBlogPost = async (
  id: number,
  data: z.infer<typeof BlogPostFormSchema>,
) => {
  try {
    // First, fetch the current state of categories and tags for the post
    const currentPost = await prisma.blogPost.findUnique({
      where: { id },
      include: {
        categories: true,
        tags: true,
      },
    });

    if (!currentPost) {
      throw new Error('Post not found');
    }

    // Map to just names for easier comparison
    const currentCategories = currentPost.categories.map(c => c.name);
    const currentTags = currentPost.tags.map(t => t.name);

    // Determine which categories/tags to disconnect
    const categoriesToDisconnect = currentCategories
      .filter(c => !data.categories.includes(c))
      .map(name => ({ name }));
    const tagsToDisconnect = currentTags
      .filter(t => !data.tags.includes(t))
      .map(name => ({ name }));

    // Now, update the post with connectOrCreate for new or existing categories/tags,
    // and disconnect for those that are no longer associated
    const updatedPost = await prisma.blogPost.update({
      where: { id },
      data: {
        title: data.title,
        content: data.content,
        updatedAt: new Date(),
        categories: {
          connectOrCreate: data.categories.map(category => ({
            where: { name: category },
            create: { name: category },
          })),
          disconnect: categoriesToDisconnect,
        },
        tags: {
          connectOrCreate: data.tags.map(tag => ({
            where: { name: tag },
            create: { name: tag },
          })),
          disconnect: tagsToDisconnect,
        },
      },
    });

    return updatedPost;
  } catch (error) {
    console.error(error);
    throw error; // It's often a good idea to re-throw the error after logging so that the calling function knows something went wrong.
  }
};

// Delete a blog post
export const deleteBlogPost = async (id: number) => {
  try {
    const deletedPost = await prisma.blogPost.delete({
      where: { id },
    });

    return deletedPost;
  } catch (error) {
    console.error(error);
  }
};

/*
 * Misc. Blog Post operations
 */

// Get recent blog posts
export const getRecentBlogs = async (numberOfBlogs: number) => {
  try {
    const posts = await prisma.blogPost.findMany({
      orderBy: { createdAt: 'desc' },
      take: numberOfBlogs,
      include: {
        categories: true,
        tags: true,
      },
    });

    return posts;
  } catch (error) {
    console.error(error);
  }
};

// Get all blog posts with certain categories
export const getBlogPostsWithCategories = async (categories: Category[]) => {
  try {
    const posts = await prisma.blogPost.findMany({
      where: {
        categories: {
          some: {
            name: {
              in: categories.map(c => c.name),
            },
          },
        },
      },
      include: {
        categories: true,
        tags: true,
      },
    });

    return posts;
  } catch (error) {
    console.error(error);
  }
};

// Get all blog posts with certain tags
export const getBlogPostsWithTags = async (tags: string[]) => {
  try {
    const posts = await prisma.blogPost.findMany({
      where: {
        tags: {
          some: {
            name: {
              in: tags,
            },
          },
        },
      },
      include: {
        categories: true,
        tags: true,
      },
    });

    return posts;
  } catch (error) {
    console.error(error);
  }
};

// Get all blog posts with certain categories and tags
export const getBlogPostsWithCategoriesAndTags = async (
  categories: string[],
  tags: string[],
) => {
  try {
    const posts = await prisma.blogPost.findMany({
      where: {
        categories: {
          some: {
            name: {
              in: categories,
            },
          },
        },
        tags: {
          some: {
            name: {
              in: tags,
            },
          },
        },
      },
      include: {
        categories: true,
        tags: true,
      },
    });

    return posts;
  } catch (error) {
    console.error(error);
  }
};

/*
 * Blog categories CRUD
 */

// Create a new category
export const createCategory = async (name: string) => {
  try {
    const newCategory = await prisma.category.create({
      data: {
        name,
      },
    });

    return newCategory;
  } catch (error) {
    console.error(error);
  }
};

// Get all categories
export const getAllCategories = async () => {
  try {
    const categories = await prisma.category.findMany();

    return categories;
  } catch (error) {
    console.error(error);
  }
};

// Get a single category
export const getCategory = async (id: number) => {
  try {
    const category = await prisma.category.findUnique({
      where: { id },
    });

    if (!category) return null;

    return category;
  } catch (error) {
    console.error(error);
  }
};

// Update a category
export const updateCategory = async (id: number, name: string) => {
  try {
    const updatedCategory = await prisma.category.update({
      where: { id },
      data: {
        name,
      },
    });

    return updatedCategory;
  } catch (error) {
    console.error(error);
  }
};

// Delete a category
export const deleteCategory = async (id: number) => {
  try {
    const deletedCategory = await prisma.category.delete({
      where: { id },
    });

    return deletedCategory;
  } catch (error) {
    console.error(error);
  }
};

/*
 * Blog tags CRUD
 */

// Create a new tag
export const createTag = async (name: string) => {
  try {
    const newTag = await prisma.tag.create({
      data: {
        name,
      },
    });

    return newTag;
  } catch (error) {
    console.error(error);
  }
};

// Get all tags
export const getAllTags = async () => {
  try {
    const tags = await prisma.tag.findMany();

    return tags;
  } catch (error) {
    console.error(error);
  }
};

// Get a single tag
export const getTag = async (id: number) => {
  try {
    const tag = await prisma.tag.findUnique({
      where: { id },
    });

    if (!tag) return null;

    return tag;
  } catch (error) {
    console.error(error);
  }
};

// Update a tag
export const updateTag = async (id: number, name: string) => {
  try {
    const updatedTag = await prisma.tag.update({
      where: { id },
      data: {
        name,
      },
    });

    return updatedTag;
  } catch (error) {
    console.error(error);
  }
};

/*
 * To do CRUD
 */

// Create a new to do
export const createTodo = async (title: string, content: string) => {
  const user = await currentUser();

  if (!user) {
    throw new Error('You must be logged in to create a to do');
  }

  const userId = user?.id;
  const userFullName = user?.firstName + ' ' + user?.lastName;
  const userEmail = user?.emailAddresses[0].emailAddress;

  try {
    const newTodo = await prisma.todo.create({
      data: {
        userId,
        title,
        content,
        author: userFullName || userEmail,
      },
    });

    return newTodo;
  } catch (error) {
    console.error(error);
  }
};

// Get all to dos
export const getAllTodos = async () => {
  try {
    const toDos = await prisma.todo.findMany({
      orderBy: { createdAt: 'desc' },
    });

    return toDos;
  } catch (error) {
    console.error(error);
  }
};

// Get a single to do
export const getTodo = async (id: number) => {
  try {
    const toDo = await prisma.todo.findUnique({
      where: { id },
    });

    if (!toDo) return null;

    return toDo;
  } catch (error) {
    console.error(error);
  }
};

// Update a to do
export const updateTodo = async (
  id: number,
  title: string,
  content: string,
) => {
  try {
    const updatedTodo = await prisma.todo.update({
      where: { id },
      data: {
        title,
        content,
        updatedAt: new Date(),
      },
    });

    return updatedTodo;
  } catch (error) {
    console.error(error);
  }
};

// Delete a to do
export const deleteTodo = async (id: number) => {
  try {
    const deletedTodo = await prisma.todo.delete({
      where: { id },
    });

    return deletedTodo;
  } catch (error) {
    console.error(error);
  }
};
