import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Login | TG',
  description: 'Log in to your account.',
};

type LoginLayoutProps = {
  children: React.ReactNode;
};

export default function LoginLayout({ children }: LoginLayoutProps) {
  return <>{children}</>;
}
