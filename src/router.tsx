import {createBrowserRouter} from "react-router-dom";
import MainLayout from "./Pages/MainLayout";
import Trips from "./Pages/Trips";
import Users from "./Pages/Users";
import About from "./Pages/About";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import React from "react";

export const router = createBrowserRouter([
    {
        path: "/main",
        element: <MainLayout/>,
        errorElement: <h1>Error element</h1>,
        children: [{
            index : true,
            element: <Trips/>
        }, {
            path: "users",
            element: <Users/>
        }, {
            path: "about",
            element: <About/>
        }]
    },
    {
        path: "login",
        element: <Login/>
    },
    {
        path: "signup",
        element: <Signup/>
    },
    {
        path: "/*",
        element: <Login/>
    }

], {basename:"/crm_logistic/"})


export  enum routes{
    main="/main",
    trips="trips",
    users="users",
    about="about",
    login="login",
    signup="signup"
}