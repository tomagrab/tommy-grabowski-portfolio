import '@/app/Blog/NewBlog/NewBlog.scss';

import { redirect } from 'next/navigation';
import { SignedIn, currentUser } from '@clerk/nextjs';
import BlogForm from '@/components/Layout/Blog/BlogForm/BlogForm';

export default async function NewBlog() {
  const user = await currentUser();

  if (!user) {
    redirect('/');
  }

  const userEmail = user?.emailAddresses[0]?.emailAddress;
  const isAdministrator = userEmail === process.env.ADMIN_EMAIL;

  if (!isAdministrator) {
    redirect('/');
  }

  return (
    <SignedIn>
      {isAdministrator && user ? (
        <main>
          <BlogForm />
        </main>
      ) : null}
    </SignedIn>
  );
}
