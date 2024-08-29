import { Outlet } from "react-router-dom";
import { UserHeader } from "../components/User/UserHeader";
import { Footer } from "../components/Footer";

export const UserLayout = () => {
    return (
        <div>
            <UserHeader />
            <div className="min-h-96">
                <Outlet />
            </div>
            <Footer />
        </div>
    );
};
