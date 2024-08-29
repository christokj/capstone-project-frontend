import { createBrowserRouter } from "react-router-dom";
import { RootLayout } from "../layouts/RootLayout";
import HomePage from "../pages/User/HomePage";
import { ErrorPage } from "../pages/User/ErrorPage";
import ProductByCategory from "../pages/Products/ProductByCategory";
import ProductsPage from "../pages/Products/ProductsPage";
import ContactPage from "../pages/User/ContactPage";
import AboutPage from "../pages/User/AboutPage";
import LoginPage from "../pages/User/LoginPage";
import SignupPage from "../pages/User/SignupPage";
import CartPage from "../pages/User/CartPage";
import { UserAuth } from "./protectedRoutes/UserAuth";
import { UserLayout } from "../layouts/UserLayout";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <RootLayout />,
        errorElement: <ErrorPage />,
        children: [
            {
                path: "",
                element: <HomePage />,
            },
            {
                path: "products-by-category",
                element: <ProductByCategory />,
            },
            {
                path: "products",
                element: <ProductsPage />,  //<ProductsPage/>
            },
            {
                path: "about",
                element: <AboutPage/>,
            },
            {
                path: "contact",
                element: <ContactPage/> ,
            },
            {
                path: "login",
                element: <LoginPage />,
            },
            {
                path: "signup",
                element: <SignupPage />,
            },
        ],
    },
    {
        path: "user",
        element: (
            <UserAuth>
                <UserLayout />
            </UserAuth>
        ),
        children: [
            {
                path: "",
                element: <HomePage />,
            },
            {
                path: "cart",
                element: <CartPage />,
            },
            // {
            //     path: "payment/success",
            //     element: <Success />,
            // },
            // {
            //     path: "payment/cancel",
            //     element: <Cancel />,
            // },
        ],
    },
]);
