import React, { useEffect, useState } from 'react';
import { axiosInstance } from '../../config/axiosInstance';
import toast from 'react-hot-toast';

function AdminModeratorsPage() {

    const [moderators, setModerators] = useState([]);

    const fetchModerators = async () => {
        try {
            const response = await axiosInstance.get('/admin/view-moderators');
            setModerators(response.data.moderators);
        } catch (error) {
            toast.error('Failed to fetch moderators');
        }
    };

    useEffect(() => {
        // Fetch moderators from the server when the component mounts  
        fetchModerators();
    }, []);

    const handleStatus = async (moderatorId) => {
        try {
            await axiosInstance.put(`/admin/update-moderator-status/${moderatorId}`);
            toast.success('Status updated successfully');
            
            setModerators((prevModerators) =>
                prevModerators.map((moderator) =>
                    moderator._id === moderatorId
                        ? { ...moderator, status: moderator.status === 'active' ? 'inactive' : 'active' }
                        : moderator
                )
            );
            fetchModerators();
        } catch (error) {
            toast.error('Failed to update status');
        }
    };

    if (!moderators.length) {
        return <div>Loading...</div>;
    }

    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <div className="max-w-6xl mx-auto bg-white shadow-md rounded-lg p-6">
                <h1 className="text-3xl font-bold mb-6">Manage Moderators</h1>
                <div className="overflow-x-auto">
                    <table className="table w-full">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Full Name</th>
                                <th>Email</th>
                                <th>Mobile</th>
                                <th>Shop name</th>
                                <th>Status</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {moderators.length > 0 ? (
                                moderators.map(moderator => (
                                    <tr key={moderator._id}>
                                        <td>{moderator._id}</td>
                                        <td>{moderator.fullname}</td>
                                        <td>{moderator.email}</td>
                                        <td>{moderator.mobile}</td>
                                        <td>{moderator.shopName}</td>
                                        <td>{moderator.status}</td>
                                        <td>
                                            <button
                                                className={`btn-sm gap-2 btn ${moderator.status === 'active' ? 'bg-red-400' : 'bg-green-300'}`}
                                                onClick={() => handleStatus(moderator._id)}
                                            >
                                                {moderator.status === 'active' ? 'Freeze' : 'Activate'}
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="6" className="text-center">
                                        No moderators found
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

export default AdminModeratorsPage;
