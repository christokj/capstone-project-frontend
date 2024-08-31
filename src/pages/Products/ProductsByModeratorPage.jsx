import React, { useEffect } from 'react'
import toast from 'react-hot-toast';
import { axiosInstance } from '../../config/axiosInstance';

function ProductsByModeratorPage() {

    // const [data, setData] = useState([]);

    // Function to fetch all products
    const fetchYourProducts = async () => {
        try {
            const response = await axiosInstance    ({
                    url: "/moderator/show-products",
                    method: "GET",
                });
                console.log(response.data.data)
                // setData(response.data.data);
            } catch (error) {
                console.log(error);
                toast.error("Failed fetching products");
            }
        };
        useEffect(() => {
            fetchYourProducts();
    }, []);

    return (
        // <div className='card bg-base-100 shadow-xl grid md:grid-cols-4 2xl:grid-cols-6 grid-cols-2 cursor-pointer mt-10'>
        //     {data.map((item) => (
        //         <div key={item._id} className="md:w-64  md:mx-auto mx-4">
        //             <figure>
        //                 <img
        //                     onClick={() => ShowProducts(item._id)}
        //                     src={item.image}
        //                     className='rounded-2xl w-52 h-40 hover:scale-105 transition duration-300 hover:shadow-2xl hover:opacity-90'
        //                     alt={item.title}
        //                 />
        //             </figure>
        //             <div className="card-body">
        //                 <h4 className="truncate">{item.title}</h4>
        //                 <span className="text-lg font-bold"> ₹{Math.round(item.price * 83)}</span>
        //                 <div className="card-actions justify-end">
        //                     <button className={`btn bg-main ${isAuthenticated ? 'block' : 'hidden'}`} onClick={() => handleClick(item._id,)}>Add to cart</button>
        //                 </div>
        //             </div>
        //         </div>
        //     ))}
        // </div>
        <div>Under construction</div>
    )
}

export default ProductsByModeratorPage