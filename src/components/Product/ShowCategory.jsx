import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { axiosInstance } from '../../config/axiosInstance';
import { useLocation, useNavigate } from 'react-router-dom';

function ShowCategory() {
    const navigate = useNavigate();
    let role = 'User'
    const location = useLocation();

    if (location.state) {
        role = location.state.role;
    }

    const [data, setData] = useState([]);

    const fetchCategory = async () => {
        try {
            const response = await axiosInstance({
                url: "/user/products-category",
                method: "GET",
            });
            setData(response.data.data);
        } catch (error) {
            toast.error("Failed fetching category");
        }
    };

    useEffect(() => {
        fetchCategory();
    }, []);

    const handleClick = (id) => {

        if (role === 'User') {
            navigate('products-by-category', { state: { id } });
        }
        if (role === 'Moderator') {

            navigate('/moderator/add-category', { state: { id } });
        }
        if (role === 'Admin') {
            navigate('/admin/add-category', { state: { id } });
        }
    }

    const handleRemove = async (productId) => {
        try {
            const response = await axiosInstance({
                url: `/moderator/remove-category/${productId}`,
                method: "DELETE",
            });

            toast.success("Category removed");
            navigate('/moderator', { replace: true })
        } catch (error) {
            toast.error("Failed to remove category");
        }
    }

    if (!data.length) {

        return (
            <>
                    <div className='flex justify-center items-center '>
                        <div className="card bg-base-100 px-10 shadow-xl grid md:grid-cols-4 sm:grid-cols-2 grid-cols-1 cursor-pointer">
                            {Array.from({ length: 4 }).map((_, index) => (
                                <div className='p-10' key={index}>
                                    <div className="skeleton rounded-2xl mx-auto w-52 h-40 "></div>
                                </div>
                            ))}
                        </div>
                </div>
            </>
        )

    } else {

        return (
            <>
              
                <div className="flex justify-center items-center ">
                    <div className="card bg-base-100 px-10 shadow-xl grid md:grid-cols-4 sm:grid-cols-2 grid-cols-1 cursor-pointer">
                        { 
                        data.map((item) => (
                            <div key={item._id}>
                                <div key={item._id} onClick={() => handleClick(item._id)} >
                                    <div>
                                        <img
                                            className='rounded-2xl mx-auto w-52 h-40 hover:scale-105 transition duration-300 hover:shadow-2xl hover:opacity-90'
                                            src={item.image[0]}
                                            alt={item.name}
                                        />
                                    </div>
                                    <div className="card-body flex items-center justify-center">
                                        <h2 className="card-title -mt-5">
                                            {item.name}
                                            <div className="badge badge-secondary">NEW</div>
                                        </h2>
                                    </div>
                                </div>
                                <div className='flex mx-20'>
                                    <div>{role === 'Moderator' && <div className='btn text-black bg-main' onClick={() => handleRemove(item._id)}> Remove </div>}</div>
                                    <div>{role === 'Moderator' && <div className='btn text-black bg-main' onClick={() => handleClick(item._id)}> Update </div>}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </>
        );
    }
}

export default ShowCategory;
