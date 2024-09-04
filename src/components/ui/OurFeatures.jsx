import React from 'react';
import { TbTruckDelivery } from "react-icons/tb";
import { MdSecurity } from "react-icons/md";
import { SiAdguard } from "react-icons/si";
import { SiFsecure } from "react-icons/si";

function OurFeatures() {
    return (
        <div className='mt-10 flex flex-col md:flex-row justify-center gap-4 mb-10'>
            <div className='w-full md:w-1/3 lg:w-[30%]'>
                <div className="shadow-md mt-16 bg-gray-100 rounded-lg p-10">
                    <div className='flex gap-3'>
                        <TbTruckDelivery className='text-main text-3xl' /> <h3 className="text-xl font-semibold text-gray-900">Fast Delivery</h3>
                    </div>
                    <p className="mt-2 text-base text-gray-500">Get your products delivered to you in no time.</p>
                </div>
            </div>
            <div className='w-full md:w-1/3 lg:w-[30%] grid gap-4'>
                <div className='shadow-md bg-gray-100 rounded-lg p-10'>
                    <div className='flex gap-3'>
                        <MdSecurity className='text-main text-3xl' /> <h3 className="text-xl font-semibold text-gray-900">Non-Contact Shipping</h3>
                    </div>
                    <p className="mt-2 text-base text-gray-500">Receive your items with safety protocols.</p>
                </div>
                <div className='bg-gray-100 shadow-md rounded-lg p-10'>
                    <div className='flex gap-3'>
                        <SiAdguard className='text-main text-3xl' /> <h3 className="text-xl font-semibold text-gray-900">Money Back Guarantee</h3>
                    </div>
                    <p className="mt-2 text-base text-gray-500">Not satisfied? Get your money back easily.</p>
                </div>
            </div>
            <div className='w-full md:w-1/3 lg:w-[30%]'>
                <div className="mt-16 shadow-md bg-gray-100 rounded-lg p-10">
                    <div className='flex gap-3'>
                        <SiFsecure className='text-main text-3xl' /> <h3 className="text-xl font-semibold text-gray-900">Super Secure Payment System</h3>
                    </div>
                    <p className="mt-2 text-base text-gray-500">Your payments are secure with our system.</p>
                </div>
            </div>
        </div>
    );
}

export default OurFeatures;