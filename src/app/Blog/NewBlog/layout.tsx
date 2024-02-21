import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'New Blog | TG',
  description: 'Create a new blog post.',
};

type NewBlogLayoutProps = {
  children: React.ReactNode;
};

export default function NewBlogLayout({ children }: NewBlogLayoutProps) {
  return <>{children}</>;
}
