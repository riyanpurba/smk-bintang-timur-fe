
import { useEffect, useRef } from "react";
import type { PointerEvent, ReactNode } from "react";
import { Link } from "react-router-dom";
import {
  motion,
  animate,
  useMotionValue,
  useSpring,
  useTransform,
  useReducedMotion,
} from "framer-motion";
import type { Variants } from "framer-motion";
import {
  FaArrowRight,
  FaGraduationCap,
  FaBookOpen,
  FaAward,
  FaPlay,
} from "react-icons/fa";

import Banner from "../../assets/Images/banner.jpg";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

interface Highlight {
  icon: ReactNode;
  title: string;
  description: string;
}

interface Stat {
  to: number;
  suffix: string;
  label: string;
  pos: string;
  delay: number;
}

interface CounterProps {
  to: number;
  suffix?: string;
  delay?: number;
}

interface StatChipProps extends Stat {}

const highlights: Highlight[] = [
  {
    icon: <FaGraduationCap size={20} />,
    title: "Pendidikan",
    description: "Berkualitas",
  },
  {
    icon: <FaBookOpen size={19} />,
    title: "Keterampilan",
    description: "Siap Berkarya",
  },
  {
    icon: <FaAward size={20} />,
    title: "Karakter",
    description: "Berintegritas",
  },
];

// TODO: Ganti dengan data asli sekolah
const stats: Stat[] = [
  {
    to: 800,
    suffix: "+",
    label: "Siswa aktif",
    pos: "left-0 top-[14%]",
    delay: 1.3,
  },
  {
    to: 4,
    suffix: "",
    label: "Kompetensi keahlian",
    pos: "right-0 top-[44%]",
    delay: 1.5,
  },
  {
    to: 30,
    suffix: "+",
    label: "Mitra industri",
    pos: "bottom-[10%] left-[10%]",
    delay: 1.7,
  },
];

const container: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.25,
    },
  },
};

const rise: Variants = {
  hidden: {
    opacity: 0,
    y: 24,
  },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: EASE,
    },
  },
};

const reveal: Variants = {
  hidden: {
    y: "110%",
  },
  show: {
    y: 0,
    transition: {
      duration: 0.95,
      ease: EASE,
    },
  },
};

const Counter = ({
  to,
  suffix = "",
  delay = 0,
}: CounterProps) => {
  const ref = useRef<HTMLSpanElement>(null);
  const reduce = useReducedMotion();

  useEffect(() => {
    const node = ref.current;

    if (!node) return;

    if (reduce) {
      node.textContent = `${to}${suffix}`;
      return;
    }

    const controls = animate(0, to, {
      duration: 2.2,
      delay,
      ease: "easeOut",
      onUpdate: (value) => {
        node.textContent = `${Math.round(value)}${suffix}`;
      },
    });

    return () => controls.stop();
  }, [to, suffix, delay, reduce]);

  return <span ref={ref}>0{suffix}</span>;
};

const StatChip = ({
  to,
  suffix,
  label,
  pos,
  delay,
}: StatChipProps) => {
  const reduce = useReducedMotion();

  return (
    <motion.div
      className={`absolute rounded-2xl border border-white/15 bg-white/10 px-5 py-4 shadow-2xl shadow-black/30 backdrop-blur-xl ${pos}`}
      initial={{ opacity: 0, scale: 0.85 }}
      animate={{
        opacity: 1,
        scale: 1,
        y: reduce ? 0 : [0, -12, 0],
      }}
      transition={{
        opacity: {
          delay,
          duration: 0.6,
        },
        scale: {
          delay,
          duration: 0.6,
          ease: EASE,
        },
        y: {
          delay: delay + 0.6,
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
        },
      }}
    >
      <p className="text-3xl font-extrabold leading-none text-[#FFD600]">
        <Counter to={to} suffix={suffix} delay={delay} />
      </p>

      <p className="mt-2 text-xs font-medium text-white/70">
        {label}
      </p>
    </motion.div>
  );
};

const Hero = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();

  // Cursor position -> CSS variables + parallax springs
  const mx = useMotionValue(0);
  const my = useMotionValue(0);

  const sx = useSpring(mx, {
    stiffness: 60,
    damping: 18,
  });

  const sy = useSpring(my, {
    stiffness: 60,
    damping: 18,
  });

  const px = useTransform(sx, [-0.5, 0.5], [-28, 28]);
  const py = useTransform(sy, [-0.5, 0.5], [-28, 28]);

  const handlePointerMove = (e: PointerEvent<HTMLElement>) => {
    const el = sectionRef.current;

    if (!el || reduce) return;

    const rect = el.getBoundingClientRect();

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    el.style.setProperty("--mx", `${x}px`);
    el.style.setProperty("--my", `${y}px`);

    mx.set(x / rect.width - 0.5);
    my.set(y / rect.height - 0.5);
  };

  return (
    <section
      ref={sectionRef}
      onPointerMove={handlePointerMove}
      className="hero-root relative flex min-h-screen w-full items-center overflow-hidden bg-[#0A0A0A]"
    >
      {/* Background photo — slow cinematic zoom */}
      <div
        className="hero-bg absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url(${Banner})`,
        }}
        aria-hidden="true"
      />

      <div className="absolute inset-0 bg-gradient-to-r from-[#0A0A0A]/95 via-[#111111]/80 to-[#111111]/35" />

      <div className="absolute inset-x-0 bottom-0 h-64 bg-gradient-to-t from-[#0A0A0A] to-transparent" />

      {/* Aurora blobs */}
      <div className="hero-aurora hero-aurora-a pointer-events-none absolute -right-32 top-[10%] h-[460px] w-[460px] rounded-full bg-[#E11D2E]/30 blur-[120px]" />

      <div className="hero-aurora hero-aurora-b pointer-events-none absolute -bottom-20 left-[25%] h-[380px] w-[380px] rounded-full bg-[#FFD600]/15 blur-[120px]" />

      {/* Blueprint grid */}
      <div className="hero-grid pointer-events-none absolute inset-0" />
      <div className="hero-grid-lit pointer-events-none absolute inset-0" />
      <div className="hero-spot pointer-events-none absolute inset-0" />

      {/* Orbit visual — desktop */}
      <div className="pointer-events-none absolute right-[5%] top-1/2 hidden h-[520px] w-[520px] -translate-y-1/2 lg:block xl:right-[8%]">
        <motion.div
          style={{
            x: px,
            y: py,
          }}
          className="relative h-full w-full"
        >
          <motion.div
            className="absolute inset-0"
            initial={{
              opacity: 0,
              scale: 0.7,
            }}
            animate={{
              opacity: 1,
              scale: 1,
            }}
            transition={{
              duration: 1.4,
              ease: EASE,
              delay: 0.4,
            }}
          >
            <div className="hero-spin absolute inset-0 rounded-full border border-dashed border-[#FFD600]/30" />

            <div className="hero-spin-rev absolute inset-14 rounded-full border border-white/15" />

            <div className="hero-spin absolute inset-28 rounded-full border border-dashed border-[#E11D2E]/60" />

            <div className="hero-pulse absolute inset-[34%] flex items-center justify-center rounded-full border border-[#FFD600]/40 bg-[#FFD600]/10 text-[#FFD600] backdrop-blur-md">
              <FaGraduationCap size={54} />
            </div>
          </motion.div>

          {stats.map((stat) => (
            <StatChip key={stat.label} {...stat} />
          ))}
        </motion.div>
      </div>

      {/* Content */}
      <div className="container relative z-10 mx-auto px-5 pb-24 pt-36 lg:px-8 lg:pb-32">
        <motion.div
          className="max-w-3xl"
          variants={container}
          initial="hidden"
          animate="show"
        >
          <h1 className="text-5xl font-extrabold leading-[1.08] tracking-tight text-white sm:text-6xl lg:text-7xl">
            <span className="block overflow-hidden pb-2">
              <motion.span variants={reveal} className="block">
                Masa Depan
              </motion.span>
            </span>

            <span className="block overflow-hidden pb-2">
              <motion.span
                variants={reveal}
                className="hero-shine block"
              >
                Gemilang,
              </motion.span>
            </span>

            <span className="block overflow-hidden pb-2">
              <motion.span variants={reveal} className="block">
                Dimulai dari Sini.
              </motion.span>
            </span>
          </h1>

          <motion.p
            variants={rise}
            className="mt-5 text-sm font-bold uppercase tracking-[0.18em] text-white/90 sm:text-base"
          >
            SMK RK Bintang Timur Pematangsiantar
          </motion.p>

          <motion.p
            variants={rise}
            className="mt-6 max-w-2xl text-base leading-8 text-white/75 sm:text-lg md:text-xl"
          >
            Mengembangkan potensi, membangun keterampilan, dan membentuk
            karakter generasi unggul untuk menghadapi tantangan masa depan.
          </motion.p>

          <motion.div
            variants={rise}
            className="mt-9 flex flex-col gap-4 sm:flex-row sm:items-center"
          >
            <Link
              to="/profil"
              className="group relative inline-flex items-center justify-center gap-3 overflow-hidden rounded-xl bg-[#E11D2E] px-8 py-4 text-sm font-extrabold text-white shadow-xl shadow-[#E11D2E]/30 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-[#E11D2E]/50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
            >
              <span className="hero-btn-sheen" aria-hidden="true" />

              <span className="relative">
                Mengenal Sekolah
              </span>

              <FaArrowRight className="relative transition-transform duration-300 group-hover:translate-x-2" />
            </Link>

            <Link
              to="/ppdb"
              className="group inline-flex items-center justify-center gap-3 rounded-xl border border-white/40 bg-white/10 px-8 py-4 text-sm font-bold text-white backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-[#FFD600] hover:bg-[#FFD600] hover:text-[#111111] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#FFD600]"
            >
              <FaPlay className="text-xs" />

              Informasi PPDB

              <FaArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </motion.div>

          <motion.div
            variants={rise}
            className="mt-14 grid max-w-2xl grid-cols-1 gap-6 border-t border-white/20 pt-8 sm:grid-cols-3 sm:gap-5"
          >
            {highlights.map((item) => (
              <div
                key={item.title}
                className="group flex items-center gap-3 transition-transform duration-300 hover:translate-x-2"
              >
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-[#FFD600]/20 bg-[#FFD600]/10 text-[#FFD600] transition-all duration-300 group-hover:rotate-6 group-hover:bg-[#FFD600] group-hover:text-[#111111]">
                  {item.icon}
                </div>

                <div>
                  <p className="text-sm font-extrabold text-white">
                    {item.title}
                  </p>

                  <p className="mt-1 text-xs text-white/60">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 right-8 z-10 hidden items-center gap-4 lg:flex">
        <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/60">
          Scroll
        </span>

        <div className="relative h-12 w-px overflow-hidden bg-white/20">
          <div className="hero-scroll-line absolute inset-x-0 top-0 h-6 bg-[#FFD600]" />
        </div>
      </div>

      {/* Bottom accent */}
      <div className="absolute bottom-0 left-0 h-1 w-full bg-gradient-to-r from-[#E11D2E] via-[#FFD600] to-[#E11D2E]" />
    </section>
  );
};

export default Hero;
