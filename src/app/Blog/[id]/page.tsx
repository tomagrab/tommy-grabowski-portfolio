import "@/app/Blog/[id]/Blog.scss";
import BlogDisplay from "@/components/Blog/BlogDisplay/BlogDisplay";
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
  const user = await currentUser();
  const isAdministrator =
    user?.emailAddresses[0]?.emailAddress === process.env.ADMIN_EMAIL;

  if (!post) {
    return (
      <main>
        <h2>HOLY SHIT!</h2>
        <h3>Post not found</h3>
      </main>
    );
  }

  if (searchParams?.editMode === "true" && user) {
    return (
      <BlogDisplay
        user={JSON.parse(JSON.stringify(user))}
        isAdministrator={isAdministrator}
        post={post}
        isEditMode
      />
    );
  }

  return (
    <BlogDisplay
      user={JSON.parse(JSON.stringify(user))}
      isAdministrator={isAdministrator}
      post={post}
    />
  );
}
