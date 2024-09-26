import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import * as formik from 'formik';
import * as yup from 'yup';
import { axiosInstance } from '../../config/axiosInstance';
import toast from 'react-hot-toast';

function SignupPage() {

    const [showPassword, setShowPassword] = useState(false);

    const navigate = useNavigate();
    const { Formik } = formik;

    // Validation schema using Yup
    const schema = yup.object().shape({
        fullname: yup.string()
            .required()
            .min(3)
            .test(
                'alert-fullname',
                "Fullname should have a minimum of 3 characters!!",
                function (value) {
                    if (this.options.context.triggerAlert) {
                        if (!value) {
                            alert("Please enter Fullname");
                            return false;
                        } else if (value.length < 3) {
                            alert("Fullname should have a minimum of 3 characters!!");
                            return false;
                        }
                    }
                    return true;
                }
            ),
        email: yup.string()
            .required()
            .matches(/\S+@\S+\.\S+/, "Please enter a valid email")
            .test(
                'alert-email',
                "Please enter a valid email",
                function (value) {
                    if (this.options.context.triggerAlert) {
                        if (!value) {
                            alert("Please enter email");
                            return false;
                        } else if (!/\S+@\S+\.\S+/.test(value)) {
                            alert("Please enter a valid email");
                            return false;
                        }
                    }
                    return true;
                }
            ),
        password: yup.string()
            .required()
            .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>])[a-zA-Z\d!@#$%^&*(),.?":{}|<>]{8,}$/, "Password should contain a minimum of 8 characters, a small letter, and a capital letter")
            .test(
                'alert-password',
                "Password should contain a minimum of 8 characters, a small letter, and a capital letter",
                function (value) {
                    if (this.options.context.triggerAlert) {
                        if (!value) {
                            alert("Please enter password");
                            return false;
                        }
                    }
                    return true;
                }
            ),
        confirmPassword: yup.string()
            .required()
            .oneOf([yup.ref('password'), null], "Passwords must match")
            .test(
                'alert-confirmPassword',
                "Passwords must match",
                function (value) {
                    if (this.options.context.triggerAlert) {
                        if (!value) {
                            alert("Please confirm your password");
                            return false;
                        } else if (value !== this.parent.password) {
                            alert("Passwords must match");
                            return false;
                        }
                    }
                    return true;
                }
            ),
        mobile: yup.string()
            .required()
            .matches(/^[0-9]{10}$/, "Mobile number must be 10 digits")
            .test(
                'alert-mobile',
                "Mobile number must be 10 digits",
                function (value) {
                    if (this.options.context.triggerAlert) {
                        if (!value) {
                            alert("Please enter mobile number");
                            return false;
                        } else if (!/^[0-9]{10}$/.test(value)) {
                            alert("Mobile number must be 10 digits");
                            return false;
                        }
                    }
                    return true;
                }
            ),
    });

    const handleSignupSubmit = async (values) => {
        const { confirmPassword, ...data } = values;
        try {
            const response = await axiosInstance({
                url: "/user/create",
                method: "POST",
                data: data,
            });
            if (response) {

                const email = response.data.email
                const res = await axiosInstance({
                    url: '/user/otp-sender',
                    method: "POST",
                    data: { email },
                });
                toast.success("An OTP has been sent to your registered email. Please check your inbox.");
                navigate(`/verify-otp?email=${email}`);
            }
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
        <div className="flex flex-col items-center justify-center px-1 mt-28 sm:px-10 my-10 mx-auto w-full bg-gray-100 rounded-lg shadow dark:border max-w-md dark:bg-gray-800 dark:border-gray-700">
            <div className="">
                <h1 className="my-4 font-bold text-center leading-tight tracking-tight text-gray-900 text-2xl dark:text-white">
                    Create an account
                </h1>
                <Formik
                    validationSchema={schema}
                    onSubmit={(values, actions) => {
                        // Set context to trigger alert on form submit
                        schema.validate(values, { context: { triggerAlert: true } }).then(() => {
                            handleSignupSubmit(values);
                        }).catch((error) => {
                            actions.setErrors(error.inner.reduce((acc, err) => {
                                acc[err.path] = err.message;
                                return acc;
                            }, {}));
                        });
                    }}
                    initialValues={{
                        fullname: '',
                        email: '',
                        password: '',
                        confirmPassword: '',
                        address: {
                            street: '',
                            city: '',
                            state: '',
                            zipCode: '',
                            country: '',
                        },
                        mobile: '',
                    }}
                >
                    {({ handleSubmit, handleChange, values, errors }) => (
                        <form noValidate onSubmit={handleSubmit} className="w-full">
                            <div className='grid sm:grid-cols-2 gap-2 w-80 sm:w-full'>
                                <div className="form-control">
                                    <label className='block mb-1 text-sm font-medium text-gray-900 dark:text-white'>Fullname</label>
                                    <input
                                        type="text"
                                        name="fullname"
                                        placeholder='Fullname'
                                        value={values.fullname}
                                        onChange={handleChange}
                                        className={`input input-bordered bg-gray-50 border ${errors.fullname ? 'border-red-500' : 'border-gray-300'} text-gray-900 rounded-lg block w-full p-2 dark:placeholder-gray-400 dark:text-white`}
                                    />
                                    {errors.fullname && <span className="text-red-500 text-xs">{errors.fullname}</span>}
                                </div>
                                <div className="form-control">
                                    <label htmlFor="email" className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">
                                        Your email
                                    </label>
                                    <input
                                        type="email"
                                        name="email"
                                        id="email"
                                        value={values.email}
                                        onChange={handleChange}
                                        className={`input input-bordered bg-gray-50 border ${errors.email ? 'border-red-500' : 'border-gray-300'} text-gray-900 rounded-lg block w-full p-2 dark:placeholder-gray-400 dark:text-white`}
                                        placeholder="Enter your gmail"
                                        required=""
                                    />
                                    {errors.email && <span className="text-red-500 text-xs">{errors.email}</span>}
                                </div>
                                <div className="form-control">
                                    <label htmlFor="password" className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">
                                        Password
                                    </label>
                                    <input
                                        type={showPassword ? 'text' : 'password'}
                                        name="password"
                                        id="password"
                                        placeholder="••••••••"
                                        value={values.password}
                                        onChange={handleChange}
                                        className={`input input-bordered bg-gray-50 border ${errors.password ? 'border-red-500' : 'border-gray-300'} text-gray-900 rounded-lg block w-full p-2 dark:placeholder-gray-400 dark:text-white`}
                                        required=""
                                    />
                                    {errors.password && <span className="text-red-500 text-xs">{errors.password}</span>}
                                </div>
                                <div className="form-control">
                                    <label className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">Confirm Password</label>
                                    <input
                                        type={showPassword ? 'text' : 'password'}
                                        placeholder="Confirm Password"
                                        name="confirmPassword"
                                        value={values.confirmPassword}
                                        onChange={handleChange}
                                        className={`input input-bordered bg-gray-50 border ${errors.confirmPassword ? 'border-red-500' : 'border-gray-300'} text-gray-900 rounded-lg block w-full p-2 dark:placeholder-gray-400 dark:text-white`}
                                    />
                                    {errors.confirmPassword && <span className="text-red-500 text-xs">{errors.confirmPassword}</span>}
                                </div>
                                <div className="form-control">
                                    <label className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">Country</label>
                                    <input
                                        type="text"
                                        placeholder="Country"
                                        name="address.country"
                                        value={values.address.country}
                                        onChange={handleChange}
                                        className="input input-bordered bg-gray-50 border border-gray-300 text-gray-900 rounded-lg block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    />
                                </div>
                                <div className="form-control">
                                    <label className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">State</label>
                                    <input
                                        type="text"
                                        placeholder="State"
                                        name="address.state"
                                        value={values.address.state}
                                        onChange={handleChange}
                                        className="input input-bordered bg-gray-50 border border-gray-300 text-gray-900 rounded-lg block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    />
                                </div>
                                <div className="form-control">
                                    <label className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">City</label>
                                    <input
                                        type="text"
                                        placeholder="City"
                                        name="address.city"
                                        value={values.address.city}
                                        onChange={handleChange}
                                        className="input input-bordered bg-gray-50 border border-gray-300 text-gray-900 rounded-lg block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    />
                                </div>
                                <div className="form-control">
                                    <label className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">Street</label>
                                    <input
                                        type="text"
                                        placeholder="Street"
                                        name="address.street"
                                        value={values.address.street}
                                        onChange={handleChange}
                                        className="input input-bordered bg-gray-50 border border-gray-300 text-gray-900 rounded-lg block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    />
                                </div>
                                <div className="form-control">
                                    <label className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">Zip Code</label>
                                    <input
                                        type="text"
                                        placeholder="Zip Code"
                                        name="address.zipCode"
                                        value={values.address.zipCode}
                                        onChange={handleChange}
                                        className="input input-bordered bg-gray-50 border border-gray-300 text-gray-900 rounded-lg block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    />
                                </div>
                                <div className="form-control">
                                    <label htmlFor="mobile" className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">
                                        Mobile Number
                                    </label>
                                    <input
                                        type="text"
                                        name="mobile"
                                        id="mobile"
                                        value={values.mobile}
                                        onChange={handleChange}
                                        placeholder="XXXXXXXXXX"
                                        className={`input input-bordered bg-gray-50 border ${errors.mobile ? 'border-red-500' : 'border-gray-300'} text-gray-900 rounded-lg block w-full p-2 dark:placeholder-gray-400 dark:text-white`}
                                        required=""
                                    />
                                    {errors.mobile && <span className="text-red-500 text-xs">{errors.mobile}</span>}
                                </div>
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
        </div>
    );
}

export default SignupPage;
