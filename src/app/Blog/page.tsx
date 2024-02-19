import "@/app/Blog/Blog.scss";
import { Badge } from "@/components/ui/badge";
import { currentUser } from "@clerk/nextjs";
import Link from "next/link";

export default async function Blog() {
  return (
    <div className="">
      <BlogHeader />
      <div className="blog--container">
        <h3>Blog Posts</h3>
        <p>Coming soon...</p>
      </div>
    </div>
  );
}

const BlogHeader = async () => {
  const user = await currentUser();

  if (!user) {
    return (
      <div>
        <h2>Blog</h2>
      </div>
    );
  }

  return (
    <div className="">
      <h2>Blog</h2>
      <Link href="/Blog/NewBlog">
        <Badge>New Post</Badge>
      </Link>
    </div>
  );
};
