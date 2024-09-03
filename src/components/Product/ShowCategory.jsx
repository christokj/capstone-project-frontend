import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { axiosInstance } from '../../config/axiosInstance';
import { useLocation, useNavigate } from 'react-router-dom';

function ShowCategory() {
    const navigate = useNavigate();
    let role = 'User'
    const location = useLocation();

    if (location.state) {
         role  = location.state.role;
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
            console.log(error);
            toast.error("Failed fetching category");
        }
    };

    useEffect(() => {
        fetchCategory();
    }, []);

    const handleClick = (id) => {

        if (role === 'User') {
        console.log(id);
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
            navigate('/moderator', {replace: true})
        } catch (error) {
            console.log(error);
            toast.error("Failed to remove category");
        }
    }

    
    return (
        <div>
            <div className='text-center mb-10'>
                <h2 className="text-base text-main font-semibold tracking-wide uppercase">Check Now!</h2>
                <p className='my-2 text-3xl leading-10 font-extrabold tracking-tight text-dark-grey-900 sm:text-4xl'>
                    Our Feature Products
                </p>
                <p className="mt-4 text-xl text-dark-grey-500 lg:mx-auto">
                    Here are some of the features and services we provide.
                </p>
            </div>
            <div className="card bg-base-100 shadow-xl grid md:grid-cols-4 grid-cols-2 cursor-pointer">
                {data.map((item) => (
                    <div key={item._id}>
                    <div key={item._id} onClick={() => handleClick(item._id)} className='md:w-52 md:mx-auto mx-4'>
                        <div>
                            <img 
                                className='rounded-2xl w-52 h-40 hover:scale-105 transition duration-300 hover:shadow-2xl hover:opacity-90' 
                                src={item.image[0]} 
                                alt={item.name} 
                            />
                        </div>
                        <div className="card-body">
                            <h2 className="card-title -mt-5">
                                {item.name}
                                <div className="badge badge-secondary">NEW</div>
                            </h2>
                        </div>
                    </div>
                        <div className='flex mx-20'>

                        <div>{role === 'Moderator' && <div className='btn bg-main' onClick={() => handleRemove(item._id)}> Remove </div>}</div>
                        <div>{role === 'Moderator' && <div className='btn bg-main' onClick={() => handleClick(item._id)}> Update </div>}</div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ShowCategory;
