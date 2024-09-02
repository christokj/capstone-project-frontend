import React, { useEffect, useState } from 'react';
import { axiosInstance } from '../../config/axiosInstance';
import toast from 'react-hot-toast';

function AdminProductsPage() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        // Fetch products from the server when the component mounts
        const fetchProducts = async () => {
            try {
                const response = await axiosInstance.get('/user/show-products');
                setProducts(response.data.data);
                console.log(response.data.data)
            } catch (error) {
                toast.error('Failed to fetch products');
            }
        };
        fetchProducts();
    }, []);

    const handleDelete = async (productId) => {
        try {
            await axiosInstance.delete(`/admin/remove-product/${productId}`);
            toast.success('Product deleted successfully');
            setProducts(products.filter(product => product.id !== productId));
        } catch (error) {
            toast.error('Failed to delete product');
        }
    };

    if (!products) {
        return <div>Loading</div>;
    }

    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <div className="max-w-6xl mx-auto bg-white shadow-md rounded-lg p-6">
                <h1 className="text-3xl font-bold mb-6">Manage Products</h1>
                <div className="overflow-x-auto">
                    <table className="table w-full">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Title</th>
                                <th>Category</th>
                                <th>Price</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.length > 0 ? (
                                products.map(product => (
                                    <tr key={product.id}>
                                        <td>{product.id}</td>
                                        <td>{product.title}</td>
                                        <td>{product.category}</td>
                                        <td>{Math.round(product.price * 83)}</td>    
                                        <td>
                                            <button
                                                className="btn-sm bg-red-400 gap-2 btn"
                                                onClick={() => handleDelete(product.id)}
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="6" className="text-center">
                                        No products found
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

export default AdminProductsPage;
