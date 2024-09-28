import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { axiosInstance } from '../../config/axiosInstance';
import { MyContext } from '../../components/Context/Context';

function AdminHomePage() {

  const [data, setData] = useState([]);

  const {value} = useContext(MyContext)

  const fetchDetails = async () => {

    const response = await axiosInstance.get('/admin/database-details');
    setData(response.data)
  }
console.log()
  useEffect(() => {
    if (data.length === 0 ) {

  fetchDetails();
}
}, [data]);


  return (
    <div className={`min-h-screen mt-24 ${value ? "bg-black" : "bg-gray-100"} flex`}>
      <div className={`w-64 hidden sm:block shadow-md h-screen ${value ? "bg-gray-900" : "bg-gray-100"}`}>
        <div className="p-6">
          <h2 className="text-2xl font-semibold text-dark-grey-500">Admin Dashboard</h2>
        </div>
        <nav className="p-6">
          <ul className="space-y-4 font-bold text-lg">

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

      <div className="navbar-start -me-20 m-2 sm:hidden block ">
                        <div className="dropdown">
                            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-5 w-5"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor">
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M4 6h16M4 12h16M4 18h7" />
                                </svg>
                            </div>
                            <ul
                                tabIndex={0}
                                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-44 gap-3 py-5 p-2 shadow">
                                <li><Link to={'/admin/users'}><a>Manage Users</a></Link></li>
                                <li><Link to={'/admin/moderators'}><a>Manage Moderaters</a></Link></li>
                                <li><Link to={'/admin/products'}><a>Manage Products</a></Link></li>
                                <li><Link to={'/admin/category'}><a>Manage Category</a></Link></li>
                            </ul>
                        </div>
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