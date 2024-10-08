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

            const response = await axiosInstance({
                url: "/payment/create-checkout-session",
                method: "POST",
                data: { products: cartData },
                headers: {
                    "Content-Type": "application/json"
                },
            });

            if (response) {
                const sessionId = response?.data?.sessionId;

                const result = await stripe.redirectToCheckout({
                    sessionId: sessionId,
                });
            }

        } catch (error) {
            toast.error("Error");
            console.log('Error:', error);
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

    const updateCartQuantity = async (productId, quantity) => {
        console.log(productId, quantity)
        try {
            const response = await axiosInstance({
                url: '/user/update-cart-quantity',
                method: "PUT",
                data: {productId, quantity}
            });
            fetchCartItems();
        } catch (error) {
            console.log(error);
            toast.error("Failed to remove item from cart");
        }
    }
    
    useEffect(() => {
        fetchCartItems();
    }, []);

    if (!cartData) {
        return (
            <div>No items in cart</div>
        )
    }

    return (
        <>
            <div className='card bg-base-100 shadow-xl grid md:grid-cols-4 2xl:grid-cols-6 grid-cols-2 cursor-pointer mt-10'>
                {cartData.map((item) => (
                    <div key={item.productId} className="md:w-64  md:mx-auto mx-4">
                        <figure>
                            <img src={item.productDetails.image[0]} alt={item.productDetails.title} className='rounded-2xl w-52 h-40 hover:scale-105 transition duration-300 hover:shadow-2xl hover:opacity-90' />
                        </figure>
                        <div className="card-body">
                            <h4 className="truncate"></h4>
                            {item.productDetails.title}
                            <div className="flex space-x-2 mt-2">
                            <h1 className='text-sm font-bold'>Qty: {item.productDetails.quantity} </h1>
                                <button
                                    className="btn btn-xs btn-outline"
                                    onClick={() => updateCartQuantity(item.productId, item.productDetails.quantity - 1)}
                                    disabled={item.productDetails.quantity <= 1} 
                                >
                                    -
                                </button>
                                <span className="text-md">{item.productDetails.quantity}</span>
                                <button
                                    className="btn btn-xs btn-outline"
                                    onClick={() => updateCartQuantity(item.productId, item.productDetails.quantity + 1)}
                                >
                                    +
                                </button>
                            </div>
                            <span className="text-lg font-bold"> ₹{(item.productDetails.price * 83 * item.productDetails.quantity).toFixed(0)}</span>
                            <button onClick={() => removeCart(item.productId)} className='btn bg-gray-200 '>Remove</button>
                        </div>
                    </div>
                ))}
            </div>
            <div className="md:w-64 p-5 flex md:mx-auto mx-4">
                {cart.map((item) => (
                    <div key={item._id}>
                        <h1 className='text-lg font-bold'>Total price ₹{(item.totalPrice).toFixed(0)} </h1>
                    </div>
                )
                )
                }
                <button onClick={makePayment} className='bg-main text-black px-3 rounded-md'>
                    Checkout
                </button>
            </div>
        </>
    );
}

export default ShowCart;
