import React from 'react';
import { useSelector } from 'react-redux';
import { DarkMode } from '../ui/DarkMode';
import { NavLink } from 'react-router-dom';
import ModeratorIcon from './ModeratorIcon';

function ModeratorHeader() {

  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  return (
    <div className='fixed top-0 left-0 right-0 w-full shadow-sm z-50 backdrop-blur-sm'>
      <div className="container ps-2 py-5 flex flex-nowrap z-10 items-center justify-between">
        <NavLink to={isAuthenticated ? '/moderator' : '/'} className="flex items-center">
          <img className="object-cover h-14 w-14 mx-4 cursor-pointer" src="https://res.cloudinary.com/dfm6raue1/image/upload/fl_preserve_transparency/v1724577774/Services_ECommerce_v2-01_xjoraa.jpg?_s=public-apps" alt="" />
          <a className="text-2xl font-bold text-dark-grey-900">TrendiQ Moderator</a>
        </NavLink>
        <div className="items-center gap-2 flex -me-10">
          <DarkMode />
          <ModeratorIcon />
        </div>
      </div>
    </div>
  );
}

export default ModeratorHeader;