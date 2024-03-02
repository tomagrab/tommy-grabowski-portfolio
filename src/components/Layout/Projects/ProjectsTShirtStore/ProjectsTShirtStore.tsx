import '@/components/Layout/Projects/ProjectsTShirtStore/ProjectsTShirtStore.scss';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

export default function ProjectsTShirtStore() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Tommy&apos;s Scams</CardTitle>
        <CardDescription>
          Own a piece of internet infamy! Get your official &quot;Tommy
          Grabowski Scammed Me&quot; merch. These shirts are so exclusive, you
          might even get scammed trying to buy one. Get yours today!
        </CardDescription>
      </CardHeader>
      <CardContent className="">
        <iframe
          className="mx-auto h-[430px] w-full rounded-2xl border-2 border-gray-200 shadow-lg md:h-[740px]"
          src="https://embed.creator-spring.com/widget?slug=my-store-f573da&per=6&bg=ffffff&txtcolor=000000&currency=&page=1"
          title="Tommy Grabowski Scammed Me Widget Merch store powered by Spring"
          data-reactroot=""
        ></iframe>
      </CardContent>
    </Card>
  );
}
