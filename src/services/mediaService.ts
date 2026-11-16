
import api from "./api";
import type {
  MediaItem,
  MediaPagination,
  MediaResponse,
} from "../types/media";

interface GetMediaParams {
  page?: number;
  limit?: number;
}

interface GetMediaResult {
  media: MediaItem[];
  pagination: MediaPagination;
}

export const getMedia = async (
  params: GetMediaParams = {},
  signal?: AbortSignal,
): Promise<GetMediaResult> => {
  const page = params.page ?? 1;
  const limit = params.limit ?? 10;

  const response = await api.get<MediaResponse>("/galleries", {
    params: {
      page,
      limit,
    },
    signal,
  });

  const result = response.data;

  if (result.success === false) {
    throw new Error(result.message || "Gagal mengambil data galeri.");
  }

  const payload = result.data;

  const media: MediaItem[] = Array.isArray(payload)
    ? payload
    : payload?.data ?? [];

  const paginationSource = Array.isArray(payload)
    ? result.meta
    : payload?.meta ?? payload;

  const pagination: MediaPagination = {
    current_page: paginationSource?.current_page ?? page,
    last_page: paginationSource?.last_page ?? 1,
    per_page: paginationSource?.per_page ?? limit,
    total: paginationSource?.total ?? media.length,
  };

  return {
    media,
    pagination,
  };
};
