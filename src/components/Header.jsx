import React from "react";
import { Link } from "react-router-dom";
import { DarkMode } from "./ui/DarkMode";
import Cart from "./User/Cart";
import UserIcon from "./User/UserIcon";

export const Header = () => {
    return (
        <>
            <div className="navbar flex justify-between bg-base-200">
                <div className="font-serif ">
                    <img className="object-cover h-14 w-14 mx-4 cursor-pointer" src="https://res.cloudinary.com/dfm6raue1/image/upload/fl_preserve_transparency/v1724577774/Services_ECommerce_v2-01_xjoraa.jpg?_s=public-apps" alt="" />
                    <a className="text-2xl font-bold text-dark-grey-900">TrendiQ</a>
                </div>
                <div className="form-control">
                    <input type="text" placeholder="Search for products" className="input bg-slate-50 input-bordered w-24 md:w-96 md:h-10" />
                </div>
                <div className="gap-2">
                    <div className="navbar-center hidden lg:flex my-2">
                        <button type="button" className="text-dark-grey-900  bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">
                            Become a Seller
                        </button>
                    </div>
                    <DarkMode />
                    <Cart />
                    <UserIcon />
                </div>
            </div>

        </>
    );
};
