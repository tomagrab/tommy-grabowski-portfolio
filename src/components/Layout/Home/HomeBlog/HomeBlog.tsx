import '@/components/Layout/Home/HomeBlog/HomeBlog.scss';
import BlogsDisplay from '@/components/Layout/Blog/BlogsDisplay/BlogsDisplay';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { getRecentBlogs } from '@/database/prisma';
import { currentUser } from '@clerk/nextjs/server';
import Link from 'next/link';

export default async function HomeBlog() {
  const posts = await getRecentBlogs(3);
  const user = await currentUser();
  const isAdministrator =
    user?.emailAddresses[0]?.emailAddress === process.env.ADMIN_EMAIL;

  return (
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
          <h3 className="pb-4 text-center text-xl font-bold">Recent Blogs</h3>
          {posts && posts.length > 0 ? (
            <BlogsDisplay posts={posts} />
          ) : (
            <p>No recent posts found</p>
          )}
        </CardContent>
      </Card>
    </section>
  );
}
