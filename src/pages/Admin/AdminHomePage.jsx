import React from 'react'
import { Link } from 'react-router-dom'

function AdminHomePage() {


  return (
    <div className="min-h-screen bg-gray-100 flex">
    {/* Sidebar */}
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
        </ul>
      </nav>
    </div>

    {/* Main Content */}
    <div className="flex-1 p-6">
      <h1 className="text-3xl font-bold mb-6">Welcome to Admin Dashboard</h1>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="card bg-white shadow-md p-6 rounded-lg">
          <h2 className="text-lg font-semibold mb-4">Total Users</h2>
          <p className="text-2xl font-bold">1,245</p>
        </div>

        <div className="card bg-white shadow-md p-6 rounded-lg">
          <h2 className="text-lg font-semibold mb-4">Total Products</h2>
          <p className="text-2xl font-bold">567</p>
        </div>

        {/* <div className="card bg-white shadow-md p-6 rounded-lg">
          <h2 className="text-lg font-semibold mb-4">Total Orders</h2>
          <p className="text-2xl font-bold">1,032</p>
        </div> */}
      </div>

     
    
    </div>
  </div>
  )
}

export default AdminHomePage