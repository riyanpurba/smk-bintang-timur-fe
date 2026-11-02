
import { useEffect, useState, type FormEvent } from "react";
import { motion } from "framer-motion";
import {
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaEnvelope,
  FaGlobe,
  FaFacebookF,
  FaInstagram,
  FaYoutube,
  FaPaperPlane,
  FaArrowRight,
  FaSchool,
} from "react-icons/fa";
import { Link } from "react-router-dom";

import PageMeta from "../Components/Common/PageMeta";
import { getSchool } from "../services/schoolService";
import type { SchoolProfile } from "../types/school";

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
    transition: { staggerChildren: 0.12 },
  },
};

export default function Kontak() {
  const [profile, setProfile] = useState<SchoolProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  useEffect(() => {
    let mounted = true;

    const fetchProfile = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await getSchool();

        if (!mounted) return;

        if (!response.success) {
          throw new Error("Gagal mengambil informasi kontak sekolah.");
        }

        setProfile(response.data.profile);
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

    fetchProfile();

    return () => {
      mounted = false;
    };
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!profile?.email) {
      alert("Alamat email sekolah belum tersedia.");
      return;
    }

    const subject = encodeURIComponent(form.subject);
    const body = encodeURIComponent(
      `Nama: ${form.name}\nEmail: ${form.email}\n\nPesan:\n${form.message}`
    );

    const mailtoUrl = `mailto:${profile.email}?subject=${subject}&body=${body}`;

    window.location.href = mailtoUrl;
  };

  const addressQuery = profile?.address
    ? encodeURIComponent(profile.address)
    : "";

  const mapUrl = addressQuery
    ? `https://www.google.com/maps/search/?api=1&query=${addressQuery}`
    : null;

  const socialLinks = [
    {
      label: "Facebook",
      value: profile?.facebook,
      icon: <FaFacebookF />,
      color: "hover:bg-blue-600",
    },
    {
      label: "Instagram",
      value: profile?.instagram,
      icon: <FaInstagram />,
      color: "hover:bg-pink-600",
    },
    {
      label: "YouTube",
      value: profile?.youtube,
      icon: <FaYoutube />,
      color: "hover:bg-red-600",
    },
  ].filter((item) => item.value);

  return (
    <>
      <PageMeta
        title="Kontak"
        description="Hubungi SMK RK Bintang Timur Pematangsiantar melalui informasi kontak resmi sekolah."
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
                <FaEnvelope />
                HUBUNGI KAMI
              </span>
            </motion.div>

            <motion.h1
              variants={fadeUp}
              className="mt-7 text-4xl font-extrabold leading-tight md:text-6xl"
            >
              Mari Terhubung
              <br />
              Dengan <span className="text-[#FFD600]">Kami.</span>
            </motion.h1>

            <motion.p
              variants={fadeUp}
              className="mt-6 max-w-2xl text-base leading-8 text-blue-100 md:text-lg"
            >
              Kami siap membantu memberikan informasi mengenai sekolah,
              program pendidikan, dan penerimaan peserta didik baru.
              Silakan hubungi kami melalui informasi kontak yang tersedia.
            </motion.p>

            <motion.div
              variants={fadeUp}
              className="mt-8 flex flex-wrap items-center gap-3 text-sm text-blue-100"
            >
              <Link to="/" className="transition hover:text-[#FFD600]">
                Beranda
              </Link>
              <span>/</span>
              <span className="font-semibold text-[#FFD600]">Kontak</span>
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

      {/* CONTACT INFORMATION */}
      <section className="bg-[#F8FAFC] px-4 py-20">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 text-center">
            <span className="text-sm font-bold uppercase tracking-[0.2em] text-[#0B3D91]">
              Informasi Kontak
            </span>

            <h2 className="mt-3 text-3xl font-extrabold text-gray-900 md:text-4xl">
              Kami Senang Mendengar{" "}
              <span className="text-[#0B3D91]">Dari Anda</span>
            </h2>

            <p className="mx-auto mt-4 max-w-2xl leading-7 text-gray-600">
              Temukan informasi untuk menghubungi dan mengunjungi
              SMK RK Bintang Timur Pematangsiantar.
            </p>
          </div>

          {loading ? (
            <div className="grid animate-pulse gap-5 md:grid-cols-3">
              {Array.from({ length: 3 }).map((_, index) => (
                <div
                  key={index}
                  className="h-52 rounded-3xl bg-gray-200"
                />
              ))}
            </div>
          ) : profile ? (
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={stagger}
              className="grid gap-5 md:grid-cols-3"
            >
              {/* ADDRESS */}
              <motion.div
                variants={fadeUp}
                className="rounded-3xl border border-gray-100 bg-white p-7 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50 text-2xl text-[#0B3D91]">
                  <FaMapMarkerAlt />
                </div>

                <h3 className="mt-6 text-xl font-extrabold text-gray-900">
                  Alamat Sekolah
                </h3>

                <p className="mt-3 min-h-20 text-sm leading-7 text-gray-600">
                  {profile.address || "Alamat belum tersedia."}
                </p>

                {mapUrl && (
                  <a
                    href={mapUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-[#0B3D91] transition hover:text-blue-700"
                  >
                    Lihat Lokasi <FaArrowRight />
                  </a>
                )}
              </motion.div>

              {/* PHONE */}
              <motion.div
                variants={fadeUp}
                className="rounded-3xl border border-gray-100 bg-white p-7 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-yellow-50 text-2xl text-yellow-600">
                  <FaPhoneAlt />
                </div>

                <h3 className="mt-6 text-xl font-extrabold text-gray-900">
                  Telepon
                </h3>

                <p className="mt-3 min-h-20 text-sm leading-7 text-gray-600">
                  Hubungi pihak sekolah untuk mendapatkan informasi lebih
                  lanjut.
                </p>

                {profile.phone ? (
                  <a
                    href={`tel:${profile.phone}`}
                    className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-[#0B3D91] transition hover:text-blue-700"
                  >
                    {profile.phone} <FaArrowRight />
                  </a>
                ) : (
                  <p className="mt-5 text-sm font-semibold text-gray-400">
                    Belum tersedia
                  </p>
                )}
              </motion.div>

              {/* EMAIL */}
              <motion.div
                variants={fadeUp}
                className="rounded-3xl border border-gray-100 bg-white p-7 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-red-50 text-2xl text-red-500">
                  <FaEnvelope />
                </div>

                <h3 className="mt-6 text-xl font-extrabold text-gray-900">
                  Email
                </h3>

                <p className="mt-3 min-h-20 text-sm leading-7 text-gray-600">
                  Kirimkan pertanyaan atau kebutuhan informasi melalui email
                  resmi sekolah.
                </p>

                {profile.email ? (
                  <a
                    href={`mailto:${profile.email}`}
                    className="mt-5 inline-flex break-all items-center gap-2 text-sm font-bold text-[#0B3D91] transition hover:text-blue-700"
                  >
                    {profile.email}
                  </a>
                ) : (
                  <p className="mt-5 text-sm font-semibold text-gray-400">
                    Belum tersedia
                  </p>
                )}
              </motion.div>
            </motion.div>
          ) : null}
        </div>
      </section>

      {/* CONTACT FORM */}
      <section className="bg-white px-4 py-20">
        <div className="mx-auto grid max-w-7xl items-start gap-12 lg:grid-cols-2">
          {/* LEFT CONTENT */}
          <motion.div
            initial={{ opacity: 0, x: -25 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <span className="text-sm font-bold uppercase tracking-[0.2em] text-[#0B3D91]">
              Kirim Pesan
            </span>

            <h2 className="mt-4 text-3xl font-extrabold leading-tight text-gray-900 md:text-4xl">
              Ada Pertanyaan?
              <br />
              <span className="text-[#0B3D91]">Hubungi Kami.</span>
            </h2>

            <p className="mt-6 leading-8 text-gray-600">
              Apabila Anda membutuhkan informasi mengenai profil sekolah,
              program keahlian, kegiatan pendidikan, atau penerimaan peserta
              didik baru, silakan kirimkan pesan melalui formulir ini.
            </p>

            <div className="mt-9 rounded-3xl bg-gradient-to-br from-[#082B66] to-[#0B3D91] p-8 text-white">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#FFD600] text-2xl text-[#082B66]">
                <FaSchool />
              </div>

              <h3 className="mt-6 text-2xl font-extrabold">
                {profile?.name || "SMK RK Bintang Timur"}
              </h3>

              <p className="mt-3 text-sm leading-7 text-blue-100">
                Membangun generasi yang berakhlak mulia, berkepribadian,
                cerdas, terampil, dan berilmu.
              </p>

              <div className="mt-7 h-1.5 w-16 rounded-full bg-[#FFD600]" />
            </div>

            {/* SOCIAL MEDIA */}
            {socialLinks.length > 0 && (
              <div className="mt-8">
                <h4 className="font-bold text-gray-900">
                  Ikuti Media Sosial Kami
                </h4>

                <div className="mt-4 flex gap-3">
                  {socialLinks.map((item) => (
                    <a
                      key={item.label}
                      href={item.value!}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={item.label}
                      title={item.label}
                      className={`flex h-12 w-12 items-center justify-center rounded-xl bg-[#0B3D91] text-lg text-white transition ${item.color}`}
                    >
                      {item.icon}
                    </a>
                  ))}
                </div>
              </div>
            )}
          </motion.div>

          {/* FORM */}
          <motion.div
            initial={{ opacity: 0, x: 25 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="rounded-3xl border border-gray-100 bg-[#F8FAFC] p-6 shadow-sm md:p-9"
          >
            <h3 className="text-2xl font-extrabold text-gray-900">
              Kirim Pesan kepada Kami
            </h3>

            <p className="mt-2 text-sm leading-7 text-gray-500">
              Lengkapi formulir berikut untuk mengirimkan pesan melalui
              aplikasi email Anda.
            </p>

            <form onSubmit={handleSubmit} className="mt-8 space-y-5">
              <div>
                <label
                  htmlFor="name"
                  className="mb-2 block text-sm font-semibold text-gray-700"
                >
                  Nama Lengkap
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Masukkan nama lengkap"
                  required
                  className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm outline-none transition placeholder:text-gray-400 focus:border-[#0B3D91] focus:ring-2 focus:ring-blue-100"
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="mb-2 block text-sm font-semibold text-gray-700"
                >
                  Alamat Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="nama@email.com"
                  required
                  className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm outline-none transition placeholder:text-gray-400 focus:border-[#0B3D91] focus:ring-2 focus:ring-blue-100"
                />
              </div>

              <div>
                <label
                  htmlFor="subject"
                  className="mb-2 block text-sm font-semibold text-gray-700"
                >
                  Subjek
                </label>
                <input
                  id="subject"
                  name="subject"
                  type="text"
                  value={form.subject}
                  onChange={handleChange}
                  placeholder="Subjek pesan"
                  required
                  className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm outline-none transition placeholder:text-gray-400 focus:border-[#0B3D91] focus:ring-2 focus:ring-blue-100"
                />
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="mb-2 block text-sm font-semibold text-gray-700"
                >
                  Pesan
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  value={form.message}
                  onChange={handleChange}
                  placeholder="Tuliskan pesan atau pertanyaan Anda..."
                  required
                  className="w-full resize-none rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm outline-none transition placeholder:text-gray-400 focus:border-[#0B3D91] focus:ring-2 focus:ring-blue-100"
                />
              </div>

              <button
                type="submit"
                disabled={!profile?.email}
                className="flex w-full items-center justify-center gap-3 rounded-xl bg-[#0B3D91] px-6 py-4 font-bold text-white shadow-lg shadow-blue-900/10 transition hover:bg-[#082B66] disabled:cursor-not-allowed disabled:opacity-50"
              >
                Kirim Pesan
                <FaPaperPlane />
              </button>

              <p className="text-center text-xs leading-6 text-gray-400">
                Tombol ini akan membuka aplikasi email dengan isi pesan
                yang telah Anda tulis.
              </p>
            </form>
          </motion.div>
        </div>
      </section>

      {/* MAP LOCATION */}
      {profile?.address && (
        <section className="bg-[#F8FAFC] px-4 pb-20">
          <div className="mx-auto max-w-7xl">
            <div className="mb-8">
              <span className="text-sm font-bold uppercase tracking-[0.2em] text-[#0B3D91]">
                Lokasi Kami
              </span>

              <h2 className="mt-3 text-3xl font-extrabold text-gray-900">
                Kunjungi <span className="text-[#0B3D91]">Sekolah Kami</span>
              </h2>

              <p className="mt-3 text-gray-600">
                Temukan lokasi SMK RK Bintang Timur melalui Google Maps.
              </p>
            </div>

            <div className="overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm">
              <iframe
                title="Lokasi SMK RK Bintang Timur"
                src={`https://maps.google.com/maps?q=${addressQuery}&output=embed`}
                width="100%"
                height="420"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="border-0"
              />

              {mapUrl && (
                <div className="flex flex-wrap items-center justify-between gap-4 p-5">
                  <p className="text-sm text-gray-600">
                    {profile.address}
                  </p>

                  <a
                    href={mapUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex shrink-0 items-center gap-2 rounded-xl bg-[#0B3D91] px-5 py-3 text-sm font-bold text-white transition hover:bg-[#082B66]"
                  >
                    Buka Google Maps <FaArrowRight />
                  </a>
                </div>
              )}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
