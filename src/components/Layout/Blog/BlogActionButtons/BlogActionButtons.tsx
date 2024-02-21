'use client';

import '@/components/Layout/Blog/BlogActionButtons/BlogActionButtons.scss';
import { Badge } from '@/components/ui/badge';
import { BlogPost } from '@prisma/client';
import Link from 'next/link';
import type { UserResource } from '@clerk/types/dist/user';
import { DeletePost } from '@/api/actions/BlogActions';

type BlogActionButtonsProps = {
  user?: UserResource;
  isAdministrator?: boolean;
  post: BlogPost;
};

export default function BlogActionButtons({
  user,
  isAdministrator,
  post,
}: BlogActionButtonsProps) {
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
    <div className={`${user && isAdministrator ? 'flex gap-2' : ''}`}>
      <Link href={`/Blog/${post.id}`}>
        <Badge className="bg-green-500 hover:bg-green-400">View</Badge>
      </Link>
      {user && isAdministrator ? (
        <>
          <Link href={`/Blog/${post.id}?editMode=true`}>
            <Badge className="bg-blue-500 hover:bg-blue-400">Edit</Badge>
          </Link>

          <div>
            <Badge onClick={onSubmit} className="bg-red-500 hover:bg-red-400">
              Delete
            </Badge>
          </div>
        </>
      ) : null}
    </div>
  );
}
