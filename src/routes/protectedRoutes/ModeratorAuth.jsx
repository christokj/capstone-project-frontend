import React, { useEffect, useState } from "react";
import { axiosInstance } from "../../config/axiosInstance";
import { useLocation, useNavigate } from "react-router-dom";

export const ModeratorAuth = ({ children }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const [moderator, setModerator] = useState();

    const checkModerator = async () => {
        try {
            const response = await axiosInstance({
                url: "/moderator/check-moderator",
                method: "GET",
                withCredentials: true,
            });
            setModerator(true);
        } catch (error) {
            navigate("/login");
        }
    };

    useEffect(() => {
        checkModerator();
    }, [location.pathname]);

    return moderator ? children : null;
};
