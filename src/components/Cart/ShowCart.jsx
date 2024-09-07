import React, { useEffect, useState } from 'react';
import { axiosInstance } from '../../config/axiosInstance';
import toast from 'react-hot-toast';
import { loadStripe } from "@stripe/stripe-js";

function ShowCart() {
    const [cartData, setCartData] = useState([]);
    const [cart, setCart] = useState([]);
    const fetchCartItems = async () => {
        try {
            const response = await axiosInstance({
                url: "/user/show-cart",
                method: "GET",
            });

            setCartData(response?.data?.cart[0]?.products);
            setCart(response?.data?.cart);
        } catch (error) {
            toast.error("Failed fetching cart items");
        }
    };


    const makePayment = async () => {
        try {
            const stripe = await loadStripe(import.meta.env.VITE_STRIPE_Publishable_key);
console.log("Payment started")
            const response = await axiosInstance({
                url: "/payment/create-checkout-session",
                method: "POST",
                data: { products: cartData },
                headers: {
                    "Content-Type":"application/json"
                },
            });
console.log(response)
console.log("Res from backend")
            const sessionId = response?.data?.sessionId;
            const result = stripe.redirectToCheckout({
                sessionId,
            });
        } catch (error) {
            toast.error("Error");   
            console.log(error);
        }
    };

    const removeCart = async (productId) => {
        try {
            const response = await axiosInstance({
                url: `/user/remove-cart/${productId}`,
                method: "DELETE",
            });
            toast.success("Item removed from cart");
            fetchCartItems();
        } catch (error) {
            console.log(error);
            toast.error("Failed to remove item from cart");
        }
    };
    // console.log(cart)  
    useEffect(() => {
        fetchCartItems();
    }, []);

    return (
        <>
            <div className='card bg-base-100 shadow-xl grid md:grid-cols-4 2xl:grid-cols-6 grid-cols-2 cursor-pointer mt-10'>
                {cartData.map((item) => (
                    <div key={item.productId} className="md:w-64  md:mx-auto mx-4">
                        <figure>
                            <img src={item.productDetails.image} alt={item.productDetails.title} className='rounded-2xl w-52 h-40 hover:scale-105 transition duration-300 hover:shadow-2xl hover:opacity-90' />
                        </figure>
                        <div className="card-body">
                            <h4 className="truncate"></h4>
                            {item.productDetails.title}
                            <span className="text-lg font-bold"> ₹{(item.productDetails.price * 83).toFixed(0)}</span>
                            <button onClick={() => removeCart(item.productId)} className='btn bg-gray-200 '>Remove</button>
                        </div>
                    </div>
                ))}
            </div>
            <div className="md:w-64 p-5 flex md:mx-auto mx-4">
                {cart.map((item) => {
                    return (
                        <div key={item._id}>
                            <h1 className='text-lg font-bold'>Total price ₹{(item.totalPrice * 83).toFixed(0)} </h1>
                        </div>
                    )
                })
                }
                <button onClick={makePayment} className='bg-main text-black px-3 rounded-md'>
                    Checkout
                </button>
            </div>
        </>
    );
}

export default ShowCart;
