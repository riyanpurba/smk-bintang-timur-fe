import { useCallback, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  Image as ImageIcon,
  X,
  ZoomIn,
  CalendarDays,
  RefreshCw,
} from "lucide-react";

import PageMeta from "../Components/Common/PageMeta";
import { getMedia } from "../services/mediaService";
import type {
  MediaItem,
  MediaPagination,
} from "../types/media";

const API_BASE_URL = import.meta.env.VITE_API_URL ?? "";

const API_ORIGIN = API_BASE_URL.replace(/\/api\/v1\/?$/, "");

const getMediaUrl = (item: MediaItem): string => {
  const url =
    item.file_url ||
    item.image_url ||
    item.url ||
    item.thumbnail_url ||
    item.path;

  if (!url) return "";

  if (url.startsWith("http://") || url.startsWith("https://")) {
    return url;
  }

  return `${API_ORIGIN}/${url.replace(/^\/+/, "")}`;
};

const getMediaTitle = (item: MediaItem): string => {
  return item.title || item.name || item.caption || "Dokumentasi Sekolah";
};

const formatDate = (date?: string | null): string => {
  if (!date) return "";

  const parsedDate = new Date(date);

  if (Number.isNaN(parsedDate.getTime())) return "";

  return new Intl.DateTimeFormat("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(parsedDate);
};

export default function Galeri() {
  const [media, setMedia] = useState<MediaItem[]>([]);
  const [pagination, setPagination] = useState<MediaPagination>({
    current_page: 1,
    last_page: 1,
    per_page: 10,
    total: 0,
  });

  const [page, setPage] = useState(1);
  const [reload, setReload] = useState(0);
  const [selectedMedia, setSelectedMedia] = useState<MediaItem | null>(null);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchMedia = useCallback(async () => {
    try {
      setLoading(true);
      setError("");

      const result = await getMedia({
        page,
        limit: 10,
      });

      setMedia(result.media);
      setPagination(result.pagination);
    } catch (err) {
      console.error("Failed to fetch gallery:", err);

      setError(
        err instanceof Error
          ? err.message
          : "Terjadi kesalahan saat mengambil galeri."
      );
    } finally {
      setLoading(false);
    }
  }, [page, reload]);

  useEffect(() => {
    fetchMedia();
  }, [fetchMedia]);

  useEffect(() => {
    if (!selectedMedia) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setSelectedMedia(null);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [selectedMedia]);

  return (
    <>
      <PageMeta
        title="Galeri"
        description="Dokumentasi kegiatan dan aktivitas SMK RK Bintang Timur Pematangsiantar."
      />

      <main className="min-h-screen bg-white">
        {/* HERO */}
        <section className="relative overflow-hidden bg-[#082B66] py-24 md:py-32">
          <div className="absolute inset-0 bg-gradient-to-br from-[#0B3D91] via-[#082B66] to-[#061B40]" />

          <div className="absolute -right-20 -top-20 h-80 w-80 rounded-full bg-[#FFD600]/10 blur-3xl" />
          <div className="absolute -bottom-32 -left-20 h-96 w-96 rounded-full bg-blue-400/10 blur-3xl" />

          <div className="relative mx-auto max-w-7xl px-6">
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="max-w-3xl"
            >
              <span className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-semibold text-[#FFD600]">
                <ImageIcon size={16} />
                Dokumentasi Sekolah
              </span>

              <h1 className="text-4xl font-extrabold leading-tight text-white md:text-6xl">
                Galeri{" "}
                <span className="text-[#FFD600]">
                  Kegiatan Sekolah
                </span>
              </h1>

              <p className="mt-6 max-w-2xl text-base leading-relaxed text-blue-100 md:text-lg">
                Kumpulan dokumentasi kegiatan, aktivitas pembelajaran,
                prestasi, dan berbagai momen berharga keluarga besar
                SMK RK Bintang Timur Pematangsiantar.
              </p>

              <div className="mt-8 h-1.5 w-24 rounded-full bg-[#FFD600]" />
            </motion.div>
          </div>
        </section>

        {/* GALLERY */}
        <section className="py-20">
          <div className="mx-auto max-w-7xl px-6">
            <div className="mb-10 flex flex-col justify-between gap-4 md:flex-row md:items-end">
              <div>
                <span className="text-sm font-bold uppercase tracking-widest text-[#0B3D91]">
                  Momen Sekolah
                </span>

                <h2 className="mt-2 text-3xl font-extrabold text-gray-900 md:text-4xl">
                  Dokumentasi Kegiatan
                </h2>

                <p className="mt-3 max-w-xl text-gray-500">
                  Jelajahi berbagai aktivitas dan momen berharga
                  di lingkungan sekolah kami.
                </p>
              </div>

              {!loading && !error && (
                <div className="text-sm text-gray-500">
                  Menampilkan {media.length} dari {pagination.total} foto
                </div>
              )}
            </div>

            {/* ERROR */}
            {error && (
              <div className="rounded-2xl border border-red-200 bg-red-50 p-8 text-center">
                <p className="font-semibold text-red-700">{error}</p>

                <button
                  onClick={() => setReload((value) => value + 1)}
                  className="mt-5 inline-flex items-center gap-2 rounded-xl bg-[#0B3D91] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#082B66]"
                >
                  <RefreshCw size={16} />
                  Coba Lagi
                </button>
              </div>
            )}

            {/* LOADING */}
            {loading && (
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {Array.from({ length: 8 }).map((_, index) => (
                  <div
                    key={index}
                    className="overflow-hidden rounded-2xl border border-gray-100"
                  >
                    <div className="aspect-[4/3] animate-pulse bg-gray-200" />

                    <div className="space-y-3 p-4">
                      <div className="h-4 w-3/4 animate-pulse rounded bg-gray-200" />
                      <div className="h-3 w-1/2 animate-pulse rounded bg-gray-100" />
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* EMPTY */}
            {!loading && !error && media.length === 0 && (
              <div className="rounded-2xl border border-dashed border-gray-300 py-20 text-center">
                <ImageIcon
                  size={48}
                  className="mx-auto text-gray-300"
                />

                <h3 className="mt-5 text-xl font-bold text-gray-800">
                  Belum Ada Dokumentasi
                </h3>

                <p className="mt-2 text-gray-500">
                  Dokumentasi kegiatan sekolah akan ditampilkan di sini.
                </p>
              </div>
            )}

            {/* GALLERY GRID */}
            {!loading && !error && media.length > 0 && (
              <motion.div
                layout
                className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
              >
                {media.map((item, index) => {
                  const imageUrl = getMediaUrl(item);

                  return (
                    <motion.button
                      key={item.id}
                      layout
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        duration: 0.4,
                        delay: index * 0.04,
                      }}
                      onClick={() => setSelectedMedia(item)}
                      className="group overflow-hidden rounded-2xl border border-gray-100 bg-white text-left shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl"
                    >
                      <div className="relative aspect-[4/3] overflow-hidden bg-gray-100">
                        {imageUrl ? (
                          <img
                            src={imageUrl}
                            alt={getMediaTitle(item)}
                            loading="lazy"
                            className="h-full w-full object-cover transition duration-700 group-hover:scale-110"
                          />
                        ) : (
                          <div className="flex h-full items-center justify-center text-gray-300">
                            <ImageIcon size={48} />
                          </div>
                        )}

                        <div className="absolute inset-0 flex items-center justify-center bg-[#082B66]/0 transition duration-300 group-hover:bg-[#082B66]/50">
                          <ZoomIn
                            size={32}
                            className="scale-75 text-white opacity-0 transition duration-300 group-hover:scale-100 group-hover:opacity-100"
                          />
                        </div>
                      </div>

                      <div className="p-5">
                        <h3 className="line-clamp-2 font-bold text-gray-900 transition group-hover:text-[#0B3D91]">
                          {getMediaTitle(item)}
                        </h3>

                        {item.description && (
                          <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-gray-500">
                            {item.description}
                          </p>
                        )}

                        {item.created_at && (
                          <div className="mt-4 flex items-center gap-2 text-xs text-gray-400">
                            <CalendarDays size={14} />
                            {formatDate(item.created_at)}
                          </div>
                        )}
                      </div>
                    </motion.button>
                  );
                })}
              </motion.div>
            )}

            {/* PAGINATION */}
            {!loading && !error && pagination.last_page > 1 && (
              <div className="mt-12 flex flex-wrap items-center justify-center gap-2">
                <button
                  disabled={page <= 1}
                  onClick={() => {
                    setPage((current) => Math.max(1, current - 1));
                    window.scrollTo({ top: 500, behavior: "smooth" });
                  }}
                  className="flex h-11 w-11 items-center justify-center rounded-xl border border-gray-200 text-gray-600 transition hover:border-[#0B3D91] hover:text-[#0B3D91] disabled:cursor-not-allowed disabled:opacity-40"
                  aria-label="Halaman sebelumnya"
                >
                  <ChevronLeft size={20} />
                </button>

                <span className="px-4 text-sm font-semibold text-gray-600">
                  Halaman {pagination.current_page} dari {pagination.last_page}
                </span>

                <button
                  disabled={page >= pagination.last_page}
                  onClick={() => {
                    setPage((current) =>
                      Math.min(pagination.last_page, current + 1)
                    );
                    window.scrollTo({ top: 500, behavior: "smooth" });
                  }}
                  className="flex h-11 w-11 items-center justify-center rounded-xl border border-gray-200 text-gray-600 transition hover:border-[#0B3D91] hover:text-[#0B3D91] disabled:cursor-not-allowed disabled:opacity-40"
                  aria-label="Halaman berikutnya"
                >
                  <ChevronRight size={20} />
                </button>
              </div>
            )}
          </div>
        </section>

        {/* LIGHTBOX */}
        <AnimatePresence>
          {selectedMedia && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedMedia(null)}
              className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4 backdrop-blur-sm"
            >
              <button
                onClick={() => setSelectedMedia(null)}
                className="absolute right-5 top-5 z-10 rounded-full bg-white/10 p-3 text-white transition hover:bg-white/20"
                aria-label="Tutup galeri"
              >
                <X size={24} />
              </button>

              <motion.div
                initial={{ scale: 0.9, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.9, y: 20 }}
                onClick={(event) => event.stopPropagation()}
                className="w-full max-w-5xl overflow-hidden rounded-2xl bg-white"
              >
                {getMediaUrl(selectedMedia) && (
                  <img
                    src={getMediaUrl(selectedMedia)}
                    alt={getMediaTitle(selectedMedia)}
                    className="max-h-[75vh] w-full bg-black object-contain"
                  />
                )}

                <div className="p-5 md:p-6">
                  <h3 className="text-lg font-bold text-gray-900">
                    {getMediaTitle(selectedMedia)}
                  </h3>

                  {selectedMedia.description && (
                    <p className="mt-2 text-sm leading-relaxed text-gray-500">
                      {selectedMedia.description}
                    </p>
                  )}

                  {selectedMedia.created_at && (
                    <p className="mt-3 text-xs text-gray-400">
                      {formatDate(selectedMedia.created_at)}
                    </p>
                  )}
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </>
  );
}