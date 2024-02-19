"use server";

import { NewBlogPostFormSchema } from "@/components/Blog/NewBlog/NewBlogForm/NewBlogForm";
import { createBlogPost } from "@/database/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import * as z from "zod";

export async function CreatePost(
  values: z.infer<typeof NewBlogPostFormSchema>
) {
  const newPost = await createBlogPost(
    values.title,
    values.content,
    values.author
  );

  if (!newPost) {
    throw new Error("Failed to create post");
  }

  const postId = newPost.id.toString();
  console.log(typeof postId);

  if (!postId) {
    throw new Error("Failed to create post");
  }

  revalidatePath(`/Blog/${postId}`);
  redirect(`/Blog/${postId}`);
}
