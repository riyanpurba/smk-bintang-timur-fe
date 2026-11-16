import { useEffect, useState } from "react";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import { Link } from "react-router-dom";
import { FaImages } from "react-icons/fa";

import SectionHeading from "../Common/SectionHeading";
import ImageWithSkeleton from "../Common/ImageWithSkeleton";
import { getMedia } from "../../services/mediaService";
import type { MediaItem } from "../../types/media";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];
const API_BASE_URL = import.meta.env.VITE_API_URL ?? "";
const API_ORIGIN = API_BASE_URL.replace(/\/api\/v1\/?$/, "");

const grid: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};
const tile: Variants = {
  hidden: { opacity: 0, scale: 0.9, y: 30 },
  show: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.8, ease: EASE } },
};

function getCover(item: MediaItem): string | undefined {
  const path = item.cover_url || item.thumbnail_url || item.image_url || item.url || item.file_url || item.path;
  if (!path) return undefined;
  if (/^https?:\/\//i.test(path)) return path;
  return `${API_ORIGIN}/${path.replace(/^\/+/, "")}`;
}

const GallerySection = () => {
  const reduce = useReducedMotion();
  const [galleries, setGalleries] = useState<MediaItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const controller = new AbortController();
    setLoading(true);
    setError(false);
    getMedia({ page: 1, limit: 5 }, controller.signal)
      .then((result) => {
        if (!controller.signal.aborted) setGalleries(result.media.slice(0, 5));
      })
      .catch(() => {
        if (!controller.signal.aborted) setError(true);
      })
      .finally(() => {
        if (!controller.signal.aborted) setLoading(false);
      });
    return () => controller.abort();
  }, []);

  return (
    <section className="bg-white py-20 md:py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <SectionHeading
          label="Galeri Sekolah"
          title="Momen dan Cerita"
          accent="Sekolah Kami"
          description="Dokumentasi berbagai kegiatan, pengalaman, dan kebersamaan keluarga besar SMK RK Bintang Timur Pematangsiantar."
          link={{ to: "/galeri", text: "Lihat Semua Galeri", icon: <FaImages /> }}
        />

        {loading ? (
          <div className="grid auto-rows-[200px] grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-4">
            {Array.from({ length: 5 }).map((_, index) => <div key={index} className="animate-pulse rounded-2xl bg-gray-200" />)}
          </div>
        ) : error ? (
          <div className="rounded-2xl border border-red-100 bg-white px-6 py-12 text-center text-sm text-gray-600">
            Galeri belum dapat dimuat. Silakan kunjungi halaman galeri.
            <div><Link to="/galeri" className="mt-3 inline-block font-bold text-[#E11D2E]">Lihat Semua Galeri</Link></div>
          </div>
        ) : galleries.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-gray-300 px-6 py-12 text-center text-sm text-gray-600">
            Belum ada dokumentasi galeri yang dipublikasikan.
          </div>
        ) : (
          <motion.div
            className="grid auto-rows-[200px] grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-4"
            variants={grid}
            initial={reduce ? "show" : "hidden"}
            whileInView="show"
            viewport={{ once: true, amount: 0.1 }}
          >
            {galleries.map((item, index) => {
              const image = getCover(item);
              const title = item.title || item.name || "Dokumentasi Sekolah";
              return (
                <motion.div
                  key={item.id}
                  variants={tile}
                  className={`group relative overflow-hidden rounded-2xl bg-gray-200 ${index === 0 ? "md:col-span-2 md:row-span-2" : ""}`}
                >
                  {image ? (
                    <ImageWithSkeleton src={image} alt={title} wrapperClassName="absolute inset-0" className="h-full w-full object-cover transition duration-700 group-hover:scale-110" />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center bg-[#082B66] text-5xl text-white/70"><FaImages /></div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A]/90 via-[#0A0A0A]/10 to-transparent opacity-80 transition-opacity duration-300 group-hover:opacity-100" />
                  <span className="absolute inset-x-0 bottom-0 h-1 origin-left scale-x-0 bg-[#E11D2E] transition-transform duration-500 group-hover:scale-x-100" />
                  <div className="absolute bottom-0 left-0 translate-y-2 p-5 transition-transform duration-500 group-hover:translate-y-0">
                    <span className="mb-2 inline-block rounded-full bg-[#FFD600] px-3 py-1 text-xs font-bold text-[#0A0A0A]">Dokumentasi</span>
                    <h3 className="text-lg font-bold text-white">{title}</h3>
                    <p className="mt-1 text-xs text-white/80">{item.photo_count ? `${item.photo_count} foto` : "Lihat dokumentasi"}</p>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default GallerySection;
