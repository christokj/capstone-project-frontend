import React from 'react';
import ShowCategory from '../../components/Product/ShowCategory';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import OurFeatures from '../../components/ui/OurFeatures';

function HomePage() {

    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

    return (
        <>
            <div className='md:p-16 p-5 grid  w-full grid-cols-1 my-auto mt-3 mb-8 md:grid-cols-2 xl:gap-10 md:gap-5'>
                <div className='flex flex-col justify-center col-span-1 text-center md:text-start'>
                    <div className="w-max mx-auto">
                        <h1 className="mb-8 font-extrabold leading-tight bg-clip-text text-transparent bg-gradient-to-r from-gray-800 to-gray-500 text-dark-grey-900 animate-typing overflow-hidden whitespace-nowrap border-r-4 border-r-white pr-8 text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-black">
                            Welcome to TrendiQ
                        </h1>
                    </div>
                    <Link to={`${isAuthenticated ? "/user/products" : "/products"}`} className="btn w-36 md:mx-0 mx-auto md:btn-lg bg-main text-white text-sm font-medium  hover:text-dark-grey-900 transition duration-300 rounded-2xl">Shop Now</Link>
                </div>
                <>
                    <img className="w-max hover:scale-105 transition duration-300" src="https://res.cloudinary.com/dfm6raue1/image/upload/v1724583553/flat-illustration-ecommerce-website-design-web-developers-design-online-store_906385-44729_w0hu3s-removebg-preview_exlrbb.png" alt="" />
                </>
            </div>
            <>
            <div className='text-center mb-10'>
                    <h2 className="text-base text-main font-semibold tracking-wide uppercase">Check Now!</h2>
                    <p className='my-2 text-3xl leading-10 font-extrabold tracking-tight text-dark-grey-900 sm:text-4xl'>
                        Our Featured Products
                    </p>
                    <p className="mt-4 text-xl text-dark-grey-500 lg:mx-auto">
                        Here are some of the features and services we provide.
                    </p>
                </div>
                <ShowCategory />
            </>
            <OurFeatures />
        </>
    );
}

export default HomePage;