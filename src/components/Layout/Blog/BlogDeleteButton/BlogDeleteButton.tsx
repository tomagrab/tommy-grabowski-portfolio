'use client';

import { DeletePost } from '@/api/actions/BlogActions/BlogActions';
import '@/components/Layout/Blog/BlogDeleteButton/BlogDeleteButton.scss';
import { Badge } from '@/components/ui/badge';
import { BlogPost } from '@prisma/client';

type BlogDeleteButtonProps = {
  post: BlogPost;
};

export default function BlogDeleteButton({ post }: BlogDeleteButtonProps) {
  const deletePost = async () => {
    const confirmDelete = confirm('Are you sure you want to delete this post?');
    if (!confirmDelete) return;

    try {
      await DeletePost(post.id);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Badge
      onClick={deletePost}
      className="cursor-pointer bg-red-500 hover:bg-red-400"
    >
      Delete
    </Badge>
  );
}
