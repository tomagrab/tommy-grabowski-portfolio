import "@/app/Blog/NewBlog/NewBlog.scss";
import NewBlogForm from "@/components/Blog/NewBlog/NewBlogForm/NewBlogForm";
import { redirect } from "next/navigation";
import { SignedIn, currentUser } from "@clerk/nextjs";

export default async function NewBlog() {
  const user = await currentUser();

  if (!user) {
    redirect("/");
  }

  const userEmail = user?.emailAddresses[0]?.emailAddress;
  const isAdministrator = userEmail === process.env.ADMIN_EMAIL;

  if (!isAdministrator) {
    redirect("/");
  }

  return (
    <SignedIn>
      {isAdministrator && user ? (
        <div>
          <NewBlogForm />
        </div>
      ) : null}
    </SignedIn>
  );
}
