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
          A todo list app for authenticated users. Create, edit, and delete
          todos to track tasks or even suggest website updates and new features.
          Must be signed in to use.
        </CardDescription>
      </CardHeader>
      <CardContent className="">
        <iframe
          className="mx-auto h-[430px] w-full rounded-2xl border-2 border-gray-200 shadow-lg md:h-[740px]"
          src="https://embed.creator-spring.com/widget?slug=my-store-f573da&per=5&bg=ffffff&txtcolor=000000&currency=&page=1"
          title="My widget Merch store powered by Spring"
          data-reactroot=""
        ></iframe>
      </CardContent>
    </Card>
  );
}
