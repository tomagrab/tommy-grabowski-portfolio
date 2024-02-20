import "@/app/About/About.scss";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Github, Linkedin } from "lucide-react";
import Link from "next/link";

export default function About() {
  return (
    <main>
      <section className="about-section flex gap-4 flex-wrap md:flex-nowrap flex-col items-center md:flex-row md:items-stretch">
        <Card className="flex flex-col items-center py-4 backdrop-blur-xl">
          <CardHeader className="text-center mt-4">
            <CardTitle>Skills</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="list-disc pl-4">
              <li>React</li>
              <li>Next.js</li>
              <li>TailwindCSS</li>
              <li>SCSS</li>
            </ul>
          </CardContent>
        </Card>
        <Card className="flex flex-col items-center py-4 backdrop-blur-xl">
          <CardHeader className="text-center mt-4">
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

        <Card className="flex flex-col items-center py-4 backdrop-blur-xl">
          <CardHeader className="text-center mt-4">
            <CardTitle>Socials</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col items-center gap-2">
            <Link href="https://github.com/tomagrab" target="_blank">
              <Badge className="flex items-center gap-2 bg-github-black hover:bg-github-black-light">
                <Github /> GitHub
              </Badge>
            </Link>
            <Link
              href="https://www.linkedin.com/in/tommy-g-42399a1b2/"
              target="_blank"
            >
              <Badge className="flex items-center gap-2 bg-linkedin-blue hover:bg-linkedin-blue-light">
                <Linkedin /> LinkedIn
              </Badge>
            </Link>
          </CardContent>
        </Card>
      </section>
    </main>
  );
}
