import React from 'react';

function SuccessPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="text-center bg-white p-8 rounded-lg shadow-lg">
        <div className="text-green-500">
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
              d="M9 12l2 2l4-4M5 13l4 4l7-7"
            />
          </svg>
        </div>
        <h1 className="text-3xl font-bold mt-6 mb-4">Payment Successful</h1>
        <p className="text-gray-600 mb-6">
          Thank you for your payment! Your transaction has been completed successfully.
        </p>
        <button className="btn bg-main w-full">Go to Dashboard</button>
        <button className="btn btn-outline w-full mt-2">View Receipt</button>
      </div>
    </div>
  );
}

export default SuccessPage;