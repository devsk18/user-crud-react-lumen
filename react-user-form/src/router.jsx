import { Navigate, createBrowserRouter } from "react-router-dom";
import UserFormPage from "./pages/UserFormPage";
import DefaultLayout from "./components/layouts/DefaultLayout";
import HomePage from "./pages/HomePage";
import UsersIndexPage from "./pages/UsersIndexPage";
import UserShowDataPage from "./pages/UserShowDataPage";
import UserEditPage from "./pages/UserEditPage";

const router = createBrowserRouter([
    
    {
        path: '/',
        element: <DefaultLayout />,
        children: [
            {
                path: '/',
                element: <HomePage />
            },
            {
                path: '/users',
                element: <UsersIndexPage />
            },
            {
                path: '/user/:id',
                element: <UserShowDataPage />
            },
            {
                path: '/user/create',
                element: <UserFormPage />
            },
            {
                path: '/user/:id/edit',
                element: <UserEditPage />
            },
        ]
    }

]);


export default router;