import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { axiosInstance } from '../../config/axiosInstance';
import toast from 'react-hot-toast';
import { logout } from '../../redux/features/authSlice';
import { useDispatch, useSelector } from 'react-redux';

function UserIcon() {

    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

    const [user, setUser] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    function hasCookie(name) {
        const cookieValue = `; ${document.cookie}`;
        const parts = cookieValue.split(`; ${name}=`);
        if (parts.length === 2) {
            setUser(true);
            return true;
        }
        setUser(false);
        return false;
    }
    useEffect(() => {
        const userHasCookie = hasCookie('myCookieName');

    }, [user])
    const handleClick = async () => {
        try {
            const response = await axiosInstance({
                url: "/user/logout",
                method: "GET",
            });
            localStorage.removeItem('token');
            dispatch(logout());
            toast.success("Logout successful");
            navigate('/', { replace: true })
        } catch (error) {
            toast.error("Logout failed");
        }
    }

    return (
        <div className="dropdown dropdown-end me-10">
            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                <div className="w-10 rounded-full indicator">
                    <svg className='w-6 h-8 fill-gray-600 mx-auto' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M304 128a80 80 0 1 0 -160 0 80 80 0 1 0 160 0zM96 128a128 128 0 1 1 256 0A128 128 0 1 1 96 128zM49.3 464l349.5 0c-8.9-63.3-63.3-112-129-112l-91.4 0c-65.7 0-120.1 48.7-129 112zM0 482.3C0 383.8 79.8 304 178.3 304l91.4 0C368.2 304 448 383.8 448 482.3c0 16.4-13.3 29.7-29.7 29.7L29.7 512C13.3 512 0 498.7 0 482.3z" /></svg>
                </div>
            </div>
            <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
                <li className='md:hidden block'><Link to={isAuthenticated ? '/user' : '/'}>Home</Link></li>
                <li className='md:hidden block'><Link to={isAuthenticated ? '/user/products' : '/products'}>Products</Link></li>
                <li className='md:hidden block'><Link to={isAuthenticated ? '/user/about' : '/about'}>About</Link></li>
                <li className='md:hidden block'><Link to={isAuthenticated ? '/user/contact' : '/contact'}>Contact</Link></li>
                {isAuthenticated && <> <li>
                    <Link to={'/user/profile'} className="justify-between">
                        Profile
                    </Link>
                </li>
                    <li className='sm:hidden block'><a>Cart</a></li>
                    <li><a onClick={handleClick}>Logout</a></li>
                </>
                }
            </ul>
        </div>
    );
}

export default UserIcon;