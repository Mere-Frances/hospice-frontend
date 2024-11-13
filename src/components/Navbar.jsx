import { useState, useEffect, useContext } from "react";
import { NavLink } from "react-router-dom";
import useCustomizer from "../hooks/useCustomizer";
import axios from "axios";

const baseUrl = import.meta.env.VITE_WP_BASEURL

const Navbar = () => {

    // mobile nav
    const [isOpen, setIsOpen] = useState(false);
    const {mobileMenu} = useCustomizer();
    const [logoUrl, setLogoUrl] = useState('');

    const toggleMenu = () => {
        setIsOpen(!isOpen);
        document.body.style.overflow = isOpen ? 'auto' : 'hidden';
    }
    const closeMenu = () => {
        setIsOpen(false);
        document.body.style.overflow = 'auto';
    }
    useEffect(() => {
        const mobile = document.querySelector('.nav-links');
        if (isOpen && mobile) {
            mobile.style.backgroundColor = mobileMenu;
        } else {
            mobile.style.backgroundColor = 'transparent';
        }
    }, [isOpen, mobileMenu])

    // logo
    useEffect(() => {
        const fetchNavLogo = async () => {
            try {
                const response = await axios.get(`${baseUrl}wp-json/custom/v1/nav-logo`);
                if (response.status === 200) {
                    const data = response.data;
                    setLogoUrl(data[0]);
                } else {
                    console.error('Failed to fetch logo URL');
                }
            } catch (error) {
                console.error('Error fetching logo', error);
            }
        };
    
        fetchNavLogo();
    }, [])

  return (
    <header>
        <nav className={`navbar ${isOpen ? "menu-open" : ""}`}>
            <NavLink to='/' className='logo'>
                <img src={logoUrl} alt='Website Logo'/>
            </NavLink>

            {/* nav links */}
            <ul className={`nav-links ${isOpen ? 'active' : ''}`}>
                <li>
                    <NavLink
                        to='/'
                        onClick={closeMenu}
                        className={({isActive}) => (isActive ? 'active-link' : '')}
                    >
                        Home
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        to='/campaigns'
                        onClick={closeMenu}
                        className={({isActive}) => (isActive ? 'active-link' : '')}
                    >
                        Campaigns
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        to='/updates'
                        onClick={closeMenu}
                        className={({isActive}) => (isActive ? 'active-link' : '')}
                    >
                        News
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        to='/publications'
                        onClick={closeMenu}
                        className={({isActive}) => (isActive ? 'active-link' : '')}
                    >
                        Publications
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        to='/resources'
                        onClick={closeMenu}
                        className={({isActive}) => (isActive ? 'active-link' : '')}
                    >
                        Resources
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        to='/stories'
                        onClick={closeMenu}
                        className={({isActive}) => (isActive ? 'active-link' : '')}
                    >
                        Stories
                    </NavLink>
                </li>
            </ul>
            <div className='primary-button'>
                <NavLink
                    to='/donate'
                    onClick={closeMenu}
                    className={({isActive}) => (isActive ? 'active-link' : '')}
                >
                    Donations
                </NavLink>
            </div>
            {/* hamburg */}
            <div className='menu-icon' onClick={toggleMenu}>
                <div className={`bar bar1 ${isOpen ? 'toggle' : ''}`}></div>
                <div className={`bar bar2 ${isOpen ? 'toggle' : ''}`}></div>
                <div className={`bar bar3 ${isOpen ? 'toggle' : ''}`}></div>
            </div>
        </nav>
        {isOpen && <div className='overlay' onClick={closeMenu}></div>}
    </header>
  )
}

export default Navbar
