import '@/components/Layout/About/AboutSkills/AboutSkills.scss';
import BadgeLink from '@/components/BadgeLink/BadgeLink';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { faReact } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Image from 'next/image';

export default function AboutSkills() {
  return (
    <Card className="flex w-full flex-col items-center backdrop-blur-xl md:w-1/2">
      <CardHeader className="mt-4 text-center">
        <CardTitle>My Skill Set</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-4 md:grid md:grid-cols-2">
        <BadgeLink href="https://nextjs.org/">
          <Image
            src="/Images/next.svg"
            alt="Next Logo"
            width={100}
            height={24}
            className="h-6 w-24"
            priority
          />
        </BadgeLink>
        <BadgeLink href="https://vercel.com/">
          <Image
            src="/Images/vercel.svg"
            alt="Vercel Logo"
            width={100}
            className="vercel-logo"
            height={24}
            priority
          />
        </BadgeLink>
        <BadgeLink href="https://www.typescriptlang.org/">
          <Image
            src="/Images/ts-logo.svg"
            alt="TypeScript Logo"
            width={24}
            height={24}
            priority
          />
          TypeScript
        </BadgeLink>
        <BadgeLink href="https://react.dev/">
          <FontAwesomeIcon icon={faReact} className="h-6 w-6 text-react-blue" />
          React
        </BadgeLink>
        <BadgeLink href="https://www.typescriptlang.org/">
          <Image
            src="/Images/tailwindcss-mark.svg"
            alt="Tailwind Logo"
            width={24}
            height={24}
            priority
          />
          Tailwind
        </BadgeLink>
        <BadgeLink href="https://sass-lang.com/">
          <Image
            src="/Images/SASS-Logo-Color.svg"
            alt="Sass Logo"
            width={24}
            height={24}
            priority
          />
          SCSS
        </BadgeLink>
      </CardContent>
    </Card>
  );
}
