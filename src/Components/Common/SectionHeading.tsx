import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import { FaArrowRight } from "react-icons/fa";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
};
const rise: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
};
const reveal: Variants = {
  hidden: { y: "110%" },
  show: { y: 0, transition: { duration: 0.9, ease: EASE } },
};
const drawLine: Variants = {
  hidden: { scaleX: 0 },
  show: { scaleX: 1, transition: { duration: 0.7, ease: EASE } },
};
const marker: Variants = {
  hidden: { scaleX: 0 },
  show: { scaleX: 1, transition: { duration: 0.8, ease: EASE, delay: 0.6 } },
};

interface SectionHeadingProps {
  label: string;
  title: string;
  accent: string;
  description: string;
  link?: { to: string; text: string; icon?: ReactNode };
  /** Rata tengah (tanpa link di kanan). */
  center?: boolean;
  /** Untuk latar gelap. */
  dark?: boolean;
}

const SectionHeading = ({
  label,
  title,
  accent,
  description,
  link,
  center = false,
  dark = false,
}: SectionHeadingProps) => {
  const reduce = useReducedMotion();

  return (
    <motion.div
      variants={container}
      initial={reduce ? "show" : "hidden"}
      whileInView="show"
      viewport={{ once: true, amount: 0.4 }}
      className={
        center
          ? "mx-auto mb-14 max-w-2xl text-center"
          : "mb-12 flex flex-col justify-between gap-6 md:flex-row md:items-end"
      }
    >
      <div className={center ? "" : "max-w-2xl"}>
        <motion.div
          variants={rise}
          className={`mb-3 flex items-center gap-3 ${center ? "justify-center" : ""}`}
        >
          <motion.span
            variants={drawLine}
            className="h-[2px] w-10 origin-left bg-[#E11D2E]"
          />
          <span
            className={`text-sm font-bold ${dark ? "text-[#FFD600]" : "text-[#E11D2E]"}`}
          >
            {label}
          </span>
        </motion.div>

        <h2
          className={`text-3xl font-extrabold leading-tight md:text-4xl ${
            dark ? "text-white" : "text-[#0A0A0A]"
          }`}
        >
          <span className="block overflow-hidden pb-1">
            <motion.span variants={reveal} className="block">
              {title}
            </motion.span>
          </span>
          <span className="block overflow-hidden pb-1">
            <motion.span variants={reveal} className="block">
              <span
                className={`relative isolate inline-block ${
                  dark ? "text-[#FFD600]" : "text-[#E11D2E]"
                }`}
              >
                {accent}
                {!dark && (
                  <motion.span
                    variants={marker}
                    className="absolute inset-x-0 bottom-1 -z-10 h-3 origin-left bg-[#FFD600]"
                    aria-hidden="true"
                  />
                )}
              </span>
            </motion.span>
          </span>
        </h2>

        <motion.p
          variants={rise}
          className={`mt-4 text-sm leading-7 md:text-base ${
            dark ? "text-white/70" : "text-gray-600"
          }`}
        >
          {description}
        </motion.p>
      </div>

      {link && (
        <motion.div variants={rise}>
          <Link
            to={link.to}
            className={`group inline-flex w-fit items-center gap-3 rounded-sm text-sm font-bold transition-colors duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#E11D2E] ${
              dark
                ? "text-white hover:text-[#FFD600]"
                : "text-[#0A0A0A] hover:text-[#E11D2E]"
            }`}
          >
            {link.icon}
            {link.text}
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#FFD600] text-[#0A0A0A] transition-all duration-300 group-hover:translate-x-1 group-hover:bg-[#E11D2E] group-hover:text-white">
              <FaArrowRight className="text-xs" />
            </span>
          </Link>
        </motion.div>
      )}
    </motion.div>
  );
};

export default SectionHeading;
