import React, {useState, useEffect, useRef} from 'react';
import { useNavigate } from 'react-router-dom';
import Logo from '../assets/images/logo.png';
import Profile from '../assets/images/profile.png';
import authService from '../services/authService';
import instance from '../services/axiosInstance';
import 'flowbite';

function Header() {
    const navigate = useNavigate();
    const menuRef = useRef(null);
    const [accMenu, setAccMenu] = useState(false);
    const [user, setUser] = useState(null);

    useEffect(() => {
        const fetchUser = async () => {
            if (!authService.isLoggedIn()) {
                return;
            }

            const url = '/user';
            try {
                const response = await instance.get(url);
                setUser(response.data);
                console.log('User info fetched:', response.data);
            } catch (error) {
                console.error('Error fetching user info:', error);
            }
            return;
        }
        fetchUser();

        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setAccMenu(false);
            }
        };
    
        document.addEventListener('mousedown', handleClickOutside);
    
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    
    }, [navigate]);

    const signOut = () => {
        authService.logout();
        setUser(null);
        navigate('/');
    }

    return (
        <nav className="bg-white border-gray-200 w-full fixed top-0 left-0">
            <div className="max-w-screen flex flex-row items-center py-4 px-12">
                <a href="http://127.0.0.1:5174/" className="flex items-center space-x-3 rtl:space-x-reverse">
                    <img src={Logo} className="md:h-8 h-4" alt="TechNest Logo" />
                </a>

                {user ? (
                    <>
                        <div className="flex flex-row items-center ml-auto">
                            <div 
                            ref={menuRef}
                            className='relative flex flex-col'>
                                <button 
                                onClick={() => setAccMenu((prev) => !prev)}
                                type="button" className="flex text-sm bg-blue-100 rounded-full md:me-0 focus:ring-4 p-0" id="user-menu-button">
                                    <span className="sr-only">Open user menu</span>
                                    <img className="w-12 h-12 rounded-full" src={Profile} alt="user photo"/>
                                </button>
                                <div className={`z-50 w-[200px] ${accMenu ? 'block' : 'hidden'} absolute mt-14 -ml-16 my-4 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow`}>
                                    <div className="px-4 py-3">
                                        <span className="block text-sm text-gray-900 dark:text-white">{user.first_name} {user.last_name}</span>
                                        <span className="block text-sm  text-gray-500 truncate dark:text-gray-400">{user.email}</span>
                                    </div>
                                    <ul className="py-2 cursor-pointer" aria-labelledby="user-menu-button">
                                        <li>
                                            <p
                                            onClick={signOut}
                                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Sign out</p>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <button type="button" className="hidden items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-expanded="false">
                                <span className="sr-only">Open main menu</span>
                                <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15"/>
                                </svg>
                            </button>
                        </div>
                        <div className='ml-4'>
                            <button 
                            onClick={() => navigate('/cart')}
                            type="button" className="flex text-sm bg-white rounded-full md:me-0 p-2" id="user-menu-button">
                                <svg className="w-8 h-8 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M5 4h1.5L9 16m0 0h8m-8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm-8.5-3h9.25L19 7H7.312"/>
                                </svg>  
                            </button>
                        </div>
                    </>
                ) : (
                    <button 
                    onClick={() => navigate('/login')}
                    type="button" className="ml-auto inline-flex items-center rounded-lg transition-all duration-200 bg-blue-500 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-600 focus:outline-none focus:ring-4  focus:ring-primary-300">
                        Login
                    </button>
                )}
                
            </div>
        </nav>
    );
}

export default Header;