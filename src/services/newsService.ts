
import api from "./api";
import type {
  NewsPost,
  PostsPagination,
  PostsResponse,
} from "../types/news";

interface GetPostsParams {
  page?: number;
  limit?: number;
  search?: string;
  category?: string;
}

interface GetPostsResult {
  posts: NewsPost[];
  pagination: PostsPagination;
}

export const getPosts = async ({
  page = 1,
  limit = 10,
  search,
  category,
}: GetPostsParams = {}): Promise<GetPostsResult> => {
  const response = await api.get<PostsResponse>("/posts", {
    params: {
      page,
      limit,
      ...(search ? { search } : {}),
      ...(category ? { category } : {}),
    },
  });

  const result = response.data;

  if (result.success === false) {
    throw new Error(result.message || "Gagal mengambil berita.");
  }

  const payload = result.data;

  const posts = Array.isArray(payload)
    ? payload
    : payload?.data ?? [];

  const paginationSource = Array.isArray(payload)
    ? result.meta
    : payload?.meta ?? payload;

  const pagination: PostsPagination = {
    current_page: paginationSource?.current_page ?? page,
    last_page: paginationSource?.last_page ?? 1,
    per_page: paginationSource?.per_page ?? limit,
    total: paginationSource?.total ?? posts.length,
  };

  return {
    posts,
    pagination,
  };
};
