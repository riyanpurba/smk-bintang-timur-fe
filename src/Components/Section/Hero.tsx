import { Link } from 'react-router-dom'
import { FaArrowRight, FaGraduationCap, FaBookOpen, FaAward } from 'react-icons/fa'

import Banner from '../../assets/Images/banner.jpg'

const Hero = () => {
    return (
        <section className="relative flex w-full min-h-screen items-center overflow-hidden">
            <div className="absolute inset-0 bg-cover bg-center bg-no-repeat" style={{ backgroundImage: `url(${Banner})` }} aria-hidden="true" />
            <div className="absolute inset-0 bg-primary/10" />
            <div
                className="
                absolute inset-0
                bg-gradient-to-l
                from-primary via-primary/90
                to-primary/40
                "
            />
            <div
                className="
                absolute inset-x-0 bottom-0
                h-40 bg-gradient-to-t
                from-primary to-transparent
                "
            />
            <div
                className="
                pointer-events-none absolute
                -right-40 top-1/2 hidden
                h-[600px] w-[600px]
                -translate-y-1/2 rounded-full
                border border-white/10
                lg:block
                "
            />

            <div
                className="
                pointer-events-none absolute
                -right-20 top-1/2 hidden
                h-[450px] w-[450px]
                -translate-y-1/2 rounded-full
                border border-secondary/20
                lg:block
                "
            />

        {/* Hero Content */}
        <div className="container relative z-10 mx-auto px-5 pb-16 pt-32 lg:px-8">

            <div className="max-w-4xl">

            {/* Main Heading */}
            <h1
                className="
                max-w-4xl text-2xl
                font-extrabold leading-[1.12]
                tracking-tight text-white
                sm:text-3xl md:text-4xl
                lg:text-5xl xl:text-6xl
                "
            >
                Membangun Generasi

                <span className="mt-2 block text-secondary">
                Unggul & Terampil.
                </span>
            </h1>

            {/* Description */}
            <p
                className="
                mt-7 max-w-2xl
                text-base leading-relaxed
                text-white/80
                sm:text-lg md:text-xl
                "
            >
                Tempat mengembangkan potensi, membangun keterampilan,
                dan membentuk karakter untuk mempersiapkan generasi
                masa depan yang berkualitas.
            </p>

            {/* CTA Buttons */}
            <div
                className="
                mt-10 flex flex-col gap-4
                sm:flex-row sm:items-center
                "
            >
                <Link
                to="/profil"
                className="
                    group inline-flex items-center
                    justify-center gap-3
                    rounded-lg bg-secondary
                    px-8 py-4 text-sm font-bold
                    text-neutral shadow-lg
                    shadow-black/10
                    transition-all duration-300
                    hover:-translate-y-1
                    hover:bg-white hover:shadow-xl
                "
                >
                Mengenal Sekolah

                <FaArrowRight
                    className="
                    transition-transform duration-300
                    group-hover:translate-x-1
                    "
                />
                </Link>

                <Link
                to="/ppdb"
                className="
                    inline-flex items-center
                    justify-center gap-3
                    rounded-lg border border-white/50
                    bg-white/5 px-8 py-4
                    text-sm font-bold text-white
                    backdrop-blur-sm
                    transition-all duration-300
                    hover:-translate-y-1
                    hover:border-secondary
                    hover:bg-secondary
                    hover:text-neutral
                "
                >
                Informasi PPDB

                <FaArrowRight />
                </Link>
            </div>

            {/* School Highlights */}
            <div
                className="
                mt-14 grid max-w-2xl
                grid-cols-1 gap-5
                border-t border-white/20
                pt-8 sm:grid-cols-3 sm:gap-4
                "
            >
                <div className="flex items-center gap-3">
                <div
                    className="
                    flex h-11 w-11 shrink-0
                    items-center justify-center
                    rounded-lg bg-secondary/15
                    text-secondary
                    "
                >
                    <FaGraduationCap size={21} />
                </div>

                <div>
                    <p className="text-sm font-bold text-white">
                    Pendidikan
                    </p>
                    <p className="mt-1 text-xs text-white/60">
                    Berkualitas
                    </p>
                </div>
                </div>

                <div className="flex items-center gap-3">
                <div
                    className="
                    flex h-11 w-11 shrink-0
                    items-center justify-center
                    rounded-lg bg-secondary/15
                    text-secondary
                    "
                >
                    <FaBookOpen size={19} />
                </div>

                <div>
                    <p className="text-sm font-bold text-white">
                    Keterampilan
                    </p>
                    <p className="mt-1 text-xs text-white/60">
                    Kompetensi Unggul
                    </p>
                </div>
                </div>

                <div className="flex items-center gap-3">
                <div
                    className="
                    flex h-11 w-11 shrink-0
                    items-center justify-center
                    rounded-lg bg-secondary/15
                    text-secondary
                    "
                >
                    <FaAward size={20} />
                </div>

                <div>
                    <p className="text-sm font-bold text-white">
                    Karakter
                    </p>
                    <p className="mt-1 text-xs text-white/60">
                    Berintegritas
                    </p>
                </div>
                </div>
            </div>

            </div>
        </div>

        {/* Scroll Indicator */}
        <div
            className="
            absolute bottom-8 right-10
            z-10 hidden items-center
            gap-3 lg:flex
            "
        >
            <span className="
            text-[10px] font-semibold
            uppercase tracking-[0.2em]
            text-white/60
            ">
            Scroll to explore
            </span>

            <div className="h-10 w-px bg-secondary" />
        </div>

            {/* <div className="container z-50">
                <div className="relative w-full md:mx-auto flex flex-col items-center justify-center text-center gap-y-10">
                    <h1 className="text-yellow text-4xl md:text-6xl lg:text-8xl font-coolvetica font-bold" data-aos="fade-down">Digital Marketing<br />Agency</h1>
                    <p className="w-full md:w-8/12 text-white text-base md:text-xl font-inter font-normal" data-aos="fade-up">Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque perferendis vero aliquid iusto nemo placeat nobis praesentium animi maxime, soluta adipisci sit, quia corrupti ratione in officia, debitis error illum!</p>
                </div>
            </div>
            <div className="absolute bg-fixed w-full h-full left-0 right-0 flex items-center justify-center top-0 z-10 bg-[url({})] bg-center bg-cover bg-no-repeat grayscale opacity-15" /> */}
        </section>
    );
}

export default Hero;