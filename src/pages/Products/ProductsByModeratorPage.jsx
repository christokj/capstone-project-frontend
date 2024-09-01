import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { axiosInstance } from '../../config/axiosInstance';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

function ProductsByModeratorPage() {

    const [data, setData] = useState([]);
    const [isChecked, setIsChecked] = useState(false);

    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

    const navigate = useNavigate();
    const fetchYourProducts = async () => {
        try {
            const response = await axiosInstance({
                url: "/moderator/show-products",
                method: "GET",
            });

            setData(response.data.data);
                setIsChecked(response.data.data.length > 0); 
        
        } catch (error) {
            console.log(error);
            toast.error("Failed fetching products");
        }
    };
    const handleUpdate = async (id) => {
        try {
            navigate('/moderator/add-product', {replace: true, state: { id }});
        } catch (error) {
            console.log(error);
            toast.error("Error ");
        }
    }
    const handleRemove = async (productId) => {
        try {
            const response = await axiosInstance({
                url: `/moderator/remove-product/${productId}`,
                method: "DELETE",
            });
            
            toast.success("Product removed");
            navigate('/moderator', {replace: true})
        } catch (error) {
        
            toast.error("Failed to remove product");
        }
    }
    useEffect(() => {
        fetchYourProducts();
    }, []); 

    return (
        <>
            {isChecked ? (
                <div className='card bg-base-100 shadow-xl grid md:grid-cols-4 2xl:grid-cols-6 grid-cols-2 cursor-pointer mt-10'>
                    {data.map((item) => (
                        <div key={item._id} className="md:w-64 md:mx-auto mx-4">
                            <figure>
                                <img
                                    onClick={() => ShowProducts(item._id)}
                                    src={item.image[0]}
                                    className='rounded-2xl w-52 h-40 hover:scale-105 transition duration-300 hover:shadow-2xl hover:opacity-90'
                                    alt={item.title}
                                />
                            </figure>
                            <div className="card-body">
                                <h4 className="truncate">{item.title}</h4>
                                <span className="text-lg font-bold"> ₹{Math.round(item.price * 83)}</span>
                                <div className="card-actions justify-between">
                                    <button className={`btn bg-main ${isAuthenticated ? 'block' : 'hidden'}`} onClick={() => handleRemove(item._id)}>Remove</button>
                                    <button className={`btn bg-main ${isAuthenticated ? 'block' : 'hidden'}`} onClick={() => handleUpdate(item._id)}>Update</button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div>You have not added any products</div>
            )}
        </>
    );
}

export default ProductsByModeratorPage;
