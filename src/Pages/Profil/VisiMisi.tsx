
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  FaEye,
  FaBullseye,
  FaGraduationCap,
  FaCheckCircle,
  FaArrowRight,
} from "react-icons/fa";
import { Link } from "react-router-dom";

import PageMeta from "../../Components/Common/PageMeta";
import { getSchool } from "../../services/schoolService";
import type { VisionMission } from "../../types/school";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" as const },
  },
};

const stagger = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12 },
  },
};

export default function VisiMisi() {
  const [visionMission, setVisionMission] =
    useState<VisionMission | null>(null);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;

    const fetchVisionMission = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await getSchool();

        if (!mounted) return;

        if (!response.success) {
          throw new Error("Gagal mengambil data visi dan misi sekolah.");
        }

        setVisionMission(response.data.vision_mission);
      } catch (err) {
        if (!mounted) return;

        setError(
          err instanceof Error
            ? err.message
            : "Terjadi kesalahan saat mengambil data."
        );
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    };

    fetchVisionMission();

    return () => {
      mounted = false;
    };
  }, []);

  return (
    <>
      <PageMeta
        title="Visi & Misi"
        description="Visi dan misi SMK RK Bintang Timur Pematangsiantar."
      />

      {/* HERO */}
      <section className="relative overflow-hidden bg-[#082B66] px-4 py-24 text-white md:py-32">
        <div className="absolute inset-0 bg-gradient-to-r from-[#082B66] via-[#0B3D91] to-[#082B66]" />

        <div className="absolute -right-20 -top-24 h-80 w-80 rounded-full border-[50px] border-white/5" />
        <div className="absolute -bottom-32 -left-20 h-96 w-96 rounded-full border-[60px] border-white/5" />

        <div className="relative mx-auto max-w-7xl">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={stagger}
            className="max-w-3xl"
          >
            <motion.div variants={fadeUp}>
              <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-semibold text-yellow-300 backdrop-blur-sm">
                <FaBullseye />
                PROFIL SEKOLAH
              </span>
            </motion.div>

            <motion.h1
              variants={fadeUp}
              className="mt-7 text-4xl font-extrabold leading-tight md:text-6xl"
            >
              Visi & <span className="text-[#FFD600]">Misi</span>
            </motion.h1>

            <motion.p
              variants={fadeUp}
              className="mt-6 max-w-2xl text-base leading-8 text-blue-100 md:text-lg"
            >
              Landasan, arah, dan komitmen SMK RK Bintang Timur dalam
              membangun pendidikan berkualitas serta mempersiapkan generasi
              yang kompeten dan berkarakter.
            </motion.p>

            <motion.div
              variants={fadeUp}
              className="mt-8 flex flex-wrap items-center gap-3 text-sm text-blue-100"
            >
              <Link to="/" className="transition hover:text-[#FFD600]">
                Beranda
              </Link>
              <span>/</span>
              <Link to="/profil" className="transition hover:text-[#FFD600]">
                Profil Sekolah
              </Link>
              <span>/</span>
              <span className="font-semibold text-[#FFD600]">
                Visi & Misi
              </span>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ERROR */}
      {error && (
        <div className="mx-auto max-w-7xl px-4 pt-8">
          <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
            {error}
          </div>
        </div>
      )}

      {/* INTRODUCTION */}
      <section className="bg-white px-4 py-20">
        <div className="mx-auto grid max-w-7xl items-center gap-12 md:grid-cols-2">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
          >
            <motion.span
              variants={fadeUp}
              className="text-sm font-bold uppercase tracking-[0.2em] text-[#0B3D91]"
            >
              Tentang Kami
            </motion.span>

            <motion.h2
              variants={fadeUp}
              className="mt-4 text-3xl font-extrabold leading-tight text-gray-900 md:text-4xl"
            >
              Membangun Masa Depan Melalui{" "}
              <span className="text-[#0B3D91]">Pendidikan</span>
            </motion.h2>

            <motion.p
              variants={fadeUp}
              className="mt-6 leading-8 text-gray-600"
            >
              SMK RK Bintang Timur berkomitmen untuk menciptakan lingkungan
              pendidikan yang mendukung pengembangan potensi peserta didik.
              Melalui pendidikan, keterampilan, dan pembentukan karakter,
              sekolah berupaya mempersiapkan generasi yang mampu menghadapi
              tantangan masa depan.
            </motion.p>

            <motion.div
              variants={fadeUp}
              className="mt-8 flex items-center gap-3"
            >
              <span className="h-1 w-12 rounded-full bg-[#FFD600]" />
              <span className="text-sm font-bold tracking-wider text-[#0B3D91]">
                SMK RK BINTANG TIMUR
              </span>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="relative"
          >
            <div className="absolute -right-3 -top-3 h-24 w-24 rounded-2xl bg-[#FFD600]" />

            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#082B66] to-[#0B3D91] p-8 text-white shadow-xl md:p-12">
              <div className="absolute -bottom-20 -right-16 h-64 w-64 rounded-full border-[35px] border-white/5" />

              <div className="relative">
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#FFD600] text-3xl text-[#082B66]">
                  <FaGraduationCap />
                </div>

                <h3 className="mt-8 text-2xl font-extrabold leading-snug md:text-3xl">
                  Pendidikan Hari Ini, Generasi Unggul Esok Hari.
                </h3>

                <p className="mt-5 leading-7 text-blue-100">
                  Membentuk peserta didik yang memiliki pengetahuan,
                  keterampilan, karakter, dan semangat untuk terus berkembang.
                </p>

                <div className="mt-8 h-1.5 w-20 rounded-full bg-[#FFD600]" />
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* VISION */}
      <section className="bg-[#F8FAFC] px-4 py-20">
        <div className="mx-auto max-w-7xl">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className="mb-12 text-center"
          >
            <span className="text-sm font-bold uppercase tracking-[0.2em] text-[#0B3D91]">
              Our Vision
            </span>

            <h2 className="mt-3 text-3xl font-extrabold text-gray-900 md:text-4xl">
              Visi <span className="text-[#0B3D91]">Sekolah</span>
            </h2>

            <div className="mx-auto mt-5 h-1.5 w-20 rounded-full bg-[#FFD600]" />
          </motion.div>

          <div className="relative overflow-hidden rounded-3xl bg-[#0B3D91] px-8 py-12 text-center shadow-xl md:px-20 md:py-16">
            <div className="absolute -left-20 -top-20 h-64 w-64 rounded-full border-[40px] border-white/5" />
            <div className="absolute -bottom-24 -right-16 h-72 w-72 rounded-full border-[45px] border-white/5" />

            <div className="relative mx-auto max-w-4xl">
              <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-3xl bg-[#FFD600] text-4xl text-[#082B66]">
                <FaEye />
              </div>

              <span className="mt-8 block text-sm font-bold uppercase tracking-[0.25em] text-blue-200">
                Visi Kami
              </span>

              {loading ? (
                <div className="mx-auto mt-6 h-20 max-w-3xl animate-pulse rounded-xl bg-white/20" />
              ) : (
                <motion.h3
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-6 text-2xl font-extrabold leading-relaxed text-white md:text-4xl"
                >
                  {visionMission?.vision || "Data visi belum tersedia."}
                </motion.h3>
              )}

              <div className="mx-auto mt-8 h-1.5 w-24 rounded-full bg-[#FFD600]" />
            </div>
          </div>
        </div>
      </section>

      {/* MISSION */}
      <section className="bg-white px-4 py-20">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 text-center">
            <span className="text-sm font-bold uppercase tracking-[0.2em] text-[#0B3D91]">
              Our Mission
            </span>

            <h2 className="mt-3 text-3xl font-extrabold text-gray-900 md:text-4xl">
              Misi <span className="text-[#0B3D91]">Sekolah</span>
            </h2>

            <p className="mx-auto mt-4 max-w-2xl leading-7 text-gray-500">
              Komitmen dan langkah nyata dalam mewujudkan visi pendidikan
              SMK RK Bintang Timur.
            </p>

            <div className="mx-auto mt-5 h-1.5 w-20 rounded-full bg-[#FFD600]" />
          </div>

          {loading ? (
            <div className="grid gap-6 md:grid-cols-2">
              {[1, 2].map((item) => (
                <div
                  key={item}
                  className="h-36 animate-pulse rounded-2xl bg-gray-100"
                />
              ))}
            </div>
          ) : visionMission?.missions?.length ? (
            <motion.div
              variants={stagger}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.15 }}
              className="grid gap-6 md:grid-cols-2"
            >
              {visionMission.missions.map((mission, index) => (
                <motion.div
                  key={`${index}-${mission}`}
                  variants={fadeUp}
                  className="group rounded-2xl border border-gray-100 bg-white p-7 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:border-blue-100 hover:shadow-xl md:p-8"
                >
                  <div className="flex items-start gap-5">
                    <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-blue-50 text-2xl text-[#0B3D91] transition-all duration-300 group-hover:bg-[#0B3D91] group-hover:text-white">
                      <FaBullseye />
                    </div>

                    <div className="flex-1">
                      <span className="text-sm font-extrabold tracking-wider text-[#D4A900]">
                        MISI {String(index + 1).padStart(2, "0")}
                      </span>

                      <p className="mt-2 leading-7 text-gray-600">
                        {mission}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          ) : (
            !loading && (
              <p className="text-center text-gray-500">
                Data misi belum tersedia.
              </p>
            )
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#F8FAFC] px-4 py-20">
        <div className="mx-auto max-w-7xl overflow-hidden rounded-3xl bg-gradient-to-r from-[#082B66] to-[#0B3D91] px-8 py-14 text-center text-white md:px-16">
          <FaCheckCircle className="mx-auto text-4xl text-[#FFD600]" />

          <h2 className="mt-6 text-2xl font-extrabold md:text-4xl">
            Bersama Membangun Generasi Masa Depan
          </h2>

          <p className="mx-auto mt-5 max-w-2xl leading-7 text-blue-100">
            Kenali lebih dekat SMK RK Bintang Timur dan temukan lingkungan
            pendidikan yang mendukung potensi serta masa depan peserta didik.
          </p>

          <Link
            to="/jurusan"
            className="mt-8 inline-flex items-center gap-3 rounded-xl bg-[#FFD600] px-7 py-4 font-bold text-[#082B66] transition-all duration-300 hover:-translate-y-1 hover:bg-yellow-300"
          >
            Lihat Program Keahlian
            <FaArrowRight />
          </Link>
        </div>
      </section>
    </>
  );
}
