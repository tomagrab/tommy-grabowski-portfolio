import { getBlogPost } from "@/database/prisma";

type BlogPostProps = {
  params: {
    id: string;
  };

  searchParams?: {
    editMode: string;
  };
};

export default async function BlogPost({
  params,
  searchParams,
}: BlogPostProps) {
  const post = await getBlogPost(Number(params.id));
  return (
    <div>
      <h2>{post?.title}</h2>
      <p>{post?.content}</p>
    </div>
  );
}
