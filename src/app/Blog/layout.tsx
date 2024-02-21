import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Blog | TG',
  description: 'Blog posts by TG.',
};

type BlogLayoutProps = {
  children: React.ReactNode;
};

export default function BlogLayout({ children }: BlogLayoutProps) {
  return <>{children}</>;
}
