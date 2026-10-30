import React from 'react';

import PageMeta from '../Components/Common/PageMeta';

import Hero from '../Components/Section/Hero';

const Home = () => {
    return (
        <>
            <PageMeta
                title=""
                description="Selamat datang di website resmi SMK Bintang Timur Pematangsiantar. Kenali profil, jurusan, fasilitas, prestasi, dan informasi penerimaan peserta didik baru."
                keywords={[
                    "SMK Bintang Timur Pematangsiantar",
                    "Sekolah SMK Pematangsiantar",
                    "Pendidikan kejuruan",
                    "PPDB SMK",
                ]}
                path="/"
            />
            <Hero />
        </>
    );
}

export default Home;