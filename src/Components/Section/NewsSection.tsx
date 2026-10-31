import { motion, useReducedMotion, type Variants } from "framer-motion";
import { Link } from "react-router-dom";
import { FaArrowRight, FaCalendarAlt, FaUser } from "react-icons/fa";

import SectionHeading from "../Common/SectionHeading";
import ImageWithSkeleton from "../Common/ImageWithSkeleton";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

interface NewsItem {
  id: number;
  category: string;
  title: string;
  excerpt: string;
  date: string;
  author: string;
  image: string;
}

const news: NewsItem[] = [
  {
    id: 1,
    category: "Kegiatan Sekolah",
    title: "Kegiatan Pembelajaran dan Pengembangan Kreativitas Siswa",
    excerpt:
      "Berbagai kegiatan pembelajaran dilaksanakan untuk meningkatkan pengetahuan, keterampilan, dan kreativitas siswa.",
    date: "30 Oktober 2026",
    author: "Admin Sekolah",
    image: "/images/news-1.jpg",
  },
  {
    id: 2,
    category: "Informasi",
    title: "Informasi Kegiatan Akademik Sekolah",
    excerpt: "Informasi terbaru mengenai kegiatan akademik dan agenda sekolah.",
    date: "25 Oktober 2026",
    author: "Admin Sekolah",
    image: "/images/news-2.jpg",
  },
  {
    id: 3,
    category: "Pengumuman",
    title: "Pengumuman dan Agenda Kegiatan Sekolah",
    excerpt: "Simak informasi dan pengumuman terbaru dari SMK RK Bintang Timur.",
    date: "20 Oktober 2026",
    author: "Admin Sekolah",
    image: "/images/news-3.jpg",
  },
];

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

const NewsSection = () => {
  const reduce = useReducedMotion();
  const initial = reduce ? "show" : "hidden";
  const viewport = { once: true, amount: 0.15 } as const;
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

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-5">
          {/* Featured News */}
          <motion.article
            variants={fromLeft}
            initial={initial}
            whileInView="show"
            viewport={viewport}
            className="group overflow-hidden rounded-2xl bg-white shadow-sm transition-shadow duration-300 hover:shadow-xl lg:col-span-3"
          >
            <div className="relative h-64 overflow-hidden md:h-80">
              <ImageWithSkeleton
                src={featuredNews.image}
                alt={featuredNews.title}
                wrapperClassName="relative h-full w-full"
                className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
              />

              <span className="absolute left-5 top-5 rounded-full bg-[#FFD600] px-4 py-2 text-xs font-bold text-[#0A0A0A]">
                {featuredNews.category}
              </span>

              <span className="absolute inset-x-0 bottom-0 h-1 origin-left scale-x-0 bg-[#E11D2E] transition-transform duration-500 group-hover:scale-x-100" />
            </div>

            <div className="p-6 md:p-8">
              <div className="mb-4 flex flex-wrap items-center gap-4 text-xs text-gray-500">
                <span className="flex items-center gap-2">
                  <FaCalendarAlt className="text-[#E11D2E]" />
                  {featuredNews.date}
                </span>
                <span className="flex items-center gap-2">
                  <FaUser className="text-[#E11D2E]" />
                  {featuredNews.author}
                </span>
              </div>

              <h3 className="text-xl font-extrabold leading-snug text-[#0A0A0A] transition-colors duration-300 group-hover:text-[#E11D2E] md:text-2xl">
                {featuredNews.title}
              </h3>

              <p className="mt-4 text-sm leading-7 text-gray-600">
                {featuredNews.excerpt}
              </p>

              <Link
                to={`/berita/${featuredNews.id}`}
                className="group/link mt-6 inline-flex items-center gap-3 text-sm font-bold text-[#0A0A0A] transition-colors hover:text-[#E11D2E]"
              >
                Baca Selengkapnya
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#FFD600] text-[#0A0A0A] transition-all duration-300 group-hover/link:translate-x-1 group-hover/link:bg-[#E11D2E] group-hover/link:text-white">
                  <FaArrowRight className="text-xs" />
                </span>
              </Link>
            </div>
          </motion.article>

          {/* Other News */}
          <motion.div
            className="flex flex-col gap-5 lg:col-span-2"
            variants={listV}
            initial={initial}
            whileInView="show"
            viewport={viewport}
          >
            {otherNews.map((item) => (
              <motion.article
                key={item.id}
                variants={fromRight}
                whileHover={reduce ? undefined : { x: 6 }}
                className="group relative flex flex-col gap-4 overflow-hidden rounded-2xl bg-white p-4 shadow-sm transition-shadow duration-300 hover:shadow-xl sm:flex-row"
              >
                <span className="absolute inset-y-0 left-0 w-1 origin-top scale-y-0 bg-[#E11D2E] transition-transform duration-300 group-hover:scale-y-100" />

                <div className="h-48 shrink-0 overflow-hidden rounded-xl sm:h-32 sm:w-36">
                  <ImageWithSkeleton
                    src={item.image}
                    alt={item.title}
                    wrapperClassName="relative h-full w-full"
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                  />
                </div>

                <div className="flex flex-1 flex-col justify-center">
                  <span className="text-xs font-bold text-[#E11D2E]">
                    {item.category}
                  </span>

                  <h3 className="mt-2 line-clamp-2 font-bold leading-snug text-[#0A0A0A] transition-colors duration-300 group-hover:text-[#E11D2E]">
                    {item.title}
                  </h3>

                  <span className="mt-3 flex items-center gap-2 text-xs text-gray-500">
                    <FaCalendarAlt />
                    {item.date}
                  </span>

                  <Link
                    to={`/berita/${item.id}`}
                    className="group/link mt-3 inline-flex w-fit items-center gap-2 text-sm font-bold text-[#0A0A0A] transition-colors hover:text-[#E11D2E]"
                  >
                    Baca Berita
                    <FaArrowRight className="text-xs transition-transform duration-300 group-hover/link:translate-x-2" />
                  </Link>
                </div>
              </motion.article>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default NewsSection;
