import { createBrowserRouter } from "react-router-dom";
import { RootLayout } from "../layouts/RootLayout";
import HomePage from "../pages/User/HomePage";
import { ErrorPage } from "../pages/User/ErrorPage";
import ProductByCategory from "../components/Product/ProductByCategory";
import ProductsPage from "../pages/Products/ProductsPage";
import ProductPage from "../pages/Products/ProductPage";
import ContactPage from "../pages/User/ContactPage";
import AboutPage from "../pages/User/AboutPage";
import LoginPage from "../pages/User/LoginPage";
import SignupPage from "../pages/User/SignupPage";
import CartPage from "../pages/User/CartPage";
import { UserAuth } from "./protectedRoutes/UserAuth";
import { UserLayout } from "../layouts/UserLayout";
import SuccessPage from "../pages/Orders/SuccessPage";
import CancelPage from "../pages/Orders/CancelPage";
import ProfilePage from "../pages/User/ProfilePage";
import ProfileEditPage from "../pages/User/ProfileEditPage";
import OtpVerifyPage from "../pages/Auth/OtpVerifyPage";
import { ModeratorAuth } from "./protectedRoutes/ModeratorAuth";
import { ModeratorLayout } from "../layouts/ModeratorLayout";
import ModeratorSignUpPage from "../pages/Moderator/ModeratorSignUpPage";
import ModeratorHomePage from "../pages/Moderator/ModeratorHomePage";
import AddProductPage from "../pages/Moderator/AddProductPage";
import ProductsByModeratorPage from "../pages/Products/ProductsByModeratorPage";

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
                element: <ProductsPage />,  
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
            {
                path: "verify-otp",
                element: <OtpVerifyPage />,
            },
            {
                path: "moderator-login",
                element: <ModeratorSignUpPage/>
            }
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
                path: "products-by-category",
                element: <ProductByCategory />,
            },
            {
                path: "products",
                element: <ProductsPage />,  
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
                path: "cart",
                element: <CartPage />,
            },
            {
                path: "payment/success",
                element: <SuccessPage />,
            },
            {
                path: "payment/cancel",
                element: <CancelPage />,
            },
            {
                path: "profile",
                element: <ProfilePage />,
            },
            {
                path: "update-user",
                element: <ProfileEditPage/>
            },
            {
                path: "product/:productId",
                element: <ProductPage />,
            }
        ],
    },
    {
        path: "moderator",
        element: (
            <ModeratorAuth>
                <ModeratorLayout />
            </ModeratorAuth>
            ),
            children: [
                {
                    path: "",
                    element: <ModeratorHomePage/>
                },
                {
                    path: "add-product",
                    element: <AddProductPage/>
                },
                {
                    path: "show-products",
                    element: <ProductsByModeratorPage />,
                }
            ]
    }
]);
