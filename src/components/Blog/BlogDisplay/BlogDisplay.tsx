"use client";

import "@/components/Blog/BlogDisplay/BlogDisplay.scss";
import { Badge } from "@/components/ui/badge";
import type { UserResource } from "@clerk/types/dist/user";
import { BlogPost } from "@prisma/client";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import BlogForm from "@/components/Blog/BlogForm/BlogForm";
import { ConvertMarkdownToHTML } from "@/lib/Utilities/ConvertMarkdownToHTML/ConvertMarkdownToHTML";

type BlogDisplayProps = {
  user: UserResource | null | undefined;
  isAdministrator: boolean;
  post: BlogPost;
  isEditMode?: boolean;
};

type BlogPostHeaderProps = {
  user: UserResource | null | undefined;
  isAdministrator: boolean;
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

  useEffect(() => {
    if (!isAdministrator) {
      setEditMode(false);
    }
  }, [isAdministrator]);

  return (
    <main>
      <div className="blog_post">
        <BlogPostHeader
          user={user}
          isAdministrator={isAdministrator}
          post={post}
          editMode={editMode}
          setEditMode={setEditMode}
        />

        {editMode ? (
          <BlogForm post={post} editMode={editMode} setEditMode={setEditMode} />
        ) : (
          <BlogPostContent post={post} />
        )}
      </div>
    </main>
  );
}

const BlogPostHeader = ({
  user,
  isAdministrator,
  post,
  editMode,
  setEditMode,
}: BlogPostHeaderProps) => {
  if (!user || !isAdministrator) {
    return (
      <div className="blog_post--header">
        <h2 className="blog_post--header__title">{post?.title}</h2>
      </div>
    );
  }

  return (
    <div className="blog_post--header flex items-center justify-between">
      <h2 className="blog_post--header__title">{post?.title}</h2>
      {user && isAdministrator && (
        <Badge
          className={`cursor-pointer ${
            editMode
              ? "bg-crayola-red hover:bg-crayola-red-light"
              : "bg-blue-500 hover:bg-blue-400"
          }  `}
          onClick={() => setEditMode(!editMode)}
        >
          {editMode ? "Cancel" : "Edit"}
        </Badge>
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
