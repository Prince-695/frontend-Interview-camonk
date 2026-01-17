import { useQuery } from '@tanstack/react-query';
import { blogService } from '@/services/blogService';
import BlogCard from './BlogCard';
import { Skeleton } from '@/components/ui/skeleton';
import type { Blog } from '@/types/blog';

interface BlogListProps {
  selectedBlogId: string | null;
  onSelectBlog: (blogId: string) => void;
}

function BlogListSkeleton() {
  return (
    <div className="space-y-4">
      {[...Array(5)].map((_, i) => (
        <div key={i} className=" border-transparent rounded-lg p-4 space-y-3">
          <div className="flex items-center justify-between">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-4 w-16" />
          </div>
          <Skeleton className="h-6 w-3/4" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-2/3" />
          <div className="flex gap-2">
            <Skeleton className="h-5 w-16" />
            <Skeleton className="h-5 w-16" />
          </div>
        </div>
      ))}
    </div>
  );
}

export default function BlogList({ selectedBlogId, onSelectBlog }: BlogListProps) {
  const { data: blogs, isLoading, error } = useQuery({
    queryKey: ['blogs'],
    queryFn: blogService.getAllBlogs,
  });

  if (isLoading) {
    return (
      <div className="space-y-4">
        <BlogListSkeleton />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-red-600 font-medium">Failed to load blogs</p>
        <p className="text-sm text-gray-500 mt-2">Please try again later</p>
      </div>
    );
  }

  if (!blogs || blogs.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600 font-medium">No blogs found</p>
        <p className="text-sm text-gray-500 mt-2">Create your first blog to get started</p>
      </div>
    );
  }

  return (
    <div className="space-y-4 ">
      {blogs.map((blog: Blog) => (
        <BlogCard
          key={blog.id}
          blog={blog}
          isSelected={selectedBlogId === blog.id}
          onClick={() => onSelectBlog(blog.id)}
        />
      ))}
    </div>
  );
}
