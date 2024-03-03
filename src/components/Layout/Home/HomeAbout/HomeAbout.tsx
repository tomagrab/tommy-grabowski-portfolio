import '@/components/Layout/Home/HomeAbout/HomeAbout.scss';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

import Image from 'next/image';
import Link from 'next/link';

export default function HomeAbout() {
  return (
    <section>
      <Card className="flex flex-col items-center py-4">
        <CardHeader className="flex flex-col items-center py-4">
          <Image
            className="rounded-lg"
            alt="Tommy Grabowski"
            src={`/Images/TommyGrabowski.jpg`}
            height={172}
            width={200}
          />
          <CardTitle>Tommy Grabowski</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col items-center">
          <p className="pb-4">Web Developer | React Enthusiast</p>
          <Link className="" href="/About">
            <Button>Learn More About Me</Button>
          </Link>
        </CardContent>
      </Card>
    </section>
  );
}
