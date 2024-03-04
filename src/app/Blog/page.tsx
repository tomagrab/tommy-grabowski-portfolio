import { getAllBlogPosts } from '@/database/prisma';
import { currentUser } from '@clerk/nextjs';
import Link from 'next/link';
import '@/app/Blog/Blogs.scss';
import { Badge } from '@/components/ui/badge';

import BlogsDisplay from '@/components/Layout/Blog/BlogsDisplay/BlogsDisplay';
import { auth } from '@clerk/nextjs/server';

type BlogHeaderProps = {
  isAdministratorOrWriter: boolean;
};

export default async function Blog() {
  const posts = await getAllBlogPosts();
  const { has } = auth();
  const isAdministrator = has({
    role: 'org:admin',
  });
  const isWriter = has({
    role: 'org:writer',
  });
  const isAdministratorOrWriter = isAdministrator || isWriter;

  if (!posts) {
    return (
      <main>
        <BlogHeader isAdministratorOrWriter={isAdministratorOrWriter} />
        <p>No posts found</p>
      </main>
    );
  }

  return (
    <main>
      <BlogHeader isAdministratorOrWriter={isAdministratorOrWriter} />
      <BlogsDisplay posts={posts} isAdministrator={isAdministrator} />
    </main>
  );
}

const BlogHeader = async ({ isAdministratorOrWriter }: BlogHeaderProps) => {
  if (!isAdministratorOrWriter) {
    return (
      <div>
        <h2 className="pb-4 text-lg font-bold">Blog</h2>
      </div>
    );
  }

  return (
    <div className="flex justify-between">
      <h2 className="pb-4 text-lg font-bold">Blog</h2>
      <Link href="/Blog/NewBlog">
        <Badge>New Post</Badge>
      </Link>
    </div>
  );
};
