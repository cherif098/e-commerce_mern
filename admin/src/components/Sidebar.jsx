import React from 'react';
import { NavLink } from 'react-router-dom';
import { assets } from '../assets/assets';

const SideBar = () => {
  return (
    <div className='w-[18%] min-h-screen border-r-2 bg-gray-100 shadow-md'>
      <div className='flex flex-col gap-4 pt-6 pl-[20%] text-[15px]'>
        {[
          { to: '/add', icon: assets.add_icon, label: 'Add items' },
          { to: '/list', icon: assets.order_icon, label: 'List items' },
          { to: '/Orders', icon: assets.order_icon, label: 'Orders' },
        ].map((item, index) => (
          <NavLink
            key={index}
            className='flex items-center gap-3 px-3 py-2 rounded-l transition-colors duration-300 hover:bg-stone-200 hover:text-gray-900'
            to={item.to}
          >
            <img className='w-5 h-5' src={item.icon} alt='' />
            <p className='hidden md:block'>{item.label}</p>
          </NavLink>
        ))}
      </div>
    </div>
  );
};

export default SideBar;
