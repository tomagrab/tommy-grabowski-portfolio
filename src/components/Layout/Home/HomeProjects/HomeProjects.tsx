import '@/components/Layout/Home/HomeProjects/HomeProjects.scss';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function HomeProjects() {
  return (
    <section>
      <Card className="flex flex-col items-center py-4">
        <CardHeader>
          <CardTitle>Projects</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col items-center">
          <p className="pb-4">
            Check out some of the projects I&apos;ve been working on.
          </p>
          <Link className="" href="/Projects">
            <Button>View My Projects</Button>
          </Link>
        </CardContent>
      </Card>
    </section>
  );
}
