import { useEffect, useState } from "react";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import { FaGraduationCap, FaRedo } from "react-icons/fa";
import SectionHeading from "../Common/SectionHeading";
import api from "../../services/api";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];
interface FeaturedMajor {
  id: string;
  code: string;
  name: string;
  description: string | null;
  thumbnail_url: string | null;
  is_featured: boolean;
}
interface ApiResponse { success: boolean; data: FeaturedMajor[] }
const grid: Variants = { hidden: {}, show: { transition: { staggerChildren: 0.12 } } };
const card: Variants = { hidden: { opacity: 0, y: 40 }, show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } } };

const FeaturedPrograms = () => {
  const reduce = useReducedMotion();
  const [programs, setPrograms] = useState<FeaturedMajor[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const loadPrograms = () => {
    setLoading(true);
    setError(false);
    api.get<ApiResponse>("/majors", { params: { is_featured: true, limit: 4, sort: "name", order: "asc" } })
      .then(({ data }) => setPrograms(Array.isArray(data.data) ? data.data.slice(0, 4) : []))
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  };

  useEffect(() => { loadPrograms(); }, []);

  return (
    <section className="bg-[#F5F5F5] py-20 md:py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <SectionHeading label="Program Unggulan" title="Mempersiapkan Generasi" accent="Masa Depan" description="Program keahlian pilihan yang dikembangkan untuk membekali siswa dengan pengetahuan, keterampilan, dan karakter unggul." link={{ to: "/jurusan", text: "Lihat Semua Program" }} />
        {loading ? (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4" aria-label="Memuat program unggulan">
            {Array.from({ length: 4 }).map((_, i) => <div key={i} className="h-64 animate-pulse rounded-2xl bg-white" />)}
          </div>
        ) : error ? (
          <div role="alert" className="rounded-2xl bg-white p-8 text-center text-sm text-gray-600">
            <p>Program unggulan belum dapat dimuat.</p>
            <button type="button" onClick={loadPrograms} className="mt-3 inline-flex items-center gap-2 font-semibold text-[#E11D2E]"><FaRedo /> Coba lagi</button>
          </div>
        ) : programs.length === 0 ? (
          <div className="rounded-2xl bg-white p-8 text-center text-sm text-gray-600">Belum ada program yang ditandai sebagai Program Unggulan. Silakan atur melalui CMS.</div>
        ) : (
          <motion.div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4" variants={grid} initial={reduce ? "show" : "hidden"} whileInView="show" viewport={{ once: true, amount: 0.15 }}>
            {programs.map((program, index) => (
              <motion.article key={program.id} variants={card} whileHover={reduce ? undefined : { y: -8 }} className="group relative overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition-shadow duration-300 hover:shadow-xl">
                <div className="relative flex h-40 items-center justify-center overflow-hidden bg-[#0A0A0A]/5">
                  {program.thumbnail_url ? <img src={program.thumbnail_url} alt={program.name} loading="lazy" className="h-full w-full object-cover" /> : <FaGraduationCap className="text-5xl text-[#E11D2E]" />}
                  <span className="absolute right-4 top-4 rounded-full bg-[#FFD600] px-3 py-1 text-xs font-bold text-[#0A0A0A]">{program.code}</span>
                </div>
                <div className="p-6">
                  <h3 className="mb-3 text-lg font-bold text-[#0A0A0A]">{program.name}</h3>
                  <p className="text-sm leading-7 text-gray-600">{program.description || "Program keahlian untuk mengembangkan kompetensi dan keterampilan siswa."}</p>
                  <div className="mt-6 h-1 w-10 rounded-full bg-[#FFD600] transition-[width] duration-300 group-hover:w-20" />
                </div>
              </motion.article>
            ))}
          </motion.div>
        )}
      </div>
    </section>
  );
};
export default FeaturedPrograms;
