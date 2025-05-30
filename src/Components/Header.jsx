/* eslint-disable react/prop-types */
import homeLogo from '/assets/shared/logo.svg'
import menu from '/assets/shared/icon-hamburger.svg';
import cross from '/assets/shared/icon-close.svg';
import { useState } from 'react';


export default function Header(props) {
    const [openNav, setOpenNav] = useState(false);


    function toggleSideNav() {
        setOpenNav(prev => !prev);
    }


    return (
        <header className='min-w-[200px] lg:pt-8 '>
            <nav className='flex justify-between items-center px-4 pt-8 md:px-0 md:pt-0 md:pl-4 '>
                <div className='md:w-full md:max-w-[15rem] flex justify-center  '>

                    <a href="#">
                        <img className='w-[2.5rem] sm:w-[3rem] md:w-[3.5rem]' src={homeLogo} alt="Home" />
                    </a>

                </div>
                <div>
                    <button className='md:hidden hover:cursor-pointer' onClick={toggleSideNav}>
                        <img src={menu} alt="Menu" />
                    </button>
                </div>
                <div className={`side-navigation  ${openNav ? "open" : ""}  fixed top-0 right-0 min-h-[100vh] link-container   md:min-h-auto md:relative  md:px-6 md:bg-[#191b27] lg:bg-transparent md:py-8 lg:py-0 z-50   w-[min(80%,254px)] md:w-auto  backdrop-blur-xl  flex flex-col md:flex-row 
                    py-4 `}>
                    <div className='flex  h-[76px]  pr-4 md:hidden'>
                        <button
                            onClick={toggleSideNav}
                            className='ml-auto  text-center  h-12 mt-auto'>
                            <img src={cross} alt="Close" />
                        </button>
                    </div>
                    <ul className=' mt-16 pl-4 text-white flex flex-col gap-6 md:flex-row md:gap-6 md:mt-0 lg:gap-12  '>
                        <li className={`relative nav-link-btns lg:py-8  ${props.currentPage === "home" ? "active" : ""}`}>
                            <button
                                className={`inline`}
                                onClick={() => {
                                    props.setCurrentPage("home");
                                    toggleSideNav();
                                }}
                            >
                                <span className='mr-4 md:mr-3 md:hidden lg:inline  font-bold'>00</span>
                                <span className='uppercase tracking-[2px] page-destination'>Home</span>
                            </button>
                        </li>
                        <li className={`relative nav-link-btns lg:py-8  ${props.currentPage === "destination" ? "active" : ""}`}>
                            <button
                                className={`inline`}
                                onClick={() => {
                                    props.setCurrentPage("destination");
                                    toggleSideNav();
                                }}
                            >
                                <span className='mr-4 md:mr-3  font-bold'>01</span>
                                <span className='uppercase tracking-[2px] page-destination'>destination</span>
                            </button>
                        </li>
                        <li className={`relative nav-link-btns lg:py-8  ${props.currentPage === "crew" ? "active" : ""}`}>
                            <button
                                className={`inline`}
                                onClick={() => {
                                    props.setCurrentPage("crew");
                                    toggleSideNav();
                                }}
                            >
                                <span className='mr-4 md:mr-3  font-bold'>02</span>
                                <span className='uppercase tracking-[2px] page-destination'>crew</span>
                            </button>
                        </li>
                        <li className={`relative nav-link-btns lg:py-8  ${props.currentPage === "technology" ? "active" : ""}`}>
                            <button
                                className={`inline`}
                                onClick={() => {
                                    props.setCurrentPage("technology");
                                    toggleSideNav();
                                }}
                            >
                                <span className='mr-4 md:mr-3  font-bold'>03</span>
                                <span className='uppercase tracking-[2px] page-destination'>technology</span>
                            </button>
                        </li>
                    </ul>
                </div>
            </nav>
        </header>
    )
}