import React from 'react';
import { Link } from 'react-router-dom';

function CancelPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="text-center bg-white p-8 rounded-lg shadow-lg">
        <div className="text-red-500">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-16 w-16 mx-auto"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 9v2m0 4h.01M4.93 4.93l14.14 14.14M19.07 4.93L4.93 19.07"
            />
          </svg>
        </div>
        <h1 className="text-3xl font-bold mt-6 mb-4">Payment Failed</h1>
        <Link to={"/user"} className="btn bg-main">Go to Dashboard</Link>
        <p className="text-gray-600 mb-6">
          Unfortunately, your payment was not successful. Please try again.
        </p>
        <button className="btn btn-outline w-full mt-2">Contact Support</button>
      </div>
    </div>
  );
}

export default CancelPage;