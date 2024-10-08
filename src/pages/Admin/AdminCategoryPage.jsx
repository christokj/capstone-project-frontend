import React, { useContext, useEffect, useState } from 'react';
import { axiosInstance } from '../../config/axiosInstance';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { MyContext } from '../../components/Context/Context';

function AdminCategoryPage() {
    const [categories, setCategories] = useState([]);

    const { value } = useContext(MyContext)

    const navigate = useNavigate();
    // Fetch categories from the server when the component mounts
    const fetchCategories = async () => {
        try {
            const response = await axiosInstance.get('/user/products-category');
            setCategories(response.data.data);
        } catch (error) {
            toast.error('Failed to fetch categories');
        }
    };
    useEffect(() => {
        fetchCategories();
    }, []);

    const handleDelete = async (categoryId) => {
        try {
            await axiosInstance.delete(`/admin/remove-category/${categoryId}`);
            toast.success('Category deleted successfully');
            fetchCategories();
        } catch (error) {
            toast.error('Failed to delete category');
        }
    };

    const handleCategory = () => {
        navigate('/admin/add-category', { state: { role: 'Admin' } });
    };

    if (!categories) {
        return <div className='mt-24'>Loading</div>;
    }

    return (
        <div className={`min-h-screen mt-24 ${value ? "bg-black" : "bg-gray-100"} p-6`}>
            <div className={`max-w-6xl mx-auto ${value ? "bg-gray-900" : "bg-gray-100"} shadow-md rounded-lg p-6`}>
                <h1 className="text-3xl font-bold mb-6 ">Manage Categories <button onClick={handleCategory} className='btn btn-sm text-black bg-main mx-10'>Add Categories</button></h1>
                <div className="overflow-x-auto ">
                    <table className="table w-full ">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Image</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {categories.length > 0 ? (
                                categories.map(category => (
                                    <tr key={category._id}>
                                        <td>{category.name}</td>
                                        <td>
                                            <img
                                                src={category.image[0]}
                                                alt={category.name}
                                                className="w-16 h-16 object-cover"
                                            />
                                        </td>
                                        <td>
                                            <button
                                                className="btn-sm text-black bg-red-400 gap-2 btn"
                                                onClick={() => handleDelete(category._id)}
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="4" className="text-center">
                                        No categories found
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default AdminCategoryPage;
