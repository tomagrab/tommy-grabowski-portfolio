'use client';

import '@/components/Layout/Blog/BlogsDisplay/BlogsDisplay.scss';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { FormatDate } from '@/lib/Utilities/FormatDate/FormatDate';
import { ConvertMarkdownToHTML } from '@/lib/Utilities/ConvertMarkdownToHTML/ConvertMarkdownToHTML';
import BlogActionButtons from '@/components/Layout/Blog/BlogActionButtons/BlogActionButtons';
import { User } from '@clerk/backend/dist/types/api/resources/User';
import { BlogPostWithCategoriesAndTagsType } from '@/lib/Types/BlogPostWithCategoriesAndTagsType/BlogPostWithCategoriesAndTagsType';
import BlogCategoryAndTags from '../BlogCategoryAndTags/BlogCategoryAndTags';
import { useState } from 'react';
import { Input } from '@/components/ui/input';

type BlogsDisplayProps = {
  user?: User | null;
  isAdministrator?: boolean;
  posts?: BlogPostWithCategoriesAndTagsType[];
};

export default function BlogsDisplay({
  user,
  isAdministrator,
  posts,
}: BlogsDisplayProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredPosts, setFilteredPosts] = useState<
    BlogPostWithCategoriesAndTagsType[]
  >([]);
  const contentPreview = (content: string) => {
    const convertedHTML = ConvertMarkdownToHTML(content);
    const match = convertedHTML.match(/<[^>]*>(.{0,200})<[^>]*>/);

    if (match) {
      return match[0] + '...';
    } else {
      return convertedHTML.slice(0, 200) + '...';
    }
  };

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value.toLowerCase();
    setSearchQuery(query);

    const filtered = posts?.filter(post => {
      return (
        post.title.toLowerCase().includes(query) ||
        post.content.toLowerCase().includes(query) ||
        post.categories.some(category =>
          category.name.toLowerCase().includes(query),
        ) ||
        post.tags.some(tag => tag.name.toLowerCase().includes(query)) ||
        post.author.toLowerCase().includes(query) ||
        FormatDate(post.createdAt).toLowerCase().includes(query) ||
        FormatDate(post.updatedAt).toLowerCase().includes(query)
      );
    });

    setFilteredPosts(filtered ?? []);
  };

  const displayPosts = searchQuery ? filteredPosts : posts;

  return (
    <>
      <input
        type="text"
        className="mb-4 w-full rounded-lg border-2 border-gray-300 p-2 outline-none transition-all duration-200 ease-in-out focus:border-gray-500"
        placeholder="Search for a post"
        onInput={handleSearch}
      />

      {displayPosts && displayPosts.length > 0 ? (
        <Accordion type="multiple" className="flex flex-col gap-4 ">
          {displayPosts.map((post, index) => (
            <AccordionItem
              className="blogs_post rounded-lg border bg-white p-4"
              key={post.id}
              value={`index-${index}`}
            >
              <AccordionTrigger className="blogs_post--header">
                <div className="flex flex-col items-start gap-2">
                  <div className="flex flex-col items-baseline gap-2">
                    <h4 className="blogs_post--header__title">{post.title}</h4>
                    <small>
                      Written by <strong>{post.author}</strong> on{' '}
                      {FormatDate(post.createdAt)}
                    </small>
                  </div>
                  <BlogCategoryAndTags
                    categories={post.categories}
                    tags={post.tags}
                  />
                  <BlogActionButtons
                    user={JSON.parse(JSON.stringify(user))}
                    isAdministrator={isAdministrator}
                    post={post}
                  />
                </div>
              </AccordionTrigger>
              <AccordionContent className="blogs_post--content flex flex-col gap-4">
                <div
                  className="markdown select-none"
                  dangerouslySetInnerHTML={{
                    __html: contentPreview(post.content),
                  }}
                />
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      ) : (
        <div className="text-center">No posts yet</div>
      )}
    </>
  );
}
