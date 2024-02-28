import { getAllBlogPosts } from '@/database/prisma';
import { currentUser } from '@clerk/nextjs';
import Link from 'next/link';
import '@/app/Blog/Blogs.scss';
import { Badge } from '@/components/ui/badge';

import BlogsDisplay from '@/components/Layout/Blog/BlogsDisplay/BlogsDisplay';
import { auth } from '@clerk/nextjs/server';

export default async function Blog() {
  const posts = await getAllBlogPosts();
  const user = await currentUser();
  const { has } = auth();
  const isAdministrator = has({
    role: 'org:admin',
  });

  return (
    <main>
      <BlogHeader />
      <BlogsDisplay
        user={user}
        isAdministrator={isAdministrator}
        posts={posts}
      />
    </main>
  );
}

const BlogHeader = async () => {
  const user = await currentUser();
  const { has } = auth();
  const isAdmin = has({
    role: 'org:admin',
  });
  const isWriter = has({
    role: 'org:writer',
  });

  const isWriterOrAdmin = isAdmin || isWriter;

  if (!user || !isWriterOrAdmin) {
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
