'use client';

import '@/components/Layout/Blog/BlogDisplay/BlogDisplay.scss';
import BlogForm from '@/components/Layout/Blog/BlogForm/BlogForm';
import BlogHeader from '@/components/Layout/Blog/BlogDisplay/BlogHeader/BlogHeader';
import BlogContent from '@/components/Layout/Blog/BlogDisplay/BlogContent/BlogContent';
import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import type { UserResource } from '@clerk/types/dist/user';
import { BlogPostWithCategoriesAndTagsType } from '@/lib/Types/BlogPostWithCategoriesAndTagsType/BlogPostWithCategoriesAndTagsType';

type BlogDisplayProps = {
  user: UserResource | null | undefined;
  isAdministrator: boolean;
  isWriter: boolean;
  post: BlogPostWithCategoriesAndTagsType;
  isEditMode?: boolean;
};

export default function BlogDisplay({
  user,
  isAdministrator,
  post,
  isEditMode,
}: BlogDisplayProps) {
  const [editMode, setEditMode] = useState<boolean>(isEditMode || false);
  const userId = user?.id;
  const postUserId = post?.userId;
  const isPostAuthor = userId === postUserId;
  const blogUrl = window.location.origin + usePathname();

  useEffect(() => {
    if (!isAdministrator || !isPostAuthor) {
      setEditMode(false);
    }
  }, [isAdministrator, isPostAuthor, userId, postUserId]);

  return (
    <main>
      <article className="blog_post">
        <BlogHeader
          user={user}
          isAdministrator={isAdministrator}
          isPostAuthor={isPostAuthor}
          post={post}
          blogUrl={blogUrl}
          editMode={editMode}
          setEditMode={setEditMode}
        />

        {editMode ? (
          <BlogForm post={post} editMode={editMode} setEditMode={setEditMode} />
        ) : (
          <BlogContent post={post} />
        )}
      </article>
    </main>
  );
}
