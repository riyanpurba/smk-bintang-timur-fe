
import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  FaArrowRight,
  FaCalendarAlt,
  FaSearch,
  FaNewspaper,
  FaChevronLeft,
  FaChevronRight,
  FaClock,
} from "react-icons/fa";
import { Link } from "react-router-dom";

import PageMeta from "../Components/Common/PageMeta";
import { getPosts } from "../services/newsService";
import type { NewsPost, PostsPagination } from "../types/news";

const ITEMS_PER_PAGE = 10;

// Sesuaikan jika backend mengembalikan URL gambar relatif.
const API_BASE_URL = import.meta.env.VITE_API_URL ?? "";

const API_ORIGIN = API_BASE_URL.replace(/\/api\/v1\/?$/, "");

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  },
};

function getCategory(post: NewsPost): string {
  if (typeof post.category === "string") return post.category;
  return post.category?.name || "Informasi Sekolah";
}

function getAuthor(post: NewsPost): string {
  if (typeof post.author === "string") return post.author;
  return post.author?.name || "Admin Sekolah";
}

function getImage(post: NewsPost): string | null {
  const image = post.thumbnail_url || post.image_url || post.image;

  if (!image) return null;

  if (/^https?:\/\//i.test(image)) return image;

  return `${API_ORIGIN}/${image.replace(/^\/+/, "")}`;
}

function formatDate(date?: string | null): string {
  if (!date) return "Tanggal belum tersedia";

  const parsedDate = new Date(date);

  if (Number.isNaN(parsedDate.getTime())) return "Tanggal tidak valid";

  return new Intl.DateTimeFormat("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(parsedDate);
}

function NewsImage({
  post,
  featured = false,
}: {
  post: NewsPost;
  featured?: boolean;
}) {
  const [imageError, setImageError] = useState(false);
  const image = getImage(post);
  console.log(image)

  return (
    <div
      className={`relative overflow-hidden bg-gradient-to-br from-[#082B66] to-[#0B3D91] ${
        featured ? "aspect-[16/10] md:aspect-auto" : "aspect-[16/10]"
      }`}
    >
      {image && !imageError ? (
        <img
          src={image}
          alt={post.title}
          loading="lazy"
          onError={() => setImageError(true)}
          className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
        />
      ) : (
        <div className="flex h-full min-h-48 items-center justify-center text-white/70">
          <FaNewspaper className="text-5xl" />
        </div>
      )}

      <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />

      <span className="absolute left-4 top-4 rounded-full bg-[#FFD600] px-3 py-1.5 text-xs font-bold text-[#082B66]">
        {getCategory(post)}
      </span>
    </div>
  );
}

function NewsCard({ post }: { post: NewsPost }) {
  return (
    <motion.article
      variants={fadeUp}
      whileHover={{ y: -5 }}
      className="group overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition-shadow hover:shadow-xl"
    >
      <Link to={`/berita/${post.slug}`} className="block">
        <NewsImage post={post} />

        <div className="p-6">
          <div className="flex flex-wrap items-center gap-3 text-xs text-gray-400">
            <span className="inline-flex items-center gap-2">
              <FaCalendarAlt className="text-[#0B3D91]" />
              {formatDate(post.published_at || post.created_at)}
            </span>
            <span className="h-1 w-1 rounded-full bg-gray-300" />
            <span>{getAuthor(post)}</span>
          </div>

          <h3 className="mt-4 line-clamp-2 text-xl font-extrabold leading-snug text-gray-900 transition-colors group-hover:text-[#0B3D91]">
            {post.title}
          </h3>

          <p className="mt-3 line-clamp-3 text-sm leading-7 text-gray-500">
            {post.excerpt || "Baca informasi selengkapnya mengenai berita ini."}
          </p>

          <div className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-[#0B3D91]">
            Baca Selengkapnya
            <FaArrowRight className="transition-transform group-hover:translate-x-1" />
          </div>
        </div>
      </Link>
    </motion.article>
  );
}

function FeaturedNews({ post }: { post: NewsPost }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="group grid overflow-hidden rounded-3xl border border-gray-100 bg-[#F8FAFC] shadow-sm md:grid-cols-2"
    >
      <Link
        to={`/berita/${post.slug}`}
        className="block overflow-hidden"
        aria-label={`Baca ${post.title}`}
      >
        <NewsImage post={post} featured />
      </Link>

      <div className="flex flex-col justify-center p-7 md:p-12">
        <span className="text-sm font-bold text-[#0B3D91]">
          {getCategory(post)}
        </span>

        <h3 className="mt-4 text-2xl font-extrabold leading-tight text-gray-900 md:text-4xl">
          {post.title}
        </h3>

        <p className="mt-5 line-clamp-4 leading-8 text-gray-600">
          {post.excerpt || "Baca informasi selengkapnya mengenai berita ini."}
        </p>

        <div className="mt-6 flex flex-wrap items-center gap-4 text-xs text-gray-400">
          <span className="flex items-center gap-2">
            <FaCalendarAlt className="text-[#0B3D91]" />
            {formatDate(post.published_at || post.created_at)}
          </span>
          <span className="flex items-center gap-2">
            <FaClock className="text-[#0B3D91]" />
            {getAuthor(post)}
          </span>
        </div>

        <Link
          to={`/berita/${post.slug}`}
          className="mt-8 inline-flex w-fit items-center gap-3 rounded-xl bg-[#0B3D91] px-6 py-4 text-sm font-bold text-white transition hover:bg-[#082B66]"
        >
          Baca Berita
          <FaArrowRight />
        </Link>
      </div>
    </motion.article>
  );
}

function NewsSkeleton() {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: 6 }).map((_, index) => (
        <div
          key={index}
          className="overflow-hidden rounded-2xl border border-gray-100 bg-white"
        >
          <div className="aspect-[16/10] animate-pulse bg-gray-200" />
          <div className="space-y-4 p-6">
            <div className="h-3 w-1/3 animate-pulse rounded bg-gray-200" />
            <div className="h-6 w-full animate-pulse rounded bg-gray-200" />
            <div className="h-4 w-full animate-pulse rounded bg-gray-200" />
            <div className="h-4 w-2/3 animate-pulse rounded bg-gray-200" />
          </div>
        </div>
      ))}
    </div>
  );
}

export default function Berita() {
  const [posts, setPosts] = useState<NewsPost[]>([]);
  const [pagination, setPagination] = useState<PostsPagination>({
    current_page: 1,
    last_page: 1,
    per_page: ITEMS_PER_PAGE,
    total: 0,
  });

  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [reload, setReload] = useState(0);

  useEffect(() => {
    let mounted = true;

    const fetchPosts = async () => {
      try {
        setLoading(true);
        setError(null);

        const result = await getPosts({
          page,
          limit: ITEMS_PER_PAGE,
        });

        if (!mounted) return;

        setPosts(result.posts);
        setPagination(result.pagination);
      } catch (err) {
        if (!mounted) return;

        setError(
          err instanceof Error
            ? err.message
            : "Terjadi kesalahan saat mengambil berita."
        );
      } finally {
        if (mounted) setLoading(false);
      }
    };

    fetchPosts();

    return () => {
      mounted = false;
    };
  }, [page, reload]);

  const filteredPosts = useMemo(() => {
    const keyword = search.trim().toLowerCase();

    if (!keyword) return posts;

    return posts.filter((post) => {
      return (
        post.title.toLowerCase().includes(keyword) ||
        (post.excerpt || "").toLowerCase().includes(keyword)
      );
    });
  }, [posts, search]);

  const featuredPost =
    page === 1
      ? filteredPosts.find((post) => post.is_featured) || filteredPosts[0]
      : undefined;

  const regularPosts = featuredPost
    ? filteredPosts.filter((post) => post.id !== featuredPost.id)
    : filteredPosts;

  const changePage = (nextPage: number) => {
    if (nextPage < 1 || nextPage > pagination.last_page) return;
    setPage(nextPage);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <PageMeta
        title="Berita Sekolah"
        description="Berita, informasi, kegiatan, dan pengumuman SMK RK Bintang Timur Pematangsiantar."
      />

      {/* HERO */}
      <section className="relative flex min-h-[65vh] items-center overflow-hidden bg-gradient-to-br from-[#082B66] via-[#0B3D91] to-[#061D46] px-4 py-24 text-white md:min-h-[70vh]">
        <div className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full border-[55px] border-white/5" />
        <div className="pointer-events-none absolute -bottom-40 -left-32 h-[450px] w-[450px] rounded-full border-[60px] border-white/5" />

        <motion.div
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.12 } },
          }}
          className="relative mx-auto w-full max-w-7xl"
        >
          <motion.span
            variants={fadeUp}
            className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-bold text-yellow-300 backdrop-blur-sm"
          >
            <FaNewspaper />
            INFORMASI SEKOLAH
          </motion.span>

          <motion.h1
            variants={fadeUp}
            className="mt-7 max-w-4xl text-4xl font-extrabold leading-tight md:text-6xl"
          >
            Berita & Informasi
            <br />
            <span className="text-[#FFD600]">Sekolah Kami.</span>
          </motion.h1>

          <motion.p
            variants={fadeUp}
            className="mt-6 max-w-2xl text-base leading-8 text-blue-100 md:text-lg"
          >
            Ikuti informasi terbaru, kegiatan, prestasi, dan perkembangan
            pendidikan di SMK RK Bintang Timur Pematangsiantar.
          </motion.p>

          <motion.div
            variants={fadeUp}
            className="mt-8 flex gap-3 text-sm text-blue-100"
          >
            <Link to="/" className="transition hover:text-[#FFD600]">
              Beranda
            </Link>
            <span>/</span>
            <span className="font-semibold text-[#FFD600]">Berita</span>
          </motion.div>
        </motion.div>
      </section>

      {/* NEWS CONTENT */}
      <section className="bg-[#F8FAFC] px-4 py-16 md:py-20">
        <div className="mx-auto max-w-7xl">
          <div className="mb-9">
            <span className="text-sm font-bold uppercase tracking-[0.2em] text-[#0B3D91]">
              Kabar Terbaru
            </span>
            <h2 className="mt-3 text-3xl font-extrabold text-gray-900 md:text-4xl">
              Berita <span className="text-[#0B3D91]">Sekolah</span>
            </h2>
            <p className="mt-3 text-sm text-gray-500">
              Menampilkan {pagination.total} berita yang telah dipublikasikan.
            </p>
          </div>

          {/* SEARCH */}
          <div className="relative mb-9 max-w-md">
            <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="search"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Cari berita pada halaman ini..."
              className="w-full rounded-xl border border-gray-200 bg-white py-4 pl-11 pr-4 text-sm outline-none transition focus:border-[#0B3D91] focus:ring-2 focus:ring-blue-100"
            />
          </div>

          {loading ? (
            <NewsSkeleton />
          ) : error ? (
            <div className="rounded-3xl border border-red-100 bg-white px-6 py-16 text-center">
              <FaNewspaper className="mx-auto text-4xl text-red-400" />
              <h3 className="mt-5 text-xl font-extrabold text-gray-900">
                Gagal Memuat Berita
              </h3>
              <p className="mt-3 text-sm text-gray-500">{error}</p>
              <button
                type="button"
                onClick={() => setReload((value) => value + 1)}
                className="mt-6 rounded-xl bg-[#0B3D91] px-6 py-3 text-sm font-bold text-white hover:bg-[#082B66]"
              >
                Coba Lagi
              </button>
            </div>
          ) : filteredPosts.length > 0 ? (
            <>
              {featuredPost && (
                <div className="mb-12">
                  <div className="mb-6">
                    <span className="text-sm font-bold uppercase tracking-[0.2em] text-[#0B3D91]">
                      Pilihan Redaksi
                    </span>
                    <h3 className="mt-2 text-2xl font-extrabold text-gray-900">
                      Berita Unggulan
                    </h3>
                  </div>
                  <FeaturedNews post={featuredPost} />
                </div>
              )}

              {regularPosts.length > 0 && (
                <>
                  <div className="mb-6">
                    <h3 className="text-2xl font-extrabold text-gray-900">
                      Berita Terbaru
                    </h3>
                  </div>

                  <motion.div
                    key={`${page}-${search}`}
                    initial="hidden"
                    animate="visible"
                    variants={{
                      hidden: {},
                      visible: {
                        transition: { staggerChildren: 0.08 },
                      },
                    }}
                    className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
                  >
                    {regularPosts.map((post) => (
                      <NewsCard key={post.id} post={post} />
                    ))}
                  </motion.div>
                </>
              )}

              {regularPosts.length === 0 && !featuredPost && (
                <p className="text-gray-500">Tidak ada berita ditemukan.</p>
              )}
            </>
          ) : (
            <div className="rounded-3xl border border-gray-100 bg-white px-6 py-16 text-center shadow-sm">
              <FaNewspaper className="mx-auto text-4xl text-[#0B3D91]" />
              <h3 className="mt-5 text-xl font-extrabold text-gray-900">
                Belum Ada Berita
              </h3>
              <p className="mx-auto mt-3 max-w-md text-sm leading-7 text-gray-500">
                {search
                  ? "Berita tidak ditemukan pada halaman ini. Coba kata kunci lain."
                  : "Belum ada berita yang dipublikasikan."}
              </p>
            </div>
          )}

          {/* PAGINATION */}
          {!loading && !error && pagination.last_page > 1 && (
            <div className="mt-12 flex flex-wrap items-center justify-center gap-2">
              <button
                type="button"
                disabled={page <= 1}
                onClick={() => changePage(page - 1)}
                className="flex h-11 w-11 items-center justify-center rounded-xl border border-gray-200 bg-white text-gray-600 transition hover:border-[#0B3D91] hover:text-[#0B3D91] disabled:cursor-not-allowed disabled:opacity-40"
                aria-label="Halaman sebelumnya"
              >
                <FaChevronLeft />
              </button>

              {Array.from(
                { length: pagination.last_page },
                (_, index) => index + 1
              )
                .filter(
                  (number) =>
                    number === 1 ||
                    number === pagination.last_page ||
                    Math.abs(number - page) <= 1
                )
                .map((number, index, visiblePages) => {
                  const previous = visiblePages[index - 1];

                  return (
                    <span key={number} className="contents">
                      {previous && number - previous > 1 && (
                        <span className="px-1 text-gray-400">...</span>
                      )}
                      <button
                        type="button"
                        onClick={() => changePage(number)}
                        className={`h-11 min-w-11 rounded-xl px-3 text-sm font-bold transition ${
                          page === number
                            ? "bg-[#0B3D91] text-white"
                            : "border border-gray-200 bg-white text-gray-600 hover:border-[#0B3D91] hover:text-[#0B3D91]"
                        }`}
                      >
                        {number}
                      </button>
                    </span>
                  );
                })}

              <button
                type="button"
                disabled={page >= pagination.last_page}
                onClick={() => changePage(page + 1)}
                className="flex h-11 w-11 items-center justify-center rounded-xl border border-gray-200 bg-white text-gray-600 transition hover:border-[#0B3D91] hover:text-[#0B3D91] disabled:cursor-not-allowed disabled:opacity-40"
                aria-label="Halaman berikutnya"
              >
                <FaChevronRight />
              </button>
            </div>
          )}

          {!loading && !error && pagination.total > 0 && (
            <p className="mt-5 text-center text-xs text-gray-400">
              Halaman {pagination.current_page} dari {pagination.last_page}
              {" · "}
              Total {pagination.total} berita
            </p>
          )}
        </div>
      </section>
    </>
  );
}
