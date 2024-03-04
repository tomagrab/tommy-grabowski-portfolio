'use client';

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
import { FormatDate } from '@/lib/Utilities/FormatDate/FormatDate';

type BlogsDisplayProps = {
  posts: BlogPostWithCategoriesAndTagsType[];
};

export default function BlogsDisplay({ posts }: BlogsDisplayProps) {
  return (
    <Tabs
      defaultValue={String(posts[0].id)}
      className="flex flex-col gap-2 md:grid md:auto-cols-[min-content,1fr] md:grid-flow-col md:gap-2"
    >
      <TabsList className="h-full bg-white">
        <Command>
          <CommandInput placeholder="Search posts" />
          <CommandList className="flex flex-col">
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup className="flex flex-col">
              {posts.map(post => (
                <CommandItem key={post.id}>
                  <TabsTrigger value={String(post.id)}>
                    {post.title}
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
            <CardHeader>
              <CardTitle>{post.title}</CardTitle>
              <CardDescription>
                <small>
                  Written by <strong>{post.author}</strong> on{' '}
                  {FormatDate(post.createdAt)}
                </small>
                <br />
                {post.categories.map(category => category.name).join(', ')}
                <br />
                {/*
                 * Put hashtags in front of each tag name and join them with a comma
                 */}
                {post.tags.map(tag => `#${tag.name}`).join(', ')}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div
                className="markdown"
                dangerouslySetInnerHTML={{
                  __html: ConvertMarkdownToHTML(post.content),
                }}
              />
            </CardContent>
            <CardFooter>
              <Button>Read more</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      ))}
    </Tabs>
  );
}
