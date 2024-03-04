'use client';

import BlogCategoryAndTags from '@/components/Layout/Blog/BlogCategoryAndTags/BlogCategoryAndTags';
import BlogActionButtons from '@/components/Layout/Blog/BlogActionButtons/BlogActionButtons';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BlogPostWithCategoriesAndTagsType } from '@/lib/Types/BlogPostWithCategoriesAndTagsType/BlogPostWithCategoriesAndTagsType';
import { ConvertMarkdownToHTML } from '@/lib/Utilities/ConvertMarkdownToHTML/ConvertMarkdownToHTML';
import { ExtractFirstTwoHtmlTags } from '@/lib/Utilities/ExtractFirstTwoHtmlTags/ExtractFirstTwoHtmlTags';
import { FormatDate } from '@/lib/Utilities/FormatDate/FormatDate';
import Link from 'next/link';
import { useUser } from '@clerk/nextjs';

type BlogsDisplayProps = {
  posts: BlogPostWithCategoriesAndTagsType[];
  isAdministrator: boolean;
};

export default function BlogsDisplay({
  posts,
  isAdministrator,
}: BlogsDisplayProps) {
  const user = useUser().user;
  return (
    <Tabs
      defaultValue={String(posts[0].id)}
      className="flex flex-col gap-2 md:grid md:auto-cols-[min-content_1fr] md:grid-flow-col md:gap-2"
    >
      <TabsList className="h-full bg-white">
        <Command>
          <CommandInput placeholder="Search posts" />
          <CommandList className="">
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup className="flex flex-col items-center">
              {posts.map(post => (
                <CommandItem key={post.id}>
                  <TabsTrigger value={String(post.id)}>
                    {post.title}
                    <div className="hidden">{post.content}</div>
                    <div className="hidden">
                      {post.categories
                        .map(category => category.name)
                        .join(', ')}
                    </div>
                    <div className="hidden">
                      {post.tags.map(tag => tag.name).join(', ')}
                    </div>
                    <div className="hidden">{post.author}</div>
                    <div className="hidden">{FormatDate(post.createdAt)}</div>
                  </TabsTrigger>
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </TabsList>

      {posts.map(post => (
        <TabsContent key={post.id} value={String(post.id)}>
          <Card>
            <CardHeader className="">
              <CardTitle className="flex items-center justify-between">
                {post.title}
                <BlogActionButtons
                  post={post}
                  user={user}
                  isAdministrator={isAdministrator}
                />
              </CardTitle>
              <CardDescription>
                <small>
                  Written by <strong>{post.author}</strong> on{' '}
                  {FormatDate(post.createdAt)}
                </small>
                <BlogCategoryAndTags
                  categories={post.categories}
                  tags={post.tags}
                />
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div
                className="markdown markdown-preview"
                dangerouslySetInnerHTML={{
                  __html: ExtractFirstTwoHtmlTags(
                    ConvertMarkdownToHTML(post.content),
                  ),
                }}
              />
            </CardContent>
            <CardFooter>
              <Link href={`/Blog/${post.id}`}>
                <Button>Read more</Button>
              </Link>
            </CardFooter>
          </Card>
        </TabsContent>
      ))}
    </Tabs>
  );
}
