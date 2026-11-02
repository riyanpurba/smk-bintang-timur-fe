
import {
  useEffect,
  useState,
  type FocusEvent,
} from "react";

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

import {
  FaArrowRight,
  FaChevronDown,
} from "react-icons/fa";

import LogoFull from "../../assets/Images/logo-white.png";

import {
  mainMenus,
  admissionMenu,
  type MenuItem,
} from "../../constants/navigation";

const EASE: [number, number, number, number] = [
  0.22, 1, 0.36, 1,
];

// ==========================================
// ANIMATION VARIANTS
// ==========================================

const desktopList: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.06,
      delayChildren: 0.3,
    },
  },
};

const desktopItem: Variants = {
  hidden: {
    opacity: 0,
    y: -14,
  },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: EASE,
    },
  },
};

const dropdownVariants: Variants = {
  hidden: {
    opacity: 0,
    y: -10,
    scale: 0.97,
  },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.25,
      ease: EASE,
      staggerChildren: 0.04,
    },
  },
  exit: {
    opacity: 0,
    y: -6,
    scale: 0.98,
    transition: {
      duration: 0.15,
    },
  },
};

const dropdownItem: Variants = {
  hidden: {
    opacity: 0,
    x: -10,
  },
  show: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.3,
      ease: EASE,
    },
  },
};

const mobileContainer: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.06,
      delayChildren: 0.2,
    },
  },
};

const mobileItem: Variants = {
  hidden: {
    opacity: 0,
    y: 25,
  },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: EASE,
    },
  },
};

// ==========================================
// BURGER MENU
// ==========================================

interface BurgerProps {
  open: boolean;
}

const Burger = ({ open }: BurgerProps) => {
  return (
    <span
      className="relative block h-5 w-7"
      aria-hidden="true"
    >
      <motion.span
        className="absolute left-0 top-0 h-[2px] w-full rounded bg-white"
        animate={
          open
            ? {
                y: 9,
                rotate: 45,
                backgroundColor: "#FFD600",
              }
            : {
                y: 0,
                rotate: 0,
                backgroundColor: "#FFFFFF",
              }
        }
      />

      <motion.span
        className="absolute left-0 top-[9px] h-[2px] w-full rounded bg-white"
        animate={
          open
            ? {
                opacity: 0,
                x: -10,
              }
            : {
                opacity: 1,
                x: 0,
              }
        }
      />

      <motion.span
        className="absolute left-0 top-[18px] h-[2px] w-full rounded bg-white"
        animate={
          open
            ? {
                y: -9,
                rotate: -45,
                backgroundColor: "#FFD600",
              }
            : {
                y: 0,
                rotate: 0,
                backgroundColor: "#FFFFFF",
              }
        }
      />
    </span>
  );
};

// ==========================================
// HEADER COMPONENT
// ==========================================

const Header = () => {
  const location = useLocation();
  const reduce = useReducedMotion();

  const [isSticky, setIsSticky] = useState(false);
  const [openMenu, setOpenMenu] = useState(false);

  const [openDropdown, setOpenDropdown] =
    useState<string | null>(null);

  const [mobileOpen, setMobileOpen] =
    useState<string | null>(null);

  // Scroll progress
  const { scrollY, scrollYProgress } = useScroll();

  const progress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 24,
  });

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsSticky(latest > 20);
  });

  // ==========================================
  // ACTIVE MENU
  // ==========================================

  const isActive = (link: string) => {
    if (link === "/") {
      return location.pathname === "/";
    }

    return (
      location.pathname === link ||
      location.pathname.startsWith(`${link}/`)
    );
  };

  const isGroupActive = (item: MenuItem) => {
    return (
      isActive(item.link) ||
      !!item.children?.some((child) =>
        isActive(child.link)
      )
    );
  };

  // ==========================================
  // ROUTE CHANGE
  // ==========================================

  useEffect(() => {
    setOpenMenu(false);
    setOpenDropdown(null);
    setMobileOpen(null);
  }, [location.pathname]);

  // Open active mobile group
  useEffect(() => {
    if (!openMenu) return;

    const activeGroup = mainMenus.find(
      (item) =>
        item.children && isGroupActive(item)
    );

    setMobileOpen(
      activeGroup ? activeGroup.link : null
    );
  }, [openMenu]);

  // ==========================================
  // BODY SCROLL LOCK + ESCAPE
  // ==========================================

  useEffect(() => {
    document.body.style.overflow = openMenu
      ? "hidden"
      : "";

    const handleKeyDown = (
      event: globalThis.KeyboardEvent
    ) => {
      if (event.key === "Escape") {
        setOpenMenu(false);
        setOpenDropdown(null);
      }
    };

    if (openMenu) {
      window.addEventListener(
        "keydown",
        handleKeyDown
      );
    }

    return () => {
      document.body.style.overflow = "";

      window.removeEventListener(
        "keydown",
        handleKeyDown
      );
    };
  }, [openMenu]);

  // ==========================================
  // DESKTOP DROPDOWN
  // ==========================================

  const handleBlur = (
    event: FocusEvent<HTMLLIElement>
  ) => {
    if (
      !event.currentTarget.contains(
        event.relatedTarget as Node | null
      )
    ) {
      setOpenDropdown(null);
    }
  };

  const headerBg = openMenu
    ? "bg-transparent"
    : isSticky
      ? "bg-[#0A0A0A]/90 shadow-lg shadow-black/30 backdrop-blur-xl"
      : "bg-[#0A0A0A] md:bg-transparent";

  // ==========================================
  // RENDER
  // ==========================================

  return (
    <>
      <motion.header
        initial={reduce ? false : { y: "-100%" }}
        animate={{ y: 0 }}
        transition={{
          duration: 0.4,
          ease: EASE,
        }}
        className={`fixed left-0 top-0 z-[9999] w-full transition-colors duration-300 ${headerBg}`}
      >
        <nav
          className="mx-auto flex w-full max-w-[1600px] items-center justify-between px-5 py-4 lg:px-8"
          aria-label="Navigasi utama"
        >
          {/* LOGO */}

          <Link
            to="/"
            className="shrink-0"
            onClick={() => setOpenMenu(false)}
          >
            <motion.img
              src={LogoFull}
              alt="SMK RK Bintang Timur Pematangsiantar"
              width={250}
              height={80}
              className="h-auto w-44 sm:w-52 lg:w-44 xl:w-56"
              whileHover={
                reduce ? undefined : { scale: 1.04 }
              }
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 18,
              }}
            />
          </Link>

          {/* DESKTOP NAVIGATION */}

          <div className="hidden items-center gap-6 lg:flex xl:gap-8">
            <motion.ul
              className="flex items-center gap-x-5 xl:gap-x-8"
              variants={desktopList}
              initial={reduce ? "show" : "hidden"}
              animate="show"
            >
              {mainMenus.map((item) => {
                const active = isGroupActive(item);
                const hasChildren =
                  !!item.children?.length;

                const dropdownOpen =
                  openDropdown === item.link;

                return (
                  <motion.li
                    key={item.link}
                    variants={desktopItem}
                    className="relative"
                    onMouseEnter={
                      hasChildren
                        ? () =>
                            setOpenDropdown(item.link)
                        : undefined
                    }
                    onMouseLeave={
                      hasChildren
                        ? () => setOpenDropdown(null)
                        : undefined
                    }
                    onBlur={
                      hasChildren
                        ? handleBlur
                        : undefined
                    }
                  >
                    <div className="group relative flex items-center gap-1.5">
                      {hasChildren ? (
                        <button
                          type="button"
                          onClick={() =>
                            setOpenDropdown(
                              dropdownOpen
                                ? null
                                : item.link
                            )
                          }
                          aria-haspopup="menu"
                          aria-expanded={dropdownOpen}
                          className={`flex items-center gap-2 rounded-sm py-2 text-sm font-semibold transition-colors ${
                            active
                              ? "text-[#FFD600]"
                              : "text-white hover:text-[#FFD600]"
                          }`}
                        >
                          {item.name}

                          <FaChevronDown
                            className={`text-[10px] transition-transform duration-300 ${
                              dropdownOpen
                                ? "rotate-180"
                                : ""
                            }`}
                          />
                        </button>
                      ) : (
                        <Link
                          to={item.link}
                          aria-current={
                            active ? "page" : undefined
                          }
                          className={`block rounded-sm py-2 text-sm font-semibold transition-colors ${
                            active
                              ? "text-[#FFD600]"
                              : "text-white hover:text-[#FFD600]"
                          }`}
                        >
                          {item.name}
                        </Link>
                      )}

                      {/* ACTIVE UNDERLINE */}

                      <span
                        className={`absolute inset-x-0 -bottom-1 h-[2px] rounded-full transition-transform duration-300 ${
                          active
                            ? "scale-x-100 bg-[#FFD600]"
                            : "scale-x-0 bg-[#E11D2E] group-hover:scale-x-100"
                        }`}
                      />
                    </div>

                    {/* DESKTOP DROPDOWN */}

                    {hasChildren && (
                      <AnimatePresence>
                        {dropdownOpen && (
                          <motion.div
                            variants={dropdownVariants}
                            initial="hidden"
                            animate="show"
                            exit="exit"
                            className="absolute left-0 top-full z-50 origin-top-left pt-3"
                          >
                            <div className="relative w-64 overflow-hidden rounded-xl border border-white/10 bg-[#0A0A0A]/95 shadow-2xl shadow-black/50 backdrop-blur-xl">
                              <span className="absolute inset-x-0 top-0 h-[3px] bg-gradient-to-r from-[#E11D2E] to-[#FFD600]" />

                              <ul
                                className="p-2 pt-3"
                                role="menu"
                              >
                                {item.children?.map(
                                  (sub) => {
                                    const subActive =
                                      isActive(sub.link);

                                    return (
                                      <motion.li
                                        key={sub.link}
                                        variants={dropdownItem}
                                        role="none"
                                      >
                                        <Link
                                          to={sub.link}
                                          role="menuitem"
                                          aria-current={
                                            subActive
                                              ? "page"
                                              : undefined
                                          }
                                          className={`group/sub flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-all duration-200 hover:translate-x-1 hover:bg-white/5 ${
                                            subActive
                                              ? "font-bold text-[#FFD600]"
                                              : "font-medium text-white/80 hover:text-[#FFD600]"
                                          }`}
                                        >
                                          <span
                                            className={`h-1.5 w-1.5 shrink-0 rounded-full bg-[#E11D2E] transition-transform duration-300 ${
                                              subActive
                                                ? "scale-100"
                                                : "scale-0 group-hover/sub:scale-100"
                                            }`}
                                          />

                                          {sub.name}
                                        </Link>
                                      </motion.li>
                                    );
                                  }
                                )}
                              </ul>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    )}
                  </motion.li>
                );
              })}
            </motion.ul>

            {/* PPDB BUTTON */}

            <motion.div
              initial={
                reduce
                  ? false
                  : { opacity: 0, scale: 0.8 }
              }
              animate={{
                opacity: 1,
                scale: 1,
              }}
              transition={{
                delay: 0.5,
                type: "spring",
                stiffness: 260,
                damping: 16,
              }}
            >
              <Link
                to={admissionMenu.link}
                className="inline-flex items-center rounded-lg bg-[#FFD600] px-5 py-2.5 text-sm font-extrabold text-[#0A0A0A] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#E11D2E] hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
              >
                {admissionMenu.name}
              </Link>
            </motion.div>
          </div>

          {/* MOBILE TOGGLE */}

          <button
            type="button"
            onClick={() =>
              setOpenMenu((previous) => !previous)
            }
            aria-label={
              openMenu ? "Tutup menu" : "Buka menu"
            }
            aria-expanded={openMenu}
            aria-controls="mobile-menu"
            className="-mr-2 flex h-11 w-11 items-center justify-center rounded-lg outline-none focus-visible:ring-2 focus-visible:ring-[#FFD600] lg:hidden"
          >
            <Burger open={openMenu} />
          </button>
        </nav>

        {/* SCROLL PROGRESS */}

        <motion.div
          className="absolute bottom-0 left-0 h-[3px] w-full origin-left bg-gradient-to-r from-[#E11D2E] to-[#FFD600]"
          style={{ scaleX: progress }}
          animate={{
            opacity: isSticky ? 1 : 0,
          }}
          aria-hidden="true"
        />
      </motion.header>

      {/* MOBILE MENU */}

      <AnimatePresence>
        {openMenu && (
          <motion.div
            id="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Menu navigasi"
            className="fixed inset-0 z-[9998] flex h-[100dvh] flex-col overflow-y-auto bg-[#0A0A0A] px-6 pb-10 pt-28 lg:hidden"
            initial={{
              clipPath: "circle(0% at 92% 5%)",
            }}
            animate={{
              clipPath: "circle(150% at 92% 5%)",
            }}
            exit={{
              clipPath: "circle(0% at 92% 5%)",
            }}
            transition={{
              duration: reduce ? 0 : 0.7,
              ease: EASE,
            }}
          >
            {/* BACKGROUND DECORATION */}

            <div className="pointer-events-none absolute -right-20 top-10 h-72 w-72 rounded-full bg-[#E11D2E]/25 blur-[100px]" />

            <div className="pointer-events-none absolute -bottom-20 -left-20 h-72 w-72 rounded-full bg-[#FFD600]/15 blur-[100px]" />

            <motion.div
              className="relative flex flex-1 flex-col justify-between gap-10"
              variants={mobileContainer}
              initial="hidden"
              animate="show"
            >
              <ul className="flex flex-col gap-1">
                {mainMenus.map((item) => {
                  const active = isGroupActive(item);
                  const hasChildren =
                    !!item.children?.length;

                  const expanded =
                    mobileOpen === item.link;

                  return (
                    <motion.li
                      key={item.link}
                      variants={mobileItem}
                    >
                      <div className="flex items-center justify-between">
                        {hasChildren ? (
                          <button
                            type="button"
                            onClick={() =>
                              setMobileOpen(
                                expanded
                                  ? null
                                  : item.link
                              )
                            }
                            aria-expanded={expanded}
                            className={`group flex flex-1 items-center gap-3 rounded-lg py-2.5 text-left text-2xl font-extrabold transition-colors sm:text-3xl ${
                              active
                                ? "text-[#FFD600]"
                                : "text-white hover:text-[#FFD600]"
                            }`}
                          >
                            <span
                              className={`h-2 w-2 rounded-full bg-[#E11D2E] ${
                                active
                                  ? "scale-100"
                                  : "scale-0"
                              }`}
                            />

                            {item.name}
                          </button>
                        ) : (
                          <Link
                            to={item.link}
                            onClick={() =>
                              setOpenMenu(false)
                            }
                            aria-current={
                              active ? "page" : undefined
                            }
                            className={`group flex flex-1 items-center gap-3 rounded-lg py-2.5 text-2xl font-extrabold transition-colors sm:text-3xl ${
                              active
                                ? "text-[#FFD600]"
                                : "text-white hover:text-[#FFD600]"
                            }`}
                          >
                            <span
                              className={`h-2 w-2 rounded-full bg-[#E11D2E] ${
                                active
                                  ? "scale-100"
                                  : "scale-0"
                              }`}
                            />

                            {item.name}
                          </Link>
                        )}

                        {hasChildren && (
                          <button
                            type="button"
                            aria-label={`${
                              expanded ? "Tutup" : "Buka"
                            } submenu ${item.name}`}
                            aria-expanded={expanded}
                            onClick={() =>
                              setMobileOpen(
                                expanded
                                  ? null
                                  : item.link
                              )
                            }
                            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg text-white/70 transition-colors hover:text-[#FFD600] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#FFD600]"
                          >
                            <FaChevronDown
                              className={`transition-transform duration-300 ${
                                expanded
                                  ? "rotate-180 text-[#FFD600]"
                                  : ""
                              }`}
                            />
                          </button>
                        )}
                      </div>

                      {/* MOBILE SUBMENU */}

                      {hasChildren && (
                        <AnimatePresence initial={false}>
                          {expanded && (
                            <motion.ul
                              initial={{
                                height: 0,
                                opacity: 0,
                              }}
                              animate={{
                                height: "auto",
                                opacity: 1,
                              }}
                              exit={{
                                height: 0,
                                opacity: 0,
                              }}
                              transition={{
                                duration: reduce ? 0 : 0.35,
                                ease: EASE,
                              }}
                              className="ml-1 overflow-hidden border-l-2 border-[#E11D2E]/60 pl-5"
                            >
                              {item.children?.map(
                                (sub, index) => {
                                  const subActive =
                                    isActive(sub.link);

                                  return (
                                    <motion.li
                                      key={sub.link}
                                      initial={
                                        reduce
                                          ? false
                                          : {
                                              opacity: 0,
                                              x: -12,
                                            }
                                      }
                                      animate={{
                                        opacity: 1,
                                        x: 0,
                                      }}
                                      transition={{
                                        delay:
                                          0.05 + index * 0.05,
                                        duration: 0.3,
                                      }}
                                    >
                                      <Link
                                        to={sub.link}
                                        onClick={() =>
                                          setOpenMenu(false)
                                        }
                                        aria-current={
                                          subActive
                                            ? "page"
                                            : undefined
                                        }
                                        className={`block rounded-lg py-2.5 text-lg font-semibold transition-colors ${
                                          subActive
                                            ? "text-[#FFD600]"
                                            : "text-white/75 hover:text-[#FFD600]"
                                        }`}
                                      >
                                        {sub.name}
                                      </Link>
                                    </motion.li>
                                  );
                                }
                              )}
                            </motion.ul>
                          )}
                        </AnimatePresence>
                      )}
                    </motion.li>
                  );
                })}
              </ul>

              {/* MOBILE PPDB CTA */}

              <motion.div
                variants={mobileItem}
                className="border-t border-white/10 pt-6"
              >
                <p className="mb-4 text-sm text-white/60">
                  Pendaftaran siswa baru SMK RK Bintang Timur
                </p>

                <Link
                  to={admissionMenu.link}
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
