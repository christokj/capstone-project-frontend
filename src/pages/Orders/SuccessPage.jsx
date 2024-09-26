import React, { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { axiosInstance } from '../../config/axiosInstance';

function SuccessPage() {

  const location = useLocation();
  const query = new URLSearchParams(location.search);

  const sessionId = query.get('session_id');
  const productsData = query.get('productsData');
   
  useEffect(() => {

    if (productsData) {

      axiosInstance({
        url: "/user/save-orders",
        method: "POST",
        data: {productsData}
      })
      .catch((error) => {
        console.error('Error', error);
      });
    }

    // if (sessionId && productName && productPrice) {

    // axiosInstance({
    //     url: "/payment/emailHandler",
    //     method: "POST",
    //     data: {sessionId, productName, productPrice}
    //   })
    //   .then((response) => {
    //     console.log('Email handler response:', response);
    //   })
    //   .catch((error) => {
    //     console.error('Error sending email handler request:', error);
    //   });

    // }
  }, [sessionId, productsData]);


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
        <Link to={"/user"} className="btn bg-main w-full">Go to Dashboard</Link>
      </div>
    </div>
  );
}

export default SuccessPage;