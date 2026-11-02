
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  FaHistory,
  FaCalendarAlt,
  FaBookOpen,
  FaInfoCircle,
} from "react-icons/fa";
import { Link } from "react-router-dom";

import PageMeta from "../../Components/Common/PageMeta";
import { getSchool } from "../../services/schoolService";

export default function SejarahSingkat() {
  const [history, setHistory] = useState<Record<string, unknown> | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;

    const fetchHistory = async () => {
      try {
        const response = await getSchool();

        if (!mounted) return;

        if (!response.success) {
          throw new Error("Gagal mengambil sejarah sekolah.");
        }

        setHistory(response.data.history);
      } catch (err) {
        if (!mounted) return;
        setError(
          err instanceof Error
            ? err.message
            : "Terjadi kesalahan saat mengambil data."
        );
      } finally {
        if (mounted) setLoading(false);
      }
    };

    fetchHistory();

    return () => {
      mounted = false;
    };
  }, []);

  const hasHistory = history !== null && Object.keys(history).length > 0;

  return (
    <>
      <PageMeta
        title="Sejarah Singkat"
        description="Sejarah dan perjalanan SMK RK Bintang Timur Pematangsiantar."
      />

      <main className="relative overflow-hidden bg-gradient-to-br from-[#082B66] via-[#0B3D91] to-[#061D46] px-4 py-24 text-white md:py-32">
        <div className="absolute -right-32 -top-32 h-96 w-96 rounded-full border-[55px] border-white/5" />
        <div className="absolute -bottom-40 -left-32 h-[450px] w-[450px] rounded-full border-[60px] border-white/5" />

        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative mx-auto max-w-7xl"
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-bold text-yellow-300">
            <FaHistory /> PROFIL SEKOLAH
          </span>

          <h1 className="mt-7 text-4xl font-extrabold md:text-6xl">
            Sejarah <span className="text-[#FFD600]">Singkat</span>
          </h1>

          <p className="mt-6 max-w-2xl text-base leading-8 text-blue-100 md:text-lg">
            Mengenal perjalanan, perkembangan, dan sejarah berdirinya
            SMK RK Bintang Timur Pematangsiantar.
          </p>

          <div className="mt-8 flex gap-3 text-sm text-blue-100">
            <Link to="/" className="hover:text-[#FFD600]">Beranda</Link>
            <span>/</span>
            <span className="font-semibold text-[#FFD600]">Sejarah Singkat</span>
          </div>
        </motion.div>
      </main>

      <section className="bg-[#F8FAFC] px-4 py-20">
        <div className="mx-auto max-w-7xl">
          <div className="grid items-start gap-12 lg:grid-cols-2">
            <motion.div
              initial={{ opacity: 0, x: -25 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <span className="text-sm font-bold uppercase tracking-[0.2em] text-[#0B3D91]">
                Perjalanan Sekolah
              </span>

              <h2 className="mt-4 text-3xl font-extrabold leading-tight text-gray-900 md:text-4xl">
                Mengenal Lebih Dekat{" "}
                <span className="text-[#0B3D91]">Sejarah Kami</span>
              </h2>

              <p className="mt-6 leading-8 text-gray-600">
                Setiap perjalanan pendidikan memiliki cerita dan
                perkembangan tersendiri. Halaman ini menjadi tempat untuk
                mengenal sejarah berdirinya serta perjalanan SMK RK Bintang
                Timur dalam menyelenggarakan pendidikan.
              </p>

              <div className="mt-8 flex items-center gap-4 rounded-2xl border border-gray-100 bg-white p-5">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-yellow-50 text-2xl text-yellow-600">
                  <FaCalendarAlt />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Tahun Berdiri</p>
                  <p className="text-2xl font-extrabold text-[#0B3D91]">
                    1995
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 25 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="rounded-3xl bg-gradient-to-br from-[#082B66] to-[#0B3D91] p-8 text-white shadow-xl md:p-10"
            >
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#FFD600] text-3xl text-[#082B66]">
                <FaBookOpen />
              </div>

              <h3 className="mt-7 text-2xl font-extrabold">
                SMK RK Bintang Timur
              </h3>

              <p className="mt-4 leading-8 text-blue-100">
                Berlokasi di Pematangsiantar, Sumatera Utara, sekolah
                berkomitmen untuk mendukung pendidikan dan pengembangan
                kompetensi peserta didik.
              </p>

              <div className="mt-8 h-1.5 w-20 rounded-full bg-[#FFD600]" />
            </motion.div>
          </div>

          <div className="mt-14">
            <div className="mb-8">
              <span className="text-sm font-bold uppercase tracking-[0.2em] text-[#0B3D91]">
                Cerita Perjalanan
              </span>
              <h2 className="mt-3 text-3xl font-extrabold text-gray-900">
                Perjalanan <span className="text-[#0B3D91]">Kami</span>
              </h2>
            </div>

            {loading ? (
              <div className="h-40 animate-pulse rounded-2xl bg-gray-200" />
            ) : error ? (
              <div className="rounded-2xl border border-red-200 bg-red-50 p-6 text-red-700">
                {error}
              </div>
            ) : hasHistory ? (
              <div className="rounded-2xl border border-gray-100 bg-white p-8">
                <pre className="whitespace-pre-wrap break-words font-sans text-sm leading-7 text-gray-700">
                  {JSON.stringify(history, null, 2)}
                </pre>
              </div>
            ) : (
              <div className="rounded-3xl border border-gray-100 bg-white px-6 py-14 text-center shadow-sm">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-50 text-3xl text-[#0B3D91]">
                  <FaInfoCircle />
                </div>
                <h3 className="mt-5 text-xl font-extrabold text-gray-900">
                  Sejarah Sekolah Sedang Dipersiapkan
                </h3>
                <p className="mx-auto mt-3 max-w-xl leading-7 text-gray-500">
                  Informasi sejarah dan perjalanan sekolah akan ditampilkan
                  di halaman ini setelah data resmi tersedia.
                </p>
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
