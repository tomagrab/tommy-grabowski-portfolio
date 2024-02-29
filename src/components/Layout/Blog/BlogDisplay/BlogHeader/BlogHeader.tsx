import '@/components/Layout/Blog/BlogDisplay/BlogHeader/BlogHeader.scss';
import BlogDeleteButton from '@/components/Layout/Blog/BlogDeleteButton/BlogDeleteButton';
import BlogCategoryAndTags from '@/components/Layout/Blog/BlogCategoryAndTags/BlogCategoryAndTags';
import { Badge } from '@/components/ui/badge';
import { FormatDate } from '@/lib/Utilities/FormatDate/FormatDate';
import { FacebookShareButton, FacebookIcon } from 'next-share';
import type { UserResource } from '@clerk/types/dist/user';
import { Dispatch, SetStateAction } from 'react';
import { BlogPostWithCategoriesAndTagsType } from '@/lib/Types/BlogPostWithCategoriesAndTagsType/BlogPostWithCategoriesAndTagsType';

type BlogHeaderProps = {
  user: UserResource | null | undefined;
  isAdministrator: boolean;
  isPostAuthor: boolean;
  post: BlogPostWithCategoriesAndTagsType;
  blogUrl: string;
  editMode: boolean;
  setEditMode: Dispatch<SetStateAction<boolean>>;
};

export default function BlogHeader({
  user,
  isAdministrator,
  isPostAuthor,
  post,
  blogUrl,
  editMode,
  setEditMode,
}: BlogHeaderProps) {
  const isAdministratorOrPostAuthor = isAdministrator || isPostAuthor;

  if (!user || !isAdministratorOrPostAuthor) {
    return (
      <div className="">
        <div className="blog_post--header flex items-baseline justify-between">
          <div className="flex flex-col pb-4">
            <h2 className="blog_post--header__title">{post?.title}</h2>
            <small>
              Written by <strong>{post.author}</strong> on{' '}
              {FormatDate(post.createdAt)}
            </small>
            <small>Last updated on {FormatDate(post.updatedAt)}</small>
          </div>
          <div>
            <FacebookShareButton
              url={blogUrl}
              quote={post.title}
              hashtag="#tommygrabowski"
            >
              <FacebookIcon size={32} round />
            </FacebookShareButton>
          </div>
        </div>
        <BlogCategoryAndTags categories={post.categories} tags={post.tags} />
      </div>
    );
  }

  return (
    <div>
      <div className="blog_post--header flex items-baseline justify-between">
        <div className="flex flex-col pb-4">
          <h2 className="blog_post--header__title">{post?.title}</h2>
          <small>
            Written by <strong>{post.author}</strong> on{' '}
            {FormatDate(post.createdAt)}
          </small>
          <small>Last updated on {FormatDate(post.updatedAt)}</small>
        </div>
        <div className="flex items-center gap-2">
          <div>
            <FacebookShareButton
              url={blogUrl}
              quote={post.title}
              hashtag={post.tags.map(tag => tag.name).join(' ')}
            >
              <FacebookIcon size={32} round />
            </FacebookShareButton>
          </div>
          {(user && isAdministrator) || (user && isPostAuthor) ? (
            <div className="flex gap-2">
              <Badge
                className={`cursor-pointer ${
                  editMode
                    ? 'bg-yellow-500 hover:bg-yellow-400'
                    : 'bg-blue-500 hover:bg-blue-400'
                }  `}
                onClick={() => setEditMode(!editMode)}
              >
                {editMode ? 'Cancel' : 'Edit'}
              </Badge>
              <BlogDeleteButton post={post} />
            </div>
          ) : null}
        </div>
      </div>
      <BlogCategoryAndTags categories={post.categories} tags={post.tags} />
    </div>
  );
}
