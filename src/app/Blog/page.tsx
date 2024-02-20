import { deleteBlogPost, getAllBlogPosts } from "@/database/prisma";
import { currentUser } from "@clerk/nextjs";
import Link from "next/link";
import "@/app/Blog/Blogs.scss";
import { Badge } from "@/components/ui/badge";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { FormatDate } from "@/lib/Utilities/FormatDate/FormatDate";
import { ConvertMarkdownToHTML } from "@/lib/Utilities/ConvertMarkdownToHTML/ConvertMarkdownToHTML";
import BlogActionButtons from "@/components/Blog/BlogActionButtons/BlogActionButtons";

export default async function Blog() {
  const posts = await getAllBlogPosts();
  const user = await currentUser();
  const isAdministrator =
    user?.emailAddresses[0]?.emailAddress === process.env.ADMIN_EMAIL;

  return (
    <main>
      <BlogHeader />

      {posts && posts.length > 0 ? (
        <Accordion type="multiple" className="flex flex-col gap-4">
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
                  <p>Updated: {FormatDate(post.updatedAt)} </p>
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      ) : (
        <div className="text-center">No posts yet</div>
      )}
    </main>
  );
}

const BlogHeader = async () => {
  const user = await currentUser();
  const isAdmin =
    user?.emailAddresses[0]?.emailAddress === process.env.ADMIN_EMAIL;

  if (!user || !isAdmin) {
    return (
      <div>
        <h2 className="pb-4">Blog</h2>
      </div>
    );
  }

  return (
    <div className="flex justify-between">
      <h2 className="pb-4">Blog</h2>
      <Link href="/Blog/NewBlog">
        <Badge>New Post</Badge>
      </Link>
    </div>
  );
};
