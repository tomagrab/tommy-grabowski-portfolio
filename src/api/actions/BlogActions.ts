"use server";

import { BlogPostFormSchema } from "@/lib/Schemas/BlogPostFormSchema/BlogPostFormSchema";
import { createBlogPost, updateBlogPost } from "@/database/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import * as z from "zod";

export async function CreatePost(values: z.infer<typeof BlogPostFormSchema>) {
  const newPost = await createBlogPost(
    values.title,
    values.content,
    values.author
  );

  if (!newPost) {
    throw new Error("Failed to create post");
  }

  const postId = newPost.id.toString();

  if (!postId) {
    throw new Error("Failed to create post");
  }

  revalidatePath(`/Blog/${postId}`);
  redirect(`/Blog/${postId}?editMode=true`);
}

export async function UpdatePost(
  id: number,
  values: z.infer<typeof BlogPostFormSchema>
) {
  const updatedPost = await updateBlogPost(id, values.title, values.content);

  if (!updatedPost) {
    throw new Error("Failed to update post");
  }

  revalidatePath(`/Blog/${id}`);
  redirect(`/Blog/${id}`);
}
