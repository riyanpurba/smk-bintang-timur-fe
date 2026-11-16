export type AchievementLevel =
  | "school"
  | "district"
  | "city"
  | "province"
  | "national"
  | "international";

export interface Achievement {
  id: string;
  title: string;
  description: string | null;
  achievement_level: AchievementLevel;
  organizer: string | null;
  recipient_names: string | null;
  achievement_date: string | null;
  thumbnail_url: string | null;
}

export interface AchievementsResponse {
  success: boolean;
  data: Achievement[];
  meta?: {
    page?: number;
    limit?: number;
    total?: number;
    totalPages?: number;
    total_pages?: number;
  };
}

export const ACHIEVEMENT_LEVEL_LABEL: Record<AchievementLevel, string> = {
  school: "Sekolah",
  district: "Kecamatan",
  city: "Kabupaten/Kota",
  province: "Provinsi",
  national: "Nasional",
  international: "Internasional",
};
