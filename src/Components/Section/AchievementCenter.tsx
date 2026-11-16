import { useEffect, useState } from "react";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import { FaTrophy, FaMedal, FaAward, FaRedo } from "react-icons/fa";
import { Link } from "react-router-dom";

import SectionHeading from "../Common/SectionHeading";
import { getAchievements } from "../../services/achievementService";
import { resolveMediaUrl } from "../../services/mediaUrl";
import type { Achievement } from "../../types/achievement";
import { ACHIEVEMENT_LEVEL_LABEL } from "../../types/achievement";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];
const grid: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.15 } },
};
const card: Variants = {
  hidden: { opacity: 0, y: 48 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: EASE } },
};

const AchievementCenter = () => {
  const reduce = useReducedMotion();
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const loadAchievements = async () => {
    setLoading(true);
    setError(false);
    try {
      const result = await getAchievements({ page: 1, limit: 3 });
      setAchievements(result.achievements);
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void loadAchievements();
  }, []);

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

        {loading ? (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3" aria-label="Memuat prestasi">
            {Array.from({ length: 3 }).map((_, index) => (
              <div key={index} className="h-80 animate-pulse rounded-2xl bg-gray-100" />
            ))}
          </div>
        ) : error ? (
          <div role="alert" className="rounded-2xl bg-gray-50 p-8 text-center text-sm text-gray-600">
            <p>Data prestasi belum dapat dimuat.</p>
            <button type="button" onClick={() => void loadAchievements()} className="mt-3 inline-flex items-center gap-2 font-semibold text-[#E11D2E]">
              <FaRedo aria-hidden="true" /> Coba lagi
            </button>
          </div>
        ) : achievements.length === 0 ? (
          <div className="rounded-2xl bg-gray-50 p-8 text-center text-sm text-gray-600">
            Belum ada prestasi yang dipublikasikan. Informasi prestasi akan ditampilkan di sini.
          </div>
        ) : (
          <motion.div
            className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"
            variants={grid}
            initial={reduce ? "show" : "hidden"}
            whileInView="show"
            viewport={{ once: true, amount: 0.15 }}
          >
            {achievements.map((item, index) => {
              const image = resolveMediaUrl(item.thumbnail_url);
              const Icon = index === 0 ? FaTrophy : index === 1 ? FaMedal : FaAward;
              const year = item.achievement_date
                ? new Date(item.achievement_date).getFullYear().toString()
                : null;

              return (
                <motion.article
                  key={item.id}
                  variants={card}
                  whileHover={reduce ? undefined : { y: -8 }}
                  className="group overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition-shadow duration-300 hover:shadow-xl"
                >
                  <div className="relative h-56 overflow-hidden bg-gradient-to-br from-[#082B66] to-[#0B3D91]">
                    {image ? (
                      <img src={image} alt={item.title} loading="lazy" className="h-full w-full object-cover transition duration-500 group-hover:scale-110" />
                    ) : (
                      <div className="flex h-full items-center justify-center text-6xl text-white/80"><Icon aria-hidden="true" /></div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A]/80 to-transparent" />
                    <span className="absolute bottom-4 left-4 inline-flex items-center gap-2 rounded-full bg-[#FFD600] px-4 py-2 text-xs font-bold text-[#0A0A0A]">
                      <Icon aria-hidden="true" /> {ACHIEVEMENT_LEVEL_LABEL[item.achievement_level]}
                    </span>
                    {year && <span className="absolute right-4 top-4 rounded-full bg-white/90 px-3 py-1.5 text-xs font-bold text-[#0A0A0A]">{year}</span>}
                  </div>
                  <div className="p-6">
                    <h3 className="text-lg font-bold leading-snug text-[#0A0A0A]">{item.title}</h3>
                    {item.recipient_names && <p className="mt-2 text-sm text-gray-600">Peraih: {item.recipient_names}</p>}
                    {item.organizer && <p className="mt-1 text-xs text-gray-500">Penyelenggara: {item.organizer}</p>}
                    <div className="mt-5 h-1 w-12 rounded-full bg-[#FFD600]" />
                  </div>
                </motion.article>
              );
            })}
          </motion.div>
        )}

        <motion.div
          className="relative mt-12 overflow-hidden rounded-2xl bg-[#0A0A0A] p-8 text-center md:p-10"
          initial={reduce ? false : { opacity: 0, scale: 0.94 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.8, ease: EASE }}
        >
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
            {!reduce && <motion.span className="absolute inset-0 rounded-full border-2 border-[#FFD600]" animate={{ scale: [1, 1.8], opacity: [0.6, 0] }} transition={{ duration: 2, ease: "easeOut", repeat: Infinity }} aria-hidden="true" />}
            <motion.div animate={reduce ? undefined : { rotate: [0, -10, 10, -6, 0] }} transition={{ duration: 1.2, repeat: Infinity, repeatDelay: 3 }}>
              <FaTrophy className="text-4xl text-[#FFD600]" />
            </motion.div>
          </div>
          <h3 className="relative text-xl font-extrabold text-white md:text-2xl">Setiap Prestasi Adalah Awal dari Kesuksesan</h3>
          <p className="relative mx-auto mt-3 max-w-2xl text-sm leading-7 text-white/70">Terus berkarya, berprestasi, dan menjadi kebanggaan sekolah.</p>
          <Link to="/prestasi" className="relative mt-6 inline-flex rounded-xl bg-[#FFD600] px-5 py-3 text-sm font-bold text-[#0A0A0A] transition hover:bg-white">Jelajahi Prestasi</Link>
        </motion.div>
      </div>
    </section>
  );
};

export default AchievementCenter;
