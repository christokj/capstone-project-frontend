import React, { useEffect, useState } from 'react';
import { axiosInstance } from '../../config/axiosInstance';
import toast from 'react-hot-toast';
import { useLocation, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProductCard from './ProductCard';
import Skeleton from '../ui/Skeleton';

function ShowProducts() {

    const [data, setData] = useState([]);
    const [isChecked, setIsChecked] = useState(false);

    const location = useLocation();
    const { id, searchValue } = location.state || {};

    const navigate = useNavigate();

    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
    useEffect(() => {
        // Function to fetch all products
        const fetchAllProducts = async () => {
            try {
                const response = await axiosInstance({
                    url: "/user/show-products",
                    method: "GET",
                });
                setData(response.data.data);
            } catch (error) {
                toast.error("Failed fetching products");
            }
        };

        // Function to fetch products by category
        const fetchProductsByCategory = async (categoryId) => {
            try {
                const response = await axiosInstance({
                    url: `/user/products-by-category/${categoryId}`,
                    method: "GET",
                });
                setData(response.data.data);
            } catch (error) {
                toast.error("Failed fetching category");
            }
        };

        // Function to search products by value
        const searchProducts = async (searchTerm) => {
            try {
                const response = await axiosInstance({
                    url: `/user/search-products/${searchTerm}`,
                    method: "GET",
                });
                setData(response.data.data);
                setIsChecked(response.data.success)
            } catch (error) {
                toast.error("Failed fetching product");
            }
        };

        // Decide which function to call based on the state values
        if (id) {
            fetchProductsByCategory(id);
        } else if (searchValue) {
            searchProducts(searchValue);
        } else {
            fetchAllProducts();
        }
    }, [id, searchValue]);

    const handleClick = async (id) => {
        if (isAuthenticated) {
            try {
                const response = await axiosInstance({
                    url: '/user/add-cart',
                    method: "POST",
                    data: { productId: id, quantity: 1 },
                    withCredentials: true
                });
                setData(response.data.data);
                toast.success("Product added to cart");
                navigate('/user/cart', { replace: true });
            } catch (error) {
                toast.error("Product not added");
            }
        } else {
            navigate("/login")
            toast.error("Please login to add products to cart");
        }
    }


    if (!data.length && searchValue) {
        if (!isChecked) {
            return (
                <div className="mt-24 flex-wrap justify-center gap-4 grid md:grid-cols-4 2xl:grid-cols-6 grid-cols-2">
                         <Skeleton/>
            </div>
                );
          }

        return <div className='mt-28'>Please try these words : Mens, t-shirts, slim fit, sandisk, Backpack, Silver, Gold etc...</div>;

    }

    if (!data.length) {

        return (
            <div className="mt-28 flex-wrap justify-center gap-4 grid md:grid-cols-4 2xl:grid-cols-6 grid-cols-2">
          <Skeleton/>
        </div>
            )

    } else {

    return (
        <div className='card shadow-xl grid md:grid-cols-4 2xl:grid-cols-6 grid-cols-2 cursor-pointer mt-32'>
            {data.map((item) => (
                <ProductCard
                    key={item._id}
                    item={item}
                    handleClick={handleClick}
                    isAuthenticated={isAuthenticated}
                />
            ))}
        </div>
    );
}
}
export default ShowProducts;
