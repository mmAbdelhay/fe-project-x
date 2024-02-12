import {Navigate, useRoutes} from "react-router-dom";
import NotFound from "../modules/NotFound/NotFound.page.tsx";
import {checkIfLoggedIn} from "../services/checkIfLoggedIn.ts";
import Login from "../modules/Auth/Login/Login.component.tsx";
import Home from "../modules/Home/Home.page.tsx";
import Register from "../modules/Auth/Register/Register.component.tsx";
import Projects from "../modules/Projects/Projects.component.tsx";


const Routes = () => {
    if (!checkIfLoggedIn()) {
        return useRoutes([
            {
                path: "/register",
                element: <Register/>,
            },
            {
                path: "/login",
                element: <Login/>,
            },
            {
                path: "*",
                element: <Navigate to="/login"/>,
            },
        ])

    }

    return useRoutes([
        {
            path: "projects",
            element: <Projects/>,
        },
        {
            path: "",
            element: <Home/>,
        },
        {
            path: "*",
            element: <Navigate to="/404"/>,
        },
        {
            path: "404",
            element: <NotFound/>,
        },
    ]);
};

export default Routes;