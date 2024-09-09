import React, { useContext, useEffect, useState } from 'react'
import { axiosInstance } from '../../config/axiosInstance';
import toast from 'react-hot-toast';
import { MyContext } from '../../components/Context/Context';

function AdminUsersPage() {

    const [users, setUsers] = useState([]);

  const {value} = useContext(MyContext)

    const fetchUsers = async () => {
        try {
            const response = await axiosInstance.get('/admin/view-users');
            setUsers(response.data.users);

        } catch (error) {
            toast.error('Failed to fetch users');
        }
    };

    useEffect(() => {
        // Fetch users from the server when the component mounts
        fetchUsers();
    }, []);

    const handleStatus = async (userId) => {

        try {
            const response = await axiosInstance.put(`/admin/update-user-status/${userId}`);
            toast.success('Status updated successfully');
            // window.location.reload();
            fetchUsers();
        } catch (error) {
            toast.error('Failed to update status');
        }
    }

    if (!users) {
        return <div>Loading</div>
    }

    return (
        <div className={`min-h-screen ${value ? "bg-black" : "bg-gray-100"} p-6`}>
            <div className={`max-w-6xl mx-auto ${value ? "bg-gray-900" : "bg-gray-100"} shadow-md rounded-lg p-6`}>
                <h1 className="text-3xl font-bold mb-6">Manage Users</h1>
                <div className="overflow-x-auto">
                    <table className="table w-full">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Full Name</th>
                                <th>Email</th>
                                <th>Role</th>
                                <th>Status</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody >

                            {users.length > 0 ? (
                                users.map(user => (
                                    <tr key={user._id} className='text-dark-grey-500'>
                                        <td >{user._id}</td>
                                        <td>{user.fullname}</td>
                                        <td>{user.email}</td>
                                        <td>{user.mobile}</td>
                                        <td>{user.status}</td>
                                        <td>
                                            <button className={`btn-sm gap-2 text-black btn ${user.status === 'active' ? 'bg-red-400' : 'bg-green-300'}`} onClick={() => handleStatus(user._id)}>
                                                {user.status === 'active' ? 'Freeze' : 'Activate'}
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="6" className="text-center">
                                        No users found
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

export default AdminUsersPage;