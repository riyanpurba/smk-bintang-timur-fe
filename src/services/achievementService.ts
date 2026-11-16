import api from "./api";
import type { Achievement, AchievementsResponse } from "../types/achievement";

interface GetAchievementsParams {
  page?: number;
  limit?: number;
  achievement_level?: string;
}

interface GetAchievementsResult {
  achievements: Achievement[];
  total: number;
  totalPages: number;
}

export const getAchievements = async ({
  page = 1,
  limit = 12,
  achievement_level,
}: GetAchievementsParams = {}): Promise<GetAchievementsResult> => {
  const response = await api.get<AchievementsResponse>("/achievements", {
    params: {
      page,
      limit,
      ...(achievement_level ? { achievement_level } : {}),
      sort: "achievement_date",
      order: "desc",
    },
  });

  const payload = response.data;
  if (payload.success === false) {
    throw new Error("Gagal mengambil data prestasi.");
  }

  const achievements = Array.isArray(payload.data) ? payload.data : [];
  const total = payload.meta?.total ?? achievements.length;
  const totalPages =
    payload.meta?.totalPages ??
    payload.meta?.total_pages ??
    Math.max(1, Math.ceil(total / limit));

  return { achievements, total, totalPages };
};
