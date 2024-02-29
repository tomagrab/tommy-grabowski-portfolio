import BlogsDisplay from '@/components/Layout/Blog/BlogsDisplay/BlogsDisplay';
import { Badge } from '@/components/ui/badge';
import { getBlogPostsByCategory, getCategory } from '@/database/prisma';
import { currentUser } from '@clerk/nextjs';
import { auth } from '@clerk/nextjs/server';
import { Category } from '@prisma/client';
import Link from 'next/link';
import { notFound } from 'next/navigation';

type CategoryPostsProps = {
  params: {
    id: string;
  };
};

type CategoryPostsHeaderProps = {
  category: Category;
};

export default async function CategoryPosts({ params }: CategoryPostsProps) {
  const posts = await getBlogPostsByCategory(Number(params.id));
  const category = await getCategory(Number(params.id));
  const user = await currentUser();
  const { has } = auth();
  const isAdministrator = has({
    role: 'org:admin',
  });

  if (!category) {
    return notFound();
  }

  return (
    <main>
      <CategoryPostsHeader category={category} />
      <BlogsDisplay
        user={user}
        isAdministrator={isAdministrator}
        posts={posts}
      />
    </main>
  );
}

const CategoryPostsHeader = async ({ category }: CategoryPostsHeaderProps) => {
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
        <h2 className="flex gap-2 pb-4 text-lg font-bold">
          Blog
          <Badge className="select-none bg-cyan-500 hover:bg-cyan-500">
            {category.name}
          </Badge>
        </h2>
      </div>
    );
  }

  return (
    <div className="flex justify-between">
      <h2 className="flex gap-2 pb-4 text-lg font-bold">
        Blog
        <Badge className="select-none bg-cyan-500 hover:bg-cyan-500">
          {category.name}
        </Badge>
      </h2>
      <Link href="/Blog/NewBlog">
        <Badge>New Post</Badge>
      </Link>
    </div>
  );
};
