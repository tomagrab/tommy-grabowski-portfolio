import "@/app/Blog/[id]/Blog.scss";
import { getBlogPost } from "@/database/prisma";
import { currentUser } from "@clerk/nextjs";
import type { BlogPost } from "@prisma/client";

type BlogPostProps = {
  params: {
    id: string;
  };

  searchParams?: {
    editMode: string;
  };
};

export default async function BlogPost({
  params,
  searchParams,
}: BlogPostProps) {
  const post = await getBlogPost(Number(params.id));

  if (!post) {
    return (
      <main>
        <h2>HOLY SHIT!</h2>
        <h3>Post not found</h3>
      </main>
    );
  }

  return (
    <main>
      <div className="blog_post">
        <div className="blog_post--header">
          <h2 className="blog_post--header__title">{post?.title}</h2>
        </div>
        <div className="blog_post--content">
          <div
            className="blog_post--content__body"
            dangerouslySetInnerHTML={{ __html: post?.content }}
          />
        </div>
      </div>
    </main>
  );
}

const BlogPostHeader = async (post: BlogPost) => {
  const user = await currentUser();

  if (!user) {
    return (
      <div className="blog_post--header">
        <h2 className="blog_post--header__title">{post?.title}</h2>
      </div>
    );
  }

  return (
    <div className="blog_post--header">
      <h2 className="blog_post--header__title">{post?.title}</h2>
    </div>
  );
};
