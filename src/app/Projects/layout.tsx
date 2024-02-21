import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Projects | TG',
  description: 'The projects I have worked on.',
};

type ProjectsLayoutProps = {
  children: React.ReactNode;
};

export default function ProjectsLayout({ children }: ProjectsLayoutProps) {
  return <>{children}</>;
}
