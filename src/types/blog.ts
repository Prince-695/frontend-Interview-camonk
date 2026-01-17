export interface Blog {
  id: string;
  title: string;
  category: string[];
  description: string;
  date: string;
  coverImage: string;
  content: string;
}

export interface CreateBlogDto {
  title: string;
  category: string[];
  description: string;
  date: string;
  coverImage: string;
  content: string;
}
