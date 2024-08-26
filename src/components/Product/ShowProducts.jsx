import React, { useEffect, useState } from 'react'
import { axiosInstance } from '../../config/axiosInstance';
import toast from 'react-hot-toast';

function ShowProducts(id = null) {

    const [data, setData] = useState([]);

    if (id) {
        const fetchProductsByCategory = async () => {
            try {
                const response = await axiosInstance({
                    url: `/user/products-by-category/${id.id}`,
                    method: "GET",
                });
                return response
            } catch (error) {
                console.log(error);
                toast.error("Failed fetching category");
            }
        };

        useEffect(() => {
            fetchProductsByCategory().then((response) => {
                const data = response.data.data;
                setData(data);
                console.log(data);
            });
        }, []);
    }
    console.log(id)

    return (
        <div className='card bg-base-100 shadow-xl grid md:grid-cols-4 2xl:grid-cols-6 grid-cols-2 cursor-pointer mt-10'>
        {
            data.map((item) => {
                return (

                    <div key={item._id}  className="md:w-64  md:mx-auto mx-4 ">
                        <figure>
                            <img src={item.image} className='rounded-2xl w-52 h-40 hover:scale-105 transition duration-300 hover:shadow-2xl hover:opacity-90' alt={item.title}  />
                        </figure>
                        <div className="card-body">
                            <h4 className="truncate">{item.title}</h4>
                            <span className="text-lg font-bold"> ₹{item.price*83}</span>
                            <div className="card-actions justify-end">
                                <button className="btn btn-primary">Buy Now</button>
                            </div>
                        </div>
                    </div>
                )
            })
        }
        </div>
    );
}


export default ShowProducts;