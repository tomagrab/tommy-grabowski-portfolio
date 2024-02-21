import '@/components/About/AboutSkills/AboutSkills.scss';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { faReact } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Image from 'next/image';
import Link from 'next/link';

export default function AboutSkills() {
  return (
    <Card className="flex w-full flex-col items-center backdrop-blur-xl md:w-1/2">
      <CardHeader className="mt-4 text-center">
        <CardTitle>My Skill Set</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-4 md:grid md:grid-cols-2">
        <Link href="https://nextjs.org/" target="_blank">
          <Badge className="flex items-center justify-center gap-2 border-2 border-black p-2 transition-all duration-200 hover:scale-105 hover:shadow-md">
            <Image
              src="/Images/next.svg"
              alt="Next Logo"
              width={100}
              height={24}
              className="next-logo"
              priority
            />
          </Badge>
        </Link>
        <Link href="https://react.dev/" target="_blank">
          <Badge className="flex items-center justify-center gap-2 p-2 text-lg transition-all duration-200 hover:scale-105  hover:shadow-md">
            <FontAwesomeIcon
              icon={faReact}
              className="h-6 w-6 text-react-blue"
            />
            React
          </Badge>
        </Link>
        <Link href="https://tailwindcss.com/" target="_blank">
          <Badge className="flex items-center justify-center gap-2 p-2 text-lg transition-all duration-200 hover:scale-105 hover:shadow-md">
            <Image
              src="/Images/tailwindcss-mark.svg"
              alt="Tailwind Logo"
              width={24}
              height={24}
              priority
            />
            Tailwind
          </Badge>
        </Link>
        <Link href="https://sass-lang.com/" target="_blank">
          <Badge className="flex items-center justify-center gap-2 p-2 text-lg transition-all duration-200 hover:scale-105 hover:shadow-md">
            <Image
              src="/Images/SASS-Logo-Color.svg"
              alt="Sass Logo"
              className="fill-white"
              width={24}
              height={24}
              priority
            />
            SCSS
          </Badge>
        </Link>
      </CardContent>
    </Card>
  );
}
