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
        <Link href="https://github.com/tomagrab" target="_blank">
          <Badge className="flex items-center justify-center gap-2 bg-github-black p-2 text-lg transition-all duration-200 hover:scale-105 hover:bg-github-black-light hover:shadow-md">
            <FontAwesomeIcon icon={faGithub} className="h-6 w-6" />
            GitHub
          </Badge>
        </Link>
        <Link
          href="https://www.linkedin.com/in/tommy-g-42399a1b2/"
          target="_blank"
        >
          <Badge className="flex items-center justify-center gap-2 bg-linkedin-blue p-2 text-lg transition-all duration-200 hover:scale-105 hover:bg-linkedin-blue-light hover:shadow-md">
            <FontAwesomeIcon icon={faLinkedin} className="h-6 w-6" />
            LinkedIn
          </Badge>
        </Link>
      </CardContent>
    </Card>
  );
}
