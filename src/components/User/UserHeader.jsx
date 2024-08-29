import React from "react";
import { Link, NavLink } from "react-router-dom";
import { DarkMode } from "../ui/DarkMode";
import Cart from "./Cart";
import UserIcon from "./UserIcon";
import ProductSearch from "../Product/ProductSearch";

export const UserHeader = () => {
   

    return (
        <>
            <div className=" container ps-2 py-5 flex flex-nowrap z-10 items-center justify-between ">
                <NavLink to={"/"} className="flex items-center">
                    <img className="object-cover h-14 w-14 mx-4 cursor-pointer" src="https://res.cloudinary.com/dfm6raue1/image/upload/fl_preserve_transparency/v1724577774/Services_ECommerce_v2-01_xjoraa.jpg?_s=public-apps" alt="" />
                    <a className="text-2xl font-bold text-dark-grey-900">TrendiQ</a>
                </NavLink>
                <div className="items-center hidden md:block ms-12">
                    <NavLink className="text-lg hover:shadow-lg hover:bg-gray-100 hover:rounded-full duration-150 py-2 px-4 hover:py-2 hover:px-4 font-semibold text-dark-grey-900 hover:text-dark-grey-900" to={"/"}>Home</NavLink>
                    <Link className="text-lg hover:shadow-lg hover:bg-gray-100 hover:rounded-full duration-150 py-2 px-4 hover:py-2 hover:px-4 font-semibold text-dark-grey-900 hover:text-dark-grey-900" to={"/products"}>Products</Link>
                    <NavLink className="text-lg hover:shadow-lg hover:bg-gray-100 hover:rounded-full duration-150 py-2 px-4 hover:py-2 hover:px-4 font-semibold text-dark-grey-900 hover:text-dark-grey-900" to={"/about"}>About</NavLink>
                    <NavLink className="text-lg hover:shadow-lg hover:bg-gray-100 hover:rounded-full duration-150 py-2 px-4 hover:py-2 hover:px-4 font-semibold text-dark-grey-900 hover:text-dark-grey-900" to={'/contact'}>Contact</NavLink>
                </div>
                <div className="items-center gap-2 flex -me-10">
                    <>
                        <ProductSearch />
                    </>
                    <button type="button" className="hidden text-nowrap md:block mt-2 text-dark-grey-900  bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">
                        Become a Seller
                    </button>
                    <DarkMode />
                    <NavLink to={"/user/cart"}>
                        <Cart />
                    </NavLink>
                    <UserIcon />
                </div>
            </div>
        </>
    );
};
