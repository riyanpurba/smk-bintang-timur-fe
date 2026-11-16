import { useEffect, useState } from "react";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import { Link } from "react-router-dom";
import { FaArrowRight, FaCalendarAlt, FaUser, FaNewspaper } from "react-icons/fa";

import SectionHeading from "../Common/SectionHeading";
import ImageWithSkeleton from "../Common/ImageWithSkeleton";
import { getPosts } from "../../services/newsService";
import type { NewsPost } from "../../types/news";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];
const API_BASE_URL = import.meta.env.VITE_API_URL ?? "";
const API_ORIGIN = API_BASE_URL.replace(/\/api\/v1\/?$/, "");

const fromLeft: Variants = {
  hidden: { opacity: 0, x: -48 },
  show: { opacity: 1, x: 0, transition: { duration: 0.9, ease: EASE } },
};
const listV: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.18, delayChildren: 0.2 } },
};
const fromRight: Variants = {
  hidden: { opacity: 0, x: 48 },
  show: { opacity: 1, x: 0, transition: { duration: 0.8, ease: EASE } },
};

function getImage(post: NewsPost): string | undefined {
  const image = post.thumbnail_url || post.image_url || post.image;
  if (!image) return undefined;
  if (/^https?:\/\//i.test(image)) return image;
  return `${API_ORIGIN}/${image.replace(/^\/+/, "")}`;
}

function getCategory(post: NewsPost): string {
  if (post.category_name) return post.category_name;
  if (typeof post.category === "string") return post.category;
  return post.category?.name || "Informasi Sekolah";
}

function getAuthor(post: NewsPost): string {
  return post.author_name || (typeof post.author === "string" ? post.author : post.author?.name) || "Admin Sekolah";
}

function formatDate(value?: string | null): string {
  if (!value) return "Tanggal belum tersedia";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "Tanggal belum tersedia";
  return new Intl.DateTimeFormat("id-ID", { day: "numeric", month: "long", year: "numeric" }).format(date);
}

const NewsSection = () => {
  const reduce = useReducedMotion();
  const initial = reduce ? "show" : "hidden";
  const viewport = { once: true, amount: 0.15 } as const;
  const [news, setNews] = useState<NewsPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const controller = new AbortController();
    setLoading(true);
    setError(false);
    getPosts({ page: 1, limit: 3 }, controller.signal)
      .then((result) => {
        if (!controller.signal.aborted) setNews(result.posts.slice(0, 3));
      })
      .catch(() => {
        if (!controller.signal.aborted) setError(true);
      })
      .finally(() => {
        if (!controller.signal.aborted) setLoading(false);
      });
    return () => controller.abort();
  }, []);

  const [featuredNews, ...otherNews] = news;

  return (
    <section className="bg-[#F5F5F5] py-20 md:py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <SectionHeading
          label="Informasi & Berita"
          title="Kabar Terbaru"
          accent="Sekolah"
          description="Temukan informasi, kegiatan, dan berita terbaru seputar SMK RK Bintang Timur Pematangsiantar."
          link={{ to: "/berita", text: "Lihat Semua Berita" }}
        />

        {loading ? (
          <div className="grid gap-5 lg:grid-cols-5">
            <div className="h-80 animate-pulse rounded-2xl bg-gray-200 lg:col-span-3" />
            <div className="space-y-5 lg:col-span-2">
              <div className="h-36 animate-pulse rounded-2xl bg-gray-200" />
              <div className="h-36 animate-pulse rounded-2xl bg-gray-200" />
            </div>
          </div>
        ) : error ? (
          <div className="rounded-2xl border border-red-100 bg-white px-6 py-12 text-center">
            <FaNewspaper className="mx-auto text-3xl text-gray-400" />
            <p className="mt-3 text-sm text-gray-600">Berita belum dapat dimuat. Silakan kunjungi halaman berita.</p>
            <Link to="/berita" className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-[#E11D2E]">Lihat Berita <FaArrowRight /></Link>
          </div>
        ) : news.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-gray-300 bg-white px-6 py-12 text-center">
            <FaNewspaper className="mx-auto text-3xl text-gray-400" />
            <p className="mt-3 text-sm text-gray-600">Belum ada berita yang dipublikasikan.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-5">
            <motion.article
              variants={fromLeft}
              initial={initial}
              whileInView="show"
              viewport={viewport}
              className="group overflow-hidden rounded-2xl bg-white shadow-sm transition-shadow duration-300 hover:shadow-xl lg:col-span-3"
            >
              <Link to={`/berita/${featuredNews.slug}`} className="block">
                <div className="relative h-64 overflow-hidden md:h-80">
                  {getImage(featuredNews) ? (
                    <ImageWithSkeleton src={getImage(featuredNews)!} alt={featuredNews.title} wrapperClassName="relative h-full w-full" className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
                  ) : (
                    <div className="flex h-full items-center justify-center bg-[#082B66] text-5xl text-white/70"><FaNewspaper /></div>
                  )}
                  <span className="absolute left-5 top-5 rounded-full bg-[#FFD600] px-4 py-2 text-xs font-bold text-[#0A0A0A]">{getCategory(featuredNews)}</span>
                  <span className="absolute inset-x-0 bottom-0 h-1 origin-left scale-x-0 bg-[#E11D2E] transition-transform duration-500 group-hover:scale-x-100" />
                </div>
                <div className="p-6 md:p-8">
                  <div className="mb-4 flex flex-wrap items-center gap-4 text-xs text-gray-500">
                    <span className="flex items-center gap-2"><FaCalendarAlt className="text-[#E11D2E]" />{formatDate(featuredNews.published_at || featuredNews.created_at)}</span>
                    <span className="flex items-center gap-2"><FaUser className="text-[#E11D2E]" />{getAuthor(featuredNews)}</span>
                  </div>
                  <h3 className="text-xl font-extrabold leading-snug text-[#0A0A0A] transition-colors duration-300 group-hover:text-[#E11D2E] md:text-2xl">{featuredNews.title}</h3>
                  <p className="mt-4 line-clamp-3 text-sm leading-7 text-gray-600">{featuredNews.excerpt || "Baca informasi selengkapnya mengenai berita ini."}</p>
                  <span className="group/link mt-6 inline-flex items-center gap-3 text-sm font-bold text-[#0A0A0A] transition-colors hover:text-[#E11D2E]">Baca Selengkapnya <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#FFD600] text-[#0A0A0A]"><FaArrowRight className="text-xs" /></span></span>
                </div>
              </Link>
            </motion.article>

            <motion.div className="flex flex-col gap-5 lg:col-span-2" variants={listV} initial={initial} whileInView="show" viewport={viewport}>
              {otherNews.map((item) => (
                <motion.article key={item.id} variants={fromRight} whileHover={reduce ? undefined : { x: 6 }} className="group relative flex flex-col gap-4 overflow-hidden rounded-2xl bg-white p-4 shadow-sm transition-shadow duration-300 hover:shadow-xl sm:flex-row">
                  <span className="absolute inset-y-0 left-0 w-1 origin-top scale-y-0 bg-[#E11D2E] transition-transform duration-300 group-hover:scale-y-100" />
                  <Link to={`/berita/${item.slug}`} className="h-48 shrink-0 overflow-hidden rounded-xl sm:h-32 sm:w-36">
                    {getImage(item) ? <ImageWithSkeleton src={getImage(item)!} alt={item.title} wrapperClassName="relative h-full w-full" className="h-full w-full object-cover transition duration-500 group-hover:scale-105" /> : <div className="flex h-full items-center justify-center bg-[#082B66] text-3xl text-white/70"><FaNewspaper /></div>}
                  </Link>
                  <div className="flex flex-1 flex-col justify-center">
                    <span className="text-xs font-bold text-[#E11D2E]">{getCategory(item)}</span>
                    <Link to={`/berita/${item.slug}`} className="mt-2 line-clamp-2 font-bold leading-snug text-[#0A0A0A] transition-colors duration-300 group-hover:text-[#E11D2E]">{item.title}</Link>
                    <span className="mt-3 flex items-center gap-2 text-xs text-gray-500"><FaCalendarAlt />{formatDate(item.published_at || item.created_at)}</span>
                    <Link to={`/berita/${item.slug}`} className="group/link mt-3 inline-flex w-fit items-center gap-2 text-sm font-bold text-[#0A0A0A] transition-colors hover:text-[#E11D2E]">Baca Berita <FaArrowRight className="text-xs transition-transform duration-300 group-hover/link:translate-x-2" /></Link>
                  </div>
                </motion.article>
              ))}
            </motion.div>
          </div>
        )}
      </div>
    </section>
  );
};

export default NewsSection;
