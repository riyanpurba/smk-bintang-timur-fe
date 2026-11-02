import { useEffect, useMemo, useState } from "react";
import {
  FaSearch,
  FaGraduationCap,
  FaLaptopCode,
  FaBriefcase,
  FaTools,
  FaBookOpen,
  FaArrowRight,
  FaCheckCircle,
  FaUsers,
  FaLightbulb,
  FaStar,
  FaRedo,
} from "react-icons/fa";

import { motion, useReducedMotion } from "framer-motion";
import type { Variants } from "framer-motion";
import { Link } from "react-router-dom";

import PageMeta from "../Components/Common/PageMeta";
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import { fetchMajors } from "../features/majors/majorsSlice";
import type { Major } from "../features/majors/majorsSlice";

const PAGE_LIMIT = 10;

const ease = [0.22, 1, 0.36, 1] as const;

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease },
  },
};

const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.05,
    },
  },
};

const cardVariant: Variants = {
  hidden: {
    opacity: 0,
    y: 30,
    scale: 0.97,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.55, ease },
  },
};

const iconMap: Record<string, React.ReactNode> = {
  technology: <FaLaptopCode />,
  teknologi: <FaLaptopCode />,
  business: <FaBriefcase />,
  bisnis: <FaBriefcase />,
  engineering: <FaTools />,
  teknik: <FaTools />,
};

const colorMap: Record<string, string> = {
  technology: "from-blue-600 to-indigo-800",
  teknologi: "from-blue-600 to-indigo-800",
  business: "from-amber-500 to-orange-700",
  bisnis: "from-amber-500 to-orange-700",
  engineering: "from-emerald-500 to-teal-800",
  teknik: "from-emerald-500 to-teal-800",
};

const getMajorIcon = (major: Major) => {
  const key = (major.category ?? "").toLowerCase();

  return (
    iconMap[key] ?? <FaGraduationCap />
  );
};

const getMajorColor = (major: Major) => {
  const key = (major.category ?? "").toLowerCase();

  return colorMap[key] ?? "from-[#0B3D91] to-[#082B66]";
};

const getSkills = (major: Major): string[] => {
  if (Array.isArray(major.skills) && major.skills.length > 0) {
    return major.skills;
  }

  return [
    "Kompetensi Keahlian",
    "Pembelajaran Berbasis Praktik",
    "Pengembangan Profesional",
  ];
};

// SKELETON
const MajorSkeleton = () => (
  <div className="overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm">
    <div className="animate-shimmer h-52 bg-slate-200" />

    <div className="space-y-5 p-6">
      <div className="flex justify-between">
        <div className="animate-shimmer h-6 w-24 rounded-full bg-slate-200" />
        <div className="animate-shimmer h-4 w-16 rounded bg-slate-200" />
      </div>

      <div className="animate-shimmer h-6 w-3/4 rounded bg-slate-200" />

      <div className="space-y-2">
        <div className="animate-shimmer h-3 w-full rounded bg-slate-200" />
        <div className="animate-shimmer h-3 w-5/6 rounded bg-slate-200" />
        <div className="animate-shimmer h-3 w-4/6 rounded bg-slate-200" />
      </div>

      <div className="h-px bg-slate-100" />

      <div className="animate-shimmer h-4 w-1/2 rounded bg-slate-200" />

      {[1, 2, 3].map((item) => (
        <div key={item} className="flex items-center gap-3">
          <div className="animate-shimmer h-4 w-4 rounded-full bg-slate-200" />
          <div className="animate-shimmer h-3 flex-1 rounded bg-slate-200" />
        </div>
      ))}
    </div>
  </div>
);

const MajorSkeletonGrid = () => (
  <div className="grid grid-cols-1 gap-7 md:grid-cols-2 lg:grid-cols-3">
    {Array.from({ length: 6 }).map((_, index) => (
      <motion.div
        key={index}
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.07 }}
      >
        <MajorSkeleton />
      </motion.div>
    ))}
  </div>
);

// MAJOR CARD
interface MajorCardProps {
  major: Major;
  shouldReduceMotion: boolean | null;
}

const MajorCard = ({
  major,
  shouldReduceMotion,
}: MajorCardProps) => {
  const skills = getSkills(major);

  return (
    <motion.article
      variants={cardVariant}
      whileHover={
        shouldReduceMotion ? undefined : { y: -9 }
      }
      className="group overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm transition-all duration-500 hover:border-[#0B3D91]/20 hover:shadow-2xl hover:shadow-[#082B66]/10"
    >
      {/* HEADER */}
      <div
        className={`relative flex h-52 items-center justify-center overflow-hidden bg-gradient-to-br ${getMajorColor(
          major
        )}`}
      >
        <div className="absolute -right-10 -top-10 h-48 w-48 rounded-full border border-white/10" />

        <div className="absolute -bottom-24 -left-10 h-64 w-64 rounded-full border border-white/10" />

        {major.image ? (
          <img
            src={major.image}
            alt={major.name}
            loading="lazy"
            className="absolute inset-0 h-full w-full object-cover"
          />
        ) : (
          <motion.div
            whileHover={
              shouldReduceMotion
                ? undefined
                : { scale: 1.12, rotate: 8 }
            }
            transition={{ duration: 0.4 }}
            className="relative flex h-24 w-24 items-center justify-center rounded-3xl border border-white/20 bg-white/10 text-5xl text-white shadow-2xl backdrop-blur-md"
          >
            {getMajorIcon(major)}
          </motion.div>
        )}

        {major.featured && (
          <div className="absolute right-5 top-5 flex items-center gap-2 rounded-full bg-[#FFD600] px-3 py-1.5 text-[10px] font-extrabold uppercase tracking-wider text-[#082B66]">
            <FaStar />
            Unggulan
          </div>
        )}

        <div className="absolute bottom-0 left-0 h-1 w-full bg-gradient-to-r from-[#E11D2E] via-[#FFD600] to-[#E11D2E]" />
      </div>

      {/* BODY */}
      <div className="p-6">
        <div className="flex items-center justify-between gap-3">
          <span className="rounded-full bg-[#0B3D91]/5 px-3 py-1.5 text-[10px] font-extrabold uppercase tracking-wider text-[#0B3D91]">
            {major.category || "Program Keahlian"}
          </span>

          {/* <span className="text-xs font-bold text-slate-400">
            {major.abbreviation || `ID-${major.id}`}
          </span> */}
        </div>

        <h3 className="mt-5 text-xl font-extrabold text-[#082B66] transition-colors group-hover:text-[#0B3D91]">
          {major.name}
        </h3>

        <p className="mt-3 min-h-[84px] text-sm leading-7 text-slate-500">
          {major.description ||
            "Informasi program keahlian dan kompetensi pembelajaran SMK RK Bintang Timur."}
        </p>

        <div className="my-5 h-px bg-slate-100" />

        <h4 className="mb-4 text-xs font-extrabold uppercase tracking-wider text-[#082B66]">
          Kompetensi Pembelajaran
        </h4>

        <div className="space-y-3">
          {skills.map((skill, index) => (
            <div
              key={`${major.id}-${index}`}
              className="flex items-center gap-3 text-sm text-slate-500"
            >
              <FaCheckCircle className="shrink-0 text-[#0B3D91]" />
              {skill}
            </div>
          ))}
        </div>

        <div className="mt-7 flex items-center justify-between border-t border-slate-100 pt-5">
          <span className="text-xs font-bold text-slate-400">
            SMK RK Bintang Timur
          </span>

          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#FFD600]/20 text-[#082B66] transition-colors group-hover:bg-[#FFD600]">
            <FaArrowRight />
          </div>
        </div>
      </div>
    </motion.article>
  );
};

// EMPTY STATE
const EmptyState = ({
  onReset,
}: {
  onReset: () => void;
}) => (
  <div className="rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-20 text-center">
    <FaSearch className="mx-auto text-3xl text-slate-300" />

    <h3 className="mt-5 text-lg font-bold text-[#082B66]">
      Program tidak ditemukan
    </h3>

    <p className="mt-2 text-sm text-slate-500">
      Coba gunakan kata kunci atau kategori lainnya.
    </p>

    <button
      type="button"
      onClick={onReset}
      className="mt-6 rounded-lg bg-[#0B3D91] px-5 py-3 text-xs font-bold text-white transition-colors hover:bg-[#082B66]"
    >
      Reset Pencarian
    </button>
  </div>
);

// ERROR STATE
const ErrorState = ({
  message,
  onRetry,
}: {
  message: string;
  onRetry: () => void;
}) => (
  <div className="rounded-2xl border border-red-100 bg-white px-6 py-16 text-center">
    <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-red-50 text-xl text-red-500">
      <FaRedo />
    </div>

    <h3 className="mt-5 text-lg font-bold text-[#082B66]">
      Gagal Memuat Program Keahlian
    </h3>

    <p className="mt-2 text-sm text-slate-500">
      {message}
    </p>

    <button
      type="button"
      onClick={onRetry}
      className="mt-6 inline-flex items-center gap-2 rounded-lg bg-[#0B3D91] px-5 py-3 text-xs font-bold text-white transition-colors hover:bg-[#082B66]"
    >
      <FaRedo />
      Coba Lagi
    </button>
  </div>
);

const Majors = () => {
  const dispatch = useAppDispatch();

  const {
    data: majors,
    loading,
    error,
    total,
    currentPage,
    lastPage,
  } = useAppSelector((state) => state.majors);

  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("Semua");

  const shouldReduceMotion = useReducedMotion();

  // FETCH API
  useEffect(() => {
    dispatch(
      fetchMajors({
        page: 1,
        limit: PAGE_LIMIT,
      })
    );
  }, [dispatch]);

  // CATEGORY DINAMIS DARI API
  const categories = useMemo(() => {
    const uniqueCategories = Array.from(
      new Set(
        majors
          .map((major) => major.category)
          .filter((category): category is string => Boolean(category))
      )
    );

    return ["Semua", ...uniqueCategories];
  }, [majors]);

  // SEARCH & FILTER
  const filteredMajors = useMemo(() => {
    const keyword = search.trim().toLowerCase();

    return majors.filter((major) => {
      const matchesSearch =
        !keyword ||
        major.name?.toLowerCase().includes(keyword) ||
        major.abbreviation?.toLowerCase().includes(keyword) ||
        major.description?.toLowerCase().includes(keyword) ||
        major.category?.toLowerCase().includes(keyword);

      const matchesCategory =
        activeCategory === "Semua" ||
        major.category === activeCategory;

      return matchesSearch && matchesCategory;
    });
  }, [majors, search, activeCategory]);

  const resetFilters = () => {
    setSearch("");
    setActiveCategory("Semua");
  };

  const handlePageChange = (page: number) => {
    dispatch(
      fetchMajors({
        page,
        limit: PAGE_LIMIT,
      })
    );

    window.scrollTo({
      top: document.getElementById("major-directory")?.offsetTop ?? 0,
      behavior: "smooth",
    });
  };

  const animationProps = shouldReduceMotion
    ? {}
    : {
        initial: "hidden" as const,
        whileInView: "visible" as const,
        viewport: {
          once: true,
          amount: 0.15,
        },
      };

  return (
    <>
      <PageMeta
        title="Program Keahlian"
        description="Kenali program keahlian SMK RK Bintang Timur Pematangsiantar. Temukan informasi bidang keahlian, kompetensi, dan pembelajaran untuk mempersiapkan masa depan."
        keywords={[
          "Jurusan SMK Bintang Timur",
          "Program Keahlian SMK",
          "Jurusan SMK Pematangsiantar",
          "SMK RK Bintang Timur Pematangsiantar",
          "Pendidikan Kejuruan",
        ]}
        path="/jurusan"
      />

      <main className="min-h-screen overflow-hidden bg-[#F8FAFC]">
        {/* HERO */}
        <section className="relative overflow-hidden bg-[#082B66] py-24 text-white lg:py-32">
          <div className="absolute -right-32 -top-32 h-[450px] w-[450px] rounded-full bg-[#E11D2E]/20 blur-[120px]" />

          <div className="absolute -bottom-40 left-1/4 h-[400px] w-[400px] rounded-full bg-[#FFD600]/10 blur-[120px]" />

          <div className="absolute inset-0 opacity-[0.06]">
            <div
              className="h-full w-full"
              style={{
                backgroundImage:
                  "linear-gradient(rgba(255,255,255,.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.5) 1px, transparent 1px)",
                backgroundSize: "50px 50px",
              }}
            />
          </div>

          <div className="container relative z-10 mx-auto px-5 lg:px-8">
            <motion.div
              className="max-w-3xl"
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
            >
              <motion.div
                variants={fadeUp}
                className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#FFD600]/30 bg-[#FFD600]/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-[#FFD600]"
              >
                <FaGraduationCap />
                Pendidikan & Kompetensi Keahlian
              </motion.div>

              <motion.h1
                variants={fadeUp}
                className="text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl lg:text-7xl"
              >
                Temukan
                <span className="block text-[#FFD600]">
                  Potensi & Bakatmu.
                </span>
              </motion.h1>

              <motion.p
                variants={fadeUp}
                className="mt-7 max-w-2xl text-base leading-8 text-white/70 sm:text-lg"
              >
                Pilih program keahlian yang sesuai dengan minat dan
                potensimu. Kembangkan keterampilan, kreativitas, dan
                kompetensi untuk mempersiapkan masa depan.
              </motion.p>

              <motion.div
                variants={fadeUp}
                className="mt-9 flex flex-wrap items-center gap-3 text-sm font-semibold text-white/80"
              >
                <Link to="/" className="transition-colors hover:text-[#FFD600]">
                  Beranda
                </Link>

                <FaArrowRight className="text-xs text-[#FFD600]" />

                <span className="text-[#FFD600]">
                  Program Keahlian
                </span>
              </motion.div>
            </motion.div>
          </div>

          <div className="absolute bottom-0 left-0 h-1 w-full bg-gradient-to-r from-[#E11D2E] via-[#FFD600] to-[#E11D2E]" />
        </section>

        {/* STATISTICS */}
        <section className="relative z-20 mx-auto -mt-10 max-w-6xl px-5 lg:px-8">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            {[
              {
                icon: <FaGraduationCap />,
                value: loading && total === 0 ? "..." : total,
                label: "Program Keahlian",
              },
              {
                icon: <FaBookOpen />,
                value: "Praktik",
                label: "Pembelajaran Berbasis Kompetensi",
              },
              {
                icon: <FaUsers />,
                value: "Terarah",
                label: "Pengembangan Potensi Siswa",
              },
            ].map((item) => (
              <motion.div
                key={item.label}
                variants={cardVariant}
                initial={shouldReduceMotion ? false : "hidden"}
                whileInView={shouldReduceMotion ? undefined : "visible"}
                viewport={{ once: true, amount: 0.3 }}
                whileHover={shouldReduceMotion ? undefined : { y: -8 }}
                className="group flex items-center gap-4 rounded-2xl border border-slate-100 bg-white p-6 shadow-xl shadow-slate-200/50 transition-shadow duration-300 hover:shadow-2xl"
              >
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-[#0B3D91]/10 text-2xl text-[#0B3D91] transition-colors group-hover:bg-[#FFD600]">
                  {item.icon}
                </div>

                <div>
                  <h3 className="text-xl font-extrabold text-[#082B66]">
                    {item.value}
                  </h3>

                  <p className="mt-1 text-xs font-medium text-slate-500">
                    {item.label}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* DIRECTORY */}
        <section
          id="major-directory"
          className="container mx-auto px-5 py-20 lg:px-8 lg:py-28"
        >
          <div className="mb-10 flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
            <div>
              <span className="text-xs font-extrabold uppercase tracking-[0.2em] text-[#E11D2E]">
                Our Programs
              </span>

              <h2 className="mt-3 text-3xl font-extrabold text-[#082B66] sm:text-4xl">
                Program Keahlian
              </h2>

              <p className="mt-4 max-w-xl text-sm leading-7 text-slate-500 sm:text-base">
                Jelajahi berbagai program keahlian dan temukan bidang
                pembelajaran yang sesuai dengan minat serta cita-citamu.
              </p>
            </div>

            <div className="inline-flex items-center gap-3 self-start rounded-xl bg-[#0B3D91]/5 px-5 py-3 text-sm font-bold text-[#0B3D91]">
              <FaGraduationCap />
              Direktori Jurusan
            </div>
          </div>

          {/* SEARCH & FILTER */}
          <motion.div
            variants={fadeUp}
            {...animationProps}
            className="mb-10 rounded-2xl border border-slate-100 bg-white p-4 shadow-sm sm:p-5"
          >
            <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
              <div className="relative w-full lg:max-w-md">
                <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />

                <input
                  type="text"
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  placeholder="Cari nama atau bidang keahlian..."
                  className="w-full rounded-xl border border-slate-200 bg-[#F8FAFC] py-3.5 pl-11 pr-4 text-sm text-slate-700 outline-none transition-all placeholder:text-slate-400 focus:border-[#0B3D91] focus:ring-4 focus:ring-[#0B3D91]/10"
                />
              </div>

              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <button
                    key={category}
                    type="button"
                    onClick={() => setActiveCategory(category)}
                    className={`rounded-lg px-4 py-2.5 text-xs font-bold transition-all duration-300 ${
                      activeCategory === category
                        ? "bg-[#0B3D91] text-white shadow-lg shadow-[#0B3D91]/20"
                        : "bg-slate-100 text-slate-500 hover:bg-[#FFD600] hover:text-[#082B66]"
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>

          {/* API STATUS & DATA */}
          {loading ? (
            <MajorSkeletonGrid />
          ) : error ? (
            <ErrorState
              message={error}
              onRetry={() =>
                dispatch(
                  fetchMajors({
                    page: currentPage,
                    limit: PAGE_LIMIT,
                  })
                )
              }
            />
          ) : filteredMajors.length > 0 ? (
            <motion.div
              variants={staggerContainer}
              {...animationProps}
              className="grid grid-cols-1 gap-7 md:grid-cols-2 lg:grid-cols-3"
            >
              {filteredMajors.map((major) => (
                <MajorCard
                  key={major.id}
                  major={major}
                  shouldReduceMotion={shouldReduceMotion}
                />
              ))}
            </motion.div>
          ) : (
            <EmptyState onReset={resetFilters} />
          )}

          {/* PAGINATION */}
          {!loading && !error && lastPage > 1 && (
            <div className="mt-12 flex flex-wrap items-center justify-center gap-2">
              <button
                type="button"
                disabled={currentPage <= 1}
                onClick={() => handlePageChange(currentPage - 1)}
                className="rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm font-bold text-slate-600 transition-colors hover:border-[#0B3D91] hover:text-[#0B3D91] disabled:cursor-not-allowed disabled:opacity-40"
              >
                Sebelumnya
              </button>

              {Array.from({ length: lastPage }, (_, index) => index + 1).map(
                (page) => (
                  <button
                    key={page}
                    type="button"
                    onClick={() => handlePageChange(page)}
                    className={`h-10 min-w-10 rounded-lg px-3 text-sm font-bold transition-colors ${
                      currentPage === page
                        ? "bg-[#0B3D91] text-white"
                        : "border border-slate-200 bg-white text-slate-600 hover:border-[#0B3D91] hover:text-[#0B3D91]"
                    }`}
                  >
                    {page}
                  </button>
                )
              )}

              <button
                type="button"
                disabled={currentPage >= lastPage}
                onClick={() => handlePageChange(currentPage + 1)}
                className="rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm font-bold text-slate-600 transition-colors hover:border-[#0B3D91] hover:text-[#0B3D91] disabled:cursor-not-allowed disabled:opacity-40"
              >
                Berikutnya
              </button>
            </div>
          )}

          {!loading && !error && total > 0 && (
            <p className="mt-5 text-center text-xs text-slate-400">
              Menampilkan {filteredMajors.length} program pada halaman{" "}
              {currentPage} dari {total} program keahlian.
            </p>
          )}
        </section>

        {/* WHY CHOOSE US */}
        <section className="bg-white py-20 lg:py-24">
          <div className="container mx-auto px-5 lg:px-8">
            <motion.div
              variants={fadeUp}
              {...animationProps}
              className="mx-auto mb-14 max-w-2xl text-center"
            >
              <span className="text-xs font-extrabold uppercase tracking-[0.2em] text-[#E11D2E]">
                Learning Experience
              </span>

              <h2 className="mt-3 text-3xl font-extrabold text-[#082B66] sm:text-4xl">
                Belajar, Berkembang,
                <span className="text-[#0B3D91]"> Berprestasi.</span>
              </h2>

              <p className="mt-5 text-sm leading-7 text-slate-500 sm:text-base">
                Pendidikan kejuruan menjadi bagian dari perjalanan
                mengembangkan potensi, keterampilan, dan karakter
                peserta didik.
              </p>
            </motion.div>

            <motion.div
              variants={staggerContainer}
              {...animationProps}
              className="grid grid-cols-1 gap-6 md:grid-cols-3"
            >
              {[
                {
                  icon: <FaBookOpen />,
                  title: "Pembelajaran Terarah",
                  description:
                    "Proses pembelajaran yang dirancang untuk mendukung penguasaan kompetensi peserta didik.",
                },
                {
                  icon: <FaTools />,
                  title: "Pengembangan Keterampilan",
                  description:
                    "Kesempatan mengembangkan kemampuan melalui kegiatan praktik sesuai program keahlian.",
                },
                {
                  icon: <FaLightbulb />,
                  title: "Kreativitas & Inovasi",
                  description:
                    "Mendorong siswa untuk berpikir kreatif, mandiri, dan siap menghadapi tantangan.",
                },
              ].map((item) => (
                <motion.div
                  key={item.title}
                  variants={cardVariant}
                  whileHover={shouldReduceMotion ? undefined : { y: -8 }}
                  className="rounded-2xl border border-slate-100 bg-[#F8FAFC] p-8 transition-all duration-300 hover:border-[#0B3D91]/20 hover:bg-white hover:shadow-xl"
                >
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#0B3D91]/10 text-2xl text-[#0B3D91]">
                    {item.icon}
                  </div>

                  <h3 className="mt-6 text-lg font-extrabold text-[#082B66]">
                    {item.title}
                  </h3>

                  <p className="mt-3 text-sm leading-7 text-slate-500">
                    {item.description}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* CTA */}
        <section className="relative overflow-hidden bg-[#082B66] py-20">
          <div className="absolute -right-20 -top-32 h-80 w-80 rounded-full bg-[#FFD600]/10 blur-[100px]" />

          <div className="absolute -bottom-32 -left-20 h-80 w-80 rounded-full bg-[#E11D2E]/10 blur-[100px]" />

          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, y: 40 }}
            whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, ease }}
            className="container relative z-10 mx-auto flex flex-col items-center justify-between gap-8 px-5 text-center lg:flex-row lg:px-8 lg:text-left"
          >
            <div>
              <span className="text-xs font-extrabold uppercase tracking-[0.2em] text-[#FFD600]">
                Start Your Future
              </span>

              <h2 className="mt-3 text-2xl font-extrabold text-white sm:text-3xl">
                Siapkan Masa Depanmu Bersama Kami
              </h2>

              <p className="mt-3 max-w-xl text-sm leading-7 text-white/60">
                Temukan program keahlian yang tepat dan mulailah perjalanan
                pendidikanmu bersama SMK RK Bintang Timur.
              </p>
            </div>

            <Link
              to="/ppdb"
              className="inline-flex shrink-0 items-center gap-3 rounded-xl bg-[#FFD600] px-7 py-4 text-sm font-extrabold text-[#082B66] transition-all duration-300 hover:-translate-y-1 hover:bg-white"
            >
              Informasi PPDB
              <FaArrowRight />
            </Link>
          </motion.div>
        </section>
      </main>
    </>
  );
};

export default Majors;