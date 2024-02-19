import "@/app/Blog/Blog.scss";
import { Badge } from "@/components/ui/badge";
import { getAllBlogPosts } from "@/database/prisma";
import { currentUser } from "@clerk/nextjs";
import Link from "next/link";

export default async function Blog() {
  const posts = await getAllBlogPosts();
  return (
    <div className="">
      <BlogHeader />
      <div className="blog--container">
        <h3>Blog Posts</h3>
        {posts && posts.length > 0 ? (
          <div className="blog--posts">
            {posts.map((post) => (
              <div key={post.id} className="blog--post">
                <h4>{post.title}</h4>
                <p>{post.content}</p>
                <p>Author: {post.author}</p>
              </div>
            ))}
          </div>
        ) : null}
      </div>
    </div>
  );
}

const BlogHeader = async () => {
  const user = await currentUser();
  const isAdmin =
    user?.emailAddresses[0]?.emailAddress === process.env.ADMIN_EMAIL;

  if (!user || !isAdmin) {
    return (
      <div>
        <h2>Blog</h2>
      </div>
    );
  }

  return (
    <div className="flex justify-between">
      <h2>Blog</h2>
      <Link href="/Blog/NewBlog">
        <Badge>New Post</Badge>
      </Link>
    </div>
  );
};
