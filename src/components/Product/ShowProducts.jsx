import React, { useEffect, useState } from 'react';
import { axiosInstance } from '../../config/axiosInstance';
import toast from 'react-hot-toast';
import { useLocation } from 'react-router-dom';

function ShowProducts() {
    const [data, setData] = useState([]);
    const location = useLocation();
    const { id, searchValue } = location.state || {};  // Destructure state from location

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
                console.log(error);
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
                console.log(error);
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
            } catch (error) {
                console.log(error);
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

        console.log(id);
        try {
            const response = await axiosInstance({
                url: `/user/add-cart`,
                method: "POST",
                data: { productId: id, quantity: 1 }
            });
            setData(response.data.data);
            toast.success("Product added to cart");
        } catch (error) {
            console.log(error);
            toast.error("Product not added");
        }
    }

    return (
        <div className='card bg-base-100 shadow-xl grid md:grid-cols-4 2xl:grid-cols-6 grid-cols-2 cursor-pointer mt-10'>
            {data.map((item) => (
                <div key={item._id} className="md:w-64  md:mx-auto mx-4">
                    <figure>
                        <img 
                            src={item.image} 
                            className='rounded-2xl w-52 h-40 hover:scale-105 transition duration-300 hover:shadow-2xl hover:opacity-90' 
                            alt={item.title}  
                        />
                    </figure>
                    <div className="card-body">
                        <h4 className="truncate">{item.title}</h4>
                        <span className="text-lg font-bold"> ₹{item.price * 83}</span>
                        <div className="card-actions justify-end">
                            <button className="btn bg-main" onClick={() => handleClick(item._id,)}>Add to cart</button>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default ShowProducts;
