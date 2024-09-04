import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { axiosInstance } from '../../config/axiosInstance';

function AdminHomePage() {

  const [data, setData] = useState([]);

  const fetchDetails = async () => {

    const response = await axiosInstance.get('/admin/database-details');
    setData(response.data)
  }

  useEffect(() => {

    fetchDetails();
  }, [data]);


  return (
    <div className="min-h-screen bg-gray-100 flex">
      <div className="w-64 bg-white shadow-md h-screen">
        <div className="p-6">
          <h2 className="text-2xl font-semibold text-gray-800">Admin Dashboard</h2>
        </div>
        <nav className="p-6">
          <ul className="space-y-4">

            <li>
              <Link to="/admin/users" className="block py-2 px-4 rounded hover:bg-gray-200">
                Manage Users
              </Link>
            </li>
            <li>
              <Link to="/admin/moderators" className="block py-2 px-4 rounded hover:bg-gray-200">
                Manage Moderaters
              </Link>
            </li>
            <li>
              <Link to="/admin/products" className="block py-2 px-4 rounded hover:bg-gray-200">
                Manage Products
              </Link>
            </li>
            <li>
              <Link to="/admin/category" className="block py-2 px-4 rounded hover:bg-gray-200">
                Manage Category
              </Link>
            </li>
          </ul>
        </nav>
      </div>

      <div className="flex-1 p-6">
        <h1 className="text-3xl font-bold mb-6">Welcome to Admin Dashboard</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="card bg-white shadow-md p-6 rounded-lg">
            <h2 className="text-lg font-semibold mb-4">Total Users</h2>
            <p className="text-2xl font-bold">{data.userCount}</p>
          </div>
          <div className="card bg-white shadow-md p-6 rounded-lg">
            <h2 className="text-lg font-semibold mb-4">Total Products</h2>
            <p className="text-2xl font-bold">{data.productCount}</p>
          </div>
          <div className="card bg-white shadow-md p-6 rounded-lg">
            <h2 className="text-lg font-semibold mb-4">Total Category</h2>
            <p className="text-2xl font-bold">{data.categoryCount}</p>
          </div>
          <div className="card bg-white shadow-md p-6 rounded-lg">
            <h2 className="text-lg font-semibold mb-4">Total Moderator</h2>
            <p className="text-2xl font-bold">{data.moderatorCount}</p>
          </div>

        </div>
      </div>
    </div>
  );
}

export default AdminHomePage;