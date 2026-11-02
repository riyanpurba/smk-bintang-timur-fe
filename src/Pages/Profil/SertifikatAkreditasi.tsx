
import { motion } from "framer-motion";
import {
  FaAward,
  FaFilePdf,
  FaShieldAlt,
  FaInfoCircle,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import PageMeta from "../../Components/Common/PageMeta";

export default function SertifikatAkreditasi() {
  return (
    <>
      <PageMeta
        title="Sertifikat Akreditasi"
        description="Informasi sertifikat akreditasi SMK RK Bintang Timur."
      />

      <main className="relative flex min-h-[70vh] items-center overflow-hidden bg-gradient-to-br from-[#082B66] via-[#0B3D91] to-[#061D46] px-4 py-24 text-white">
        <div className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full border-[55px] border-white/5" />
        <div className="pointer-events-none absolute -bottom-40 -left-32 h-[450px] w-[450px] rounded-full border-[60px] border-white/5" />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative mx-auto w-full max-w-7xl"
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-bold text-yellow-300">
            <FaAward /> PROFIL SEKOLAH
          </span>

          <h1 className="mt-7 text-4xl font-extrabold md:text-6xl">
            Sertifikat <span className="text-[#FFD600]">Akreditasi</span>
          </h1>

          <p className="mt-6 max-w-2xl leading-8 text-blue-100 md:text-lg">
            Informasi dan dokumen resmi akreditasi SMK RK Bintang Timur
            Pematangsiantar sebagai bagian dari komitmen terhadap mutu
            pendidikan.
          </p>

          <div className="mt-8 flex gap-3 text-sm text-blue-100">
            <Link to="/" className="hover:text-[#FFD600]">Beranda</Link>
            <span>/</span>
            <span className="font-semibold text-[#FFD600]">Sertifikat Akreditasi</span>
          </div>
        </motion.div>
      </main>

      <section className="bg-[#F8FAFC] px-4 py-20">
        <div className="mx-auto max-w-7xl">
          <div className="mb-10 text-center">
            <span className="text-sm font-bold uppercase tracking-[0.2em] text-[#0B3D91]">
              Dokumen Sekolah
            </span>
            <h2 className="mt-3 text-3xl font-extrabold text-gray-900 md:text-4xl">
              Dokumen <span className="text-[#0B3D91]">Akreditasi</span>
            </h2>
            <p className="mx-auto mt-4 max-w-2xl leading-7 text-gray-600">
              Lihat informasi dan dokumen sertifikat akreditasi sekolah.
            </p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mx-auto max-w-3xl rounded-3xl border border-gray-100 bg-white p-8 text-center shadow-sm md:p-12"
          >
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-3xl bg-blue-50 text-4xl text-[#0B3D91]">
              <FaFilePdf />
            </div>

            <h3 className="mt-6 text-2xl font-extrabold text-gray-900">
              Sertifikat Akreditasi Sekolah
            </h3>

            <p className="mx-auto mt-3 max-w-lg leading-7 text-gray-500">
              Dokumen sertifikat akreditasi belum tersedia untuk ditampilkan.
              Informasi akan diperbarui setelah dokumen resmi dimasukkan
              ke dalam sistem.
            </p>

            <div className="mt-7 inline-flex items-center gap-2 rounded-full bg-yellow-50 px-4 py-2 text-sm font-semibold text-yellow-700">
              <FaInfoCircle />
              Dokumen sedang dipersiapkan
            </div>
          </motion.div>

          <div className="mt-10 grid gap-5 md:grid-cols-2">
            <div className="flex gap-4 rounded-2xl border border-gray-100 bg-white p-6">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-xl text-[#0B3D91]">
                <FaShieldAlt />
              </div>
              <div>
                <h3 className="font-bold text-gray-900">Mutu Pendidikan</h3>
                <p className="mt-2 text-sm leading-6 text-gray-500">
                  Akreditasi merupakan informasi penting mengenai penilaian
                  mutu dan kelayakan satuan pendidikan.
                </p>
              </div>
            </div>

            <div className="flex gap-4 rounded-2xl border border-gray-100 bg-white p-6">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-yellow-50 text-xl text-yellow-600">
                <FaAward />
              </div>
              <div>
                <h3 className="font-bold text-gray-900">Dokumen Resmi</h3>
                <p className="mt-2 text-sm leading-6 text-gray-500">
                  Dokumen akreditasi akan ditampilkan berdasarkan sertifikat
                  resmi yang diterbitkan oleh lembaga berwenang.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
