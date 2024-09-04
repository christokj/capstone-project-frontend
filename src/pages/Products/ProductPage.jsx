import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { axiosInstance } from '../../config/axiosInstance';
import { useLocation, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Card from '../../components/Product/Card';

function ShowProduct() {
    const [product, setProduct] = useState([]);

    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

    const navigate = useNavigate();

    const location = useLocation();

    const handleClick = async (id) => {
        if (isAuthenticated) {
            try {
                const response = await axiosInstance({
                    url: '/user/add-cart',
                    method: "POST",
                    data: { productId: id, quantity: 1 },
                    withCredentials: true
                });
                toast.success("Product added to cart");
                navigate('/user/cart', { replace: true });
            } catch (error) {
                toast.error("Product not added");
            }
        } else {
            navigate("/login");
            toast.error("Please login to add product to cart");
        }
    };
    useEffect(() => {
        if (location.state && location.state.product) {
            setProduct(location.state.product);
        }
    }, [location.state]);

    if (!product) {
        return <div className="text-center">Products not found</div>;
    }

    return (
        <div className="max-w-3xl mx-auto p-4">
            <Card
                image={product.image}
                title={product.title}
                description={product.description}
                price={product.price}
                onButtonClick={() => handleClick(product._id)}
            />
        </div>
    );
}

export default ShowProduct;
