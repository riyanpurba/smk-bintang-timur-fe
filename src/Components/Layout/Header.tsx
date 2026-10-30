import { useState, useEffect} from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaBars, FaTimes } from 'react-icons/fa';
import LogoFull from '../../assets/Images/logo.png'

interface MenuProps {
    name: string;
    link: string;
}

const menu: MenuProps[] = [
    {
        name: "Beranda",
        link: "/",
    },
    {
        name: "Profil Sekolah",
        link: "/profil",
    },
    {
        name: "Visi & Misi",
        link: "/visi-misi",
    },
    {
        name: "Guru & Staff",
        link: "/guru-staff",
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
]

const Header = () => {
    const location = useLocation();
    const [ isSticky, setIsSticky ] = useState(false);
    const [openMenu, setOpenMenu] = useState(false);

    // Handle scroll
    useEffect(() => {
        const handleScroll = () => {
            setIsSticky(window.scrollY > 20);
        };

        handleScroll();

        window.addEventListener("scroll", handleScroll, {
            passive: true,
        });

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    // Close mobile menu when route changes
    useEffect(() => {
        setOpenMenu(false);
    }, [location.pathname]);

    // Prevent body scroll when mobile menu is open
    useEffect(() => {
        document.body.style.overflow = openMenu ? "hidden" : "";

        return () => {
            document.body.style.overflow = "";
        };
    }, [openMenu]);

    // Check active menu
    const isActive = (link: string) => {
        if (link === "/") {
            return location.pathname === "/";
        }

        return (
            location.pathname === link ||
            location.pathname.startsWith(`${link}/`)
        );
    };

    // Toggle mobile menu
    const handleOpenMenu = () => {
        setOpenMenu((prev) => !prev);
    };

    // Close mobile menu
    const handleCloseMenu = () => {
        setOpenMenu(false);
    };
    return (
        <header className={`${isSticky ? 'fixed bg-primary shadow-lg' : 'relative md:fixed bg-transparent'} w-full h-auto p-0 top-0 transition-all duration-300 ease-in-out z-[9999]`}>
            <nav className='relative w-full px-5 py-4 flex items-center justify-between'>
                <a href='/' className='flex items-center text-yellow text-4xl font-montserrat font-bold uppercase'>
                    <img src={LogoFull} className={`${isSticky ? 'w-14 h-14 md:w-10  md:h-10' : 'w-56 h-auto md:w-60 md:h-20'} transition-all`} width={250} height={80} alt="Logo" title="Catha" />
                </a>
                <button onClick={handleOpenMenu} className='block lg:hidden outline-none transition-all'>
                    {
                        openMenu ? <FaTimes className='text-yellow text-2xl' /> : <FaBars className='text-yellow text-2xl' />
                    }
                </button>
                <div className='hidden lg:flex items-center justify-between '>
                    <ul className='flex items-center gap-x-10'>
                        {menu.map((item, index) => {
                            const isActive = location.pathname === item.link;
                            return (
                                <li key={index} className="mx-auto">
                                    {/* <a href={item.link} className={`block py-2 pl-3 pr-4 ${isActive ? 'text-secondary font-semibold' : 'text-white font-normal'} font-inter hover:text-yellow capitalize rounded md:p-0`}>{item.name}</a> */}
                                    <Link
                                        to={item.link}
                                        className={`
                                        relative block py-2 text-sm
                                        transition-colors duration-200
                                        after:absolute after:bottom-0 after:left-0
                                        after:h-[2px] after:bg-secondary
                                        after:transition-all after:duration-300
                                        ${
                                            isActive
                                            ? "text-secondary font-bold after:w-full"
                                            : "text-white font-semibold after:w-0 hover:text-secondary hover:after:w-full"
                                        }
                                        `}
                                    >
                                        {item.name}
                                    </Link>
                                </li>
                            )
                        })}
                    </ul>
                </div>
                <div className={`fixed block lg:hidden top-0 left-0 right-0 w-full h-screen py-4 bg-black transition-all overflow-hidden ${openMenu ? 'visible opacity-100' : 'invisible opacity-0'}`}>
                    <div className="container">
                        <div className='flex flex-col gap-y-20'>
                            <div className='flex items-center justify-between'>
                                <a href='/' className='flex items-center text-yellow text-4xl font-montserrat font-bold uppercase'>
                                    <img src={LogoFull} className='w-56 h-auto md:w-60 md:h-20' width={250} height={80} alt="Logo" title="Catha" />
                                </a>
                                <button onClick={handleOpenMenu} className='block md:hidden outline-none transition-all'>
                                    {
                                        openMenu ? <FaTimes className='text-yellow text-2xl' /> : <FaBars className='text-yellow text-2xl' />
                                    }
                                </button>
                            </div>
                            <ul className='flex flex-col items-start justify-start text-left gap-y-4'>
                                {menu.map((item, index) => {
                                    const isActive = location.pathname === item.link;
                                    return (
                                        <li key={index} className="">
                                            <Link to={item.link} className={`block py-2 pl-3 pr-4 ${isActive ? 'text-secondary font-semibold' : 'text-white font-normal'} font-inter hover:text-yellow capitalize rounded md:p-0`}>{item.name}</Link>
                                        </li>
                                    )
                                })}
                            </ul>
                            {/* <SosialMedia className="flex items-center justify-between" /> */}
                        </div>
                    </div>
                </div>
            </nav>
        </header>
    );
}

export default Header;