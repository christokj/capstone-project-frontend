import React from 'react';
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../redux/features/authSlice';
import { axiosInstance } from '../../config/axiosInstance';
import { useNavigate } from 'react-router-dom';

function AdminIcon() {

    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleClick = async () => {
        try {
            await axiosInstance({
                url: "/admin/logout",
                method: "GET",
            });
            localStorage.removeItem('Token');
            dispatch(logout());
            toast.success("Logout successful");
            navigate('/login', { replace: true });
        } catch (error) {
            toast.error("Logout failed");
        }
    };

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
                {isAuthenticated &&
                    <>
                        <li><a onClick={handleClick}>Logout</a></li>
                    </>
                }
            </ul>
        </div>
    );
}

export default AdminIcon;