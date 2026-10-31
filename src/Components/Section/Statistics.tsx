import { useEffect, useRef, useState, type ReactNode } from "react";
import {
  motion,
  animate,
  useInView,
  useReducedMotion,
  type Variants,
} from "framer-motion";
import {
  FaUserGraduate,
  FaChalkboardTeacher,
  FaBookOpen,
  FaTrophy,
} from "react-icons/fa";

/** Angka dan bar dihitung ulang setiap sekian menit selama halaman terbuka. */
const LOOP_MINUTES = 3;
const LOOP_MS = LOOP_MINUTES * 60 * 1000;

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

interface StatisticItem {
  label: string;
  value: number;
  suffix?: string;
  icon: ReactNode;
}

const statistics: StatisticItem[] = [
  { label: "Siswa Aktif", value: 500, suffix: "+", icon: <FaUserGraduate /> },
  { label: "Guru & Staff", value: 40, suffix: "+", icon: <FaChalkboardTeacher /> },
  { label: "Program Keahlian", value: 4, suffix: "", icon: <FaBookOpen /> },
  { label: "Prestasi", value: 25, suffix: "+", icon: <FaTrophy /> },
];

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.15, delayChildren: 0.1 } },
};

const card: Variants = {
  hidden: { opacity: 0, y: 40, scale: 0.94 },
  show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.8, ease: EASE } },
};

interface CounterProps {
  to: number;
  suffix: string;
  active: boolean;
  cycle: number;
  delay: number;
}

const Counter = ({ to, suffix, active, cycle, delay }: CounterProps) => {
  const ref = useRef<HTMLSpanElement>(null);
  const reduce = useReducedMotion();

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    if (reduce) {
      node.textContent = `${to}${suffix}`;
      return;
    }
    if (!active) return;

    node.textContent = `0${suffix}`;
    const controls = animate(0, to, {
      duration: 2.2,
      delay,
      ease: "easeOut",
      onUpdate: (v) => {
        node.textContent = `${Math.round(v)}${suffix}`;
      },
    });
    return () => controls.stop();
  }, [active, cycle, to, suffix, delay, reduce]);

  return (
    <span ref={ref} className="tabular-nums">
      0{suffix}
    </span>
  );
};

const Statistics = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const inView = useInView(sectionRef, { once: true, amount: 0.3 });
  const active = reduce ? true : inView;

  // Naik satu setiap LOOP_MS -> memicu hitung ulang angka, bar, dan ring
  const [cycle, setCycle] = useState(0);

  useEffect(() => {
    if (!inView || reduce) return;
    const id = window.setInterval(() => setCycle((c) => c + 1), LOOP_MS);
    return () => window.clearInterval(id);
  }, [inView, reduce]);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-[#0A0A0A] py-16 md:py-24"
    >
      {/* Ambient background */}
      <motion.div
        className="pointer-events-none absolute -right-24 -top-24 h-96 w-96 rounded-full bg-[#E11D2E]/25 blur-[110px]"
        animate={reduce ? undefined : { x: [0, -60, 0], y: [0, 50, 0] }}
        transition={{ duration: 18, ease: "easeInOut", repeat: Infinity }}
        aria-hidden="true"
      />
      <motion.div
        className="pointer-events-none absolute -bottom-32 -left-24 h-96 w-96 rounded-full bg-[#FFD600]/15 blur-[110px]"
        animate={reduce ? undefined : { x: [0, 70, 0], y: [0, -40, 0] }}
        transition={{ duration: 22, ease: "easeInOut", repeat: Infinity }}
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)",
          backgroundSize: "56px 56px",
        }}
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <motion.div
          className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6"
          variants={container}
          initial={reduce ? "show" : "hidden"}
          animate={active ? "show" : "hidden"}
        >
          {statistics.map((item, index) => {
            const delay = 0.3 + index * 0.15;

            return (
              <motion.div
                key={item.label}
                variants={card}
                whileHover={reduce ? undefined : { y: -8 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.06] p-6 text-center backdrop-blur-sm transition-colors duration-300 hover:border-[#FFD600]/40 hover:bg-white/10 md:p-8"
              >
                {/* Top accent line */}
                <span className="absolute inset-x-0 top-0 h-[3px] bg-gradient-to-r from-[#E11D2E] via-[#FFD600] to-[#E11D2E]" />

                {/* Icon + ping ring (replays every loop) */}
                <div className="relative mx-auto mb-5 h-14 w-14">
                  {!reduce && (
                    <motion.span
                      key={`ping-${cycle}`}
                      className="absolute inset-0 rounded-xl border-2 border-[#FFD600]"
                      initial={{ scale: 1, opacity: 0 }}
                      animate={active ? { scale: [1, 1.8], opacity: [0.8, 0] } : undefined}
                      transition={{ duration: 1.3, ease: "easeOut", delay }}
                      aria-hidden="true"
                    />
                  )}
                  <div className="relative flex h-full w-full items-center justify-center rounded-xl bg-[#FFD600] text-2xl text-[#0A0A0A] transition-transform duration-300 group-hover:rotate-6 group-hover:scale-110">
                    {item.icon}
                  </div>
                </div>

                <h3 className="text-3xl font-extrabold text-white md:text-5xl">
                  <Counter
                    to={item.value}
                    suffix={item.suffix ?? ""}
                    active={active}
                    cycle={cycle}
                    delay={delay}
                  />
                </h3>

                <p className="mt-2 text-sm font-medium text-white/70 md:text-base">
                  {item.label}
                </p>

                {/* Progress bar follows the counter */}
                <div className="mx-auto mt-5 h-1 w-full max-w-[120px] overflow-hidden rounded-full bg-white/10">
                  <motion.div
                    key={`bar-${cycle}`}
                    className="h-full origin-left rounded-full bg-[#E11D2E]"
                    initial={reduce ? false : { scaleX: 0 }}
                    animate={{ scaleX: active ? 1 : 0 }}
                    transition={{ duration: 2.2, ease: "easeOut", delay }}
                  />
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default Statistics;
