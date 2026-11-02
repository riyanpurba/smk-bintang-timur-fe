
import { motion } from "framer-motion";
import {
  FaRocket,
  FaTools,
  FaArrowLeft,
  FaEnvelope,
  FaGraduationCap,
  FaStar,
} from "react-icons/fa";
import { Link } from "react-router-dom";

import PageMeta from "../Components/Common/PageMeta";

interface ComingSoonProps {
  title?: string;
  description?: string;
  backUrl?: string;
  backLabel?: string;
}

const floatingAnimation = {
  animate: {
    y: [0, -15, 0],
    rotate: [0, 3, 0],
    transition: {
      duration: 5,
      repeat: Infinity,
      ease: "easeInOut" as const,
    },
  },
};

export default function ComingSoon({
  title = "Halaman Sedang Dipersiapkan",
  description = "Kami sedang menyiapkan sesuatu yang menarik untuk Anda. Nantikan informasi terbaru dari SMK RK Bintang Timur.",
  backUrl = "/",
  backLabel = "Kembali ke Beranda",
}: ComingSoonProps) {
  return (
    <>
      <PageMeta
        title="Coming Soon"
        description="Halaman SMK RK Bintang Timur sedang dalam pengembangan."
      />

      <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-gradient-to-br from-[#082B66] via-[#0B3D91] to-[#061D46] px-4 py-16 text-white">
        {/* BACKGROUND DECORATION */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
            <div className="absolute -right-40 -top-40 h-[500px] w-[500px] rounded-full border-[70px] border-white/[0.04]" />

            <div className="absolute -bottom-48 -left-40 h-[550px] w-[550px] rounded-full border-[80px] border-white/[0.04]" />

            <div className="absolute left-1/4 top-1/4 h-72 w-72 rounded-full bg-blue-400/10 blur-[100px]" />

            <div className="absolute bottom-1/4 right-1/4 h-72 w-72 rounded-full bg-yellow-400/10 blur-[100px]" />

            <div className="absolute left-[10%] top-[20%] h-2 w-2 rounded-full bg-[#FFD600]" />
            <div className="absolute right-[15%] top-[25%] h-3 w-3 rounded-full bg-white/50" />
            <div className="absolute bottom-[20%] left-[20%] h-2 w-2 rounded-full bg-[#FFD600]" />
        </div>


        <div className="relative mx-auto w-full max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="overflow-hidden shadow-2xl shadow-blue-900/10"
          >
            <div className="grid items-center lg:grid-cols-2">
              {/* LEFT VISUAL */}
              <div className="relative flex min-h-[350px] items-center justify-center overflow-hidden bg-gradient-to-br from-[#082B66] via-[#0B3D91] to-[#2563EB] p-10 text-white md:min-h-[480px]">
                <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full border-[35px] border-white/5" />
                <div className="absolute -bottom-24 -left-20 h-72 w-72 rounded-full border-[35px] border-white/5" />

                <motion.div
                  {...floatingAnimation}
                  className="relative flex flex-col items-center"
                >
                  <div className="relative flex h-48 w-48 items-center justify-center rounded-full border border-white/20 bg-white/10 shadow-2xl backdrop-blur-sm md:h-60 md:w-60">
                    <div className="absolute inset-4 rounded-full border border-dashed border-white/30" />

                    <div className="flex h-32 w-32 items-center justify-center rounded-[2rem] bg-[#FFD600] text-6xl text-[#082B66] shadow-xl md:h-40 md:w-40 md:text-7xl">
                      <FaRocket />
                    </div>

                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{
                        duration: 20,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                      className="absolute inset-0"
                    >
                      <FaStar className="absolute -right-2 top-10 text-2xl text-[#FFD600]" />
                      <FaStar className="absolute -bottom-1 left-8 text-xl text-white" />
                    </motion.div>
                  </div>

                  <div className="mt-10 text-center">
                    <p className="text-sm font-bold uppercase tracking-[0.3em] text-yellow-300">
                      Something New Is Coming
                    </p>
                    <h2 className="mt-3 text-2xl font-extrabold md:text-3xl">
                      Stay Tuned!
                    </h2>
                  </div>
                </motion.div>
              </div>

              {/* RIGHT CONTENT */}
              <div className="p-8 md:p-12 lg:p-14">
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2, duration: 0.6 }}
                >
                  <div className="inline-flex items-center gap-2 rounded-full bg-yellow-50 px-4 py-2 text-xs font-extrabold uppercase tracking-wider text-yellow-700">
                    <FaTools />
                    Under Development
                  </div>

                  <div className="mt-8">
                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50 text-2xl text-[#0B3D91]">
                      <FaGraduationCap />
                    </div>

                    <h1 className="mt-6 text-3xl font-extrabold leading-tight text-gray-900 md:text-4xl">
                      {title}
                    </h1>

                    <div className="mt-5 h-1.5 w-20 rounded-full bg-[#FFD600]" />

                    <p className="mt-6 text-base leading-8 text-gray-500">
                      {description}
                    </p>
                  </div>

                  <div className="mt-9 rounded-2xl border border-blue-100 bg-blue-50/70 p-5">
                    <p className="text-sm font-bold text-[#0B3D91]">
                      Kami sedang mempersiapkannya!
                    </p>
                    <p className="mt-2 text-sm leading-7 text-gray-600">
                      Terima kasih telah mengunjungi website kami. Nantikan
                      pembaruan dan informasi terbaru dari sekolah.
                    </p>
                  </div>

                  <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                    <Link
                      to={backUrl}
                      className="inline-flex items-center justify-center gap-3 rounded-xl bg-[#0B3D91] px-6 py-4 text-sm font-bold text-white shadow-lg shadow-blue-900/10 transition hover:-translate-y-1 hover:bg-[#082B66]"
                    >
                      <FaArrowLeft />
                      {backLabel}
                    </Link>

                    <Link
                      to="/kontak"
                      className="inline-flex items-center justify-center gap-3 rounded-xl border border-gray-200 bg-white px-6 py-4 text-sm font-bold text-gray-700 transition hover:border-[#0B3D91] hover:text-[#0B3D91]"
                    >
                      <FaEnvelope />
                      Hubungi Kami
                    </Link>
                  </div>
                </motion.div>
              </div>
            </div>

            {/* FOOTER */}
            <div className="flex flex-col items-center justify-between gap-3 border-t border-gray-100 px-8 py-5 text-center sm:flex-row sm:text-left">
              <p className="text-xs font-semibold tracking-wide text-gray-400">
                © {new Date().getFullYear()} SMK RK BINTANG TIMUR
              </p>
              <p className="text-xs text-gray-400">
                Pematangsiantar, Sumatera Utara
              </p>
            </div>
          </motion.div>
        </div>
      </main>
    </>
  );
}
