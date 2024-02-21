import { getBlogPost } from '@/database/prisma';
import { Metadata, ResolvingMetadata } from 'next';

type SingleBlogLayoutProps = {
  children: React.ReactNode;

  params: {
    id: string;
  };

  searchParams?: {
    editMode: string;
  };
};

export async function generateMetadata(
  { params, searchParams }: SingleBlogLayoutProps,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const id = params.id;
  const post = await getBlogPost(Number(id));

  return {
    title: `${post?.title}  | TG` || 'Blog | TG',
    description: `${post?.content.slice(0, 30)}` || 'A pretty cool blog post.',
  };
}

export default function SingleBlogLayout({ children }: SingleBlogLayoutProps) {
  return <>{children}</>;
}
