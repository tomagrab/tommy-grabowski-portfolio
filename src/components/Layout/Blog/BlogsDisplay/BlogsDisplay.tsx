import '@/components/Layout/Blog/BlogsDisplay/BlogsDisplay.scss';
import { BlogPost } from '@prisma/client';
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

type BlogsDisplayProps = {
  user?: User | null;
  isAdministrator?: boolean;
  posts?: BlogPost[];
};

export default function BlogsDisplay({
  user,
  isAdministrator,
  posts,
}: BlogsDisplayProps) {
  const contentPreview = (content: string) => {
    return `${ConvertMarkdownToHTML(content.slice(0, 100))}...`;
  };

  return (
    <>
      {posts && posts.length > 0 ? (
        <Accordion type="multiple" className="flex flex-col gap-4 bg-white">
          {posts.map((post, index) => (
            <AccordionItem
              className="blogs_post rounded-lg border p-4"
              key={post.id}
              value={`index-${index}`}
            >
              <AccordionTrigger className="blogs_post--header">
                <div className="flex flex-col items-start gap-2">
                  <div className="flex flex-col items-baseline gap-2">
                    <h4 className="blogs_post--header__title">{post.title}</h4>
                    <small>
                      Written by {post.author} on {FormatDate(post.createdAt)}
                    </small>
                  </div>
                  <BlogActionButtons
                    user={JSON.parse(JSON.stringify(user))}
                    isAdministrator={isAdministrator}
                    post={post}
                  />
                </div>
              </AccordionTrigger>
              <AccordionContent className="blogs_post--content flex flex-col gap-4">
                <div
                  className="blogs_post--content__body"
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
