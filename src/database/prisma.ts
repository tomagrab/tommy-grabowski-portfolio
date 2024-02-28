import { currentUser } from '@clerk/nextjs';
import { PrismaClient } from '@prisma/client';

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
  title: string,
  content: string,
  author: string,
  categories: string[],
  tags: string[],
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
        title,
        content,
        author,
        categories: {
          create: categories.map(category => ({ name: category })),
        },
        tags: {
          create: tags.map(tag => ({ name: tag })),
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
    });

    return posts;
  } catch (error) {
    console.error(error);
  }
};

// Get recent blog posts
export const getRecentBlogs = async (numberOfBlogs: number) => {
  try {
    const posts = await prisma.blogPost.findMany({
      orderBy: { createdAt: 'desc' },
      take: numberOfBlogs,
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
  title: string,
  content: string,
) => {
  try {
    const updatedPost = await prisma.blogPost.update({
      where: { id },
      data: {
        title,
        content,
        updatedAt: new Date(),
      },
    });

    return updatedPost;
  } catch (error) {
    console.error(error);
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
