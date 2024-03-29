import '@/app/Blog/[id]/Blog.scss';
import BlogDisplay from '@/components/Layout/Blog/BlogDisplay/BlogDisplay';
import { getBlogPost, increaseBlogPostViews } from '@/database/prisma';
import { currentUser } from '@clerk/nextjs';
import { auth } from '@clerk/nextjs/server';
import type { BlogPost } from '@prisma/client';
import { notFound } from 'next/navigation';

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
  const { has } = auth();
  const isAdministrator = has({ role: 'org:admin' });
  const isWriter = has({ role: 'org:writer' });

  // If the post does not exist, return a 404 page
  if (!post) {
    return notFound();
  }

  setTimeout(() => {
    increaseBlogPostViews(Number(params.id));
  }, 5000);

  if (searchParams?.editMode === 'true' && user) {
    return (
      <BlogDisplay
        user={JSON.parse(JSON.stringify(user))}
        isAdministrator={isAdministrator}
        isWriter={isWriter}
        post={post}
        isEditMode
      />
    );
  }

  return (
    <BlogDisplay
      user={JSON.parse(JSON.stringify(user))}
      isAdministrator={isAdministrator}
      isWriter={isWriter}
      post={post}
    />
  );
}
