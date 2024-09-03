import React from "react";
import { NavLink } from "react-router-dom";
import { DarkMode } from "../ui/DarkMode";
import UserIcon from "./UserIcon";
import ProductSearch from "../Product/ProductSearch";
import { useSelector } from "react-redux";
import CartIcon from "./CartIcon";

export const UserHeader = () => {
   
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

    return (
        <>
            <div className=" container ps-2 py-5 flex flex-nowrap z-10 items-center justify-between ">
                <NavLink to={isAuthenticated ? '/user' : '/'} className="flex items-center">
                    <img className="object-cover h-14 w-14 mx-4 cursor-pointer" src="https://res.cloudinary.com/dfm6raue1/image/upload/fl_preserve_transparency/v1724577774/Services_ECommerce_v2-01_xjoraa.jpg?_s=public-apps" alt="" />
                    <a className="text-2xl font-bold text-dark-grey-900">TrendiQ</a>
                </NavLink>
                <div className="items-center hidden md:block ms-12">
                    <NavLink className="text-lg hover:shadow-lg hover:bg-gray-100 hover:rounded-full duration-150 py-2 px-4 hover:py-2 hover:px-4 font-semibold text-dark-grey-900 hover:text-dark-grey-900" to={isAuthenticated ? '/user' : '/'}>Home</NavLink>
                    <NavLink className="text-lg hover:shadow-lg hover:bg-gray-100 hover:rounded-full duration-150 py-2 px-4 hover:py-2 hover:px-4 font-semibold text-dark-grey-900 hover:text-dark-grey-900" to={isAuthenticated ? '/user/products' : '/products'}>Products</NavLink>
                    <NavLink className="text-lg hover:shadow-lg hover:bg-gray-100 hover:rounded-full duration-150 py-2 px-4 hover:py-2 hover:px-4 font-semibold text-dark-grey-900 hover:text-dark-grey-900" to={isAuthenticated ? '/user/about' : '/about'}>About</NavLink>
                    <NavLink className="text-lg hover:shadow-lg hover:bg-gray-100 hover:rounded-full duration-150 py-2 px-4 hover:py-2 hover:px-4 font-semibold text-dark-grey-900 hover:text-dark-grey-900" to={isAuthenticated ? '/user/contact' : '/contact'}>Contact</NavLink>
                </div>
                <div className="items-center gap-2 flex -me-10">
                    <>
                        <ProductSearch />
                    </>
                    <DarkMode />
                    <NavLink to={"/user/cart"}>
                        <CartIcon />
                    </NavLink>
                    <UserIcon />
                </div>
            </div>
        </>
    );
};
