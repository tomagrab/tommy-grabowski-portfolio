import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About | TG',
  description: 'About TG.',
};

type AboutLayoutProps = {
  children: React.ReactNode;
};

export default function AboutLayout({ children }: AboutLayoutProps) {
  return <>{children}</>;
}
