import type { Blog } from '@/types/blog';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { formatRelativeTime } from '@/lib/dateUtils';
import { ChevronRight } from 'lucide-react';

interface BlogCardProps {
  blog: Blog;
  isSelected?: boolean;
  onClick: () => void;
}

const categoryColors: Record<string, string> = {
  FINANCE: 'bg-blue-100 text-blue-700 ',
  TECH: 'bg-purple-100 text-purple-700 ',
  CAREER: 'bg-green-100 text-green-700 ',
  EDUCATION: 'bg-orange-100 text-orange-700 ',
  REGULATIONS: 'bg-red-100 text-red-700 ',
  LIFESTYLE: 'bg-pink-100 text-pink-700 ',
  SKILLS: 'bg-indigo-100 text-indigo-700 ',
};

const categoryIcons: Record<string, string> = {
    FINANCE: '💰',
    TECH: '💻',
    CAREER: '📈',
    EDUCATION: '🎓',
    REGULATIONS: '📜',
    LIFESTYLE: '🌟',
    SKILLS: '🛠️',
};

const getCategoryColor = (category: string) => {
  return categoryColors[category] || 'bg-gray-100 text-gray-700 hover:bg-gray-200';
};

const getCategoryIcon = (category: string) => {
    return categoryIcons[category] || '📄';
}

export default function BlogCard({ blog, isSelected, onClick }: BlogCardProps) {
  const primaryCategory = blog.category[0];
  const timeAgo = formatRelativeTime(blog.date);
  const categoryIcon = getCategoryIcon(primaryCategory);

  return (
    <Card
      className={`cursor-pointer transition-all hover:shadow-md ml-1 border-transparent ${
        isSelected ? '!border-l-4 !border-l-blue-600 bg-blue-50' : ''
      }`}
      onClick={onClick}
    >
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <span className="text-xs text-gray-500">{categoryIcon}</span>
            <span className="text-xs font-medium text-gray-600 uppercase">{primaryCategory}</span>
          </div>
          <span className="text-xs text-gray-500">{timeAgo}</span>
        </div>
        <CardTitle className="text-lg font-bold leading-tight hover:text-blue-600 transition-colors">
          {blog.title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription className="text-sm text-gray-600 line-clamp-2 mb-3">
          {blog.description}
        </CardDescription>
        <div className="flex items-center justify-between">
          <div className="flex flex-wrap gap-1.5">
            {blog.category.map((cat: string) => (
              <Badge key={cat} variant="secondary" className={`text-xs ${getCategoryColor(cat)}`}>
                {cat}
              </Badge>
            ))}
          </div>
          <ChevronRight className="w-4 h-4 text-gray-400" />
        </div>
      </CardContent>
    </Card>
  );
}
