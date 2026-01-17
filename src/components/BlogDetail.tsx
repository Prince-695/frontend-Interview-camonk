import { useQuery } from '@tanstack/react-query';
import { blogService } from '@/services/blogService';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { Separator } from '@/components/ui/separator';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { formatDate } from '@/lib/dateUtils';
import { Share2, ThumbsUp, MessageSquare } from 'lucide-react';

interface BlogDetailProps {
  blogId: string;
}

// const categoryColors: Record<string, string> = {
//   FINANCE: 'bg-blue-100 text-blue-700',
//   TECH: 'bg-purple-100 text-purple-700',
//   CAREER: 'bg-green-100 text-green-700',
//   EDUCATION: 'bg-orange-100 text-orange-700',
//   REGULATIONS: 'bg-red-100 text-red-700',
//   LIFESTYLE: 'bg-pink-100 text-pink-700',
//   SKILLS: 'bg-indigo-100 text-indigo-700',
// };

// const getCategoryColor = () => {
//   return categoryColors[category] || 'bg-gray-100 text-gray-700';
// };

function BlogDetailSkeleton() {
  return (
    <div className="space-y-6">
      <Skeleton className="h-8 w-32" />
      <Skeleton className="h-12 w-full" />
      <Skeleton className="h-6 w-48" />
      <Skeleton className="h-[400px] w-full rounded-lg" />
      <div className="space-y-3">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-3/4" />
      </div>
    </div>
  );
}

export default function BlogDetail({ blogId }: BlogDetailProps) {
  const { data: blog, isLoading, error } = useQuery({
    queryKey: ['blog', blogId],
    queryFn: () => blogService.getBlogById(blogId),
    enabled: !!blogId,
  });

  if (isLoading) {
    return <BlogDetailSkeleton />;
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-red-600 font-medium">Failed to load blog details</p>
        <p className="text-sm text-gray-500 mt-2">Please try again later</p>
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600 font-medium">Blog not found</p>
      </div>
    );
  }

  const primaryCategory = blog.category[0];

  return (
    <article className="w-full">
      {/* Cover Image - No padding, at top of container */}
      <div className="relative w-full h-[400px] md:h-[500px] overflow-hidden">
        <img
          src={blog.coverImage}
          alt={blog.title}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Content Section - With padding */}
      <div className="px-8 pt-8 pb-8">
        {/* Category */}
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <span className="text-sm font-semibold text-blue-600 uppercase tracking-wide">
              {primaryCategory}
            </span>
            <span className="text-gray-400">•</span>
            <span className="text-sm text-gray-600">5 min read</span>
          </div>
        </div>

        {/* Title and Share Button */}
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4 leading-tight">
          {blog.title}
        </h1>
        <Button variant="default" size="sm" className="gap-2 mb-5 bg-blue-600 hover:bg-blue-700">
          <Share2 className="w-4 h-4" />
          <p className='-mt-0.5'>Share Article</p>
        </Button>

        {/* Meta Info */}
        <div className="flex gap-4 mb-8 p-4 bg-gray-100 rounded-lg flex-row justify-center items-center">
          <div className="flex items-center gap-2 flex-1 flex-col">
            <span className="text-sm font-medium text-gray-600 uppercase">Category</span>
            <p className='font-bold text-gray-700 text-sm'>{blog.category.join(' & ')}</p>
          </div>
          <div className="h-12 w-px bg-gray-300"></div>
          <div className="flex items-center gap-2 flex-1 flex-col">
            <span className="text-sm font-medium text-gray-600 uppercase">Read Time</span>
            <p className="text-sm text-gray-700 font-bold">5 Mins</p>
          </div>
          <div className="h-12 w-px bg-gray-300"></div>
          <div className="flex items-center gap-2 flex-1 flex-col">
            <span className="text-sm font-medium text-gray-600 uppercase">Date</span>
            <p className="text-sm text-gray-700 font-bold">{formatDate(blog.date)}</p>
          </div>
        </div>

        {/* Introduction */}
        <p className="text-lg text-gray-700 leading-relaxed mb-8 italic border-l-4 border-blue-600 bg-blue-50 p-1 pl-4">
          {blog.description}
        </p>

        <Separator className="my-8" />

        {/* Content */}
        <div className="prose prose-lg max-w-none">
          {blog.content.split('\n\n').map((paragraph: string, index: number) => (
            <p key={index} className="text-gray-800 leading-relaxed mb-6">
              {paragraph}
            </p>
          ))}
        </div>

        <Separator className="my-8" />

        {/* Author Info */}
        <div className="flex items-center gap-4 p-6 bg-gray-100 rounded-lg">
          <Avatar className="w-16 h-16">
            <AvatarImage src="/avatar.png" />
            <AvatarFallback>AM</AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <p className="font-semibold text-gray-900">Written by Arjun Mehta</p>
            <p className="text-sm text-gray-600">Senior Financial Analyst</p>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" className="gap-2">
              <ThumbsUp className="w-8 h-8 text-gray-500 fill-gray-400" />
            </Button>
            <Button variant="ghost" size="sm" className="gap-2">
              <MessageSquare className="w-8 h-8 text-gray-500 fill-gray-400" />
            </Button>
          </div>
        </div>
      </div>
    </article>
  );
}
