import '@/components/Layout/Blog/BlogDisplay/BlogHeader/BlogHeader.scss';
import BlogDeleteButton from '@/components/Layout/Blog/BlogDeleteButton/BlogDeleteButton';
import BlogCategoryAndTags from '@/components/Layout/Blog/BlogCategoryAndTags/BlogCategoryAndTags';
import { Badge } from '@/components/ui/badge';
import { FormatDate } from '@/lib/Utilities/FormatDate/FormatDate';
import {
  FacebookShareButton,
  FacebookIcon,
  TwitterShareButton,
  TwitterIcon,
  RedditShareButton,
  RedditIcon,
} from 'next-share';
import type { UserResource } from '@clerk/types/dist/user';
import { Dispatch, SetStateAction } from 'react';
import { BlogPostWithCategoriesAndTagsType } from '@/lib/Types/BlogPostWithCategoriesAndTagsType/BlogPostWithCategoriesAndTagsType';
import { EyeIcon } from 'lucide-react';

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
      <div>
        <div className="blog_post--header flex items-start justify-between gap-4">
          <div className="flex flex-col justify-start">
            <h2 className="text-4xl font-bold">{post?.title}</h2>
            <small>
              Written by <strong>{post.author}</strong> on{' '}
              {FormatDate(post.createdAt)}
            </small>
            <small>Last updated on {FormatDate(post.updatedAt)}</small>
            <BlogCategoryAndTags
              categories={post.categories}
              tags={post.tags}
            />
          </div>

          <div className="flex flex-col items-center gap-2">
            <div>
              <EyeIcon size={32} />
              <p className="text-center text-sm font-bold">{post.views}</p>
            </div>
            <FacebookShareButton
              url={blogUrl}
              quote={post.title}
              hashtag={`#${post.tags.map(tag => tag.name).join(' ')}`}
            >
              <FacebookIcon size={32} round />
            </FacebookShareButton>
            <TwitterShareButton
              url={blogUrl}
              title={post.title}
              hashtags={post.tags.map(tag => tag.name)}
            >
              <TwitterIcon size={32} round />
            </TwitterShareButton>
            <RedditShareButton url={blogUrl} title={post.title}>
              <RedditIcon size={32} round />
            </RedditShareButton>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="blog_post--header flex items-start justify-between gap-4">
        <div className="flex flex-col justify-start">
          <h2 className="text-4xl font-bold">{post?.title}</h2>
          <small>
            Written by <strong>{post.author}</strong> on{' '}
            {FormatDate(post.createdAt)}
          </small>
          <small>Last updated on {FormatDate(post.updatedAt)}</small>
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
        <div className="flex flex-col items-center gap-2">
            <div>
              <EyeIcon size={32} />
              <p className="text-center text-sm font-bold">{post.views}</p>
            </div>
            <FacebookShareButton
              url={blogUrl}
              quote={post.title}
              hashtag={`#${post.tags.map(tag => tag.name).join(' ')}`}
            >
              <FacebookIcon size={32} round />
            </FacebookShareButton>
            <TwitterShareButton
              url={blogUrl}
              title={post.title}
              hashtags={post.tags.map(tag => tag.name)}
            >
              <TwitterIcon size={32} round />
            </TwitterShareButton>
            <RedditShareButton url={blogUrl} title={post.title}>
              <RedditIcon size={32} round />
            </RedditShareButton>
          </div>
        </div>
      </div>
    </div>
  );
}
