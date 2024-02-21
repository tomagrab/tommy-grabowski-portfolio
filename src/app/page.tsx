import '@/app/Home.scss';
import BlogsDisplay from '@/components/Layout/Blog/BlogsDisplay/BlogsDisplay';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { getRecentBlogs } from '@/database/prisma';
import { currentUser } from '@clerk/nextjs/server';
import Image from 'next/image';
import Link from 'next/link';

export default async function Home() {
  const posts = await getRecentBlogs(10);
  const user = await currentUser();
  const isAdministrator =
    user?.emailAddresses[0]?.emailAddress === process.env.ADMIN_EMAIL;

  return (
    <main className="flex flex-col gap-4">
      {/* Blurb about Tommy Grabowski with link to About Me page */}
      <section>
        <Card className="flex flex-col items-center py-4">
          <CardHeader>
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

      {/* Blurb about Blog and link to the page */}
      <section>
        <Card className="py-4">
          <CardHeader>
            <CardTitle className="text-center">Blog</CardTitle>
          </CardHeader>
          <CardContent className="">
            <div className="flex flex-col items-center">
              <p className="pb-4">
                Read my thoughts on web development, React, and more.
              </p>
              <Link className="" href="/Blog">
                <Button>Read My Blog</Button>
              </Link>
            </div>

            <hr className="my-4 border" />

            {/* List of ten most recent blogs */}
            <h3 className="text-center text-xl font-bold">Recent Blogs</h3>
            <BlogsDisplay
              user={user}
              isAdministrator={isAdministrator}
              posts={posts}
            />
          </CardContent>
        </Card>
      </section>

      {/* Blurb about Projects and link to the page */}
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
    </main>
  );
}
