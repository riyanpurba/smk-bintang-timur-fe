
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  FaSchool,
  FaIdCard,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaEnvelope,
  FaGlobe,
  FaUserTie,
  FaCalendarAlt,
  FaGraduationCap,
  FaBuilding,
  FaCheckCircle,
} from "react-icons/fa";

import PageMeta from "../../Components/Common/PageMeta";
import { getSchool } from "../../services/schoolService";
import type { SchoolProfile } from "../../types/school";

const fadeUp = {
  hidden: { opacity: 0, y: 25 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" as const },
  },
};

const stagger = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1 },
  },
};

const API_URL = import.meta.env.VITE_API_URL as string;

const getLogoUrl = (logoUrl: string | null) => {
  if (!logoUrl) return null;

  if (logoUrl.startsWith("http")) return logoUrl;

  try {
    const backendOrigin = new URL(API_URL).origin;
    return `${backendOrigin}${logoUrl}`;
  } catch {
    return logoUrl;
  }
};

function InfoCard({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string | number | null | undefined;
}) {
  return (
    <div className="group flex gap-4 rounded-2xl border border-gray-100 bg-white p-5 transition duration-300 hover:-translate-y-1 hover:border-blue-100 hover:shadow-lg">
      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-xl text-[#0B3D91] transition group-hover:bg-[#0B3D91] group-hover:text-white">
        {icon}
      </div>

      <div className="min-w-0">
        <p className="text-sm text-gray-500">{label}</p>
        <p className="mt-1 break-words font-bold text-gray-800">
          {value || "-"}
        </p>
      </div>
    </div>
  );
}

export default function IdentitasSekolah() {
  const [profile, setProfile] = useState<SchoolProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;

    const fetchSchoolProfile = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await getSchool();

        if (!mounted) return;

        if (!response.success) {
          throw new Error("Gagal mengambil identitas sekolah.");
        }

        setProfile(response.data.profile);
      } catch (err) {
        if (!mounted) return;

        setError(
          err instanceof Error
            ? err.message
            : "Terjadi kesalahan saat mengambil data sekolah."
        );
      } finally {
        if (mounted) setLoading(false);
      }
    };

    fetchSchoolProfile();

    return () => {
      mounted = false;
    };
  }, []);

  const logo = getLogoUrl(profile?.logo_url ?? null);

  return (
    <>
      <PageMeta
        title="Identitas Sekolah"
        description="Informasi dan identitas resmi SMK RK Bintang Timur Pematangsiantar."
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
                <FaSchool />
                PROFIL SEKOLAH
              </span>
            </motion.div>

            <motion.h1
              variants={fadeUp}
              className="mt-7 text-4xl font-extrabold leading-tight md:text-6xl"
            >
              Identitas{" "}
              <span className="text-[#FFD600]">Sekolah</span>
            </motion.h1>

            <motion.p
              variants={fadeUp}
              className="mt-6 max-w-2xl text-base leading-8 text-blue-100 md:text-lg"
            >
              Mengenal lebih dekat profil, informasi, dan identitas resmi
              SMK RK Bintang Timur Pematangsiantar.
            </motion.p>

            <motion.div
              variants={fadeUp}
              className="mt-8 flex flex-wrap items-center gap-3 text-sm text-blue-100"
            >
              <a href="/" className="transition hover:text-[#FFD600]">
                Beranda
              </a>
              <span>/</span>
              <span className="font-semibold text-[#FFD600]">
                Identitas Sekolah
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

      {/* SCHOOL PROFILE */}
      <section className="bg-[#F8FAFC] px-4 py-20">
        <div className="mx-auto max-w-7xl">
          {loading ? (
            <div className="grid animate-pulse gap-8 lg:grid-cols-3">
              <div className="h-80 rounded-3xl bg-gray-200" />
              <div className="space-y-4 lg:col-span-2">
                <div className="h-12 rounded-xl bg-gray-200" />
                <div className="grid gap-4 sm:grid-cols-2">
                  {Array.from({ length: 6 }).map((_, index) => (
                    <div
                      key={index}
                      className="h-24 rounded-2xl bg-gray-200"
                    />
                  ))}
                </div>
              </div>
            </div>
          ) : profile ? (
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={stagger}
              className="grid items-start gap-8 lg:grid-cols-3"
            >
              {/* SCHOOL BRAND CARD */}
              <motion.div
                variants={fadeUp}
                className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#082B66] to-[#0B3D91] p-8 text-center text-white shadow-xl"
              >
                <div className="absolute -right-16 -top-16 h-48 w-48 rounded-full border-[30px] border-white/5" />
                <div className="absolute -bottom-20 -left-16 h-56 w-56 rounded-full border-[35px] border-white/5" />

                <div className="relative">
                  <div className="mx-auto flex h-36 w-36 items-center justify-center overflow-hidden rounded-3xl border border-white/20 bg-white p-4 shadow-lg">
                    {logo ? (
                      <img
                        src={logo}
                        alt={`Logo ${profile.name}`}
                        className="h-full w-full object-contain"
                      />
                    ) : (
                      <FaSchool className="text-6xl text-[#0B3D91]" />
                    )}
                  </div>

                  <div className="mt-7">
                    <span className="inline-flex items-center gap-2 rounded-full bg-green-400/15 px-3 py-1.5 text-xs font-bold text-green-200">
                      <FaCheckCircle />
                      SEKOLAH {profile.status?.toUpperCase()}
                    </span>

                    <h2 className="mt-5 text-2xl font-extrabold leading-snug">
                      {profile.name}
                    </h2>

                    <p className="mt-3 text-sm text-blue-100">
                      {profile.city}, {profile.province}
                    </p>

                    <div className="mx-auto mt-7 h-1 w-16 rounded-full bg-[#FFD600]" />

                    <p className="mt-6 text-sm leading-7 text-blue-100">
                      Membangun generasi yang berakhlak mulia, cerdas,
                      terampil, dan unggul dalam mutu.
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* SCHOOL INFORMATION */}
              <motion.div
                variants={fadeUp}
                className="lg:col-span-2"
              >
                <div className="mb-7">
                  <span className="text-sm font-bold uppercase tracking-[0.2em] text-[#0B3D91]">
                    Informasi Umum
                  </span>

                  <h2 className="mt-3 text-3xl font-extrabold text-gray-900 md:text-4xl">
                    Profil dan Identitas{" "}
                    <span className="text-[#0B3D91]">Sekolah</span>
                  </h2>

                  <p className="mt-4 leading-7 text-gray-600">
                    Informasi resmi mengenai identitas dan data umum
                    sekolah SMK RK Bintang Timur.
                  </p>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <InfoCard
                    icon={<FaIdCard />}
                    label="NPSN"
                    value={profile.npsn}
                  />

                  <InfoCard
                    icon={<FaGraduationCap />}
                    label="Jenjang Pendidikan"
                    value={profile.school_type}
                  />

                  <InfoCard
                    icon={<FaBuilding />}
                    label="Status Sekolah"
                    value={profile.status}
                  />

                  <InfoCard
                    icon={<FaCalendarAlt />}
                    label="Tahun Berdiri"
                    value={profile.founded_year}
                  />

                  <InfoCard
                    icon={<FaUserTie />}
                    label="Kepala Sekolah"
                    value={profile.principal_name}
                  />

                  <InfoCard
                    icon={<FaMapMarkerAlt />}
                    label="Kecamatan"
                    value={profile.district}
                  />
                </div>
              </motion.div>
            </motion.div>
          ) : !error ? (
            <div className="rounded-2xl bg-white p-10 text-center text-gray-500">
              Data identitas sekolah belum tersedia.
            </div>
          ) : null}
        </div>
      </section>

      {/* ADDRESS AND CONTACT */}
      {profile && !loading && (
        <section className="bg-white px-4 py-20">
          <div className="mx-auto max-w-7xl">
            <div className="mb-10 text-center">
              <span className="text-sm font-bold uppercase tracking-[0.2em] text-[#0B3D91]">
                Informasi Kontak
              </span>

              <h2 className="mt-3 text-3xl font-extrabold text-gray-900 md:text-4xl">
                Lokasi dan{" "}
                <span className="text-[#0B3D91]">Kontak Sekolah</span>
              </h2>

              <p className="mx-auto mt-4 max-w-2xl leading-7 text-gray-600">
                Informasi alamat dan saluran komunikasi resmi sekolah.
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              {/* ADDRESS */}
              <motion.div
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="rounded-3xl border border-gray-100 bg-[#F8FAFC] p-7 md:p-9"
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#0B3D91] text-2xl text-white">
                  <FaMapMarkerAlt />
                </div>

                <h3 className="mt-6 text-xl font-extrabold text-gray-900">
                  Alamat Sekolah
                </h3>

                <p className="mt-4 leading-8 text-gray-600">
                  {profile.address}
                </p>

                <div className="mt-6 space-y-2 border-t border-gray-200 pt-5 text-sm text-gray-600">
                  <p>
                    <span className="font-semibold text-gray-800">
                      Kelurahan:
                    </span>{" "}
                    {profile.village || "-"}
                  </p>
                  <p>
                    <span className="font-semibold text-gray-800">
                      Kecamatan:
                    </span>{" "}
                    {profile.district || "-"}
                  </p>
                  <p>
                    <span className="font-semibold text-gray-800">
                      Kota:
                    </span>{" "}
                    {profile.city || "-"}
                  </p>
                  <p>
                    <span className="font-semibold text-gray-800">
                      Provinsi:
                    </span>{" "}
                    {profile.province || "-"}
                  </p>
                  <p>
                    <span className="font-semibold text-gray-800">
                      Kode Pos:
                    </span>{" "}
                    {profile.postal_code || "-"}
                  </p>
                </div>
              </motion.div>

              {/* CONTACT */}
              <motion.div
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="rounded-3xl bg-gradient-to-br from-[#082B66] to-[#0B3D91] p-7 text-white shadow-lg md:p-9"
              >
                <h3 className="text-xl font-extrabold">
                  Hubungi Kami
                </h3>

                <p className="mt-3 leading-7 text-blue-100">
                  Silakan hubungi sekolah melalui informasi kontak berikut.
                </p>

                <div className="mt-8 space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white/10 text-xl text-[#FFD600]">
                      <FaPhoneAlt />
                    </div>
                    <div>
                      <p className="text-sm text-blue-200">Telepon</p>
                      {profile.phone ? (
                        <a
                          href={`tel:${profile.phone}`}
                          className="mt-1 font-bold transition hover:text-[#FFD600]"
                        >
                          {profile.phone}
                        </a>
                      ) : (
                        <p className="mt-1 font-bold">-</p>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white/10 text-xl text-[#FFD600]">
                      <FaEnvelope />
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm text-blue-200">Email</p>
                      {profile.email ? (
                        <a
                          href={`mailto:${profile.email}`}
                          className="mt-1 break-all font-bold transition hover:text-[#FFD600]"
                        >
                          {profile.email}
                        </a>
                      ) : (
                        <p className="mt-1 font-bold">-</p>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white/10 text-xl text-[#FFD600]">
                      <FaGlobe />
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm text-blue-200">Website</p>
                      {profile.website ? (
                        <a
                          href={profile.website}
                          target="_blank"
                          rel="noreferrer"
                          className="mt-1 break-all font-bold transition hover:text-[#FFD600]"
                        >
                          {profile.website}
                        </a>
                      ) : (
                        <p className="mt-1 font-bold">Belum tersedia</p>
                      )}
                    </div>
                  </div>
                </div>

                <div className="mt-8 rounded-2xl border border-white/10 bg-white/10 p-5">
                  <p className="text-sm leading-7 text-blue-100">
                    SMK RK Bintang Timur
                    <br />
                    {profile.city}, {profile.province}
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      )}
    </>
  );
}
