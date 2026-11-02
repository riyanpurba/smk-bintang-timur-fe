import { useState } from 'react'
import { Routes, Route } from 'react-router-dom';

import MainLayout from './Layouts/MainLayout';
import SchoolSchema from './Components/Common/SchoolSchema';

import Home from './Pages/Home'
// import Profil from "./pages/Profil/Profil";
import IdentitasSekolah from "./pages/Profil/IdentitasSekolah";
import SertifikatAkreditasi from "./pages/Profil/SertifikatAkreditasi";
import VisiMisi from './Pages/Profil/VisiMisi'
import SejarahSingkat from "./pages/Profil/SejarahSingkat";
import StrukturOrganisasi from "./pages/Profil/StrukturOrganisasi";
import Teachers from './Pages/Teachers';
import Majors from './Pages/Major';
import Berita from './Pages/Berita';
import Galeri from './Pages/Galeri'
import Kontak from './Pages/Kontak';
// import ComingSoon from './Pages/ComingSoon';

import ErrorPage from './Pages/ErrorPage';

const App = () => {

  return (
    <>
      <SchoolSchema />
      <MainLayout>
        <Routes>
          <Route path='/' element={<Home />} />
          {/* <Route path="/profil" element={<Profil />} /> */}
          <Route path="/profil/identitas-sekolah" element={<IdentitasSekolah />} />
          <Route path="/profil/sertifikat-akreditasi" element={<SertifikatAkreditasi />} />
          <Route path="/profil/visi-misi" element={<VisiMisi />} />
          <Route path="/profil/sejarah-singkat" element={<SejarahSingkat />} />
          <Route path="/profil/struktur-organisasi" element={<StrukturOrganisasi />} />
          <Route path='/teachers' element={<Teachers />} />
          <Route path='/jurusan' element={<Majors />} />
          <Route path='/berita' element={<Berita />} />
          <Route path='/galeri' element={<Galeri />} />
          <Route path='/kontak' element={<Kontak />} />

          {/* Error routes */}
          <Route path="/403" element={<ErrorPage type="403" />} />
          <Route path="/500" element={<ErrorPage type="500" />} />

          {/* 404 - harus menjadi route terakhir */}
          <Route path="*" element={<ErrorPage type="404" />} />
        </Routes>
      </MainLayout>
    </>
  )
}

export default App
