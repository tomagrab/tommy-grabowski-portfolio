import '@/components/Layout/Blog/BlogDisplay/BlogContent/BlogContent.scss';
import { ConvertMarkdownToHTML } from '@/lib/Utilities/ConvertMarkdownToHTML/ConvertMarkdownToHTML';
import { BlogPost, Category, Tag } from '@prisma/client';

type BlogContentProps = {
  post: BlogPost;
};

export default function BlogContent({ post }: BlogContentProps) {
  return (
    <div className="blog_post--content">
      <div
        className="markdown select-none"
        dangerouslySetInnerHTML={{
          __html: ConvertMarkdownToHTML(post?.content),
        }}
      />
    </div>
  );
}
