import React from 'react'
import ShowCategory from '../../components/Product/ShowCategory';
import { Link } from 'react-router-dom';

function HomePage() {

    return (
        <>
            <div className='md:p-16 p-5 grid  w-full grid-cols-1 my-auto mt-3 mb-8 md:grid-cols-2 xl:gap-10 md:gap-5'>
                <div className='flex flex-col justify-center col-span-1 text-center md:text-start'>
                        <div class="w-max">
                            <h1
                                className="mb-8 md:font-extrabold font-bold leading-tight bg-clip-text text-transparent bg-gradient-to-r from-gray-800 to-gray-500 lg:text-6xl text-dark-grey-900 md:animate-typing overflow-hidden md:whitespace-nowrap md:border-r-4 border-r-white md:pr-8 text-5xl text-black">
                                Welcome to TrendiQ
                            </h1>
                        </div>
                            <button className="btn w-36 md:mx-0 mx-auto md:btn-lg bg-main text-white text-sm font-medium  hover:text-dark-grey-900 transition duration-300 rounded-2xl">Shop Now</button>
                </div>
                <>
                    <img className="w-max hover:scale-105 transition duration-300" src="https://res.cloudinary.com/dfm6raue1/image/upload/v1724583553/flat-illustration-ecommerce-website-design-web-developers-design-online-store_906385-44729_w0hu3s-removebg-preview_exlrbb.png" alt="" />
                </>
            </div>
            <>
                <ShowCategory />
            </>
        </>
    );
}

export default HomePage;