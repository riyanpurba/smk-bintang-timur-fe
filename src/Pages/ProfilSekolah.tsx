
import { useState } from "react";
import {
  FaSchool,
  FaAward,
  FaEye,
  FaBullseye,
  FaHistory,
  FaUsers,
  FaArrowRight,
  FaMapMarkerAlt,
  FaPhone,
  FaEnvelope,
  FaCalendarAlt,
  FaBuilding,
  FaFilePdf,
  FaExternalLinkAlt,
  FaGraduationCap,
} from "react-icons/fa";
import { motion } from "framer-motion";
import type { Variants } from "framer-motion";
import { Link } from "react-router-dom";

import PageMeta from "../Components/Common/PageMeta";

const ease = [0.22, 1, 0.36, 1] as const;

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease },
  },
};

const stagger: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12 },
  },
};

const sections = [
  { id: "identitas", label: "Identitas Sekolah" },
  { id: "akreditasi", label: "Akreditasi" },
  { id: "visi-misi", label: "Visi & Misi" },
  { id: "sejarah", label: "Sejarah" },
  { id: "organisasi", label: "Organisasi" },
];

const schoolIdentity = [
  { label: "Nama Sekolah", value: "SMK RK Bintang Timur" },
  { label: "NPSN", value: "Isi NPSN Sekolah" },
  { label: "Status Sekolah", value: "Isi Status Sekolah" },
  { label: "Jenjang Pendidikan", value: "Sekolah Menengah Kejuruan" },
  { label: "Alamat", value: "Isi alamat lengkap sekolah" },
  { label: "Kota", value: "Pematangsiantar, Sumatera Utara" },
  { label: "Email", value: "Isi email resmi sekolah" },
  { label: "Telepon", value: "Isi nomor telepon sekolah" },
];

const missions = [
  "Menyelenggarakan pendidikan yang berkualitas dan berorientasi pada pengembangan kompetensi peserta didik.",
  "Mengembangkan keterampilan, kreativitas, dan kemampuan profesional sesuai kebutuhan dunia kerja.",
  "Membentuk peserta didik yang berkarakter, disiplin, bertanggung jawab, dan berintegritas.",
  "Mendorong pengembangan ilmu pengetahuan, teknologi, dan inovasi dalam proses pembelajaran.",
  "Membangun kerja sama dengan dunia usaha, dunia industri, dan masyarakat.",
];

const organization = [
  {
    role: "Kepala Sekolah",
    name: "Nama Kepala Sekolah",
    level: 1,
  },
  {
    role: "Wakil Kepala Sekolah",
    name: "Nama Wakil Kepala Sekolah",
    level: 2,
  },
  {
    role: "Kepala Program Keahlian",
    name: "Nama Kepala Program",
    level: 3,
  },
  {
    role: "Kepala Tata Usaha",
    name: "Nama Kepala Tata Usaha",
    level: 3,
  },
  {
    role: "Guru & Tenaga Kependidikan",
    name: "Guru dan Staff Sekolah",
    level: 3,
  },
];

const ProfilSekolah = () => {
  const [activeSection, setActiveSection] = useState("identitas");

  const scrollToSection = (id: string) => {
    setActiveSection(id);
    document.getElementById(id)?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  return (
    <>
      <PageMeta
        title="Profil Sekolah"
        description="Profil SMK RK Bintang Timur Pematangsiantar, meliputi identitas sekolah, akreditasi, visi dan misi, sejarah, serta struktur organisasi."
        keywords={[
          "Profil SMK RK Bintang Timur",
          "Identitas SMK Bintang Timur",
          "Sejarah SMK Bintang Timur",
          "Visi Misi SMK Bintang Timur",
          "Pematangsiantar",
        ]}
        path="/profil-sekolah"
      />

      <main className="min-h-screen overflow-hidden bg-[#F8FAFC]">

        {/* HERO */}
        <section className="relative overflow-hidden bg-[#082B66] py-24 text-white lg:py-32">
          <div className="absolute -right-32 -top-32 h-96 w-96 rounded-full bg-[#E11D2E]/20 blur-[120px]" />
          <div className="absolute -bottom-40 left-1/4 h-96 w-96 rounded-full bg-[#FFD600]/10 blur-[120px]" />

          <div className="absolute inset-0 opacity-[0.06]">
            <div
              className="h-full w-full"
              style={{
                backgroundImage:
                  "linear-gradient(rgba(255,255,255,.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.5) 1px, transparent 1px)",
                backgroundSize: "50px 50px",
              }}
            />
          </div>

          <div className="container relative z-10 mx-auto px-5 lg:px-8">
            <motion.div
              variants={stagger}
              initial="hidden"
              animate="visible"
              className="max-w-3xl"
            >
              <motion.div
                variants={fadeUp}
                className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#FFD600]/30 bg-[#FFD600]/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-[#FFD600]"
              >
                <FaSchool />
                Tentang Kami
              </motion.div>

              <motion.h1
                variants={fadeUp}
                className="text-4xl font-extrabold leading-tight sm:text-5xl lg:text-7xl"
              >
                Mengenal Lebih Dekat
                <span className="block text-[#FFD600]">
                  Sekolah Kami.
                </span>
              </motion.h1>

              <motion.p
                variants={fadeUp}
                className="mt-7 max-w-2xl text-base leading-8 text-white/70 sm:text-lg"
              >
                Mengenal identitas, perjalanan, visi, misi, dan lingkungan
                pendidikan SMK RK Bintang Timur Pematangsiantar.
              </motion.p>

              <motion.div
                variants={fadeUp}
                className="mt-9 flex items-center gap-3 text-sm font-semibold text-white/70"
              >
                <Link to="/" className="hover:text-[#FFD600]">
                  Beranda
                </Link>
                <FaArrowRight className="text-xs text-[#FFD600]" />
                <span className="text-[#FFD600]">Profil Sekolah</span>
              </motion.div>
            </motion.div>
          </div>

          <div className="absolute bottom-0 left-0 h-1 w-full bg-gradient-to-r from-[#E11D2E] via-[#FFD600] to-[#E11D2E]" />
        </section>

        {/* SECTION NAVIGATION */}
        <div className="sticky top-0 z-40 border-b border-slate-200 bg-white/95 shadow-sm backdrop-blur-xl">
          <div className="container mx-auto overflow-x-auto px-5 lg:px-8">
            <div className="flex min-w-max items-center gap-2 py-3">
              {sections.map((section) => (
                <button
                  key={section.id}
                  type="button"
                  onClick={() => scrollToSection(section.id)}
                  className={`rounded-lg px-4 py-3 text-xs font-bold transition-all ${
                    activeSection === section.id
                      ? "bg-[#0B3D91] text-white"
                      : "text-slate-500 hover:bg-[#0B3D91]/5 hover:text-[#0B3D91]"
                  }`}
                >
                  {section.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* IDENTITAS SEKOLAH */}
        <section
          id="identitas"
          className="scroll-mt-24 container mx-auto px-5 py-20 lg:px-8 lg:py-28"
        >
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-5 lg:items-center">

            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="lg:col-span-2"
            >
              <span className="text-xs font-extrabold uppercase tracking-[0.2em] text-[#E11D2E]">
                School Identity
              </span>

              <h2 className="mt-3 text-3xl font-extrabold leading-tight text-[#082B66] sm:text-4xl">
                Identitas
                <span className="block text-[#0B3D91]">Sekolah.</span>
              </h2>

              <p className="mt-5 text-sm leading-8 text-slate-500 sm:text-base">
                Informasi resmi mengenai identitas dan profil
                SMK RK Bintang Timur Pematangsiantar.
              </p>

              <div className="mt-8 flex items-center gap-4 rounded-2xl bg-[#0B3D91]/5 p-5">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-white text-2xl text-[#0B3D91] shadow-sm">
                  <FaSchool />
                </div>
                <div>
                  <h3 className="font-extrabold text-[#082B66]">
                    SMK RK Bintang Timur
                  </h3>
                  <p className="mt-1 text-xs text-slate-500">
                    Pematangsiantar, Sumatera Utara
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.div
              variants={stagger}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:col-span-3"
            >
              {schoolIdentity.map((item) => (
                <motion.div
                  key={item.label}
                  variants={fadeUp}
                  className="rounded-xl border border-slate-100 bg-white p-5 shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg"
                >
                  <p className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400">
                    {item.label}
                  </p>
                  <p className="mt-2 text-sm font-bold leading-6 text-[#082B66]">
                    {item.value}
                  </p>
                </motion.div>
              ))}
            </motion.div>

          </div>
        </section>

        {/* AKREDITASI */}
        <section
          id="akreditasi"
          className="scroll-mt-24 bg-white py-20 lg:py-28"
        >
          <div className="container mx-auto px-5 lg:px-8">
            <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:items-center">

              <motion.div
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                <span className="text-xs font-extrabold uppercase tracking-[0.2em] text-[#E11D2E]">
                  School Accreditation
                </span>

                <h2 className="mt-3 text-3xl font-extrabold text-[#082B66] sm:text-4xl">
                  Sertifikat
                  <span className="text-[#0B3D91]"> Akreditasi.</span>
                </h2>

                <p className="mt-5 text-sm leading-8 text-slate-500 sm:text-base">
                  Informasi mengenai status akreditasi sekolah sebagai
                  bagian dari penjaminan dan peningkatan mutu pendidikan.
                </p>

                <div className="mt-8 space-y-4">
                  {[
                    ["Status Akreditasi", "Isi berdasarkan sertifikat resmi"],
                    ["Nomor Sertifikat", "Isi nomor sertifikat"],
                    ["Tahun Penetapan", "Isi tahun penetapan"],
                    ["Masa Berlaku", "Isi masa berlaku"],
                  ].map(([label, value]) => (
                    <div
                      key={label}
                      className="flex flex-col justify-between gap-2 border-b border-slate-100 pb-4 sm:flex-row"
                    >
                      <span className="text-sm font-medium text-slate-500">
                        {label}
                      </span>
                      <span className="text-sm font-bold text-[#082B66]">
                        {value}
                      </span>
                    </div>
                  ))}
                </div>
              </motion.div>

              <motion.div
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="relative"
              >
                <div className="absolute -right-5 -top-5 h-32 w-32 rounded-full bg-[#FFD600]/20 blur-3xl" />

                <div className="relative rounded-3xl border border-slate-200 bg-[#F8FAFC] p-5 shadow-xl sm:p-8">
                  <div className="mb-5 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#0B3D91]/10 text-xl text-[#0B3D91]">
                        <FaAward />
                      </div>
                      <div>
                        <h3 className="text-sm font-extrabold text-[#082B66]">
                          Dokumen Akreditasi
                        </h3>
                        <p className="text-xs text-slate-400">
                          Sertifikat resmi sekolah
                        </p>
                      </div>
                    </div>
                    <FaFilePdf className="text-2xl text-red-500" />
                  </div>

                  <div className="flex aspect-[4/3] items-center justify-center overflow-hidden rounded-xl border-2 border-dashed border-slate-300 bg-white p-6 text-center">
                    <div>
                      <FaFilePdf className="mx-auto text-5xl text-slate-300" />
                      <p className="mt-4 text-sm font-bold text-[#082B66]">
                        Preview Sertifikat
                      </p>
                      <p className="mt-2 text-xs text-slate-400">
                        Upload dokumen akreditasi sekolah
                      </p>
                    </div>
                  </div>

                  <p className="mt-5 text-xs leading-6 text-slate-400">
                    Ganti area preview ini dengan dokumen sertifikat
                    akreditasi resmi sekolah.
                  </p>
                </div>
              </motion.div>

            </div>
          </div>
        </section>

        {/* VISI & MISI */}
        <section
          id="visi-misi"
          className="scroll-mt-24 container mx-auto px-5 py-20 lg:px-8 lg:py-28"
        >
          <div className="mx-auto mb-14 max-w-2xl text-center">
            <span className="text-xs font-extrabold uppercase tracking-[0.2em] text-[#E11D2E]">
              Our Vision & Mission
            </span>

            <h2 className="mt-3 text-3xl font-extrabold text-[#082B66] sm:text-4xl">
              Visi & Misi Sekolah
            </h2>

            <p className="mt-4 text-sm leading-7 text-slate-500">
              Arah dan komitmen sekolah dalam menyelenggarakan pendidikan
              dan membentuk generasi yang berkualitas.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-7 lg:grid-cols-2">

            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="relative overflow-hidden rounded-3xl bg-[#082B66] p-8 text-white shadow-xl sm:p-10"
            >
              <div className="absolute -right-16 -top-16 h-52 w-52 rounded-full border border-white/10" />

              <div className="relative">
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#FFD600] text-3xl text-[#082B66]">
                  <FaEye />
                </div>

                <span className="mt-8 block text-xs font-extrabold uppercase tracking-[0.2em] text-[#FFD600]">
                  Our Vision
                </span>

                <h3 className="mt-3 text-2xl font-extrabold">
                  Visi Sekolah
                </h3>

                <p className="mt-6 text-base leading-9 text-white/80">
                  Isi dengan rumusan visi resmi SMK RK Bintang Timur
                  yang telah ditetapkan oleh pihak sekolah.
                </p>
              </div>
            </motion.div>

            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="rounded-3xl border border-slate-100 bg-white p-8 shadow-xl sm:p-10"
            >
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#FFD600]/30 text-3xl text-[#0B3D91]">
                <FaBullseye />
              </div>

              <span className="mt-8 block text-xs font-extrabold uppercase tracking-[0.2em] text-[#E11D2E]">
                Our Mission
              </span>

              <h3 className="mt-3 text-2xl font-extrabold text-[#082B66]">
                Misi Sekolah
              </h3>

              <div className="mt-6 space-y-4">
                {missions.map((mission, index) => (
                  <div key={index} className="flex gap-4">
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-[#0B3D91]/10 text-xs font-extrabold text-[#0B3D91]">
                      {index + 1}
                    </span>
                    <p className="text-sm leading-7 text-slate-500">
                      {mission}
                    </p>
                  </div>
                ))}
              </div>
            </motion.div>

          </div>
        </section>

        {/* SEJARAH */}
        <section
          id="sejarah"
          className="scroll-mt-24 bg-white py-20 lg:py-28"
        >
          <div className="container mx-auto px-5 lg:px-8">

            <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:items-center">
              <motion.div
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                <span className="text-xs font-extrabold uppercase tracking-[0.2em] text-[#E11D2E]">
                  School History
                </span>

                <h2 className="mt-3 text-3xl font-extrabold leading-tight text-[#082B66] sm:text-4xl">
                  Sejarah Singkat
                  <span className="block text-[#0B3D91]">Sekolah.</span>
                </h2>

                <div className="mt-8 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#0B3D91]/10 text-2xl text-[#0B3D91]">
                  <FaHistory />
                </div>

                <p className="mt-7 text-sm leading-8 text-slate-500 sm:text-base">
                  Tuliskan sejarah berdirinya SMK RK Bintang Timur
                  Pematangsiantar, mulai dari latar belakang pendirian,
                  tahun berdiri, perkembangan sekolah, hingga pencapaian
                  dan kontribusinya dalam dunia pendidikan.
                </p>

                <p className="mt-5 text-sm leading-8 text-slate-500 sm:text-base">
                  Bagian ini dapat dilengkapi dengan perjalanan
                  perkembangan fasilitas, program keahlian, tenaga
                  pendidik, serta prestasi sekolah dari masa ke masa.
                </p>
              </motion.div>

              <motion.div
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="relative overflow-hidden rounded-3xl bg-[#082B66] p-8 sm:p-10"
              >
                <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-[#FFD600]/10 blur-3xl" />

                <div className="relative">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#FFD600] text-2xl text-[#082B66]">
                    <FaCalendarAlt />
                  </div>

                  <p className="mt-8 text-xs font-extrabold uppercase tracking-[0.2em] text-[#FFD600]">
                    Established
                  </p>

                  <h3 className="mt-3 text-5xl font-extrabold text-white">
                    Tahun Berdiri
                  </h3>

                  <p className="mt-5 text-sm leading-7 text-white/60">
                    Isi tahun berdirinya sekolah berdasarkan dokumen
                    resmi atau data administrasi sekolah.
                  </p>
                </div>
              </motion.div>
            </div>

          </div>
        </section>

        {/* STRUKTUR ORGANISASI */}
        <section
          id="organisasi"
          className="scroll-mt-24 container mx-auto px-5 py-20 lg:px-8 lg:py-28"
        >
          <div className="mx-auto mb-14 max-w-2xl text-center">
            <span className="text-xs font-extrabold uppercase tracking-[0.2em] text-[#E11D2E]">
              School Organization
            </span>

            <h2 className="mt-3 text-3xl font-extrabold text-[#082B66] sm:text-4xl">
              Struktur Organisasi
            </h2>

            <p className="mt-4 text-sm leading-7 text-slate-500">
              Susunan organisasi dan pembagian tanggung jawab dalam
              mendukung penyelenggaraan pendidikan di sekolah.
            </p>
          </div>

          <div className="overflow-x-auto rounded-3xl border border-slate-100 bg-white p-6 shadow-xl sm:p-10">
            <div className="mx-auto flex min-w-[650px] max-w-4xl flex-col items-center">

              {/* LEVEL 1 */}
              <div className="w-64 rounded-2xl bg-[#082B66] p-6 text-center text-white shadow-lg">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-[#FFD600] text-xl text-[#082B66]">
                  <FaBuilding />
                </div>
                <p className="mt-4 text-[10px] font-bold uppercase tracking-wider text-[#FFD600]">
                  Kepala Sekolah
                </p>
                <h3 className="mt-2 font-extrabold">
                  Nama Kepala Sekolah
                </h3>
              </div>

              <div className="h-12 w-px bg-slate-300" />

              {/* LEVEL 2 */}
              <div className="w-64 rounded-2xl border-2 border-[#0B3D91]/20 bg-[#0B3D91]/5 p-5 text-center">
                <p className="text-[10px] font-bold uppercase tracking-wider text-[#0B3D91]">
                  Wakil Kepala Sekolah
                </p>
                <h3 className="mt-2 font-extrabold text-[#082B66]">
                  Nama Wakil Kepala Sekolah
                </h3>
              </div>

              <div className="h-12 w-px bg-slate-300" />

              {/* CONNECTOR */}
              <div className="relative h-px w-[85%] bg-slate-300">
                <span className="absolute left-1/2 top-0 h-12 w-px bg-slate-300" />
              </div>

              {/* LEVEL 3 */}
              <div className="mt-12 grid w-full grid-cols-3 gap-5">
                {organization.slice(2).map((item) => (
                  <div
                    key={item.role}
                    className="rounded-2xl border border-slate-200 bg-[#F8FAFC] p-5 text-center transition-all hover:-translate-y-1 hover:border-[#0B3D91]/30 hover:shadow-lg"
                  >
                    <div className="mx-auto flex h-11 w-11 items-center justify-center rounded-xl bg-[#FFD600]/30 text-lg text-[#0B3D91]">
                      <FaUsers />
                    </div>
                    <p className="mt-4 text-[10px] font-extrabold uppercase tracking-wider text-[#0B3D91]">
                      {item.role}
                    </p>
                    <h3 className="mt-2 text-sm font-bold text-[#082B66]">
                      {item.name}
                    </h3>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <p className="mt-5 text-center text-xs text-slate-400">
            Diagram ini merupakan contoh struktur. Sesuaikan dengan
            struktur organisasi resmi sekolah.
          </p>
        </section>

        {/* CTA */}
        <section className="relative overflow-hidden bg-[#082B66] py-20">
          <div className="absolute -right-20 -top-32 h-80 w-80 rounded-full bg-[#FFD600]/10 blur-[100px]" />

          <div className="container relative z-10 mx-auto flex flex-col items-center justify-between gap-8 px-5 text-center lg:flex-row lg:px-8 lg:text-left">
            <div>
              <span className="text-xs font-extrabold uppercase tracking-[0.2em] text-[#FFD600]">
                Get In Touch
              </span>
              <h2 className="mt-3 text-2xl font-extrabold text-white sm:text-3xl">
                Kenali Kami Lebih Dekat
              </h2>
              <p className="mt-3 max-w-xl text-sm leading-7 text-white/60">
                Hubungi kami untuk mendapatkan informasi lebih lanjut
                mengenai sekolah dan program pendidikan.
              </p>
            </div>

            <Link
              to="/kontak"
              className="inline-flex shrink-0 items-center gap-3 rounded-xl bg-[#FFD600] px-7 py-4 text-sm font-extrabold text-[#082B66] transition-all hover:-translate-y-1 hover:bg-white"
            >
              Hubungi Sekolah
              <FaArrowRight />
            </Link>
          </div>
        </section>

      </main>
    </>
  );
};

export default ProfilSekolah;
