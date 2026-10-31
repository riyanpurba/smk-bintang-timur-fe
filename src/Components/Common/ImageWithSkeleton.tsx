import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FaImage } from "react-icons/fa";

interface ImageWithSkeletonProps {
  src: string;
  alt: string;
  /** Kelas untuk <img> (object-cover, hover scale, dll). */
  className?: string;
  /**
   * Kelas untuk pembungkus. Wajib berisi posisi + ukuran,
   * mis. "relative h-full w-full" atau "relative h-12 w-12 rounded-full".
   */
  wrapperClassName?: string;
  loading?: "lazy" | "eager";
}

type Status = "loading" | "loaded" | "error";

/**
 * Menampilkan skeleton shimmer selama gambar dimuat, lalu gambar muncul
 * dengan fade-in. Jika gagal dimuat, tampil placeholder.
 */
const ImageWithSkeleton = ({
  src,
  alt,
  className = "",
  wrapperClassName = "relative h-full w-full",
  loading = "lazy",
}: ImageWithSkeletonProps) => {
  const [status, setStatus] = useState<Status>("loading");
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    setStatus("loading");
    const img = imgRef.current;
    // Gambar yang sudah ada di cache browser
    if (img?.complete && img.naturalWidth > 0) setStatus("loaded");
  }, [src]);

  return (
    <div className={`overflow-hidden bg-gray-200 ${wrapperClassName}`}>
      {status !== "error" && (
        <img
          ref={imgRef}
          src={src}
          alt={alt}
          loading={loading}
          onLoad={() => setStatus("loaded")}
          onError={() => setStatus("error")}
          className={`${className} transition-opacity duration-700 ${
            status === "loaded" ? "opacity-100" : "opacity-0"
          }`}
        />
      )}

      <AnimatePresence>
        {status === "loading" && (
          <motion.div
            key="skeleton"
            className="absolute inset-0 overflow-hidden bg-gray-200"
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            aria-hidden="true"
          >
            <motion.div
              className="absolute inset-y-0 w-2/3 bg-gradient-to-r from-transparent via-white/70 to-transparent"
              initial={{ x: "-100%" }}
              animate={{ x: "250%" }}
              transition={{ duration: 1.4, ease: "linear", repeat: Infinity }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {status === "error" && (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-1 bg-gray-100 text-gray-400">
          <FaImage className="text-2xl" />
          <span className="text-[10px] font-medium">Gambar tidak tersedia</span>
        </div>
      )}
    </div>
  );
};

export default ImageWithSkeleton;
