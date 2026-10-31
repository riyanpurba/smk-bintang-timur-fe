import { motion, useReducedMotion, type Variants } from "framer-motion";
import { FaQuoteLeft, FaStar } from "react-icons/fa";

import SectionHeading from "../Common/SectionHeading";
import ImageWithSkeleton from "../Common/ImageWithSkeleton";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

interface TestimonialItem {
  id: number;
  name: string;
  role: string;
  message: string;
  image: string;
}

const testimonials: TestimonialItem[] = [
  {
    id: 1,
    name: "Nama Siswa",
    role: "Siswa",
    message:
      "Saya mendapatkan banyak pengalaman dan pengetahuan baru selama belajar. Guru-guru selalu mendukung saya untuk berkembang dan meraih prestasi.",
    image: "/images/testimonial-1.jpg",
  },
  {
    id: 2,
    name: "Nama Alumni",
    role: "Alumni",
    message:
      "Pengalaman belajar di sekolah ini membantu saya mengembangkan keterampilan, kedisiplinan, dan kepercayaan diri untuk menghadapi masa depan.",
    image: "/images/testimonial-2.jpg",
  },
  {
    id: 3,
    name: "Nama Orang Tua",
    role: "Orang Tua Siswa",
    message:
      "Kami berharap sekolah terus memberikan pendidikan terbaik dan membimbing siswa menjadi pribadi yang mandiri serta bertanggung jawab.",
    image: "/images/testimonial-3.jpg",
  },
];

const grid: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.18 } },
};
const card: Variants = {
  hidden: { opacity: 0, y: 50, rotate: -2 },
  show: {
    opacity: 1,
    y: 0,
    rotate: 0,
    transition: { duration: 0.9, ease: EASE, staggerChildren: 0.08, delayChildren: 0.4 },
  },
};
const quote: Variants = {
  hidden: { opacity: 0, scale: 0, rotate: -30 },
  show: { opacity: 1, scale: 1, rotate: 0, transition: { type: "spring", stiffness: 260, damping: 14 } },
};
const star: Variants = {
  hidden: { opacity: 0, scale: 0, rotate: -90 },
  show: { opacity: 1, scale: 1, rotate: 0, transition: { type: "spring", stiffness: 300, damping: 12 } },
};
const fade: Variants = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
};

const TestimonialSection = () => {
  const reduce = useReducedMotion();

  return (
    <section className="relative overflow-hidden bg-[#0A0A0A] py-20 md:py-24">
      {/* Decorative */}
      <motion.div
        className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full border-[40px] border-[#E11D2E]/10"
        animate={reduce ? undefined : { rotate: 360 }}
        transition={{ duration: 80, ease: "linear", repeat: Infinity }}
        aria-hidden="true"
      />
      <motion.div
        className="pointer-events-none absolute -bottom-32 -left-32 h-96 w-96 rounded-full border-[40px] border-[#FFD600]/10"
        animate={reduce ? undefined : { rotate: -360 }}
        transition={{ duration: 100, ease: "linear", repeat: Infinity }}
        aria-hidden="true"
      />
      <motion.div
        className="pointer-events-none absolute left-1/2 top-1/3 h-72 w-72 -translate-x-1/2 rounded-full bg-[#E11D2E]/15 blur-[110px]"
        animate={reduce ? undefined : { scale: [1, 1.25, 1], opacity: [0.6, 1, 0.6] }}
        transition={{ duration: 9, ease: "easeInOut", repeat: Infinity }}
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <SectionHeading
          center
          dark
          label="Testimoni"
          title="Cerita dan Pengalaman"
          accent="Mereka"
          description="Dengarkan pengalaman siswa, alumni, dan orang tua tentang perjalanan pendidikan bersama sekolah kami."
        />

        <motion.div
          className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"
          variants={grid}
          initial={reduce ? "show" : "hidden"}
          whileInView="show"
          viewport={{ once: true, amount: 0.15 }}
        >
          {testimonials.map((item) => (
            <motion.article
              key={item.id}
              variants={card}
              whileHover={reduce ? undefined : { y: -8 }}
              className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white p-7 shadow-lg"
            >
              <span className="absolute inset-x-0 top-0 h-1 origin-left scale-x-0 bg-gradient-to-r from-[#E11D2E] to-[#FFD600] transition-transform duration-500 group-hover:scale-x-100" />

              <div className="mb-5 flex items-center justify-between">
                <motion.div variants={quote}>
                  <FaQuoteLeft className="text-3xl text-[#E11D2E]" />
                </motion.div>

                <div className="flex gap-1 text-sm text-[#FFD600]">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <motion.span key={s} variants={star}>
                      <FaStar />
                    </motion.span>
                  ))}
                </div>
              </div>

              <motion.p
                variants={fade}
                className="min-h-32 text-sm leading-7 text-gray-600"
              >
                "{item.message}"
              </motion.p>

              <motion.div
                variants={fade}
                className="mt-7 flex items-center gap-4 border-t border-gray-100 pt-5"
              >
                <ImageWithSkeleton
                  src={item.image}
                  alt={item.name}
                  wrapperClassName="relative h-12 w-12 shrink-0 rounded-full border-2 border-[#FFD600]"
                  className="h-full w-full rounded-full object-cover"
                />

                <div>
                  <h3 className="font-bold text-[#0A0A0A]">{item.name}</h3>
                  <p className="mt-1 text-xs text-gray-500">{item.role}</p>
                </div>
              </motion.div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default TestimonialSection;
