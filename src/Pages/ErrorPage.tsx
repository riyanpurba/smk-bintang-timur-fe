
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
  Home,
  SearchX,
  ShieldAlert,
  ServerCrash,
  WifiOff,
} from "lucide-react";

type ErrorType = "404" | "403" | "500" | "network";

interface ErrorPageProps {
  type?: ErrorType;
}

const errorConfig = {
  "404": {
    code: "404",
    title: "Halaman Tidak Ditemukan",
    description:
      "Maaf, halaman yang kamu cari tidak tersedia atau mungkin sudah dipindahkan.",
    icon: SearchX,
    label: "PAGE NOT FOUND",
  },
  "403": {
    code: "403",
    title: "Akses Ditolak",
    description:
      "Maaf, kamu tidak memiliki izin untuk mengakses halaman ini.",
    icon: ShieldAlert,
    label: "ACCESS FORBIDDEN",
  },
  "500": {
    code: "500",
    title: "Terjadi Kesalahan Server",
    description:
      "Sepertinya terjadi masalah pada server kami. Silakan coba beberapa saat lagi.",
    icon: ServerCrash,
    label: "INTERNAL SERVER ERROR",
  },
  network: {
    code: "OFFLINE",
    title: "Koneksi Bermasalah",
    description:
      "Kami tidak dapat terhubung ke server. Periksa koneksi internet dan coba kembali.",
    icon: WifiOff,
    label: "NETWORK ERROR",
  },
};

export default function ErrorPage({
  type = "404",
}: ErrorPageProps) {
  const navigate = useNavigate();
  const config = errorConfig[type];
  const Icon = config.icon;

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#F8FAFC] px-6 py-16">
      {/* Background decoration */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -right-32 -top-32 h-96 w-96 rounded-full bg-blue-100/70 blur-3xl" />
        <div className="absolute -bottom-40 -left-32 h-96 w-96 rounded-full bg-yellow-100/70 blur-3xl" />

        <div className="absolute inset-0 opacity-[0.035] [background-image:linear-gradient(#0B3D91_1px,transparent_1px),linear-gradient(90deg,#0B3D91_1px,transparent_1px)] [background-size:40px_40px]" />
      </div>

      <motion.section
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative z-10 mx-auto w-full max-w-3xl text-center"
      >
        {/* Icon */}
        <motion.div
          animate={{ y: [0, -8, 0] }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="mx-auto mb-8 flex h-24 w-24 items-center justify-center rounded-[2rem] bg-[#0B3D91] text-[#FFD600] shadow-xl shadow-blue-900/20"
        >
          <Icon size={42} strokeWidth={1.7} />
        </motion.div>

        {/* Error code */}
        <div className="mb-3 text-sm font-extrabold tracking-[0.25em] text-[#0B3D91]">
          {config.label}
        </div>

        <h1 className="text-7xl font-black tracking-tight text-[#0B3D91] sm:text-8xl md:text-9xl">
          {config.code}
        </h1>

        <div className="mx-auto my-6 h-1.5 w-20 rounded-full bg-[#FFD600]" />

        <h2 className="text-2xl font-extrabold text-gray-900 sm:text-3xl">
          {config.title}
        </h2>

        <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-gray-500 sm:text-lg">
          {config.description}
        </p>

        {/* Actions */}
        <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link
            to="/"
            className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#0B3D91] px-7 py-3.5 font-bold text-white shadow-lg shadow-blue-900/15 transition hover:-translate-y-1 hover:bg-[#082B66] sm:w-auto"
          >
            <Home size={18} />
            Kembali ke Beranda
            <ArrowRight size={17} />
          </Link>

          {type !== "404" && (
            <button
              onClick={() => window.location.reload()}
              className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white px-7 py-3.5 font-bold text-gray-700 transition hover:border-[#0B3D91] hover:text-[#0B3D91] sm:w-auto"
            >
              Coba Lagi
            </button>
          )}

          {type === "404" && (
            <button
              onClick={() => navigate(-1)}
              className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white px-7 py-3.5 font-bold text-gray-700 transition hover:border-[#0B3D91] hover:text-[#0B3D91] sm:w-auto"
            >
              <ArrowLeft size={18} />
              Halaman Sebelumnya
            </button>
          )}
        </div>

        {/* Footer */}
        <div className="mt-16 border-t border-gray-200 pt-7">
          <p className="text-sm font-bold text-[#0B3D91]">
            SMK RK BINTANG TIMUR
          </p>
          <p className="mt-1 text-xs text-gray-400">
            Pematangsiantar, Sumatera Utara
          </p>
        </div>
      </motion.section>
    </main>
  );
}
