import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useSpring,
  type Variants,
} from "framer-motion";
import { FaArrowRight } from "react-icons/fa";

import LogoFull from "../../assets/Images/logo-white.png";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

interface MenuProps {
  name: string;
  link: string;
}

const menu: MenuProps[] = [
  { name: "Beranda", link: "/" },
  { name: "Profil Sekolah", link: "/profil" },
  { name: "Visi & Misi", link: "/visi-misi" },
  { name: "Guru & Staff", link: "/guru-staff" },
  { name: "Jurusan", link: "/jurusan" },
  { name: "Berita", link: "/berita" },
  { name: "Galeri", link: "/galeri" },
  { name: "Kontak", link: "/kontak" },
];

const desktopList: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06, delayChildren: 0.3 } },
};
const desktopItem: Variants = {
  hidden: { opacity: 0, y: -14 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE } },
};

const mobileContainer: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06, delayChildren: 0.3 } },
};
const mobileItem: Variants = {
  hidden: { opacity: 0, y: 32 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
};

/** Tiga garis yang berubah menjadi X */
const Burger = ({ open }: { open: boolean }) => (
  <span className="relative block h-5 w-7" aria-hidden="true">
    <motion.span
      className="absolute left-0 top-0 h-[2px] w-full rounded bg-white"
      animate={open ? { y: 9, rotate: 45, backgroundColor: "#FFD600" } : { y: 0, rotate: 0, backgroundColor: "#FFFFFF" }}
    />
    <motion.span
      className="absolute left-0 top-[9px] h-[2px] w-full rounded bg-white"
      animate={open ? { opacity: 0, x: -10 } : { opacity: 1, x: 0 }}
    />
    <motion.span
      className="absolute left-0 top-[18px] h-[2px] w-full rounded bg-white"
      animate={open ? { y: -9, rotate: -45, backgroundColor: "#FFD600" } : { y: 0, rotate: 0, backgroundColor: "#FFFFFF" }}
    />
  </span>
);

const Header = () => {
  const location = useLocation();
  const reduce = useReducedMotion();

  const [isSticky, setIsSticky] = useState(false);
  const [openMenu, setOpenMenu] = useState(false);

  // Scroll: ubah gaya header (header tetap terlihat saat di-scroll)
  const { scrollY, scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 24 });

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsSticky(latest > 20);
  });

  // Tutup menu saat pindah halaman
  useEffect(() => {
    setOpenMenu(false);
  }, [location.pathname]);

  // Kunci scroll body + tombol Escape saat menu mobile terbuka
  useEffect(() => {
    document.body.style.overflow = openMenu ? "hidden" : "";

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpenMenu(false);
    };
    if (openMenu) window.addEventListener("keydown", onKey);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [openMenu]);

  const isActive = (link: string) => {
    if (link === "/") return location.pathname === "/";
    return location.pathname === link || location.pathname.startsWith(`${link}/`);
  };

  const headerBg = openMenu
    ? "bg-transparent"
    : isSticky
    ? "bg-[#0A0A0A]/85 shadow-lg shadow-black/30 backdrop-blur-md"
    : "bg-[#0A0A0A] md:bg-transparent";

  return (
    <>
      <motion.header
        initial={reduce ? false : { y: "-100%" }}
        animate={{ y: 0 }}
        transition={{ duration: 0.4, ease: EASE }}
        className={`fixed left-0 top-0 z-[9999] w-full transition-colors duration-300 ${headerBg}`}
      >
        <nav
          className="mx-auto flex w-full max-w-[1600px] items-center justify-between px-5 py-4 lg:px-8"
          aria-label="Navigasi utama"
        >
          {/* Logo */}
          <Link to="/" className="shrink-0" onClick={() => setOpenMenu(false)}>
            <motion.img
              src={LogoFull}
              alt="SMK RK Bintang Timur Pematangsiantar"
              width={250}
              height={80}
              className="h-auto w-44 sm:w-52 lg:w-44 xl:w-56"
              whileHover={reduce ? undefined : { scale: 1.04 }}
              transition={{ type: "spring", stiffness: 300, damping: 18 }}
            />
          </Link>

          {/* Desktop menu */}
          <div className="hidden items-center gap-6 lg:flex xl:gap-8">
            <motion.ul
              className="flex items-center gap-x-5 xl:gap-x-8"
              variants={desktopList}
              initial={reduce ? "show" : "hidden"}
              animate="show"
            >
              {menu.map((item) => {
                const active = isActive(item.link);
                return (
                  <motion.li key={item.link} variants={desktopItem}>
                    <Link
                      to={item.link}
                      aria-current={active ? "page" : undefined}
                      className={`group relative block rounded-sm py-2 text-sm transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#FFD600] ${
                        active
                          ? "font-bold text-[#FFD600]"
                          : "font-semibold text-white hover:text-[#FFD600]"
                      }`}
                    >
                      {item.name}

                      {/* Garis aktif berpindah mengikuti menu (shared layout) */}
                      {active && (
                        <motion.span
                          layoutId="nav-underline"
                          className="absolute inset-x-0 bottom-0 h-[2px] rounded-full bg-[#FFD600]"
                          transition={{ type: "spring", stiffness: 380, damping: 30 }}
                        />
                      )}
                      {!active && (
                        <span className="absolute inset-x-0 bottom-0 h-[2px] origin-left scale-x-0 rounded-full bg-[#E11D2E] transition-transform duration-300 group-hover:scale-x-100" />
                      )}
                    </Link>
                  </motion.li>
                );
              })}
            </motion.ul>

            <motion.div
              initial={reduce ? false : { opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.9, type: "spring", stiffness: 260, damping: 16 }}
            >
              <Link
                to="/ppdb"
                className="inline-flex items-center rounded-lg bg-[#FFD600] px-5 py-2.5 text-sm font-extrabold text-[#0A0A0A] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#E11D2E] hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
              >
                PPDB
              </Link>
            </motion.div>
          </div>

          {/* Mobile toggle */}
          <button
            type="button"
            onClick={() => setOpenMenu((prev) => !prev)}
            aria-label={openMenu ? "Tutup menu" : "Buka menu"}
            aria-expanded={openMenu}
            aria-controls="mobile-menu"
            className="-mr-2 flex h-11 w-11 items-center justify-center rounded-lg outline-none focus-visible:ring-2 focus-visible:ring-[#FFD600] lg:hidden"
          >
            <Burger open={openMenu} />
          </button>
        </nav>

        {/* Scroll progress */}
        <motion.div
          className="absolute bottom-0 left-0 h-[3px] w-full origin-left bg-gradient-to-r from-[#E11D2E] to-[#FFD600]"
          style={{ scaleX: progress }}
          animate={{ opacity: isSticky ? 1 : 0 }}
          aria-hidden="true"
        />
      </motion.header>

      {/* Mobile overlay (di luar header agar tidak terkena transform) */}
      <AnimatePresence>
        {openMenu && (
          <motion.div
            id="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Menu navigasi"
            className="fixed inset-0 z-[9998] flex h-[100dvh] flex-col overflow-y-auto bg-[#0A0A0A] px-6 pb-10 pt-28 lg:hidden"
            initial={{ clipPath: "circle(0% at 92% 5%)" }}
            animate={{ clipPath: "circle(150% at 92% 5%)" }}
            exit={{ clipPath: "circle(0% at 92% 5%)" }}
            transition={{ duration: reduce ? 0 : 0.7, ease: EASE }}
          >
            <div className="pointer-events-none absolute -right-20 top-10 h-72 w-72 rounded-full bg-[#E11D2E]/25 blur-[100px]" />
            <div className="pointer-events-none absolute -bottom-20 -left-20 h-72 w-72 rounded-full bg-[#FFD600]/15 blur-[100px]" />

            <motion.div
              className="relative flex flex-1 flex-col justify-between gap-10"
              variants={mobileContainer}
              initial="hidden"
              animate="show"
            >
              <ul className="flex flex-col gap-1">
                {menu.map((item) => {
                  const active = isActive(item.link);
                  return (
                    <motion.li key={item.link} variants={mobileItem}>
                      <Link
                        to={item.link}
                        onClick={() => setOpenMenu(false)}
                        aria-current={active ? "page" : undefined}
                        className={`group flex items-center gap-3 rounded-lg py-2.5 text-2xl font-extrabold transition-all duration-300 hover:translate-x-2 sm:text-3xl ${
                          active ? "text-[#FFD600]" : "text-white hover:text-[#FFD600]"
                        }`}
                      >
                        <span
                          className={`h-2 w-2 rounded-full bg-[#E11D2E] transition-transform duration-300 ${
                            active ? "scale-100" : "scale-0 group-hover:scale-100"
                          }`}
                        />
                        {item.name}
                      </Link>
                    </motion.li>
                  );
                })}
              </ul>

              <motion.div variants={mobileItem} className="border-t border-white/10 pt-6">
                <p className="mb-4 text-sm text-white/60">
                  Pendaftaran siswa baru SMK RK Bintang Timur
                </p>
                <Link
                  to="/ppdb"
                  onClick={() => setOpenMenu(false)}
                  className="group inline-flex w-full items-center justify-center gap-3 rounded-xl bg-[#E11D2E] px-6 py-4 text-sm font-extrabold text-white shadow-xl shadow-[#E11D2E]/30 transition-all duration-300 hover:bg-[#FFD600] hover:text-[#0A0A0A] sm:w-auto"
                >
                  Informasi PPDB
                  <FaArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;
