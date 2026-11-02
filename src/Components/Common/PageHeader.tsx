import { Link } from "react-router-dom";
import { FaChevronRight } from "react-icons/fa";

interface BreadcrumbItem {
  label: string;
  link?: string;
}

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  breadcrumb: BreadcrumbItem[];
}

export default function PageHeader({
  title,
  subtitle,
  breadcrumb,
}: PageHeaderProps) {
  return (
    <section className="relative overflow-hidden bg-[#082B66] px-4 py-20 text-white">
      <div className="absolute inset-0 bg-gradient-to-r from-[#082B66] to-[#0B3D91]" />

      <div className="relative mx-auto max-w-7xl">
        <div className="mb-5 flex flex-wrap items-center gap-2 text-sm text-blue-100">
          {breadcrumb.map((item, index) => (
            <div key={`${item.label}-${index}`} className="flex items-center gap-2">
              {item.link ? (
                <Link to={item.link} className="hover:text-[#FFD600]">
                  {item.label}
                </Link>
              ) : (
                <span className="text-[#FFD600]">{item.label}</span>
              )}

              {index < breadcrumb.length - 1 && (
                <FaChevronRight className="text-xs" />
              )}
            </div>
          ))}
        </div>

        <h1 className="text-3xl font-extrabold md:text-5xl">{title}</h1>

        {subtitle && (
          <p className="mt-4 max-w-2xl text-blue-100">{subtitle}</p>
        )}
      </div>
    </section>
  );
}