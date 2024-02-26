import { getBlogPost } from '@/database/prisma';
import { Metadata, ResolvingMetadata } from 'next';
import { Author } from 'next/dist/lib/metadata/types/metadata-types';

type SingleBlogLayoutProps = {
  children: React.ReactNode;

  params: {
    id: string;
  };
};

export async function generateMetadata({
  params,
}: SingleBlogLayoutProps): Promise<Metadata> {
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
