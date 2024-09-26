import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { axiosInstance } from '../../config/axiosInstance';
import toast from 'react-hot-toast';

function OtpVerifyPage() {
    const location = useLocation()
    const searchParams = new URLSearchParams(location.search);
    const email = searchParams.get('email');
    const [otp, setOtp] = useState('');
    const navigate = useNavigate();
   
    const handleVerifyOtp = async () => {
        try {
            const response = await axiosInstance({
                url: `/user/otp-handler`,
                method: 'POST',
                data: { otp, email },
            });

            if (response.data.success) {
                toast.success('OTP verified successfully');
                navigate('/login', { replace: true });
            } else {
                toast.error('Invalid OTP. Please try again.');
            }
        } catch (error) {
            toast.error('Failed to verify OTP. Please try again.');
            console.error('Error verifying OTP:', error);
        }
    };


    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-50 mt-16">
            <div className="w-full max-w-md p-8 space-y-4 bg-white rounded-lg shadow-lg">
                <h2 className="text-2xl font-semibold text-center">Verify OTP</h2>
                <input
                    type="text"
                    placeholder="Enter the OTP"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    maxLength={6}
                    className="w-full px-4 py-2 border rounded-lg"
                />
                <button
                    onClick={handleVerifyOtp}
                    className="w-full px-4 py-2 font-semibold text-black bg-main rounded-lg hover:bg-gray-200"
                >
                    Verify OTP
                </button>
            </div>
        </div>
    );
}

export default OtpVerifyPage;