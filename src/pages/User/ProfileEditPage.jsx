import React, { useState } from 'react';
import { axiosInstance } from '../../config/axiosInstance';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const ProfileEditPage = () => {

    const navigate = useNavigate();
    
    const [user, setUser] = useState({
        fullname: '',
        email: '',
        mobile: '',
        password: '',
        address: {
            street: '',
            city: '',
            state: '',
            zipCode: '',
            country: '',
        },
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name.includes("address")) {
            const addressField = name.split(".")[1];
            setUser((prevUser) => ({
                ...prevUser,
                address: {
                    ...prevUser.address,
                    [addressField]: value,
                },
            }));
        } else {
            setUser({ ...user, [name]: value });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        try {
            const response = await axiosInstance({
                url: "/user/update-user-details",
                method: "PUT",
                data: user,
            });
    
            toast.success("Profile updated successfully");
            navigate('/user/profile', { replace: true });
        } catch (error) {
            if (error.response && error.response.data && error.response.data.message) {
                toast.error(error.response.data.message);
            } else {
                toast.error("An error occurred while updating the profile.");
            }
            console.log(error);
        }
    };
    

    return (
        <div className="flex justify-center items-center my-5 ">
            <div className="card  w-full max-w-lg bg-base-100 shadow-xl">
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
                                value={user.fullname}
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
                                value={user.email}
                                onChange={handleChange}
                                className="input input-bordered"
                                placeholder="Please enter your email"
                            />
                        </div>

                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">New password</span>
                            </label>
                            <input
                                type="text"
                                name="password"
                                value={user.password}
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
                                value={user.mobile}
                                onChange={handleChange}
                                className="input input-bordered"
                                placeholder="+91XXXXXXXXXX"
                            />
                        </div>

                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Street</span>
                            </label>
                            <input
                                type="text"
                                name="address.street"
                                value={user.address.street}
                                onChange={handleChange}
                                className="input input-bordered"
                                placeholder="Street"
                            />
                        </div>

                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">City</span>
                            </label>
                            <input
                                type="text"
                                name="address.city"
                                value={user.address.city}
                                onChange={handleChange}
                                className="input input-bordered"
                                placeholder="City"
                            />
                        </div>

                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">State</span>
                            </label>
                            <input
                                type="text"
                                name="address.state"
                                value={user.address.state}
                                onChange={handleChange}
                                className="input input-bordered"
                                placeholder="State"
                            />
                        </div>

                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Zip Code</span>
                            </label>
                            <input
                                type="text"
                                name="address.zipCode"
                                value={user.address.zipCode}
                                onChange={handleChange}
                                className="input input-bordered"
                                placeholder="Zip Code"
                            />
                        </div>

                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Country</span>
                            </label>
                            <input
                                type="text"
                                name="address.country"
                                value={user.address.country}
                                onChange={handleChange}
                                className="input input-bordered"
                                placeholder="Country"
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
};

export default ProfileEditPage;
