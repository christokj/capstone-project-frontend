import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { axiosInstance } from '../../config/axiosInstance';
import toast from 'react-hot-toast';

function UserIcon() {
    const [user, setUser] = useState(false);
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
            toast.success("Logout successful");
            navigate('/', { replace: true })
        } catch (error) {
            console.log(error);
            toast.error("Logout failed");
        }
    }

    return (
        <div className="dropdown dropdown-end me-10">
            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                <div className="w-10 rounded-full">
                    <img
                        alt="Tailwind CSS Navbar component"
                        src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
                </div>
            </div>
            <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
                <li>
                    <a className="justify-between">
                        Profile
                    </a>
                </li>
                <li><a>Settings</a></li>
                <li><a onClick={handleClick}>Logout</a></li>
            </ul>
        </div>
    );
}

export default UserIcon;