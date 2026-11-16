export interface HomeStatistic {
  label: string;
  value: string;
}

export interface HomeContent {
  hero_title?: string;
  hero_subtitle?: string | null;
  hero_image_url?: string | null;
  welcome_title?: string;
  welcome_message?: string;
  principal_name?: string | null;
  cta_title?: string | null;
  cta_description?: string | null;
  stats?: HomeStatistic[];
}
