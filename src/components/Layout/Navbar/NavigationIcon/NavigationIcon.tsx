'use client';
import '@/components/Layout/Navbar/NavigationIcon/NavigationIcon.scss';
import {
  HelpCircle,
  Home,
  NotebookPen,
  LogIn,
  LogOut,
  MessageSquareText,
} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const IconMap = {
  home: Home,
  blog: MessageSquareText,
  about: HelpCircle,
  projects: NotebookPen,
  login: LogIn,
  logout: LogOut,
};

type NavigationIconProps = {
  iconName: keyof typeof IconMap;
  href: string;
  headerIcon?: boolean;
};

export default function NavigationIcon({
  iconName,
  href,
  headerIcon,
}: NavigationIconProps) {
  const IconComponent = IconMap[iconName];
  const pathname = usePathname();
  return (
    <Link
      href={href}
      className={`group relative h-16 w-full md:w-20 ${
        pathname === href || (pathname.includes(href) && href.length !== 1)
          ? 'text-celestial-blue'
          : headerIcon
            ? 'text-mint-cream'
            : 'text-slate-900'
      }`}
    >
      {IconComponent ? (
        <IconComponent
          className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform transition-opacity duration-300 ease-in-out group-hover:opacity-0`}
        />
      ) : (
        '?'
      )}
      <div
        className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform select-none text-sm capitalize opacity-0 transition-opacity duration-300 ease-in-out group-hover:opacity-100`}
      >
        {iconName}
      </div>
    </Link>
  );
}
