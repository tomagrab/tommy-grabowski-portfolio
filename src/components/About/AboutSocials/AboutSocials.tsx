import BadgeLink from '@/components/BadgeLink/BadgeLink';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';

export default function AboutSocials() {
  return (
    <Card className="flex w-full flex-col items-center backdrop-blur-xl md:w-1/2">
      <CardHeader className="mt-4 text-center">
        <CardTitle>Connect with Me</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-4 md:grid md:grid-cols-2">
        <BadgeLink
          href="https://github.com/tomagrab"
          badgeClassName={`
        bg-github-black hover:bg-github-black-light
        `}
        >
          <FontAwesomeIcon icon={faGithub} className="h-6 w-6" />
          GitHub
        </BadgeLink>
        <BadgeLink
          href="https://www.linkedin.com/in/tommy-g-42399a1b2/"
          badgeClassName={`
        bg-linkedin-blue hover:bg-linkedin-blue-light
        `}
        >
          <FontAwesomeIcon icon={faLinkedin} className="h-6 w-6" />
          LinkedIn
        </BadgeLink>
      </CardContent>
    </Card>
  );
}
