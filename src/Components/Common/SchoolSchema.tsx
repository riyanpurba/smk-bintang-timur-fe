
import { Helmet } from "react-helmet-async";

const SchoolSchema = () => {
  const schema = {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    name: "SMK Bintang Timur Pematangsiantar",
    url: "https://domain-sekolah.sch.id",
    logo: "https://domain-sekolah.sch.id/favicon.png",
    description:
      "SMK Bintang Timur Pematangsiantar merupakan lembaga pendidikan menengah kejuruan.",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Pematangsiantar",
      addressRegion: "Sumatera Utara",
      addressCountry: "ID",
    },
  };

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(schema)}
      </script>
    </Helmet>
  );
};

export default SchoolSchema;
