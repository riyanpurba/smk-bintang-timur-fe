import { motion, useReducedMotion, type Variants } from "framer-motion";
import {
  FaFacebookF,
  FaInstagram,
  FaYoutube,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaEnvelope,
  FaArrowRight,
  FaArrowUp,
} from "react-icons/fa";
import { Link } from "react-router-dom";

import Logo from "../../assets/Images/logo-white.png";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const quickLinks = [
  { name: "Beranda", link: "/" },
  { name: "Profil Sekolah", link: "/profil" },
  { name: "Visi & Misi", link: "/visi-misi" },
  { name: "Guru & Staff", link: "/guru-staff" },
  { name: "Jurusan", link: "/jurusan" },
  { name: "Berita", link: "/berita" },
  { name: "Galeri", link: "/galeri" },
  { name: "PPDB", link: "/ppdb" },
];

const socials = [
  { label: "Facebook", icon: <FaFacebookF />, href: "#" },
  { label: "Instagram", icon: <FaInstagram />, href: "#" },
  { label: "YouTube", icon: <FaYoutube />, href: "#" },
];

const grid: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.15 } },
};
const column: Variants = {
  hidden: { opacity: 0, y: 40 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: EASE, staggerChildren: 0.05, delayChildren: 0.25 },
  },
};
const child: Variants = {
  hidden: { opacity: 0, x: -16 },
  show: { opacity: 1, x: 0, transition: { duration: 0.5, ease: EASE } },
};
const bar: Variants = {
  hidden: { scaleX: 0 },
  show: { scaleX: 1, transition: { duration: 0.7, ease: EASE, delay: 0.3 } },
};

const Heading = ({ children }: { children: string }) => (
  <h3 className="mb-6 text-lg font-bold">
    {children}
    <motion.span
      variants={bar}
      className="mt-2 block h-1 w-10 origin-left rounded-full bg-[#FFD600]"
    />
  </h3>
);

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const reduce = useReducedMotion();

  const scrollToTop = () =>
    window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });

  return (
    <footer className="relative overflow-hidden bg-[#111111] text-white">
      {/* Top accent line draws in */}
      <motion.div
        className="absolute inset-x-0 top-0 h-[3px] origin-left bg-gradient-to-r from-[#E11D2E] via-[#FFD600] to-[#E11D2E]"
        initial={reduce ? false : { scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2, ease: EASE }}
        aria-hidden="true"
      />

      {/* Ambient glow */}
      <motion.div
        className="pointer-events-none absolute -right-24 top-10 h-80 w-80 rounded-full bg-[#E11D2E]/15 blur-[110px]"
        animate={reduce ? undefined : { x: [0, -50, 0], y: [0, 40, 0] }}
        transition={{ duration: 18, ease: "easeInOut", repeat: Infinity }}
        aria-hidden="true"
      />

      {/* Main Footer */}
      <div className="relative mx-auto max-w-7xl px-6 pb-12 pt-16 lg:px-8">
        <motion.div
          className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-4 lg:gap-10"
          variants={grid}
          initial={reduce ? "show" : "hidden"}
          whileInView="show"
          viewport={{ once: true, amount: 0.15 }}
        >
          {/* School Information */}
          <motion.div variants={column}>
            <motion.div variants={child}>
              <Link to="/" className="group mb-6 inline-flex items-center gap-3">
                <img
                  src={Logo}
                  alt="Logo SMK RK Bintang Timur"
                  className="h-auto w-44 sm:w-52 lg:w-44 xl:w-56 rounded-lg object-contain p-1 transition-transform duration-300 group-hover:rotate-6 group-hover:scale-105"
                />
                {/* <div>
                  <h3 className="text-sm font-extrabold leading-tight">
                    SMK RK BINTANG TIMUR
                  </h3>
                  <p className="mt-1 text-xs text-white/60">Pematangsiantar</p>
                </div> */}
              </Link>
            </motion.div>

            <motion.p variants={child} className="text-sm leading-7 text-white/65">
              Membangun generasi unggul, terampil, dan berkarakter untuk
              menghadapi masa depan.
            </motion.p>

            <div className="mt-6 flex items-center gap-3">
              {socials.map((s) => (
                <motion.a
                  key={s.label}
                  variants={child}
                  href={s.href}
                  aria-label={s.label}
                  whileHover={reduce ? undefined : { y: -4, scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 400, damping: 15 }}
                  className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/10 transition-colors duration-300 hover:bg-[#FFD600] hover:text-[#0A0A0A] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FFD600]"
                >
                  {s.icon}
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div variants={column}>
            <Heading>Tautan Cepat</Heading>

            <ul className="grid grid-cols-2 gap-x-4 gap-y-4">
              {quickLinks.map((item) => (
                <motion.li key={item.link} variants={child}>
                  <Link
                    to={item.link}
                    className="group flex items-center gap-2 text-sm text-white/65 transition-all duration-300 hover:translate-x-1 hover:text-[#FFD600]"
                  >
                    <FaArrowRight className="text-[10px] text-[#E11D2E] transition-transform duration-300 group-hover:translate-x-1" />
                    {item.name}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Contact Information */}
          <motion.div variants={column}>
            <Heading>Hubungi Kami</Heading>

            <ul className="space-y-5">
              <motion.li variants={child} className="flex items-start gap-3">
                <FaMapMarkerAlt className="mt-1 shrink-0 text-[#FFD600]" />
                <p className="text-sm leading-6 text-white/65">
                  Pematangsiantar, Sumatera Utara, Indonesia
                </p>
              </motion.li>

              <motion.li variants={child} className="flex items-center gap-3">
                <FaPhoneAlt className="shrink-0 text-[#FFD600]" />
                <a
                  href="tel:+620000000000"
                  className="text-sm text-white/65 transition-colors duration-300 hover:text-[#FFD600]"
                >
                  Nomor Telepon Sekolah
                </a>
              </motion.li>

              <motion.li variants={child} className="flex items-center gap-3">
                <FaEnvelope className="shrink-0 text-[#FFD600]" />
                <a
                  href="mailto:email@sekolah.sch.id"
                  className="break-all text-sm text-white/65 transition-colors duration-300 hover:text-[#FFD600]"
                >
                  Email Sekolah
                </a>
              </motion.li>
            </ul>
          </motion.div>

          {/* Admission */}
          <motion.div variants={column}>
            <Heading>Penerimaan Siswa Baru</Heading>

            <motion.p variants={child} className="text-sm leading-7 text-white/65">
              Bergabunglah bersama kami untuk mendapatkan pendidikan dan
              pengalaman belajar yang berkualitas.
            </motion.p>

            <motion.div variants={child} className="relative mt-6 w-full sm:w-fit">
              {!reduce && (
                <motion.span
                  className="pointer-events-none absolute inset-0 rounded-lg border-2 border-[#FFD600]"
                  animate={{ scale: [1, 1.12], opacity: [0.7, 0] }}
                  transition={{ duration: 2, ease: "easeOut", repeat: Infinity, repeatDelay: 1 }}
                  aria-hidden="true"
                />
              )}
              <Link
                to="/ppdb"
                className="group relative inline-flex w-full items-center justify-center gap-3 rounded-lg bg-[#E11D2E] px-5 py-3 text-sm font-bold text-white transition-colors duration-300 hover:bg-[#FFD600] hover:text-[#0A0A0A] sm:w-auto"
              >
                Daftar Sekarang
                <FaArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>

      {/* Copyright */}
      <div className="relative border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-6 py-6 text-center md:flex-row md:px-8 md:text-left">
          <p className="text-xs text-white/50">
            © {currentYear} SMK RK Bintang Timur Pematangsiantar. All Rights
            Reserved.
          </p>

          <div className="flex items-center gap-5">
            <p className="text-xs text-white/50">
              Made with{" "}
              <motion.span
                className="inline-block text-[#E11D2E]"
                animate={reduce ? undefined : { scale: [1, 1.3, 1] }}
                transition={{ duration: 1.2, repeat: Infinity, repeatDelay: 1.5 }}
              >
                ♥
              </motion.span>{" "}
              for Education
            </p>

            <button
              type="button"
              onClick={scrollToTop}
              aria-label="Kembali ke atas"
              className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-xs transition-colors duration-300 hover:bg-[#FFD600] hover:text-[#0A0A0A] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FFD600]"
            >
              <motion.span
                animate={reduce ? undefined : { y: [0, -3, 0] }}
                transition={{ duration: 1.6, ease: "easeInOut", repeat: Infinity }}
              >
                <FaArrowUp />
              </motion.span>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
