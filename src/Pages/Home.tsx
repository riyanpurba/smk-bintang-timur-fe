import React from 'react';

import PageMeta from '../Components/Common/PageMeta';

import Hero from '../Components/Section/Hero';
import PrincipalWelcome from '../Components/Section/PrincipalWelcome';
import Statistics from '../Components/Section/Statistics';
import FeaturedPrograms from '../Components/Section/FeaturedPrograms';
import AchievementCenter from '../Components/Section/AchievementCenter';
import NewsSection from '../Components/Section/NewsSection';
import GallerySection from '../Components/Section/GallerySection';
import TestimonialSection from '../Components/Section/TestimonialSection';

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
            <PrincipalWelcome />
            <Statistics />
            <FeaturedPrograms />
            <AchievementCenter />
            <NewsSection />
            <GallerySection />
            <TestimonialSection />
        </>
    );
}

export default Home;