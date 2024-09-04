import React, { useEffect, useState } from "react";
import { axiosInstance } from "../../config/axiosInstance";
import { replace, useLocation, useNavigate } from "react-router-dom";

export const UserAuth = ({ children }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const [user, setUser] = useState();

    const checkUser = async () => {
        try {
            const response = await axiosInstance({
                url: "/user/check-user",
                method: "GET",
                withCredentials: true,
            });
            setUser(true);
        } catch (error) {
            navigate("/login");
        }
    };

    useEffect(() => {
        checkUser();
    }, [location.pathname]);

    return user ? children : null;
};
