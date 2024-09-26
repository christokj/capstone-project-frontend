import React, { useEffect } from "react";
import { NavLink } from "react-router-dom";
import { DarkMode } from "./ui/DarkMode";
import ProductSearch from "./Product/ProductSearch";
import { useDispatch } from "react-redux";
import { logout } from "../redux/features/authSlice";

export const Header = () => {


    const dispatch = useDispatch();
    useEffect(() => {

        dispatch(logout());
    }, []);


    return (
        <div className="fixed top-0 left-0 right-0 w-full shadow-sm z-50 backdrop-blur-sm">
            <div className=" container ps-2 py-5 flex flex-nowrap z-10 items-center justify-between ">
                <NavLink to={"/"} className="flex items-center">
                    <img className="object-cover h-14 w-14 mx-4 cursor-pointer" src="https://res.cloudinary.com/dfm6raue1/image/upload/fl_preserve_transparency/v1724577774/Services_ECommerce_v2-01_xjoraa.jpg?_s=public-apps" alt="" />
                    <h3 className="text-2xl font-bold text-dark-grey-900 hidden sm:block">TrendiQ</h3>
                </NavLink>
                <div className="items-center hidden md:block ms-12">
                    <NavLink className="text-lg hover:shadow-lg hover:bg-gray-100 hover:rounded-full duration-150 py-2 px-4 hover:py-2 hover:px-4 font-semibold text-dark-grey-900 hover:text-dark-grey-900" to={"/"}>Home</NavLink>
                    <NavLink className="text-lg hover:shadow-lg hover:bg-gray-100 hover:rounded-full duration-150 py-2 px-4 hover:py-2 hover:px-4 font-semibold text-dark-grey-900 hover:text-dark-grey-900" to={"/products"}>Products</NavLink>
                    <NavLink className="text-lg hover:shadow-lg hover:bg-gray-100 hover:rounded-full duration-150 py-2 px-4 hover:py-2 hover:px-4 font-semibold text-dark-grey-900 hover:text-dark-grey-900" to={"/about"}>About</NavLink>
                    <NavLink className="text-lg hover:shadow-lg hover:bg-gray-100 hover:rounded-full duration-150 py-2 px-4 hover:py-2 hover:px-4 font-semibold text-dark-grey-900 hover:text-dark-grey-900" to={'/contact'}>Contact</NavLink>
                </div>
                <div className="items-center gap-2 flex -me-10">
                    <>
                        <ProductSearch />
                    </>
                    <NavLink to={"/moderator-login"} type="button" className="hidden text-nowrap md:block mt-2 text-dark-grey-900  bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">
                        Become a Seller
                    </NavLink>
                    <DarkMode />
                    <NavLink to={"/login"} type="button" className="hidden sm:block text-nowrap mt-2 text-dark-grey-900  bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">
                        Login
                    </NavLink>
                     <div className="navbar-start me-5 sm:hidden block ">
                        <div className="dropdown">
                            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-5 w-5"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor">
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M4 6h16M4 12h16M4 18h7" />
                                </svg>
                            </div>
                            <ul
                                tabIndex={0}
                                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-24 p-2 shadow">
                                <li><NavLink to={'/'}><a>Home</a></NavLink></li>
                                <li><NavLink to={'/products'}><a>Products</a></NavLink></li>
                                <li><NavLink to={'/about'}><a>About</a></NavLink></li>
                                <li><NavLink to={'/contact'}><a>Contact</a></NavLink></li>
                                <li><NavLink to={'/login'}><a>Login</a></NavLink></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
