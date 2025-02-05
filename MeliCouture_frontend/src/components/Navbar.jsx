import React, { useContext, useState } from 'react'
import { assets } from '../assets/assets'
import { Link, NavLink } from 'react-router-dom'
import { ShopContext } from '../context/ShopContext'

const Navbar = () => {
    const [visible, setVisible] = useState(false)
    const { setShowSearch, getCartCount } = useContext(ShopContext)

    return (
        <div className='sticky top-0 z-50 bg-white/95 backdrop-blur-sm shadow-sm'>
            <div className='max-w-7xl mx-auto px-4 flex items-center justify-between py-4 font-medium'>
                <Link to={'/'} className="transition-transform hover:scale-105">
                    <img src={assets.logo} className='w-24' alt="Logo" />
                </Link>

                <ul className='hidden sm:flex gap-8 text-sm text-gray-700'>
                    {['HOME', 'COLLECTION', 'ABOUT', 'CONTACT'].map((item) => (
                        <NavLink 
                            key={item}
                            to={item === 'HOME' ? '/' : `/${item.toLowerCase()}`}
                            className={({ isActive }) => `
                                flex flex-col items-center gap-1 hover:text-black transition-colors
                                ${isActive ? 'text-black' : ''}
                            `}
                        >
                            <p>{item}</p>
                            <div className='h-0.5 w-0 bg-black transition-all group-hover:w-full'></div>
                        </NavLink>
                    ))}
                </ul>

                <div className='flex items-center gap-6'>
                    <button onClick={() => setShowSearch(true)} 
                        className='p-2 hover:bg-gray-100 rounded-full transition-colors'>
                        <img src={assets.search_icon} className='w-5' alt="Search" />
                    </button>

                    <div className='group relative'>
                        <Link to='/login' className='p-2  rounded-full transition-colors'>
                            <img className='w-5' src={assets.profile_icon} alt="Profile" />
                        </Link>
                        <div className='group-hover:block hidden absolute dropdown-menu right-0 pt-4'>
                            <div className='bg-white shadow-lg rounded-lg py-3 px-4 min-w-[160px]'>
                                {['My Profile', 'Orders', 'Logout'].map((item) => (
                                    <button key={item} 
                                        className='w-full text-left px-2 py-2 text-gray-600 hover:bg-gray-50 rounded-md transition-colors'>
                                        {item}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    <Link to='/cart' className='relative p-2 hover:bg-gray-100 rounded-full transition-colors'>
                        <img src={assets.cart_icon} className='w-5' alt="Cart" />
                        <span className='absolute right-1 bottom-1 w-5 h-5 flex items-center justify-center bg-black text-white text-xs rounded-full'>
                            {getCartCount()}
                        </span>
                    </Link>

                    <button onClick={() => setVisible(true)} 
                        className='p-2 hover:bg-gray-100 rounded-full transition-colors sm:hidden'>
                        <img src={assets.menu_icon} className='w-5' alt="Menu" />
                    </button>
                </div>

                {/* Mobile sidebar */}
                <div className={`fixed inset-0 bg-black/20 backdrop-blur-sm transition-opacity ${visible ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
                    <div className={`absolute top-0 right-0 bottom-0 w-64 bg-white shadow-xl transition-transform ${visible ? 'translate-x-0' : 'translate-x-full'}`}>
                        <div className='flex flex-col text-gray-600'>
                            <button onClick={() => setVisible(false)} 
                                className='flex items-center gap-4 p-4 hover:bg-gray-50 transition-colors'>
                                <img className='h-4 rotate-180' src={assets.dropdown_icon} alt="Back" />
                                <span>Back</span>
                            </button>
                            {['HOME', 'COLLECTION', 'ABOUT', 'CONTACT'].map((item) => (
                                <NavLink 
                                    key={item}
                                    onClick={() => setVisible(false)}
                                    to={item === 'HOME' ? '/' : `/${item.toLowerCase()}`}
                                    className={({ isActive }) => `
                                        py-3 px-6 border-b hover:bg-gray-50 transition-colors
                                        ${isActive ? 'text-black font-medium' : ''}
                                    `}
                                >
                                    {item}
                                </NavLink>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Navbar