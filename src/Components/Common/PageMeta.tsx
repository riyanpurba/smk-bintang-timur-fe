
import { Helmet } from "react-helmet-async";

import Favicon from '../../assets/Icons/favicon.ico'
import AppleIcon from '../../assets/Icons/apple-touch-icon.png'

interface PageMetaProps {
  title?: string;
  description?: string;
  keywords?: string[];
  image?: string;
  path?: string;
  noIndex?: boolean;
}

const SITE_NAME = "SMK Bintang Timur Pematangsiantar";

// Ganti dengan domain resmi sekolah
const SITE_URL = "https://domain-sekolah.sch.id";

const DEFAULT_TITLE =
  "SMK Bintang Timur Pematangsiantar | Sekolah Menengah Kejuruan";

const DEFAULT_DESCRIPTION =
  "SMK Bintang Timur Pematangsiantar berkomitmen mencetak generasi unggul, terampil, berkarakter, dan siap menghadapi dunia kerja.";

const DEFAULT_KEYWORDS = [
  "SMK Bintang Timur",
  "SMK Bintang Timur Pematangsiantar",
  "SMK Pematangsiantar",
  "Sekolah Menengah Kejuruan Pematangsiantar",
  "Pendidikan Pematangsiantar",
  "PPDB SMK Bintang Timur",
  "Pendaftaran siswa baru",
];

const DEFAULT_IMAGE = "/images/og-image.jpg";

const PageMeta = ({
  title = DEFAULT_TITLE,
  description = DEFAULT_DESCRIPTION,
  keywords = DEFAULT_KEYWORDS,
  image = DEFAULT_IMAGE,
  path = "/",
  noIndex = false,
}: PageMetaProps) => {
    const pageTitle = title === "Home" || title === ""
    ? SITE_NAME
    : title.includes(SITE_NAME)
      ? title
      : `${title} | ${SITE_NAME}`;

  const canonicalUrl = new URL(path, SITE_URL).href;

  const imageUrl = new URL(image, SITE_URL).href;

  const keywordContent = Array.isArray(keywords)
    ? keywords.join(", ")
    : keywords;

  return (
    <Helmet>
      {/* HTML */}
      <html lang="id" />

      {/* Basic SEO */}
      <title>{pageTitle}</title>

      <meta name="title" content={pageTitle} />
      <meta name="description" content={description} />
      <meta name="keywords" content={keywordContent} />

      <meta name="author" content={SITE_NAME} />
      <meta name="publisher" content={SITE_NAME} />
      <meta name="robots" content={noIndex ? "noindex, nofollow" : "index, follow"} />
      <meta name="googlebot" content={noIndex ? "noindex, nofollow" : "index, follow"} />

      <meta name="language" content="Indonesian" />
      <meta name="theme-color" content="#123B65" />

      {/* Canonical */}
      <link rel="canonical" href={canonicalUrl} />

      {/* Favicon */}
      <link rel="icon" type="image/png" href={Favicon} />
      <link rel="apple-touch-icon" href={AppleIcon} />

      {/* Open Graph */}
      <meta property="og:type" content="website" />
      <meta property="og:locale" content="id_ID" />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:title" content={pageTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:image" content={imageUrl} />
      <meta property="og:image:alt" content={SITE_NAME} />
      <meta property="og:image:type" content="image/jpeg" />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />

      {/* Twitter / X */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={pageTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:url" content={canonicalUrl} />
      <meta name="twitter:image" content={imageUrl} />
      <meta name="twitter:image:alt" content={SITE_NAME} />
    </Helmet>
  );
};

export default PageMeta;
