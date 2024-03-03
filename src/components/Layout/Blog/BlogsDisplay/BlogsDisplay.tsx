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
import type { UserResource } from '@clerk/types/dist/user';
import { BlogPostWithCategoriesAndTagsType } from '@/lib/Types/BlogPostWithCategoriesAndTagsType/BlogPostWithCategoriesAndTagsType';
import BlogCategoryAndTags from '../BlogCategoryAndTags/BlogCategoryAndTags';

type BlogsDisplayProps = {
  user?: UserResource | null;
  isAdministrator?: boolean;
  posts?: BlogPostWithCategoriesAndTagsType[];
};

export default function BlogsDisplay({
  user,
  isAdministrator,
  posts,
}: BlogsDisplayProps) {
  const contentPreview = (content: string) => {
    const convertedHTML = ConvertMarkdownToHTML(content);
    const matches = convertedHTML.match(/<[^>]*>(.{0,20})<[^>]*>/g);

    if (matches) {
      return matches.join(' ') + '...';
    } else {
      return convertedHTML.slice(0, 20) + '...';
    }
  };

  return (
    <>
      {posts && posts.length > 0 ? (
        <Accordion type="multiple" className="flex flex-col gap-4 ">
          {posts.map((post, index) => (
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
                  {user && isAdministrator ? (
                    <BlogActionButtons
                      user={user}
                      isAdministrator={isAdministrator}
                      post={post}
                    />
                  ) : null}
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
