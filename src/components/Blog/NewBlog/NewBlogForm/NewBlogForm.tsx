"use client";
import "@/components/Blog/NewBlog/NewBlogForm/NewBlogForm.scss";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { useUser } from "@clerk/nextjs";
import { CreatePost } from "@/api/actions/BlogActions";

export const NewBlogPostFormSchema = z.object({
  title: z
    .string()
    .min(3, {
      message: "Title must be at least 3 characters long",
    })
    .max(20, {
      message: "Title must be at most 20 characters long",
    }),
  content: z
    .string()
    .min(10, {
      message: "Content must be at least 10 characters long",
    })
    .max(10000, {
      message: "Content must be at most 1000 characters long",
    }),
  author: z.string().min(3).max(100),
});

export default function NewBlogForm() {
  const user = useUser().user;
  const form = useForm<z.infer<typeof NewBlogPostFormSchema>>({
    resolver: zodResolver(NewBlogPostFormSchema),
    defaultValues: {
      title: "",
      content: "",
      author:
        user?.fullName ||
        user?.username ||
        user?.emailAddresses[0]?.emailAddress ||
        "",
    },
  });

  const onSubmit = async (data: z.infer<typeof NewBlogPostFormSchema>) => {
    try {
      await CreatePost(data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-4 w-full p-4  rounded-lg shadow-md"
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
          <Button type="submit">Create</Button>
        </div>
      </form>
    </Form>
  );
}
