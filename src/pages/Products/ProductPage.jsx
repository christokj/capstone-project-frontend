import React, { useEffect, useState } from 'react'
import Card from '../../components/Product/Card';
import toast from 'react-hot-toast';
import { axiosInstance } from '../../config/axiosInstance';
import { useNavigate, useParams } from 'react-router-dom';

function ShowProduct() {

    const { productId } = useParams(); // Assuming you're using React Router
    const [product, setProduct] = useState(null);

    const navigate = useNavigate();

    const addToCart = async (id) => {
        try {
            const response = await axiosInstance({
                url: '/user/add-cart',
                method: "POST",
                data: { productId: id, quantity: 1 },
                withCredentials: true // Ensure cookies are sent with the request
            });
            toast.success("Product added to cart");
            navigate('/user/cart', {replace: true});
        } catch (error) {
            console.log(error);
            toast.error("Product not added");
        }
    };

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await axiosInstance.get(`/user/show-one-product/${productId}`);
                setProduct(response.data.data);
                console.log(response.data.data)
            
            } catch (error) {
                console.log(error);
                toast.error("Failed to fetch product details");
            
            }
        };

        fetchProduct();
    }, [productId]);

    if (!product) {
        return <div className="text-center">Product not found</div>;
    }
    
    return (
        <div className="max-w-3xl mx-auto p-4">
        <Card
            image={product.image}
            title={product.title}
            description={product.description}
            price={product.price}
            onButtonClick={() => addToCart(product._id)}
            buttonText="Add to Cart"
        />
    </div>
    );
}

export default ShowProduct;