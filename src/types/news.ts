
export interface NewsCategory {
    id?: number;
    name: string;
    slug?: string;
  }
  
  export interface NewsPost {
    id: number;
    title: string;
    slug: string;
    excerpt?: string | null;
    content?: string | null;
    thumbnail_url?: string | null;
    image?: string | null;
    image_url?: string | null;
    category?: string | NewsCategory | null;
    author?: string | { name: string } | null;
    published_at?: string | null;
    created_at?: string | null;
    is_featured?: boolean;
    status?: string;
  }
  
  export interface PostsPagination {
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
  }
  
  export interface PostsResponse {
    success?: boolean;
    message?: string;
    data:
      | NewsPost[]
      | {
          data: NewsPost[];
          current_page?: number;
          last_page?: number;
          per_page?: number;
          total?: number;
          meta?: Partial<PostsPagination>;
        };
    meta?: Partial<PostsPagination>;
  }
  