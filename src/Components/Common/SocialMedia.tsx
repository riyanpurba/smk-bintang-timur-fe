import { FC } from "react";
import { FaFacebook, FaInstagram, FaLinkedin, FaXTwitter, FaTiktok, FaYoutube } from "react-icons/fa6";

interface SosialMediaProps {
    className: string;
}

const SosialMedia: FC<SosialMediaProps> = ({className}) => {
    return (
        <ul className={className}>
            <li>
                <a href='https://www.facebook.com/' target='_blank' rel='noreferrer'>
                    <FaFacebook className='text-white text-3xl' />
                </a>
            </li>
            <li>
                <a href='https://www.instagram.com/' target='_blank' rel='noreferrer'>
                    <FaInstagram className='text-white text-3xl' />
                </a>
            </li>
            <li>
                <a href='https://www.linkedin.com/' target='_blank' rel='noreferrer'>
                    <FaLinkedin className='text-white text-3xl' />
                </a>
            </li>
            <li>
                <a href='https://www.youtube.com/' target='_blank' rel='noreferrer'>
                    <FaXTwitter className='text-white text-3xl' />
                </a>
            </li>
            <li>
                <a href='https://www.youtube.com/' target='_blank' rel='noreferrer'>
                    <FaTiktok className='text-white text-3xl' />
                </a>
            </li>
            <li>
                <a href='https://www.youtube.com/' target='_blank' rel='noreferrer'>
                    <FaYoutube className='text-white text-3xl' />
                </a>
            </li>
        </ul>
    )
}

export default SosialMedia;