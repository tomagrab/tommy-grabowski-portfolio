import '@/components/Layout/Blog/BlogDisplay/BlogCategoryAndTags/BlogCategoryAndTags.scss';
import { Badge } from '@/components/ui/badge';
import { Category, Tag } from '@prisma/client';

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
          <Badge className="bg-cyan-500" key={category.id}>
            {category.name}
          </Badge>
        ))}
      </div>
      {/* Show Tags */}
      <div className="flex flex-wrap gap-2">
        {tags.map(tag => (
          <Badge className="bg-pink-500" key={tag.id}>
            #{tag.name}
          </Badge>
        ))}
      </div>
    </div>
  );
}
