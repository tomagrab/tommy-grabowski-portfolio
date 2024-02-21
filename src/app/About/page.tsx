import '@/app/About/About.scss';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Github, Linkedin } from 'lucide-react';
import Link from 'next/link';
import { faReact } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Image from 'next/image';

export default function About() {
  return (
    <main>
      <section className="about-section flex flex-col gap-4">
        <Card className="flex w-full flex-col items-center backdrop-blur-xl">
          <CardHeader className="mt-4 text-center">
            <CardTitle>About Me</CardTitle>
          </CardHeader>
          <CardContent>
            <p>
              I&apos;m a passionate web developer with a background in
              Cybersecurity from ECPI University (Charlotte, NC). My journey
              into development has been driven by self-learning and a deep
              interest in creating engaging web experiences.
            </p>
            <p className="">
              I specialize in crafting modern web applications using React,
              Next.js, TailwindCSS, and SCSS.
            </p>
          </CardContent>
        </Card>

        <div className="flex flex-wrap gap-4 md:flex-nowrap">
          <Card className="flex w-full flex-col items-center backdrop-blur-xl md:w-1/2">
            <CardHeader className="mt-4 text-center">
              <CardTitle>Skills</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-4">
              <Link href="https://react.dev/" target="_blank">
                <Badge className="flex items-center justify-center gap-2 bg-react-blue p-2 text-lg transition-all duration-200 hover:scale-105 hover:bg-react-blue-light hover:shadow-md">
                  <FontAwesomeIcon icon={faReact} className="h-8 w-8" />
                  React
                </Badge>
              </Link>
              <Link href="https://nextjs.org/" target="_blank">
                <Badge className="hov flex items-center justify-center gap-2 border-2 border-black bg-white p-2 transition-all duration-200 hover:scale-105 hover:bg-white hover:shadow-md">
                  <Image
                    src="/next.svg"
                    alt="Next Logo"
                    className="fill-white"
                    width={100}
                    height={24}
                    priority
                  />
                </Badge>
              </Link>
              <Link href="https://tailwindcss.com/" target="_blank">
                <Badge className="flex items-center justify-center gap-2 p-2 text-lg transition-all duration-200 hover:scale-105 hover:shadow-md">
                  <Image
                    src="/tailwindcss-mark.svg"
                    alt="Tailwind Logo"
                    className="fill-white"
                    width={24}
                    height={24}
                    priority
                  />
                  TailwindCSS
                </Badge>
              </Link>
            </CardContent>
          </Card>

          <Card className="flex w-full flex-col items-center backdrop-blur-xl md:w-1/2">
            <CardHeader className="mt-4 text-center">
              <CardTitle>Socials</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col items-center gap-2">
              <Link href="https://github.com/tomagrab" target="_blank">
                <Badge className="flex items-center justify-center gap-2 bg-github-black p-2 text-lg transition-all duration-200 hover:scale-105 hover:bg-github-black-light hover:shadow-md">
                  <Github /> GitHub
                </Badge>
              </Link>
              <Link
                href="https://www.linkedin.com/in/tommy-g-42399a1b2/"
                target="_blank"
              >
                <Badge className="flex items-center justify-center gap-2 bg-linkedin-blue p-2 text-lg transition-all duration-200 hover:scale-105 hover:bg-linkedin-blue-light hover:shadow-md">
                  <Linkedin /> LinkedIn
                </Badge>
              </Link>
            </CardContent>
          </Card>
        </div>
      </section>
    </main>
  );
}
