import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { blogService } from '@/services/blogService';
import type { CreateBlogDto } from '@/types/blog';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Plus, X } from 'lucide-react';

const availableCategories = [
  'FINANCE',
  'TECH',
  'CAREER',
  'EDUCATION',
  'REGULATIONS',
  'LIFESTYLE',
  'SKILLS',
];

export default function CreateBlogForm() {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [content, setContent] = useState('');
  const [coverImage, setCoverImage] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  const queryClient = useQueryClient();

  const createBlogMutation = useMutation({
    mutationFn: (newBlog: CreateBlogDto) => blogService.createBlog(newBlog),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['blogs'] });
      setOpen(false);
      resetForm();
    },
  });

  const resetForm = () => {
    setTitle('');
    setDescription('');
    setContent('');
    setCoverImage('');
    setSelectedCategories([]);
  };

  const toggleCategory = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title || !description || !content || selectedCategories.length === 0) {
      alert('Please fill in all required fields and select at least one category');
      return;
    }

    const newBlog: CreateBlogDto = {
      title,
      category: selectedCategories,
      description,
      date: new Date().toISOString(),
      coverImage: coverImage || 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg',
      content,
    };

    createBlogMutation.mutate(newBlog);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="gap-2 bg-blue-600 hover:bg-blue-700">
          <Plus className="w-4 h-4" />
          <p className='-mt-0.5'>Create Blog</p>
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto bg-white">
        <DialogHeader>
          <DialogTitle>Create New Blog</DialogTitle>
          <DialogDescription>
            Fill in the details below to create a new blog post
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Title */}
          <div className="space-y-2">
            <Label htmlFor="title">Title *</Label>
            <Input
              id="title"
              value={title}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTitle(e.target.value)}
              placeholder="Enter blog title"
              required
            />
          </div>

          {/* Categories */}
          <div className="space-y-2">
            <Label>Categories * (Select at least one)</Label>
            <div className="flex flex-wrap gap-2">
              {availableCategories.map((cat) => (
                <Badge
                  key={cat}
                  variant={selectedCategories.includes(cat) ? 'default' : 'outline'}
                  className="cursor-pointer"
                  onClick={() => toggleCategory(cat)}
                >
                  {cat}
                  {selectedCategories.includes(cat) && (
                    <X className="w-3 h-3 ml-1" />
                  )}
                </Badge>
              ))}
            </div>
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="description">Description *</Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setDescription(e.target.value)}
              placeholder="Brief description of the blog"
              rows={3}
              required
            />
          </div>

          {/* Cover Image URL */}
          <div className="space-y-2">
            <Label htmlFor="coverImage">Cover Image URL (optional)</Label>
            <Input
              id="coverImage"
              value={coverImage}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setCoverImage(e.target.value)}
              placeholder="https://example.com/image.jpg"
              type="url"
            />
            <p className="text-xs text-gray-500">
              Leave empty to use a default image
            </p>
          </div>

          {/* Content */}
          <div className="space-y-2">
            <Label htmlFor="content">Content *</Label>
            <Textarea
              id="content"
              value={content}
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setContent(e.target.value)}
              placeholder="Write your blog content here..."
              rows={10}
              required
            />
          </div>

          {/* Submit Button */}
          <div className="flex justify-end gap-3">
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={createBlogMutation.isPending}
            >
              {createBlogMutation.isPending ? 'Creating...' : 'Create Blog'}
            </Button>
          </div>

          {createBlogMutation.isError && (
            <p className="text-sm text-red-600">
              Failed to create blog. Please try again.
            </p>
          )}
        </form>
      </DialogContent>
    </Dialog>
  );
}
