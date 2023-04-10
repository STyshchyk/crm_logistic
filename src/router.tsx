import {createBrowserRouter} from "react-router-dom";
import MainLayout from "./Pages/MainLayout";
import Trips from "./Pages/Trips";
import Users from "./Pages/Users";
import About from "./Pages/About";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import React from "react";

export enum routes {
    main = "/main",
    trips = "/main",
    users = "users",
    about = "about",
    login = "/login",
    signup = "/signup"
}

export const router = createBrowserRouter([
    {
        path: routes.main,
        element: <MainLayout/>,
        errorElement: <h1>Error element</h1>,
        children: [{
            index: true,
            element: <Trips/>
        }, {
            path: routes.users,
            element: <Users/>
        }, {
            path: routes.about,
            element: <About/>
        }]
    },
    {
        path: routes.login,
        element: <Login/>
    },
    {
        path: routes.signup,
        element: <Signup/>
    },


], {basename: "/crm_logistic/"})


