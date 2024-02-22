import '@/app/Blog/NewBlog/NewBlog.scss';

import { redirect } from 'next/navigation';
import { SignedIn, currentUser } from '@clerk/nextjs';
import BlogForm from '@/components/Layout/Blog/BlogForm/BlogForm';
import { auth } from '@clerk/nextjs/server';

export default async function NewBlog() {
  const user = await currentUser();
  const { has } = auth();
  const isAdministrator = has({ role: 'org:admin' });
  const isWriter = has({ role: 'org:writer' });

  const isAdministratorOrWriter = isAdministrator || isWriter;

  if (!user || !isAdministratorOrWriter) {
    redirect('/Blog');
  }

  return (
    <SignedIn>
      {user && isAdministratorOrWriter ? (
        <main>
          <NewBlogHeader />
          <BlogForm />
        </main>
      ) : null}
    </SignedIn>
  );
}

function NewBlogHeader() {
  return <h2 className="pb-4 text-lg font-bold">New Blog</h2>;
}
