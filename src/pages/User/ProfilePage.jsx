import React, { useEffect, useState } from 'react'
import { axiosInstance } from '../../config/axiosInstance';
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout } from '../../redux/features/authSlice';

function ProfilePage() {

    const [userData, setUserData] = useState(null);

    const dispatch = useDispatch();

    const navigate = useNavigate();
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
            console.log(error);
            toast.error("Logout failed");
        }
    }

    const handleUpdate = async () => {

      navigate('/user/update-user', { state: { userData } })

    }

        const fetchUserData = async () => {
            try {
                const response = await axiosInstance({
                    url: "/user/fetch-user-data",
                    method: "GET",
                });
    
                if (!response) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
               setUserData(response?.data?.data)
               
            } catch (error) {
                console.error('Error:', error);
                toast.error("Failed to fectch user data");
            }
        }

        useEffect(() => {
        fetchUserData();
        }, [])
        

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="w-full max-w-3xl my-10 bg-white shadow-lg rounded-3xl overflow-hidden">
        <div className="p-8">
          <div className="flex items-center">
            <div className="ml-4">
              <h2 className="text-2xl font-bold text-gray-800">{userData?.fullname}</h2>
              <p className="text-gray-600">{userData?.email}</p>
            </div>
          </div>

          <div className="mt-6">
            <h3 className="text-lg font-semibold text-gray-800">Profile Details</h3>
            <div className="mt-4">
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Full Name:</span>
                <span className="text-gray-800">{userData?.fullname}</span>
              </div>
              <div className="flex items-center justify-between mt-2">
                <span className="text-gray-600">Email:</span>
                <span className="text-gray-800">{userData?.email}</span>
              </div>
              <div className="flex items-center justify-between mt-2">
                <span className="text-gray-600">Phone:</span>
                <span className="text-gray-800">{userData?.mobile}</span>
              </div>
              <div className="flex items-center justify-between mt-2">
                <span className="text-gray-600">Address:</span>
                <span className="text-gray-800">Country : {userData?.address?.country}, State : {userData?.address?.state}, City : {userData?.address?.city}, Zip code : {userData?.address?.zipCode} </span>
              </div>
            </div>
          </div>

          <div className="mt-6">
            <h3 className="text-lg font-semibold text-gray-800">Settings</h3>
            <div className="mt-4 space-y-4">
              <button  onClick={handleUpdate} className="btn bg-main w-full">Edit Profile</button>
              <button onClick={handleClick} className="btn btn-error w-full">Log Out</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage