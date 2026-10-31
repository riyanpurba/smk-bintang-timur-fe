import { useRef } from "react";
import { Link } from "react-router-dom";
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
  useInView,
  type Variants,
} from "framer-motion";
import { FaQuoteLeft, FaArrowRight } from "react-icons/fa";

import Photo from "../../assets/Images/hero.png";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.14, delayChildren: 0.1 } },
};

const rise: Variants = {
  hidden: { opacity: 0, y: 28 },
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

const growBar: Variants = {
  hidden: { scaleY: 0 },
  show: { scaleY: 1, transition: { duration: 0.8, ease: EASE, delay: 0.2 } },
};

const marker: Variants = {
  hidden: { scaleX: 0 },
  show: { scaleX: 1, transition: { duration: 0.8, ease: EASE, delay: 0.7 } },
};

const pop: Variants = {
  hidden: { opacity: 0, scale: 0, rotate: -30 },
  show: {
    opacity: 1,
    scale: 1,
    rotate: 0,
    transition: { type: "spring", stiffness: 260, damping: 14 },
  },
};

const frameV: Variants = {
  hidden: { opacity: 0, x: -24, y: 24 },
  show: { opacity: 1, x: 0, y: 0, transition: { duration: 1, ease: EASE, delay: 0.5 } },
};
const badgeV: Variants = {
  hidden: { opacity: 0, scale: 0 },
  show: { opacity: 1, scale: 1, transition: { type: "spring", stiffness: 200, damping: 14, delay: 1.1 } },
};
const shadowV: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.4 } },
};
const clipV: Variants = {
  hidden: { clipPath: "inset(100% 0% 0% 0%)" },
  show: { clipPath: "inset(0% 0% 0% 0%)", transition: { duration: 1.2, ease: EASE } },
};
const zoomV: Variants = {
  hidden: { scale: 1.3 },
  show: { scale: 1, transition: { duration: 1.6, ease: EASE } },
};
const captionV: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE, delay: 1 } },
};

const PrincipalWelcome = () => {
  const reduce = useReducedMotion();
  const photoRef = useRef<HTMLDivElement>(null);

  // Parallax: the photo drifts slightly while the section scrolls past
  const { scrollYProgress } = useScroll({
    target: photoRef,
    offset: ["start end", "end start"],
  });
  const imageY = useTransform(scrollYProgress, [0, 1], ["-7%", "7%"]);

  // One observer on the (unclipped) wrapper drives every photo animation
  const photoInView = useInView(photoRef, { once: true, amount: 0.15 });
  const showPhoto = reduce || photoInView;

  const initial = reduce ? "show" : "hidden";
  const viewport = { once: true, amount: 0.25 } as const;

  return (
    <section className="relative overflow-hidden bg-white py-20 md:py-28">
      {/* Decorative: slow rotating ring */}
      <motion.div
        className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full border border-dashed border-[#E11D2E]/30"
        animate={reduce ? undefined : { rotate: 360 }}
        transition={{ duration: 60, ease: "linear", repeat: Infinity }}
        aria-hidden="true"
      />
      <motion.div
        className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full bg-[#FFD600]/10"
        animate={reduce ? undefined : { scale: [1, 1.12, 1] }}
        transition={{ duration: 8, ease: "easeInOut", repeat: Infinity }}
        aria-hidden="true"
      />
      <motion.div
        className="pointer-events-none absolute left-10 top-20 h-5 w-5 rounded-full bg-[#E11D2E]/60"
        animate={reduce ? undefined : { y: [0, -16, 0] }}
        transition={{ duration: 5, ease: "easeInOut", repeat: Infinity }}
        aria-hidden="true"
      />

      <div className="container relative z-10 mx-auto px-5 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-20">
          {/* Left Content */}
          <motion.div
            variants={container}
            initial={initial}
            whileInView="show"
            viewport={viewport}
          >
            {/* Section Label */}
            <motion.div variants={rise} className="mb-5 flex items-center gap-3">
              <motion.span
                variants={drawLine}
                className="h-[2px] w-10 origin-left bg-[#E11D2E]"
              />
              <span className="text-sm font-bold text-[#E11D2E]">
                Sambutan Kepala Sekolah
              </span>
            </motion.div>

            {/* Heading */}
            <h2 className="max-w-xl text-3xl font-extrabold leading-tight text-[#0A0A0A] sm:text-4xl lg:text-5xl">
              <span className="block overflow-hidden pb-1">
                <motion.span variants={reveal} className="block">
                  Membangun Generasi Unggul
                </motion.span>
              </span>
              <span className="block overflow-hidden pb-1">
                <motion.span variants={reveal} className="block">
                  <span className="relative isolate inline-block text-[#E11D2E]">
                    untuk Masa Depan.
                    <motion.span
                      variants={marker}
                      className="absolute inset-x-0 bottom-1 -z-10 h-3 origin-left bg-[#FFD600]"
                      aria-hidden="true"
                    />
                  </span>
                </motion.span>
              </span>
            </h2>

            {/* Quote Icon */}
            <motion.div variants={pop} className="mb-4 mt-8 w-fit">
              <FaQuoteLeft className="text-3xl text-[#FFD600]" />
            </motion.div>

            {/* Welcome Message */}
            <motion.div
              variants={rise}
              className="space-y-4 text-base leading-relaxed text-gray-600 md:text-lg"
            >
              <p>
                Kami berkomitmen mencetak generasi unggul, terampil, dan
                berkarakter untuk masa depan yang lebih baik.
              </p>
              <p className="font-semibold text-[#0A0A0A]">Terima kasih.</p>
            </motion.div>

            {/* Principal Identity */}
            <motion.div variants={rise} className="relative mt-8 pl-5">
              <motion.span
                variants={growBar}
                className="absolute left-0 top-0 h-full w-1 origin-top bg-[#E11D2E]"
                aria-hidden="true"
              />
              <h3 className="text-xl font-bold text-[#0A0A0A]">
                Belinha Da Costa Monteiro
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                Kepala SMK RK Bintang Timur Pematangsiantar
              </p>
            </motion.div>

            {/* Read More */}
            <motion.div variants={rise} className="mt-8">
              <Link
                to="/profil"
                className="group inline-flex items-center gap-3 rounded-sm text-sm font-bold text-[#0A0A0A] transition-colors duration-300 hover:text-[#E11D2E] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#E11D2E]"
              >
                Mengenal Sekolah Lebih Dekat
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#FFD600] text-[#0A0A0A] transition-all duration-300 group-hover:translate-x-2 group-hover:bg-[#E11D2E] group-hover:text-white">
                  <FaArrowRight className="text-xs" />
                </span>
              </Link>
            </motion.div>
          </motion.div>

          {/* Right Image */}
          <motion.div
            ref={photoRef}
            variants={{ hidden: {}, show: {} }}
            initial={reduce ? "show" : "hidden"}
            animate={showPhoto ? "show" : "hidden"}
            className="relative mx-auto w-full max-w-md lg:max-w-none"
          >
            {/* Frame slides out from behind the photo */}
            <motion.div
              variants={frameV}
              className="absolute -right-4 -top-4 h-full w-full rounded-2xl border-2 border-[#FFD600] sm:-right-6 sm:-top-6"
              aria-hidden="true"
            />

            {/* Floating badge */}
            <motion.div
              variants={badgeV}
              className="pointer-events-none absolute -right-8 top-1/4 z-20 sm:-right-10"
              aria-hidden="true"
            >
              <motion.div
                className="h-16 w-16 rounded-full border-4 border-white bg-[#E11D2E] shadow-xl"
                animate={reduce ? undefined : { y: [0, -14, 0] }}
                transition={{ duration: 4.5, ease: "easeInOut", repeat: Infinity }}
              />
            </motion.div>

            {/* Photo: wipes in from the bottom, then parallaxes on scroll */}
            <motion.div
              variants={shadowV}
              className="relative z-10 rounded-2xl shadow-2xl shadow-black/30"
            >
              <motion.div
                variants={clipV}
                className="relative overflow-hidden rounded-2xl bg-[#0A0A0A]"
              >
                <motion.div variants={zoomV}>
                  <motion.img
                    src={Photo}
                    alt="Kepala SMK RK Bintang Timur Pematangsiantar"
                    className="aspect-[4/5] w-full object-cover object-top"
                    style={reduce ? undefined : { y: imageY, scale: 1.15 }}
                  />
                </motion.div>

                <motion.div
                  variants={captionV}
                  className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/60 to-transparent p-6 pt-20"
                >
                  <p className="text-sm font-semibold text-[#FFD600]">
                    Kepala Sekolah
                  </p>
                  <h3 className="mt-1 text-xl font-bold text-white">
                    SMK RK Bintang Timur
                  </h3>
                  <p className="mt-1 text-sm text-white/80">Pematangsiantar</p>
                  <span className="mt-4 block h-1 w-16 rounded-full bg-[#E11D2E]" />
                </motion.div>
              </motion.div>
            </motion.div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default PrincipalWelcome;
