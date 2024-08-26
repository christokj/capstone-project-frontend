import React from 'react'
import ShowCategory from '../../components/Product/ShowCategory';

function HomePage() {

    return (
        <>
            <div className='p-16 grid w-full grid-cols-1 my-auto mt-3 mb-8 md:grid-cols-2 xl:gap-14 md:gap-5'>
                <div className='flex flex-col justify-center col-span-1 text-center md:text-start'>
                    <h1 className="mb-8 text-4xl font-extrabold leading-tight lg:text-6xl text-dark-grey-900">Welcome to TrendiQ</h1>
                    <button className="btn w-36 md:mx-0 mx-auto md:btn-lg bg-main text-white text-sm font-medium  hover:text-dark-grey-900 transition duration-300 rounded-2xl">Shop Now</button>
                </div>
                <div className=" ">
                    <img className="w-auto hover:scale-105 transition duration-300" src="https://res.cloudinary.com/dfm6raue1/image/upload/v1724583553/flat-illustration-ecommerce-website-design-web-developers-design-online-store_906385-44729_w0hu3s-removebg-preview_exlrbb.png" alt="" />
                </div>
            </div>
            <>
                <ShowCategory />
            </>

        </>
    );
}

export default HomePage;