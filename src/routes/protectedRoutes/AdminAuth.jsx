import React, { useEffect, useState } from "react";
import { axiosInstance } from "../../config/axiosInstance";
import { useLocation, useNavigate } from "react-router-dom";

export const AdminAuth = ({ children }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const [admin, setAdmin] = useState();

    const checkAdmin = async () => {
        try {
            const response = await axiosInstance({
                url: "/admin/check-admin",
                method: "GET",
            });
            setAdmin(true);
        } catch (error) {
            navigate("/login");
        }
    };

    useEffect(() => {
        checkAdmin();
    }, [location.pathname]);

    return admin ? children : null;
};
