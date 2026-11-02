export interface MediaItem {
    id: number | string;
    title?: string | null;
    name?: string | null;
    description?: string | null;
    caption?: string | null;
    file_url?: string | null;
    url?: string | null;
    image_url?: string | null;
    thumbnail_url?: string | null;
    path?: string | null;
    type?: string | null;
    mime_type?: string | null;
    category?: string | null;
    created_at?: string | null;
  }
  
  export interface MediaPagination {
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
  }
  
  export interface MediaResponse {
    success?: boolean;
    message?: string;
    data:
      | MediaItem[]
      | {
          data: MediaItem[];
          current_page?: number;
          last_page?: number;
          per_page?: number;
          total?: number;
          meta?: Partial<MediaPagination>;
        };
    meta?: Partial<MediaPagination>;
  }