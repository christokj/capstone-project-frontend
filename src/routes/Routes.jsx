import { createBrowserRouter } from "react-router-dom";
import { RootLayout } from "../layouts/RootLayout";
import HomePage from "../pages/User/HomePage";
import { ErrorPage } from "../pages/User/ErrorPage";
import ProductByCategory from "../pages/Products/ProductByCategory";
import ProductsPage from "../pages/Products/ProductsPage";
import ContactPage from "../pages/User/ContactPage";
import AboutPage from "../pages/User/AboutPage";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <RootLayout />,
        // errorElement: <ErrorPage />,
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
        ],
    },
]);
