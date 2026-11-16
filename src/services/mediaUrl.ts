const API_BASE_URL = import.meta.env.VITE_API_URL;

/** Mengubah path upload API seperti /uploads/banner.jpg menjadi URL absolut. */
export const resolveMediaUrl = (path?: string | null): string | null => {
  if (!path) return null;
  if (/^https?:\/\//i.test(path)) return path;
  if (!API_BASE_URL) return path;

  try {
    return new URL(path, new URL(API_BASE_URL).origin).toString();
  } catch {
    return path;
  }
};
