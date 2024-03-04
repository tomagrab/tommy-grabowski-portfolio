'use client';

import '@/components/Layout/Blog/BlogActionButtons/BlogActionButtons.scss';
import BlogDeleteButton from '@/components/Layout/Blog/BlogDeleteButton/BlogDeleteButton';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import type { UserResource } from '@clerk/types/dist/user';
import { BlogPostWithCategoriesAndTagsType } from '@/lib/Types/BlogPostWithCategoriesAndTagsType/BlogPostWithCategoriesAndTagsType';

type BlogActionButtonsProps = {
  user: UserResource | null | undefined;
  isAdministrator: boolean;
  post: BlogPostWithCategoriesAndTagsType;
};

export default function BlogActionButtons({
  user,
  isAdministrator,
  post,
}: BlogActionButtonsProps) {
  const isPostAuthor = user?.id === post.userId;
  const isAdministratorOrAuthor = isAdministrator || isPostAuthor;
  return (
    <div className={`${user && isAdministratorOrAuthor ? 'flex gap-2' : ''}`}>
      {user && isAdministratorOrAuthor ? (
        <>
          <Link href={`/Blog/${post.id}?editMode=true`}>
            <Badge className="bg-blue-500 hover:bg-blue-400">Edit</Badge>
          </Link>

          <div>
            <BlogDeleteButton post={post} />
          </div>
        </>
      ) : null}
    </div>
  );
}
