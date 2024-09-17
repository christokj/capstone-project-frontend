import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { axiosInstance } from '../../config/axiosInstance';
import toast from 'react-hot-toast';

function ModeratorProfileEditPage() {

    const navigate = useNavigate();

    const [moderator, setModerator] = useState({
        fullname: '',
        email: '',
        mobile: '',
        password: '',
        shopName: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setModerator({ ...moderator, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axiosInstance({
                url: "/moderator/update-moderator-details",
                method: "PUT",
                data: moderator,
            });

            toast.success("Profile updated successfully");
            navigate('/moderator', { replace: true });
        } catch (error) {
            if (error.response && error.response.data && error.response.data.message) {
                toast.error(error.response.data.message);
            } else {
                toast.error("An error occurred while updating the profile.");
            }
        }
    };

    useEffect(() => {
        // Fetch the current moderator details to populate the form
        const fetchModeratorDetails = async () => {
            try {
                const response = await axiosInstance.get('/moderator/profile');
                setModerator(response.data);
            } catch (error) {
                toast.error("Error fetching moderator details.");
                console.log(error);
            }
        };

        fetchModeratorDetails();
    }, []);

    return (
        <div className="flex justify-center items-center my-5 ">
            <div className="card w-full max-w-lg bg-base-100 shadow-xl">
                <div className="card-body">
                    <h2 className="card-title">Edit Profile</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Full Name</span>
                            </label>
                            <input
                                type="text"
                                name="fullname"
                                value={moderator.fullname}
                                onChange={handleChange}
                                className="input input-bordered"
                                placeholder="Please enter your name"
                            />
                        </div>

                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input
                                type="email"
                                name="email"
                                value={moderator.email}
                                onChange={handleChange}
                                className="input input-bordered"
                                placeholder="Please enter your email"
                            />
                        </div>

                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">New Password</span>
                            </label>
                            <input
                                type="password"
                                name="password"
                                value={moderator.password}
                                onChange={handleChange}
                                className="input input-bordered"
                                placeholder="Enter new password"
                            />
                        </div>

                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Mobile</span>
                            </label>
                            <input
                                type="text"
                                name="mobile"
                                value={moderator.mobile}
                                onChange={handleChange}
                                className="input input-bordered"
                                placeholder="Please enter your mobile number"
                            />
                        </div>

                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Shop Name</span>
                            </label>
                            <input
                                type="text"
                                name="shopName"
                                value={moderator.shopName}
                                onChange={handleChange}
                                className="input input-bordered"
                                placeholder="Please enter your shop name"
                            />
                        </div>

                        <div className="form-control mt-6">
                            <button type="submit" className="btn bg-main">
                                Save Changes
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default ModeratorProfileEditPage;