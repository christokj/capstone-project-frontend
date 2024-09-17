import React, { useEffect, useState } from 'react';
import { axiosInstance } from '../../config/axiosInstance';
import { useSelector } from 'react-redux';
import closeIcon from '../../assets/close.json'
import Lottie from 'lottie-react';

const Card = ({ id, image, title, description, price, reviews, onButtonClick }) => {

    const [review, setReview] = useState('')
    const [reviewList, setReviewList] = useState([]);

    const [showImages, setShowImages] = useState(false);
    const  [images, setImages] = useState([]);

    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

    useEffect(() => {
    if (reviews && !review && !reviewList.length) {
        setReviewList(reviews);
    }
}, [reviews]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await axiosInstance({
                url: "/user/addReview",
                method: "POST",
                data: { review, id }
            });

            const values = await axiosInstance({
                url: `/user/showReview/${id}`,
                method: "GET"
            })
            setReviewList(values.data.data)
            setReview('');
        } catch (error) {
            console.error("Error submitting review:", error);
        }
    }
    const showPhotos = (images) => {

        setShowImages(true)
        setImages(images)
    }

    if (showImages) {
        return (
            <div className='w-full'>
                <div>
                <Lottie className='w-10 cursor-pointer fixed' onClick={(() => setShowImages(false))} animationData={closeIcon} />
                    {
                        images.map((img, index) => {
                           return <img key={index} className='w-96 h-96 mx-auto' src={img} alt="" />
                        })
                    }
                </div>
            </div>
        )
    }

    if (!image || !title || !description || !price || !id || !reviews) {
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
            <div className="card bg-base-100 shadow-lg rounded-2xl m-10">
                <figure className="w-full mx-auto p-16">
                    <img className='w-72 h-72' src={image[0]} onClick={(() => showPhotos(image))} alt={title} />
                </figure>
                <div className="card-body p-4">
                    <h2 className="card-title text-xl font-bold mb-2">{title}</h2>
                    <p className="text-dark-grey-500 mb-4">{description}</p>
                    {price && (
                        <div className="text-lg font-semibold mb-4">₹{(price * 83).toFixed(0)}</div>
                    )}
                    {onButtonClick && (
                        <button className="btn bg-main text-white" onClick={onButtonClick}>
                            Add to cart
                        </button>
                    )}
                    <div className="mt-6">
                        <h3 className="text-lg font-bold mb-2">Customer Reviews</h3>
                        {reviewList.length > 0 ? (
                            reviewList.map((review, index) => (
                                <div className="my-2" key={index}>
                                    <div className="bg-gray-100 p-4 rounded-2xl shadow">
                                        <p className="font-semibold">{review.userName}</p>
                                        <p>{review.message}</p>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p>No reviews yet.</p>
                        )}
                        {isAuthenticated && <form className="mt-4 space-y-4" onSubmit={handleSubmit}>
                            <textarea
                                className="textarea textarea-bordered w-full"
                                placeholder="Write a review"
                                value={review}
                                onChange={(e) => setReview(e.target.value)}
                            ></textarea>
                            <button className="btn bg-main text-white" type="submit">
                                Submit Review
                            </button>
                        </form>
                        }
                    </div>
                </div>
            </div>
        );
    }
}

export default Card;
