import { Outlet } from "react-router-dom";
import Footer from "../components/Footer";
import AdminHeader from "../components/Admin/AdminHeader";


export const AdminLayout = () => {
    return (
        <>
            <AdminHeader />
            <div className="min-h-96">
                <Outlet />
            </div>
            <Footer />
        </>
    );
}