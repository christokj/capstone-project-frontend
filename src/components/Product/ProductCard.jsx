import React from 'react';
import { useNavigate } from 'react-router-dom';

function ProductCard({ item, handleClick, isAuthenticated }) {

    const navigate = useNavigate();

    function ShowProduct(product) {
        if (isAuthenticated) {
            navigate("/user/product", { state: { product } });
        } else {

            navigate("/product", { state: { product } });
        }
    }

    return (
        <div className="md:w-64 md:mx-auto mx-4">
            <figure>
                <img
                    onClick={() => ShowProduct(item)}
                    src={item.image[0]}
                    className="rounded-2xl w-52 h-40 hover:scale-105 transition duration-300 hover:shadow-2xl hover:opacity-90"
                    alt={item.title}
                />
            </figure>
            <div className="card-body">
                <h4 className="truncate">{item.title}</h4>
                <span className="text-lg font-bold">₹{Math.round(item.price * 83)}</span>
                <div className="card-actions justify-end">
                    <button
                        className={`btn bg-main ${isAuthenticated ? 'block' : 'hidden'}`}
                        onClick={() => handleClick(item._id)}
                    >
                        Add to cart
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ProductCard;
