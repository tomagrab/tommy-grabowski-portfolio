import BlogsDisplay from '@/components/Layout/Blog/BlogsDisplay/BlogsDisplay';
import { Badge } from '@/components/ui/badge';
import { getBlogPostsByTag, getTag } from '@/database/prisma';
import { currentUser } from '@clerk/nextjs';
import { auth } from '@clerk/nextjs/server';
import { Tag } from '@prisma/client';
import Link from 'next/link';

type TagPostsProps = {
  params: {
    id: string;
  };
};

type TagPostsHeaderProps = {
  tag: Tag;
};

export default async function TagPosts({ params }: TagPostsProps) {
  const posts = await getBlogPostsByTag(Number(params.id));
  const tag = await getTag(Number(params.id));
  const user = await currentUser();
  const { has } = auth();
  const isAdministrator = has({
    role: 'org:admin',
  });

  if (!tag) {
    return notFound();
  }

  return (
    <main>
      <TagPostsHeader tag={tag} />
      <BlogsDisplay
        user={user}
        isAdministrator={isAdministrator}
        posts={posts}
      />
    </main>
  );
}

const TagPostsHeader = async ({ tag }: TagPostsHeaderProps) => {
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
        <h2 className="pb-4 text-lg font-bold">Blog - #{tag.name}</h2>
      </div>
    );
  }

  return (
    <div className="flex justify-between">
      <h2 className="pb-4 text-lg font-bold">Blog - #{tag.name}</h2>
      <Link href="/Blog/NewBlog">
        <Badge>New Post</Badge>
      </Link>
    </div>
  );
};
