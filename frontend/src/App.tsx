import React from "react";
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import ErrorPage from "./pages/error";
import RootLayout from "./layouts/root-layout";
import ClientList from "./pages/clients/list";
import RegisterPage from "./pages/authentication/register";
import Home from "./pages/home";
import ClientEdit from "./pages/clients/edit";
import Dashboard from "./pages/dashboard";
import AuthGate from "./components/auth-gate";
import {ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
    const router = createBrowserRouter([
        {
            path: "/",
            errorElement: <ErrorPage/>,
            children: [
                {
                    path: "admin",
                    element: <AuthGate><RootLayout/></AuthGate>,
                    children: [
                        {
                            path: "",
                            element: <Dashboard/>
                        },
                        {
                            path: "clients",
                            element: <ClientList/>,
                        },
                        {
                            path: "client/:id",
                            element: <ClientEdit/>
                        },
                        {
                            path: "clients/new",
                            element: <ClientEdit/>
                        }
                    ]
                },
                {
                    path: "register",
                    element: <RegisterPage/>,
                },
                {
                    path: "/",
                    element: <Home/>,
                },
            ]
        }
    ]);

    return (
        <>
            <RouterProvider router={router}/>
            <ToastContainer/>
        </>
    );
}

export default App;
