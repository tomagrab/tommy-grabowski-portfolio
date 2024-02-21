import { Badge } from '@/components/ui/badge';
import Link from 'next/link';

type BadgeLinkProps = {
  href: string;
  children: React.ReactNode;
  badgeClassName?: string;
};

export default function BadgeLink({
  href,
  children,
  badgeClassName,
}: BadgeLinkProps) {
  return (
    <Link href={href} target="_blank">
      <Badge
        className={`flex h-10 items-center justify-center gap-2 px-3 py-4 text-lg transition-all duration-200 hover:scale-105 hover:shadow-md ${badgeClassName}`}
      >
        {children}
      </Badge>
    </Link>
  );
}
