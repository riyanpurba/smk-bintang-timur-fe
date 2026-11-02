
export interface SubMenuItem {
    name: string;
    link: string;
  }
  
  export interface MenuItem {
    name: string;
    link: string;
    children?: SubMenuItem[];
  }
  
  export const profileMenus: SubMenuItem[] = [
    {
      name: "Identitas Sekolah",
      link: "/profil/identitas-sekolah",
    },
    {
      name: "Sertifikat Akreditasi",
      link: "/profil/sertifikat-akreditasi",
    },
    {
      name: "Visi & Misi",
      link: "/profil/visi-misi",
    },
    {
      name: "Sejarah Singkat",
      link: "/profil/sejarah-singkat",
    },
    {
      name: "Struktur Organisasi",
      link: "/profil/struktur-organisasi",
    },
  ];
  
  export const mainMenus: MenuItem[] = [
    {
      name: "Beranda",
      link: "/",
    },
    {
      name: "Profil Sekolah",
      link: "/profil",
      children: profileMenus,
    },
    {
      name: "Guru & Staff",
      link: "/teachers",
    },
    {
      name: "Jurusan",
      link: "/jurusan",
    },
    {
      name: "Berita",
      link: "/berita",
    },
    {
      name: "Galeri",
      link: "/galeri",
    },
    {
      name: "Kontak",
      link: "/kontak",
    },
  ];
  
  export const admissionMenu = {
    name: "PPDB",
    link: "/ppdb",
  };
  