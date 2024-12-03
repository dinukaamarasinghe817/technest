import React from 'react';
import Logo from '../assets/images/logo.png';
import Profile from '../assets/images/profile.png'
import 'flowbite';

function Header() {
    return (
    <nav className="bg-white border-gray-200 w-full fixed top-0 left-0">
        <div className="max-w-screen flex flex-row items-center py-4 px-12">
            {/* logo */}
            <a href="http://127.0.0.1:5174/" className="flex items-center space-x-3 rtl:space-x-reverse">
                <img src={Logo} className="h-8" alt="TechNest Logo" />
            </a>

            {/* profile */}
            <div className="flex flex-row items-center ml-auto">
                <button type="button" className="flex text-sm bg-blue-100 rounded-full md:me-0 focus:ring-4 p-0" id="user-menu-button" aria-expanded="false" data-dropdown-toggle="user-dropdown" data-dropdown-placement="bottom">
                    <span className="sr-only">Open user menu</span>
                    <img className="w-12 h-12 rounded-full" src={Profile} alt="user photo"/>
                </button>
                <div className="z-50 hidden my-4 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow" id="user-dropdown">
                    <div className="px-4 py-3">
                        <span className="block text-sm text-gray-900 dark:text-white">Dinuka Ashan</span>
                        <span className="block text-sm  text-gray-500 truncate dark:text-gray-400">dinukaashan@gmail.com</span>
                    </div>
                    <ul className="py-2" aria-labelledby="user-menu-button">
                        <li>
                            <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Settings</a>
                        </li>
                        <li>
                            <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Sign out</a>
                        </li>
                    </ul>
                </div>
                <button data-collapse-toggle="navbar-user" type="button" className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-user" aria-expanded="false">
                    <span className="sr-only">Open main menu</span>
                    <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h15M1 7h15M1 13h15"/>
                    </svg>
                </button>
            </div>

            {/* cart */}
            <div className='ml-4'>
                <button type="button" className="flex text-sm bg-white rounded-full md:me-0 p-2" id="user-menu-button">
                    <svg class="w-8 h-8 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M5 4h1.5L9 16m0 0h8m-8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm-8.5-3h9.25L19 7H7.312"/>
                    </svg>  
                </button>
            </div>
        </div>
    </nav>
    );
}

export default Header;