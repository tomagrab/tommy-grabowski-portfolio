'use client';

import '@/components/Layout/Blog/BlogDisplay/BlogDisplay.scss';
import BlogForm from '@/components/Layout/Blog/BlogForm/BlogForm';
import { Badge } from '@/components/ui/badge';
import { ConvertMarkdownToHTML } from '@/lib/Utilities/ConvertMarkdownToHTML/ConvertMarkdownToHTML';
import { FormatDate } from '@/lib/Utilities/FormatDate/FormatDate';
import { DeletePost } from '@/api/actions/BlogActions/BlogActions';
import type { UserResource } from '@clerk/types/dist/user';
import { BlogPost } from '@prisma/client';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';

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
  isWriter: boolean;
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
  isWriter,
  post,
  isEditMode,
}: BlogDisplayProps) {
  const [editMode, setEditMode] = useState<boolean>(isEditMode || false);

  useEffect(() => {
    if (!isAdministrator) {
      setEditMode(false);
    }
  }, [isAdministrator]);

  return (
    <main>
      <article className="blog_post">
        <BlogPostHeader
          user={user}
          isAdministrator={isAdministrator}
          isWriter={isWriter}
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
  isWriter,
  post,
  editMode,
  setEditMode,
}: BlogPostHeaderProps) => {
  if (!user || !isAdministrator) {
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

  const onSubmit = async () => {
    const confirmDelete = confirm('Are you sure you want to delete this post?');
    if (!confirmDelete) return;

    try {
      await DeletePost(post.id);
    } catch (error) {
      console.error(error);
    }
  };

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
      {user && isAdministrator && (
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
          <Badge
            onClick={onSubmit}
            className="cursor-pointer bg-red-500 hover:bg-red-400"
          >
            Delete
          </Badge>
        </div>
      )}
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
