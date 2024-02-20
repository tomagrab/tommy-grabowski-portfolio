import { BlogPost } from "@prisma/client";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { FormatDate } from "@/lib/Utilities/FormatDate/FormatDate";
import { ConvertMarkdownToHTML } from "@/lib/Utilities/ConvertMarkdownToHTML/ConvertMarkdownToHTML";
import BlogActionButtons from "@/components/Blog/BlogActionButtons/BlogActionButtons";
import { User } from "@clerk/backend/dist/types/api/resources/User";
import "@/components/Blog/BlogsDisplay/BlogsDisplay.scss";

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
  return (
    <>
      {posts && posts.length > 0 ? (
        <Accordion type="multiple" className="flex flex-col gap-4 bg-white">
          {posts.map((post, index) => (
            <AccordionItem
              className="blogs_post border rounded-lg p-4"
              key={post.id}
              value={`index-${index}`}
            >
              <AccordionTrigger className="blogs_post--header">
                <div className="flex flex-col items-start gap-2">
                  <h4 className="blogs_post--header__title">{post.title}</h4>
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
                    __html: `${ConvertMarkdownToHTML(post.content).slice(
                      0,
                      100
                    )}...`,
                  }}
                />
                <div className="flex justify-between">
                  <p>Author: {post.author}</p>
                  <p>Published: {FormatDate(post.createdAt)}</p>
                  <p>Updated: {FormatDate(post.updatedAt)}</p>
                </div>
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
