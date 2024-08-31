import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import * as formik from 'formik';
import * as yup from 'yup';
import { axiosInstance } from '../../config/axiosInstance';
import toast from 'react-hot-toast';

function ModeratorSignUpPage() {

    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();
    const { Formik } = formik;

    // Validation schema using Yup
    const schema = yup.object().shape({
        fullname: yup.string()
            .required("Full name is required")
            .max(50, "Full name cannot exceed 50 characters")
            .matches(/^[a-zA-Z\s]+$/, "Only letters and spaces are allowed"),
        email: yup.string()
            .required("Email is required")
            .email("Please enter a valid email")
            .max(50, "Email cannot exceed 50 characters"),
        password: yup.string()
            .required("Password is required")
            .min(8, "Password must be at least 8 characters long")
            .max(100, "Password cannot exceed 100 characters")
            .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>])[a-zA-Z\d!@#$%^&*(),.?":{}|<>]{8,}$/, 
                     "Password should contain a minimum of 8 characters, a small letter, and a capital letter"),
        confirmPassword: yup.string()
            .required("Please confirm your password")
            .oneOf([yup.ref('password'), null], "Passwords must match"),
        mobile: yup.string()
            .required("Mobile number is required")
            .matches(/^\d{10}$/, "Mobile number must be 10 digits"),
    });

    const handleSignupSubmit = async (values) => {
        const { confirmPassword, ...data } = values;
        try {
            const response = await axiosInstance({
                url: "/moderator/create",
                method: "POST",
                data: {data},
            });
            toast.success("Account creation successfull")
            navigate('/login', { replace: true }); 
        } catch (error) {
            if (error.response && error.response.data && error.response.data.error) {
                toast.error(error.response.data.error);
            } else if (error.response && error.response.status === 400) {
                toast.error(error.response.data.message || 'Registration failed');
            } else {
                toast.error('An unexpected error occurred.');
            }
        }
    };

    const handleCheckboxChange = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div className="flex flex-col items-center justify-center px-4 my-10 mx-auto w-full bg-gray-100 rounded-lg shadow dark:border max-w-md dark:bg-gray-800 dark:border-gray-700">
            <h1 className="my-4 font-bold text-center leading-tight tracking-tight text-gray-900 text-2xl dark:text-white">
                Moderator Signup
            </h1>
            <Formik
                validationSchema={schema}
                onSubmit={(values) => handleSignupSubmit(values)}
                initialValues={{
                    fullname: '',
                    email: '',
                    password: '',
                    confirmPassword: '',
                    mobile: '',
                }}
            >
                {({ handleSubmit, handleChange, values, errors }) => (
                    <form noValidate onSubmit={handleSubmit} className="w-full">
                        <div className="form-control mb-4">
                            <label className='block mb-1 text-sm font-medium text-gray-900 dark:text-white'>Fullname</label>
                            <input
                                type="text"
                                name="fullname"
                                value={values.fullname}
                                onChange={handleChange}
                                className={`input input-bordered bg-gray-50 border ${errors.fullname ? 'border-red-500' : 'border-gray-300'} text-gray-900 rounded-lg block w-full p-2 dark:placeholder-gray-400 dark:text-white`}
                            />
                            {errors.fullname && <span className="text-red-500 text-xs">{errors.fullname}</span>}
                        </div>
                        <div className="form-control mb-4">
                            <label htmlFor="email" className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                            <input
                                type="email"
                                name="email"
                                id="email"
                                value={values.email}
                                onChange={handleChange}
                                className={`input input-bordered bg-gray-50 border ${errors.email ? 'border-red-500' : 'border-gray-300'} text-gray-900 rounded-lg block w-full p-2 dark:placeholder-gray-400 dark:text-white`}
                                placeholder="Enter your email"
                            />
                            {errors.email && <span className="text-red-500 text-xs">{errors.email}</span>}
                        </div>
                        <div className="form-control mb-4">
                            <label htmlFor="password" className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                            <input
                                type={showPassword ? 'text' : 'password'}
                                name="password"
                                id="password"
                                value={values.password}
                                onChange={handleChange}
                                className={`input input-bordered bg-gray-50 border ${errors.password ? 'border-red-500' : 'border-gray-300'} text-gray-900 rounded-lg block w-full p-2 dark:placeholder-gray-400 dark:text-white`}
                                placeholder="••••••••"
                            />
                            {errors.password && <span className="text-red-500 text-xs">{errors.password}</span>}
                        </div>
                        <div className="form-control mb-4">
                            <label className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">Confirm Password</label>
                            <input
                                type={showPassword ? 'text' : 'password'}
                                name="confirmPassword"
                                value={values.confirmPassword}
                                onChange={handleChange}
                                className={`input input-bordered bg-gray-50 border ${errors.confirmPassword ? 'border-red-500' : 'border-gray-300'} text-gray-900 rounded-lg block w-full p-2 dark:placeholder-gray-400 dark:text-white`}
                                placeholder="Confirm Password"
                            />
                            {errors.confirmPassword && <span className="text-red-500 text-xs">{errors.confirmPassword}</span>}
                        </div>
                        <div className="form-control mb-4">
                            <label htmlFor="mobile" className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">Mobile Number</label>
                            <input
                                type="text"
                                name="mobile"
                                id="mobile"
                                value={values.mobile}
                                onChange={handleChange}
                                placeholder="XXXXXXXXXX"
                                className={`input input-bordered bg-gray-50 border ${errors.mobile ? 'border-red-500' : 'border-gray-300'} text-gray-900 rounded-lg block w-full p-2 dark:placeholder-gray-400 dark:text-white`}
                            />
                            {errors.mobile && <span className="text-red-500 text-xs">{errors.mobile}</span>}
                        </div>
                        <div className="my-4">
                            <input
                                type="checkbox"
                                id="showPassword"
                                checked={showPassword}
                                onChange={handleCheckboxChange}
                                className="mr-2 leading-tight"
                            />
                            <label htmlFor="showPassword" className="text-sm font-medium text-gray-900 dark:text-gray-300">
                                Show password
                            </label>
                        </div>
                        <button
                            type="submit"
                            className="btn btn-primary w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-blue-500 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                        >
                            Sign up
                        </button>
                        <div className="flex items-center justify-between mt-4">
                            <Link to="/login" className="text-sm font-medium text-blue-600 hover:underline dark:text-blue-500">
                                Already have an account? Log in
                            </Link>
                        </div>
                    </form>
                )}
            </Formik>
        </div>
    );
}

export default ModeratorSignUpPage;
