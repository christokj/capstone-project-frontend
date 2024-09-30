import React, { useContext, useEffect, useState } from 'react';
import { axiosInstance } from '../../config/axiosInstance';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';
import { MyContext } from '../../components/Context/Context';

function ModeratorProfilePage() {

    const [moderatorData, setModeratorData] = useState(null);

    const {value} = useContext(MyContext)

    const fetchData = async () => {
        try {
            if (!moderatorData) {
                const response = await axiosInstance.get('/moderator/profile');
                setModeratorData(response.data.data);
            }
        } catch (error) {
            toast.error("Error fetching details");
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    if (!moderatorData) {
        return <div className='mt-28'>Loading...</div>;
    }

    return (

        <div className={`min-h-screen flex items-center justify-center mt-24 ${value ? "bg-black" : "bg-gray-50"}`}>
            <div className={`w-full max-w-3xl my-10 shadow-lg rounded-3xl overflow-hidden ${value ? "bg-gray-300" : "bg-gray-50"}`}>
                <div className="p-8">
                    <div className="flex items-center">
                        <div className="ml-4">
                            <h2 className="text-2xl font-bold text-gray-800">{moderatorData?.fullname}</h2>
                            <p className="text-gray-600">{moderatorData?.email}</p>
                        </div>
                    </div>

                    <div className="mt-6">
                        <h3 className="text-lg font-semibold text-gray-800">Profile Details</h3>
                        <div className="mt-4">
                            <div className="flex items-center justify-between">
                                <span className="text-gray-600">Full Name:</span>
                                <span className="text-gray-800">{moderatorData?.fullname}</span>
                            </div>
                            <div className="flex items-center justify-between mt-2">
                                <span className="text-gray-600">Email:</span>
                                <span className="text-gray-800">{moderatorData?.email}</span>
                            </div>
                            <div className="flex items-center justify-between mt-2">
                                <span className="text-gray-600">Phone:</span>
                                <span className="text-gray-800">{moderatorData?.mobile}</span>
                            </div>
                            <div className="flex items-center justify-between mt-2">
                                <span className="text-gray-600">Shop Name:</span>
                                <span className="text-gray-800">{moderatorData?.shopName}</span>
                            </div>

                        </div>
                    </div>

                    <div className="mt-6">
                        <h3 className="text-lg font-semibold text-gray-800">Settings</h3>
                        <div className="mt-4 space-y-4">
                            <Link to={'/moderator/update-profile'} className="btn bg-main text-black w-full">
                                Edit Profile
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    );
}

export default ModeratorProfilePage;