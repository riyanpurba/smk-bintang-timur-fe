import { useEffect, useState } from "react";
import { FaAward, FaCalendarAlt, FaChevronLeft, FaChevronRight, FaTrophy } from "react-icons/fa";
import PageMeta from "../Components/Common/PageMeta";
import PageHeader from "../Components/Common/PageHeader";
import { getAchievements } from "../services/achievementService";
import { resolveMediaUrl } from "../services/mediaUrl";
import type { Achievement } from "../types/achievement";
import { ACHIEVEMENT_LEVEL_LABEL } from "../types/achievement";

const LIMIT = 9;

const formatDate = (value: string | null) => {
  if (!value) return "Tanggal belum tersedia";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "Tanggal tidak valid";
  return new Intl.DateTimeFormat("id-ID", { day: "numeric", month: "long", year: "numeric" }).format(date);
};

export default function Prestasi() {
  const [items, setItems] = useState<Achievement[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [retry, setRetry] = useState(0);

  useEffect(() => {
    let active = true;
    setLoading(true);
    setError(false);
    getAchievements({ page, limit: LIMIT })
      .then((result) => {
        if (!active) return;
        setItems(result.achievements);
        setTotalPages(result.totalPages);
      })
      .catch(() => {
        if (active) setError(true);
      })
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => { active = false; };
  }, [page, retry]);

  return (
    <>
      <PageMeta title="Prestasi" description="Daftar prestasi dan pencapaian siswa serta sekolah SMK Bintang Timur Pematangsiantar." path="/prestasi" />
      <PageHeader title="Prestasi Sekolah" subtitle="Pencapaian, penghargaan, dan kebanggaan keluarga besar SMK Bintang Timur." breadcrumb={[{ label: "Beranda", link: "/" }, { label: "Prestasi" }]} />
      <main className="bg-white py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          {loading ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3" aria-label="Memuat prestasi">
              {Array.from({ length: 6 }).map((_, index) => <div key={index} className="h-80 animate-pulse rounded-2xl bg-gray-100" />)}
            </div>
          ) : error ? (
            <div role="alert" className="rounded-2xl bg-gray-50 p-10 text-center">
              <p className="text-gray-700">Data prestasi belum dapat dimuat. Periksa koneksi dan coba kembali.</p>
              <button type="button" onClick={() => setRetry((value) => value + 1)} className="mt-4 rounded-xl bg-[#0B3D91] px-5 py-3 text-sm font-bold text-white">Coba lagi</button>
            </div>
          ) : items.length === 0 ? (
            <div className="rounded-2xl bg-gray-50 px-6 py-16 text-center">
              <FaAward className="mx-auto text-4xl text-[#0B3D91]" aria-hidden="true" />
              <h2 className="mt-4 text-xl font-bold text-gray-900">Belum ada prestasi dipublikasikan</h2>
              <p className="mt-2 text-sm text-gray-600">Informasi prestasi sekolah akan ditampilkan di halaman ini.</p>
            </div>
          ) : (
            <>
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {items.map((item) => {
                  const image = resolveMediaUrl(item.thumbnail_url);
                  return (
                    <article key={item.id} className="group overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl">
                      <div className="relative aspect-[16/10] overflow-hidden bg-gradient-to-br from-[#082B66] to-[#0B3D91]">
                        {image ? <img src={image} alt={item.title} loading="lazy" className="h-full w-full object-cover transition duration-500 group-hover:scale-105" /> : <div className="flex h-full items-center justify-center text-5xl text-white/80"><FaTrophy aria-hidden="true" /></div>}
                        <span className="absolute bottom-4 left-4 rounded-full bg-[#FFD600] px-3 py-1.5 text-xs font-bold text-[#082B66]">{ACHIEVEMENT_LEVEL_LABEL[item.achievement_level]}</span>
                      </div>
                      <div className="p-6">
                        <div className="flex items-center gap-2 text-xs text-gray-500"><FaCalendarAlt className="text-[#0B3D91]" aria-hidden="true" />{formatDate(item.achievement_date)}</div>
                        <h2 className="mt-3 text-lg font-extrabold leading-snug text-gray-900">{item.title}</h2>
                        {item.description && <p className="mt-3 line-clamp-3 text-sm leading-7 text-gray-600">{item.description}</p>}
                        {item.recipient_names && <p className="mt-4 text-sm text-gray-700"><span className="font-semibold">Peraih:</span> {item.recipient_names}</p>}
                        {item.organizer && <p className="mt-1 text-xs text-gray-500">Penyelenggara: {item.organizer}</p>}
                      </div>
                    </article>
                  );
                })}
              </div>
              {totalPages > 1 && (
                <nav aria-label="Navigasi halaman prestasi" className="mt-10 flex items-center justify-center gap-3">
                  <button type="button" disabled={page <= 1} onClick={() => setPage((value) => Math.max(1, value - 1))} className="inline-flex items-center gap-2 rounded-xl border border-gray-200 px-4 py-2.5 text-sm font-semibold text-gray-700 disabled:cursor-not-allowed disabled:opacity-40"><FaChevronLeft aria-hidden="true" /> Sebelumnya</button>
                  <span className="text-sm text-gray-600">Halaman {page} dari {totalPages}</span>
                  <button type="button" disabled={page >= totalPages} onClick={() => setPage((value) => Math.min(totalPages, value + 1))} className="inline-flex items-center gap-2 rounded-xl border border-gray-200 px-4 py-2.5 text-sm font-semibold text-gray-700 disabled:cursor-not-allowed disabled:opacity-40">Berikutnya <FaChevronRight aria-hidden="true" /></button>
                </nav>
              )}
            </>
          )}
        </div>
      </main>
    </>
  );
}
