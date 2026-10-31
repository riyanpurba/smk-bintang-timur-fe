import type { ReactNode } from "react";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import { FaTrophy, FaMedal, FaAward } from "react-icons/fa";

import SectionHeading from "../Common/SectionHeading";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

interface AchievementItem {
  title: string;
  category: string;
  level: string;
  year: string;
  image: string;
  icon: ReactNode;
}

const achievements: AchievementItem[] = [
  {
    title: "Juara 1 Kompetisi Akademik",
    category: "Akademik",
    level: "Tingkat Kota",
    year: "2025",
    image: "/images/achievement-1.jpg",
    icon: <FaTrophy />,
  },
  {
    title: "Juara 2 Kompetisi Olahraga",
    category: "Olahraga",
    level: "Tingkat Provinsi",
    year: "2025",
    image: "/images/achievement-2.jpg",
    icon: <FaMedal />,
  },
  {
    title: "Penghargaan Kreativitas Siswa",
    category: "Kreativitas",
    level: "Tingkat Kota",
    year: "2024",
    image: "/images/achievement-3.jpg",
    icon: <FaAward />,
  },
];

const grid: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.15 } },
};
const card: Variants = {
  hidden: { opacity: 0, y: 48 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: EASE } },
};
const badge: Variants = {
  hidden: { opacity: 0, x: -20 },
  show: { opacity: 1, x: 0, transition: { duration: 0.6, ease: EASE, delay: 0.5 } },
};
const year: Variants = {
  hidden: { opacity: 0, scale: 0 },
  show: { opacity: 1, scale: 1, transition: { type: "spring", stiffness: 260, damping: 14, delay: 0.6 } },
};

const AchievementCenter = () => {
  const reduce = useReducedMotion();

  return (
    <section className="bg-white py-20 md:py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <SectionHeading
          label="Pusat Prestasi"
          title="Prestasi dan"
          accent="Kebanggaan Kami"
          description="Setiap pencapaian merupakan bukti semangat, kerja keras, dan dedikasi siswa dalam mengembangkan potensi diri."
          link={{ to: "/prestasi", text: "Lihat Semua Prestasi" }}
        />

        {/* Achievement Cards */}
        <motion.div
          className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"
          variants={grid}
          initial={reduce ? "show" : "hidden"}
          whileInView="show"
          viewport={{ once: true, amount: 0.15 }}
        >
          {achievements.map((item) => (
            <motion.article
              key={item.title}
              variants={card}
              whileHover={reduce ? undefined : { y: -8 }}
              className="group overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition-shadow duration-300 hover:shadow-xl"
            >
              <div className="relative h-56 overflow-hidden bg-gray-100">
                <img
                  src={item.image}
                  alt={item.title}
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-110"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A]/80 to-transparent" />

                <motion.div
                  variants={badge}
                  className="absolute bottom-4 left-4 flex items-center gap-2 rounded-full bg-[#FFD600] px-4 py-2 text-xs font-bold text-[#0A0A0A]"
                >
                  {item.icon}
                  {item.category}
                </motion.div>

                <motion.span
                  variants={year}
                  className="absolute right-4 top-4 rounded-full bg-white/90 px-3 py-1.5 text-xs font-bold text-[#0A0A0A]"
                >
                  {item.year}
                </motion.span>
              </div>

              <div className="p-6">
                <span className="text-xs font-bold text-[#E11D2E]">
                  {item.level}
                </span>

                <h3 className="mt-2 text-lg font-bold leading-snug text-[#0A0A0A] transition-colors duration-300 group-hover:text-[#E11D2E]">
                  {item.title}
                </h3>

                <div className="mt-5 h-1 w-12 rounded-full bg-[#FFD600] transition-all duration-300 group-hover:w-20 group-hover:bg-[#E11D2E]" />
              </div>
            </motion.article>
          ))}
        </motion.div>

        {/* Bottom Highlight */}
        <motion.div
          className="relative mt-12 overflow-hidden rounded-2xl bg-[#0A0A0A] p-8 text-center md:p-10"
          initial={reduce ? false : { opacity: 0, scale: 0.94 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.8, ease: EASE }}
        >
          {/* Light sweep */}
          {!reduce && (
            <motion.div
              className="pointer-events-none absolute inset-y-0 w-1/3 bg-gradient-to-r from-transparent via-white/10 to-transparent"
              initial={{ x: "-150%" }}
              animate={{ x: "450%" }}
              transition={{ duration: 2.4, ease: "easeInOut", repeat: Infinity, repeatDelay: 5 }}
              aria-hidden="true"
            />
          )}
          <span className="absolute inset-x-0 top-0 h-[3px] bg-gradient-to-r from-[#E11D2E] via-[#FFD600] to-[#E11D2E]" />

          <div className="relative mx-auto mb-4 flex h-16 w-16 items-center justify-center">
            {!reduce && (
              <motion.span
                className="absolute inset-0 rounded-full border-2 border-[#FFD600]"
                animate={{ scale: [1, 1.8], opacity: [0.6, 0] }}
                transition={{ duration: 2, ease: "easeOut", repeat: Infinity }}
                aria-hidden="true"
              />
            )}
            <motion.div
              animate={reduce ? undefined : { rotate: [0, -10, 10, -6, 0] }}
              transition={{ duration: 1.2, repeat: Infinity, repeatDelay: 3 }}
            >
              <FaTrophy className="text-4xl text-[#FFD600]" />
            </motion.div>
          </div>

          <h3 className="relative text-xl font-extrabold text-white md:text-2xl">
            Setiap Prestasi Adalah Awal dari Kesuksesan
          </h3>

          <p className="relative mx-auto mt-3 max-w-2xl text-sm leading-7 text-white/70">
            Terus berkarya, berprestasi, dan menjadi kebanggaan sekolah.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default AchievementCenter;
