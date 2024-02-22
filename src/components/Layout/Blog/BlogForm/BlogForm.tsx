'use client';
import '@/components/Layout/Blog/BlogForm/BlogForm.scss';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { useUser } from '@clerk/nextjs';
import { CreatePost, UpdatePost } from '@/api/actions/BlogActions/BlogActions';
import { BlogPostFormSchema } from '@/lib/Schemas/BlogPostFormSchema/BlogPostFormSchema';
import { BlogPost } from '@prisma/client';
import { Dispatch, SetStateAction } from 'react';

type BlogFormProps = {
  post?: BlogPost;
  editMode?: boolean;
  setEditMode?: Dispatch<SetStateAction<boolean>>;
};

export default function BlogForm({
  post,
  editMode,
  setEditMode,
}: BlogFormProps) {
  const user = useUser().user;
  const form = useForm<z.infer<typeof BlogPostFormSchema>>({
    resolver: zodResolver(BlogPostFormSchema),
    defaultValues: {
      title: post?.title || '',
      content: post?.content || '',
      author:
        post?.author ||
        user?.fullName ||
        user?.username ||
        user?.emailAddresses[0]?.emailAddress ||
        '',
    },
  });

  let onSubmit;

  if (post) {
    onSubmit = async (data: z.infer<typeof BlogPostFormSchema>) => {
      try {
        await UpdatePost(post.id, data);

        if (editMode && setEditMode) {
          setEditMode(false);
        }
      } catch (error) {
        console.error(error);
      }
    };
  } else {
    onSubmit = async (data: z.infer<typeof BlogPostFormSchema>) => {
      try {
        await CreatePost(data);
      } catch (error) {
        console.error(error);
      }
    };
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex w-full flex-col gap-4 rounded-lg bg-white p-4 shadow-md"
      >
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input placeholder="Title" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Content</FormLabel>
              <FormControl>
                <Textarea placeholder="Content" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="author"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Author</FormLabel>
              <FormControl>
                <Input placeholder="Author" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="self-center">
          <Button type="submit">{post ? 'Update Post' : 'Create Post'}</Button>
        </div>
      </form>
    </Form>
  );
}
