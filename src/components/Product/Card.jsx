// src/components/Card.js

import React from 'react';

const Card = ({ image, title, description, price, onButtonClick, buttonText }) => {
    return (
        <div className="card bg-base-100 shadow-lg rounded-2xl m-10 ">

            <figure className="w-96 mx-auto p-16 ">
                <img src={image} alt={title} />
            </figure>
            <div className="card-body p-4">
                <h2 className="card-title text-xl font-bold mb-2">{title}</h2>
                <p className="text-gray-600 mb-4">{description}</p>
                {price && (
                    <div className="text-lg font-semibold mb-4">₹{(price * 83).toFixed(0)}</div>
                )}
                {onButtonClick && (
                    <button
                        className="btn bg-main"
                        onClick={onButtonClick}
                    >
                        {buttonText}
                    </button>
                )}
            </div>
        </div>
    );
};

export default Card;
