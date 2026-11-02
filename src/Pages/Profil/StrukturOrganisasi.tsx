
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  FaSitemap,
  FaUserTie,
  FaUsers,
  FaInfoCircle,
} from "react-icons/fa";
import { Link } from "react-router-dom";

import PageMeta from "../../Components/Common/PageMeta";
import { getSchool } from "../../services/schoolService";

export default function StrukturOrganisasi() {
  const [organization, setOrganization] =
    useState<Record<string, unknown> | null>(null);
  const [principal, setPrincipal] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;

    const fetchOrganization = async () => {
      try {
        const response = await getSchool();

        if (!mounted) return;

        if (!response.success) {
          throw new Error("Gagal mengambil struktur organisasi sekolah.");
        }

        setOrganization(response.data.org_chart);
        setPrincipal(response.data.profile.principal_name);
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

    fetchOrganization();

    return () => {
      mounted = false;
    };
  }, []);

  const hasOrganization =
    organization !== null && Object.keys(organization).length > 0;

  return (
    <>
      <PageMeta
        title="Struktur Organisasi"
        description="Struktur organisasi SMK RK Bintang Timur Pematangsiantar."
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
            <FaSitemap /> PROFIL SEKOLAH
          </span>

          <h1 className="mt-7 text-4xl font-extrabold md:text-6xl">
            Struktur <span className="text-[#FFD600]">Organisasi</span>
          </h1>

          <p className="mt-6 max-w-2xl text-base leading-8 text-blue-100 md:text-lg">
            Mengenal susunan organisasi dan pembagian tanggung jawab
            dalam mendukung penyelenggaraan pendidikan di SMK RK Bintang
            Timur.
          </p>

          <div className="mt-8 flex gap-3 text-sm text-blue-100">
            <Link to="/" className="hover:text-[#FFD600]">Beranda</Link>
            <span>/</span>
            <span className="font-semibold text-[#FFD600]">
              Struktur Organisasi
            </span>
          </div>
        </motion.div>
      </main>

      <section className="bg-[#F8FAFC] px-4 py-20">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 text-center">
            <span className="text-sm font-bold uppercase tracking-[0.2em] text-[#0B3D91]">
              Manajemen Sekolah
            </span>
            <h2 className="mt-3 text-3xl font-extrabold text-gray-900 md:text-4xl">
              Susunan <span className="text-[#0B3D91]">Organisasi</span>
            </h2>
            <p className="mx-auto mt-4 max-w-2xl leading-7 text-gray-600">
              Struktur organisasi menggambarkan susunan kepemimpinan,
              koordinasi, dan tanggung jawab di lingkungan sekolah.
            </p>
          </div>

          {loading ? (
            <div className="mx-auto h-64 max-w-xl animate-pulse rounded-3xl bg-gray-200" />
          ) : error ? (
            <div className="rounded-2xl border border-red-200 bg-red-50 p-6 text-red-700">
              {error}
            </div>
          ) : (
            <>
              <div className="mx-auto max-w-md">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="rounded-3xl border border-blue-100 bg-white p-8 text-center shadow-lg"
                >
                  <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-2xl bg-[#0B3D91] text-3xl text-white">
                    <FaUserTie />
                  </div>

                  <p className="mt-5 text-xs font-bold uppercase tracking-[0.2em] text-[#0B3D91]">
                    Kepala Sekolah
                  </p>

                  <h3 className="mt-2 text-xl font-extrabold text-gray-900">
                    {principal || "Belum tersedia"}
                  </h3>
                </motion.div>
              </div>

              <div className="mx-auto h-12 w-px bg-blue-200" />

              <div className="mx-auto max-w-4xl border-t border-blue-200" />

              {hasOrganization ? (
                <div className="mx-auto mt-8 max-w-4xl rounded-2xl border border-gray-100 bg-white p-8 shadow-sm">
                  <h3 className="font-bold text-gray-900">
                    Data Struktur Organisasi
                  </h3>
                  <pre className="mt-4 whitespace-pre-wrap break-words font-sans text-sm leading-7 text-gray-600">
                    {JSON.stringify(organization, null, 2)}
                  </pre>
                </div>
              ) : (
                <div className="mx-auto mt-8 max-w-3xl rounded-3xl border border-gray-100 bg-white px-6 py-12 text-center shadow-sm">
                  <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-50 text-3xl text-[#0B3D91]">
                    <FaUsers />
                  </div>

                  <h3 className="mt-5 text-xl font-extrabold text-gray-900">
                    Struktur Organisasi Sedang Dipersiapkan
                  </h3>

                  <p className="mx-auto mt-3 max-w-xl leading-7 text-gray-500">
                    Data susunan wakil kepala sekolah, ketua program
                    keahlian, guru, dan tenaga kependidikan belum tersedia.
                    Informasi akan ditampilkan setelah data resmi dimasukkan.
                  </p>

                  <div className="mt-5 inline-flex items-center gap-2 rounded-full bg-yellow-50 px-4 py-2 text-sm font-semibold text-yellow-700">
                    <FaInfoCircle />
                    Menunggu data organisasi
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </section>
    </>
  );
}
