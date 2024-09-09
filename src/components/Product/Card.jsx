import React from 'react';

const Card = ({ image, title, description, price, onButtonClick }) => {

    if (!image || !title || !description || !price) {
        return (
            <div className="flex w-96 flex-col gap-4 mx-auto rounded-2xl m-10 ">
                <div className="skeleton h-96 w-96  p-16"></div>
                <div className="skeleton h-4 w-28"></div>
                <div className="skeleton h-4 w-full"></div>
                <div className="skeleton h-4 w-full"></div>
            </div>
        )
    } else {
        return (
            <div className="card bg-base-100 shadow-lg rounded-2xl m-10 ">

                <figure className="w-full mx-auto p-16 ">
                    <img className='w-72' src={image[0]} alt={title} />
                </figure>
                <div className="card-body p-4">
                    <h2 className="card-title  text-xl font-bold mb-2">{title}</h2>
                    <p className="text-dark-grey-500 mb-4">{description}</p>
                    {price && (
                        <div className="text-lg font-semibold mb-4">₹{(price * 83).toFixed(0)}</div>
                    )}
                    {onButtonClick && (
                        <button
                            className="btn bg-main text-white"
                            onClick={onButtonClick}
                        >
                            Add to cart
                        </button>
                    )}
                </div>
            </div>
        );
    }
}

export default Card;
