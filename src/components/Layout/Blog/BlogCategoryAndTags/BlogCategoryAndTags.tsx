import '@/components/Layout/Blog/BlogCategoryAndTags/BlogCategoryAndTags.scss';
import { Badge } from '@/components/ui/badge';
import { Category, Tag } from '@prisma/client';
import Link from 'next/link';

type BlogCategoryAndTagsProps = {
  categories: Category[];
  tags: Tag[];
};

export default function BlogCategoryAndTags({
  categories,
  tags,
}: BlogCategoryAndTagsProps) {
  return (
    <div className="flex flex-col gap-2">
      {/* Show Categories */}
      <div className="flex flex-wrap gap-2">
        {categories.map(category => (
          <Link href={`/Blog/Category/${category.id}`} key={category.id}>
            <Badge className="bg-cyan-500 hover:bg-cyan-400">
              {category.name}
            </Badge>
          </Link>
        ))}
      </div>
      {/* Show Tags */}
      <div className="flex flex-wrap gap-2">
        {tags.map(tag => (
          <Link href={`/Blog/Tag/${tag.id}`} key={tag.id}>
            <Badge className="bg-pink-500 hover:bg-pink-400">#{tag.name}</Badge>
          </Link>
        ))}
      </div>
    </div>
  );
}
