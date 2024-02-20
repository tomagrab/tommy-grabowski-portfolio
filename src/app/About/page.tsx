import "@/app/About/About.scss";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function About() {
  return (
    <main className="bg-slate-800 rounded">
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
            <p>
              I specialize in crafting modern web applications using React,
              Next.js, TailwindCSS, and SCSS. You can explore my work and
              connect with me on GitHub (https://github.com/tomagrab).
            </p>
          </CardContent>
        </Card>
      </section>
    </main>
  );
}
