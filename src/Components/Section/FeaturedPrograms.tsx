import type { PointerEvent, ReactNode } from "react";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import { FaLaptopCode, FaBriefcase, FaUserGraduate, FaAward } from "react-icons/fa";

import SectionHeading from "../Common/SectionHeading";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

interface ProgramItem {
  title: string;
  description: string;
  icon: ReactNode;
  number: string;
}

const programs: ProgramItem[] = [
  {
    number: "01",
    title: "Pembelajaran Berbasis Praktik",
    description:
      "Mengembangkan keterampilan siswa melalui pembelajaran teori dan praktik yang seimbang.",
    icon: <FaLaptopCode />,
  },
  {
    number: "02",
    title: "Pengembangan Kewirausahaan",
    description:
      "Mendorong kreativitas, kemandirian, dan jiwa wirausaha untuk menghadapi dunia kerja.",
    icon: <FaBriefcase />,
  },
  {
    number: "03",
    title: "Pengembangan Karakter",
    description:
      "Membentuk siswa yang disiplin, bertanggung jawab, berintegritas, dan berkarakter.",
    icon: <FaUserGraduate />,
  },
  {
    number: "04",
    title: "Pengembangan Prestasi",
    description:
      "Mendukung potensi dan bakat siswa melalui kegiatan akademik maupun nonakademik.",
    icon: <FaAward />,
  },
];

const grid: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
};
const card: Variants = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
};
const bar: Variants = {
  hidden: { scaleX: 0 },
  show: { scaleX: 1, transition: { duration: 0.7, ease: EASE, delay: 0.4 } },
};
const icon: Variants = {
  hidden: { scale: 0, rotate: -45 },
  show: { scale: 1, rotate: 0, transition: { type: "spring", stiffness: 260, damping: 14, delay: 0.2 } },
};

const FeaturedPrograms = () => {
  const reduce = useReducedMotion();

  // Spotlight merah mengikuti kursor di dalam kartu
  const handleMove = (e: PointerEvent<HTMLDivElement>) => {
    const el = e.currentTarget;
    const r = el.getBoundingClientRect();
    el.style.setProperty("--x", `${e.clientX - r.left}px`);
    el.style.setProperty("--y", `${e.clientY - r.top}px`);
  };

  return (
    <section className="bg-[#F5F5F5] py-20 md:py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <SectionHeading
          label="Program Unggulan"
          title="Mempersiapkan Generasi"
          accent="Masa Depan"
          description="Berbagai program pengembangan untuk membekali siswa dengan pengetahuan, keterampilan, dan karakter yang unggul."
          link={{ to: "/profil", text: "Selengkapnya" }}
        />

        <motion.div
          className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4"
          variants={grid}
          initial={reduce ? "show" : "hidden"}
          whileInView="show"
          viewport={{ once: true, amount: 0.15 }}
        >
          {programs.map((program) => (
            <motion.div
              key={program.number}
              variants={card}
              whileHover={reduce ? undefined : { y: -8 }}
              onPointerMove={handleMove}
              className="group relative overflow-hidden rounded-2xl border border-gray-200 bg-white p-7 shadow-sm transition-shadow duration-300 hover:shadow-xl"
            >
              {/* Cursor spotlight */}
              <div
                className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                style={{
                  background:
                    "radial-gradient(220px circle at var(--x, 50%) var(--y, 50%), rgba(225,29,46,0.10), transparent 70%)",
                }}
                aria-hidden="true"
              />

              {/* Top line sweep */}
              <span className="absolute inset-x-0 top-0 h-[3px] origin-left scale-x-0 bg-[#E11D2E] transition-transform duration-500 group-hover:scale-x-100" />

              <div className="absolute right-5 top-5 text-4xl font-extrabold text-gray-200 transition-colors duration-300 group-hover:text-[#FFD600]">
                {program.number}
              </div>

              <motion.div
                variants={icon}
                className="relative mb-7 flex h-14 w-14 items-center justify-center rounded-xl bg-[#0A0A0A]/5 text-2xl text-[#E11D2E] transition-colors duration-300 group-hover:bg-[#E11D2E] group-hover:text-white"
              >
                {program.icon}
              </motion.div>

              <h3 className="relative mb-3 text-lg font-bold text-[#0A0A0A]">
                {program.title}
              </h3>

              <p className="relative text-sm leading-7 text-gray-600">
                {program.description}
              </p>

              <motion.div
                variants={bar}
                className="relative mt-6 h-1 w-10 origin-left rounded-full bg-[#FFD600] transition-[width] duration-300 group-hover:w-20"
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturedPrograms;
