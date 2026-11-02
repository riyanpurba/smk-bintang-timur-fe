
import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  FaSearch,
  FaChalkboardTeacher,
  FaGraduationCap,
  FaUsers,
  FaArrowRight,
  FaUserTie,
  FaBriefcase,
  FaRedo,
} from "react-icons/fa";
import { motion, useReducedMotion } from "framer-motion";
import type { Variants } from "framer-motion";

import { useAppDispatch, useAppSelector } from "../hooks/redux";
import { fetchTeachers } from "../features/teachers/teachersSlice";
import PageMeta from "../Components/Common/PageMeta";

// ---------------------------------------------
// ANIMATION
// ---------------------------------------------

const ease = [0.22, 1, 0.36, 1] as const;

const fadeUp: Variants = {
  hidden: {
    opacity: 0,
    y: 30,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.65,
      ease,
    },
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
    y: 25,
    scale: 0.97,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.55,
      ease,
    },
  },
};

// ---------------------------------------------
// CONSTANTS
// ---------------------------------------------

const categories = ["Semua", "Pimpinan", "Guru", "Staff"];

const PAGE_LIMIT = 10;

// ---------------------------------------------
// LOADING SKELETON
// ---------------------------------------------

const TeacherSkeleton = () => {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      variants={cardVariant}
      className="overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm"
    >
      {/* Image skeleton */}
      <div className="relative h-64 overflow-hidden bg-slate-200">
        <div
          className={`absolute inset-0 bg-gradient-to-r from-transparent via-white/60 to-transparent ${
            shouldReduceMotion ? "" : "animate-shimmer"
          }`}
        />

        <div className="absolute left-5 top-5 h-6 w-20 rounded-full bg-white/40" />

        <div className="absolute inset-0 flex items-center justify-center">
          <div className="h-32 w-32 rounded-full bg-slate-300" />
        </div>
      </div>

      {/* Content skeleton */}
      <div className="space-y-5 p-6">
        <div className="h-5 w-3/4 rounded-md bg-slate-200" />

        <div className="h-4 w-1/2 rounded-md bg-slate-200" />

        <div className="h-px w-full bg-slate-100" />

        <div className="flex items-center gap-3">
          <div className="h-9 w-9 rounded-lg bg-slate-200" />
          <div className="h-4 w-2/3 rounded-md bg-slate-200" />
        </div>

        <div className="flex items-center justify-between border-t border-slate-100 pt-5">
          <div className="h-3 w-36 rounded-md bg-slate-200" />
          <div className="h-9 w-9 rounded-full bg-slate-200" />
        </div>
      </div>
    </motion.div>
  );
};

const TeacherSkeletonGrid = () => {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={staggerContainer}
      className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
    >
      {Array.from({ length: 6 }).map((_, index) => (
        <TeacherSkeleton key={index} />
      ))}
    </motion.div>
  );
};

// ---------------------------------------------
// EMPTY STATE
// ---------------------------------------------

const EmptyState = ({
  onReset,
}: {
  onReset: () => void;
}) => (
  <div className="rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-20 text-center">
    <FaSearch className="mx-auto text-3xl text-slate-300" />

    <h3 className="mt-5 text-lg font-bold text-[#082B66]">
      Data tidak ditemukan
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

// ---------------------------------------------
// ERROR STATE
// ---------------------------------------------

const ErrorState = ({
  message,
  onRetry,
}: {
  message: string;
  onRetry: () => void;
}) => (
  <div className="rounded-2xl border border-red-100 bg-white px-6 py-16 text-center shadow-sm">
    <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-red-50 text-xl text-red-500">
      <FaRedo />
    </div>

    <h3 className="mt-5 text-lg font-bold text-[#082B66]">
      Gagal Memuat Data
    </h3>

    <p className="mx-auto mt-2 max-w-md text-sm text-slate-500">
      {message || "Terjadi kesalahan saat mengambil data guru."}
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

// ---------------------------------------------
// TEACHER CARD
// ---------------------------------------------

interface TeacherCardProps {
  teacher: {
    id: number;
    name: string;
    position: string;
    subject: string;
    category: "Guru" | "Staff" | "Pimpinan";
    image?: string | null;
  };
  shouldReduceMotion: boolean | null;
}

const TeacherCard = ({
  teacher,
  shouldReduceMotion,
}: TeacherCardProps) => {
  const getInitials = (name: string) =>
    name
      .split(" ")
      .filter(Boolean)
      .slice(0, 2)
      .map((word) => word[0])
      .join("")
      .toUpperCase();

  return (
    <motion.article
      variants={cardVariant}
      whileHover={
        shouldReduceMotion
          ? undefined
          : {
              y: -8,
              transition: { duration: 0.3 },
            }
      }
      className="group overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm transition-shadow duration-500 hover:border-[#0B3D91]/20 hover:shadow-2xl hover:shadow-[#082B66]/10"
    >
      {/* Profile visual */}
      <div className="relative flex h-64 items-center justify-center overflow-hidden bg-gradient-to-br from-[#082B66] to-[#0B3D91]">
        <div className="absolute -right-10 -top-10 h-48 w-48 rounded-full border border-white/10" />

        <div className="absolute -bottom-24 -left-10 h-64 w-64 rounded-full border border-white/10" />

        {teacher.image ? (
          <motion.img
            src={teacher.image}
            alt={teacher.name}
            loading="lazy"
            whileHover={shouldReduceMotion ? undefined : { scale: 1.08 }}
            transition={{ duration: 0.6 }}
            className="h-full w-full object-cover object-top"
          />
        ) : (
          <motion.div
            whileHover={
              shouldReduceMotion
                ? undefined
                : { scale: 1.08, rotate: 5 }
            }
            transition={{ duration: 0.4 }}
            className="relative flex h-32 w-32 items-center justify-center rounded-full border-4 border-[#FFD600]/40 bg-white/10 text-4xl font-extrabold text-[#FFD600] shadow-2xl backdrop-blur-sm"
          >
            {getInitials(teacher.name)}
          </motion.div>
        )}

        <div className="absolute left-5 top-5 rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-white backdrop-blur-md">
          {teacher.category}
        </div>

        <div className="absolute bottom-0 left-0 h-1 w-full bg-gradient-to-r from-[#E11D2E] via-[#FFD600] to-[#E11D2E]" />
      </div>

      {/* Profile information */}
      <div className="p-6">
        <h3 className="text-lg font-extrabold text-[#082B66] transition-colors group-hover:text-[#0B3D91]">
          {teacher.name}
        </h3>

        <p className="mt-2 text-sm font-semibold text-[#E11D2E]">
          {teacher.position}
        </p>

        <div className="my-5 h-px bg-slate-100" />

        <div className="flex items-center gap-3 text-sm text-slate-500">
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#0B3D91]/5 text-[#0B3D91]">
            <FaBriefcase />
          </span>

          <span>{teacher.subject}</span>
        </div>

        <div className="mt-6 flex items-center justify-between border-t border-slate-100 pt-5">
          <span className="text-xs font-bold text-slate-400">
            SMK RK Bintang Timur
          </span>

          <motion.span
            whileHover={shouldReduceMotion ? undefined : { x: 5 }}
            className="flex h-9 w-9 items-center justify-center rounded-full bg-[#FFD600]/20 text-[#082B66] transition-colors group-hover:bg-[#FFD600]"
          >
            <FaArrowRight />
          </motion.span>
        </div>
      </div>
    </motion.article>
  );
};

// ---------------------------------------------
// MAIN COMPONENT
// ---------------------------------------------

const Teachers = () => {
  const dispatch = useAppDispatch();
  const shouldReduceMotion = useReducedMotion();

  const {
    data: teachers,
    loading,
    error,
    currentPage,
    lastPage,
    total,
  } = useAppSelector((state) => state.teachers);

  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("Semua");

  // Fetch teachers
  useEffect(() => {
    dispatch(fetchTeachers({ page: 1, limit: PAGE_LIMIT }));
  }, [dispatch]);

  // Filter teachers
  const filteredTeachers = useMemo(() => {
    const keyword = search.trim().toLowerCase();

    return teachers.filter((teacher) => {
      const matchesSearch =
        teacher.name?.toLowerCase().includes(keyword) ||
        teacher.subject?.toLowerCase().includes(keyword) ||
        teacher.position?.toLowerCase().includes(keyword);

      const matchesCategory =
        activeCategory === "Semua" ||
        teacher.category === activeCategory;

      return matchesSearch && matchesCategory;
    });
  }, [teachers, search, activeCategory]);

  const handleReset = () => {
    setSearch("");
    setActiveCategory("Semua");
  };

  const handlePageChange = (page: number) => {
    if (page < 1 || page > lastPage || loading) return;

    dispatch(fetchTeachers({ page, limit: PAGE_LIMIT }));
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
        title="Guru & Staff"
        description="Kenali tenaga pendidik dan kependidikan SMK RK Bintang Timur Pematangsiantar."
        keywords={[
          "Guru SMK RK Bintang Timur",
          "Staff SMK RK Bintang Timur",
          "Guru Pematangsiantar",
          "Tenaga Pendidik Pematangsiantar",
          "Tenaga Kependidikan",
          "SMK RK Bintang Timur Pematangsiantar",
        ]}
        path="/guru-staff"
      />

      <main className="min-h-screen overflow-hidden bg-[#F8FAFC]">
        {/* HERO SECTION */}
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
                Tenaga Pendidik & Kependidikan
              </motion.div>

              <motion.h1
                variants={fadeUp}
                className="text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl lg:text-7xl"
              >
                Mengenal
                <span className="block text-[#FFD600]">
                  Guru & Staff
                </span>
                Kami.
              </motion.h1>

              <motion.p
                variants={fadeUp}
                className="mt-7 max-w-2xl text-base leading-8 text-white/70 sm:text-lg"
              >
                Didukung oleh tenaga pendidik dan kependidikan yang
                berdedikasi untuk membimbing, menginspirasi, dan
                mempersiapkan generasi masa depan.
              </motion.p>

              <motion.div
                variants={fadeUp}
                className="mt-9 flex flex-wrap items-center gap-3 text-sm font-semibold text-white/80"
              >
                <Link to="/" className="transition-colors hover:text-[#FFD600]">
                  Beranda
                </Link>

                <FaArrowRight className="text-xs text-[#FFD600]" />

                <span className="text-[#FFD600]">Guru & Staff</span>
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
                icon: <FaUsers />,
                value: total,
                label: "Total Tenaga Pendidik",
              },
              {
                icon: <FaUserTie />,
                value: "Guru & Staff",
                label: "Tenaga Kependidikan",
              },
              {
                icon: <FaGraduationCap />,
                value: "Profesional",
                label: "Tim Pendidikan",
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
                    {loading ? '...' : item.value}
                  </h3>

                  <p className="mt-1 text-xs font-medium text-slate-500">
                    {item.label}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* TEACHER DIRECTORY */}
        <section className="container mx-auto px-5 py-20 lg:px-8 lg:py-28">
          {/* Section heading */}
          <div className="mb-10 flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
            <div>
              <span className="text-xs font-extrabold uppercase tracking-[0.2em] text-[#E11D2E]">
                Our Team
              </span>

              <h2 className="mt-3 text-3xl font-extrabold text-[#082B66] sm:text-4xl">
                Tim Pengajar & Staff
              </h2>

              <p className="mt-4 max-w-xl text-sm leading-7 text-slate-500 sm:text-base">
                Kenali para pendidik dan tenaga kependidikan yang
                menjadi bagian penting dalam perjalanan pendidikan
                siswa kami.
              </p>
            </div>

            <div className="inline-flex items-center gap-3 self-start rounded-xl bg-[#0B3D91]/5 px-5 py-3 text-sm font-bold text-[#0B3D91]">
              <FaChalkboardTeacher />
              Direktori Sekolah
            </div>
          </div>

          {/* Search and filters */}
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
                  placeholder="Cari nama, jabatan, atau bidang..."
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

          {/* Loading */}
          {loading && <TeacherSkeletonGrid />}

          {/* Error */}
          {!loading && error && (
            <ErrorState
              message={error}
              onRetry={() =>
                dispatch(
                  fetchTeachers({
                    page: currentPage,
                    limit: PAGE_LIMIT,
                  })
                )
              }
            />
          )}

          {/* Teacher cards */}
          {!loading && !error && filteredTeachers.length > 0 && (
            <motion.div
              variants={staggerContainer}
              {...animationProps}
              className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
            >
              {filteredTeachers.map((teacher) => (
                <TeacherCard
                  key={teacher.id}
                  teacher={teacher}
                  shouldReduceMotion={shouldReduceMotion}
                />
              ))}
            </motion.div>
          )}

          {/* Empty state */}
          {!loading && !error && filteredTeachers.length === 0 && (
            <EmptyState onReset={handleReset} />
          )}

          {/* Pagination */}
          {!loading && !error && total > 0 && (
            <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-slate-200 pt-8 sm:flex-row">
              <p className="text-sm text-slate-500">
                Menampilkan {teachers.length} dari {total} data
              </p>

              <div className="flex items-center gap-3">
                <button
                  type="button"
                  disabled={currentPage <= 1}
                  onClick={() => handlePageChange(currentPage - 1)}
                  className="rounded-lg border border-slate-200 px-4 py-2.5 text-sm font-bold text-slate-600 transition-colors hover:border-[#0B3D91] hover:text-[#0B3D91] disabled:cursor-not-allowed disabled:opacity-40"
                >
                  Previous
                </button>

                <span className="text-sm font-bold text-[#082B66]">
                  {currentPage} / {lastPage}
                </span>

                <button
                  type="button"
                  disabled={currentPage >= lastPage}
                  onClick={() => handlePageChange(currentPage + 1)}
                  className="rounded-lg border border-slate-200 px-4 py-2.5 text-sm font-bold text-slate-600 transition-colors hover:border-[#0B3D91] hover:text-[#0B3D91] disabled:cursor-not-allowed disabled:opacity-40"
                >
                  Next
                </button>
              </div>
            </div>
          )}
        </section>

        {/* CTA SECTION */}
        <section className="relative overflow-hidden bg-[#082B66] py-16">
          <div className="absolute -right-20 -top-32 h-80 w-80 rounded-full bg-[#FFD600]/10 blur-[100px]" />

          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, y: 40 }}
            whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, ease }}
            className="container relative z-10 mx-auto flex flex-col items-center justify-between gap-8 px-5 text-center lg:flex-row lg:px-8 lg:text-left"
          >
            <div>
              <h2 className="text-2xl font-extrabold text-white sm:text-3xl">
                Bersama Membangun Masa Depan
              </h2>

              <p className="mt-3 max-w-xl text-sm leading-7 text-white/60">
                Pendidikan berkualitas dimulai dari tenaga pendidik
                yang berdedikasi dan lingkungan belajar yang mendukung.
              </p>
            </div>

            <Link
              to="/kontak"
              className="inline-flex shrink-0 items-center gap-3 rounded-xl bg-[#FFD600] px-7 py-4 text-sm font-extrabold text-[#082B66] transition-all duration-300 hover:-translate-y-1 hover:bg-white"
            >
              Hubungi Kami
              <FaArrowRight />
            </Link>
          </motion.div>
        </section>
      </main>
    </>
  );
};

export default Teachers;
