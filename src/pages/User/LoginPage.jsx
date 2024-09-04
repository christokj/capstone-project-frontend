import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import * as formik from 'formik';
import * as yup from 'yup';
import { axiosInstance } from '../../config/axiosInstance';
import toast from 'react-hot-toast';
import { loginSuccess } from '../../redux/features/authSlice';
import { useDispatch } from 'react-redux';

function LoginPage() {
    const [showPassword, setShowPassword] = useState(false);
    const { Formik } = formik;

    const dispatch = useDispatch();
    const navigate = useNavigate();
    // Validation schema using Yup
    const schema = yup.object().shape({
        email: yup.string()
            .required("Please enter your email")
            .matches(/\S+@\S+\.\S+/, "Please enter a valid email"),
        password: yup.string()
            .required("Please enter your password")
            .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>])[a-zA-Z\d!@#$%^&*(),.?":{}|<>]{8,}$/, "Password should contain a minimum of 8 characters, a small letter, and a capital letter"),
        role: yup.string()
            .required("Please select your role")
    });

    const handleLoginSubmit = async (values) => {
        try {
            const response = await axiosInstance({
                url: `/${values.role}/login`,
                method: "POST",
                data: values,
            });

            let token = response?.data?.token

            localStorage.setItem('token', token);

            dispatch(loginSuccess({ user: values.role, token }));
            navigate(`/${values.role}`, { replace: true });
        } catch (error) {
            if (error.response && error.response.data && error.response.data.error) {
                toast.error(error.response.data.error);
            } else if (error.response && error.response.status === 400) {
                if (error.response.data.message === 'Your account is inactive') {
                    const email = error.response.data.email
                    try {
                        const res = await axiosInstance({
                            url: '/user/otp-sender',
                            method: "POST",
                            data: { email },
                        });
                        toast.success("Please verify your account, An OTP has been sent to your registered email.");
                        navigate('/verify-otp', { replace: true });
                    } catch (error) {
                        if (error.response && error.response.data && error.response.data.error) {
                            toast.error(error.response.data.error);
                        } else if (error.response && error.response.status === 400) {
                            toast.error(error.response.data.message || 'Login failed');
                        } else {
                            toast.error('An unexpected error occurred. Please use another password and email');
                        }
                    }
                }
                toast.error(error.response.data.message || 'Login failed');
            } else {
                toast.error('An unexpected error occurred. Please use another password and email');
            }
        }
    };

    const handleCheckboxChange = () => {
        setShowPassword(!showPassword);
    };

    return (
        <section className="dark:bg-gray-900">
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                <div className="w-full bg-gray-100 rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <h1 className="text-xl font-bold text-center leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                            Login to your account
                        </h1>
                        <Formik
                            validationSchema={schema}
                            onSubmit={(values, actions) => {
                                handleLoginSubmit(values);
                            }}
                            initialValues={{
                                email: '',
                                password: '',
                            }}
                        >
                            {({ handleSubmit, handleChange, values, errors }) => (
                                <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
                                    <div>
                                        <label htmlFor="role" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                            Select Role
                                        </label>
                                        <select
                                            name="role"
                                            id="role"
                                            value={values.role}
                                            onChange={handleChange}
                                            className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        >
                                            <option value="" disabled selected>Select a role</option>
                                            <option value="user">User</option>
                                            <option value="moderator">Moderator</option>
                                            <option value="admin">Admin</option>
                                        </select>
                                        {errors.role && <span className="text-red-500 text-xs">{errors.role}</span>}
                                    </div>
                                    <div>
                                        <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                            Your email
                                        </label>
                                        <input
                                            type="email"
                                            name="email"
                                            id="email"
                                            value={values.email}
                                            onChange={handleChange}
                                            placeholder="Enter your gmail"
                                            className={`bg-gray-50 border ${errors.email ? 'border-red-500' : 'border-gray-300'} text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}
                                        />
                                        {errors.email && <span className="text-red-500 text-xs">{errors.email}</span>}
                                    </div>
                                    <div>
                                        <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                            Password
                                        </label>
                                        <input
                                            type={showPassword ? 'text' : 'password'}
                                            name="password"
                                            id="password"
                                            value={values.password}
                                            onChange={handleChange}
                                            placeholder="••••••••"
                                            className={`bg-gray-50 border ${errors.password ? 'border-red-500' : 'border-gray-300'} text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}
                                        />
                                        {errors.password && <span className="text-red-500 text-xs">{errors.password}</span>}
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-start">
                                            <div className="flex items-center h-5">
                                                <input
                                                    id="showPassword"
                                                    aria-describedby="showPassword"
                                                    type="checkbox"
                                                    checked={showPassword}
                                                    onChange={handleCheckboxChange}
                                                    className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                                                />
                                            </div>
                                            <div className="ml-3 text-sm">
                                                <label htmlFor="showPassword" className="text-gray-500 dark:text-gray-300">
                                                    Show Password
                                                </label>
                                            </div>
                                        </div>
                                        <a href="#" className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500">
                                            Forgot password?
                                        </a>
                                    </div>
                                    <button
                                        type="submit"
                                        className="w-full text-black bg-main hover:bg-main-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                                    >
                                        Login
                                    </button>
                                    <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                                        Don’t have an account yet?{' '}
                                        <Link to="/signup" className="font-medium text-black hover:underline dark:text-primary-500">
                                            Sign up
                                        </Link>
                                    </p>
                                </form>
                            )}
                        </Formik>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default LoginPage;
