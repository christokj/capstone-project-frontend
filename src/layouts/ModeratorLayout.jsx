import { Outlet } from "react-router-dom";
import Footer from "../components/Footer";
import ModeratorHeader from "../components/Moderator/ModeratorHeader";


export const ModeratorLayout = () => {
    return (
        <>
            <ModeratorHeader />
            <div className="min-h-96">
                <Outlet />
            </div>
            <Footer />
        </>
    );
}