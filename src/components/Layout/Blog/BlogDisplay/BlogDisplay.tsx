'use client';

import '@/components/Layout/Blog/BlogDisplay/BlogDisplay.scss';
import BlogForm from '@/components/Layout/Blog/BlogForm/BlogForm';
import { Badge } from '@/components/ui/badge';
import { ConvertMarkdownToHTML } from '@/lib/Utilities/ConvertMarkdownToHTML/ConvertMarkdownToHTML';
import { FormatDate } from '@/lib/Utilities/FormatDate/FormatDate';
import type { UserResource } from '@clerk/types/dist/user';
import { BlogPost } from '@prisma/client';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import BlogDeleteButton from '../BlogDeleteButton/BlogDeleteButton';

type BlogDisplayProps = {
  user: UserResource | null | undefined;
  isAdministrator: boolean;
  isWriter: boolean;
  post: BlogPost;
  isEditMode?: boolean;
};

type BlogPostHeaderProps = {
  user: UserResource | null | undefined;
  isAdministrator: boolean;
  isPostAuthor: boolean;
  post: BlogPost;
  editMode: boolean;
  setEditMode: Dispatch<SetStateAction<boolean>>;
};

type BlogPostContentProps = {
  post: BlogPost;
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

  useEffect(() => {
    if (!isAdministrator || !isPostAuthor) {
      setEditMode(false);
    }
  }, [isAdministrator, isPostAuthor, userId, postUserId]);

  return (
    <main>
      <article className="blog_post">
        <BlogPostHeader
          user={user}
          isAdministrator={isAdministrator}
          isPostAuthor={isPostAuthor}
          post={post}
          editMode={editMode}
          setEditMode={setEditMode}
        />

        {editMode ? (
          <BlogForm post={post} editMode={editMode} setEditMode={setEditMode} />
        ) : (
          <BlogPostContent post={post} />
        )}
      </article>
    </main>
  );
}

const BlogPostHeader = ({
  user,
  isAdministrator,
  isPostAuthor,
  post,
  editMode,
  setEditMode,
}: BlogPostHeaderProps) => {
  const isAdministratorOrPostAuthor = isAdministrator || isPostAuthor;

  if (!user || !isAdministratorOrPostAuthor) {
    return (
      <div className="blog_post--header">
        <div className="flex flex-col pb-4">
          <h2 className="blog_post--header__title">{post?.title}</h2>
          <small>
            Written by <strong>{post.author}</strong> on{' '}
            {FormatDate(post.createdAt)}
          </small>
          <small>Last updated on {FormatDate(post.updatedAt)}</small>
        </div>
      </div>
    );
  }

  return (
    <div className="blog_post--header flex items-center justify-between">
      <div className="flex flex-col pb-4">
        <h2 className="blog_post--header__title">{post?.title}</h2>
        <small>
          Written by <strong>{post.author}</strong> on{' '}
          {FormatDate(post.createdAt)}
        </small>
        <small>Last updated on {FormatDate(post.updatedAt)}</small>
      </div>
      {(user && isAdministrator) || (user && isPostAuthor) ? (
        <div className="flex gap-2">
          <Badge
            className={`cursor-pointer ${
              editMode
                ? 'bg-yellow-500 hover:bg-yellow-400'
                : 'bg-blue-500 hover:bg-blue-400'
            }  `}
            onClick={() => setEditMode(!editMode)}
          >
            {editMode ? 'Cancel' : 'Edit'}
          </Badge>
          <BlogDeleteButton post={post} />
        </div>
      ) : null}
    </div>
  );
};

const BlogPostContent = ({ post }: BlogPostContentProps) => {
  return (
    <div className="blog_post--content">
      <div
        className="blog_post--content__body"
        dangerouslySetInnerHTML={{
          __html: ConvertMarkdownToHTML(post?.content),
        }}
      />
    </div>
  );
};
