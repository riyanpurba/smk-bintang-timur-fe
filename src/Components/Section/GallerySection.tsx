import { motion, useReducedMotion, type Variants } from "framer-motion";
import { FaImages } from "react-icons/fa";

import SectionHeading from "../Common/SectionHeading";
import ImageWithSkeleton from "../Common/ImageWithSkeleton";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

interface GalleryItem {
  id: number;
  title: string;
  category: string;
  image: string;
  className?: string;
}

const galleries: GalleryItem[] = [
  {
    id: 1,
    title: "Kegiatan Pembelajaran",
    category: "Akademik",
    image: "/images/gallery-1.jpg",
    className: "md:col-span-2 md:row-span-2",
  },
  { id: 2, title: "Praktik Siswa", category: "Praktik", image: "/images/gallery-2.jpg" },
  { id: 3, title: "Kegiatan Sekolah", category: "Kegiatan", image: "/images/gallery-3.jpg" },
  { id: 4, title: "Ekstrakurikuler", category: "Ekstrakurikuler", image: "/images/gallery-4.jpg" },
  { id: 5, title: "Prestasi Siswa", category: "Prestasi", image: "/images/gallery-5.jpg" },
];

const grid: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};
const tile: Variants = {
  hidden: { opacity: 0, scale: 0.9, y: 30 },
  show: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.8, ease: EASE } },
};

const GallerySection = () => {
  const reduce = useReducedMotion();

  return (
    <section className="bg-white py-20 md:py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <SectionHeading
          label="Galeri Sekolah"
          title="Momen dan Cerita"
          accent="Sekolah Kami"
          description="Dokumentasi berbagai kegiatan, pengalaman, dan kebersamaan keluarga besar SMK RK Bintang Timur Pematangsiantar."
          link={{ to: "/galeri", text: "Lihat Semua Galeri", icon: <FaImages /> }}
        />

        <motion.div
          className="grid auto-rows-[200px] grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-4"
          variants={grid}
          initial={reduce ? "show" : "hidden"}
          whileInView="show"
          viewport={{ once: true, amount: 0.1 }}
        >
          {galleries.map((item) => (
            <motion.div
              key={item.id}
              variants={tile}
              className={`group relative overflow-hidden rounded-2xl bg-gray-200 ${item.className ?? ""}`}
            >
              <ImageWithSkeleton
                src={item.image}
                alt={item.title}
                wrapperClassName="absolute inset-0"
                className="h-full w-full object-cover transition duration-700 group-hover:scale-110"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A]/90 via-[#0A0A0A]/10 to-transparent opacity-80 transition-opacity duration-300 group-hover:opacity-100" />

              {/* Red edge that draws in on hover */}
              <span className="absolute inset-x-0 bottom-0 h-1 origin-left scale-x-0 bg-[#E11D2E] transition-transform duration-500 group-hover:scale-x-100" />

              <div className="absolute bottom-0 left-0 translate-y-2 p-5 transition-transform duration-500 group-hover:translate-y-0">
                <span className="mb-2 inline-block rounded-full bg-[#FFD600] px-3 py-1 text-xs font-bold text-[#0A0A0A]">
                  {item.category}
                </span>

                <h3 className="text-lg font-bold text-white">{item.title}</h3>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default GallerySection;
