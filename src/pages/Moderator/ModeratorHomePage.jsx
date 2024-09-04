import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

const ModeratorHomePage = () => {

    const navigate = useNavigate();

    const handleCategory = () => {

        navigate('/moderator/show-category', {
            state: { role: 'Moderator' },
        });
    };
    return (
        <section className="min-h-screen bg-gray-100 dark:bg-gray-900 flex flex-col items-center justify-center">
            <div className="w-full max-w-4xl bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                    Welcome, Moderator
                </h1>
                <p className="text-gray-700 dark:text-gray-300 mb-6">
                    You can add products, manage products, and perform other moderation tasks from this dashboard.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <NavLink
                        to="/moderator/add-product"
                        className="bg-blue-500 text-white font-semibold py-3 px-6 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-700"
                    >
                        Add new products
                    </NavLink>
                    <NavLink
                        to="/moderator/add-category"
                        className="bg-green-500 text-white font-semibold py-3 px-6 rounded-lg hover:bg-green-600 focus:outline-none focus:ring-4 focus:ring-green-300 dark:focus:ring-green-700"
                    >
                        Add category
                    </NavLink>
                    <NavLink
                        to="/moderator/show-products"
                        className="bg-yellow-500 text-white font-semibold py-3 px-6 rounded-lg hover:bg-yellow-600 focus:outline-none focus:ring-4 focus:ring-yellow-300 dark:focus:ring-yellow-700"
                    >
                        Manage Products
                    </NavLink>
                    <div
                        onClick={handleCategory}
                        className="bg-red-500 cursor-pointer text-white font-semibold py-3 px-6 rounded-lg hover:bg-red-600 focus:outline-none focus:ring-4 focus:ring-red-300 dark:focus:ring-red-700"
                    >
                        Manage Category
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ModeratorHomePage;
