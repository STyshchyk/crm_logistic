import React from 'react';
import {createRoot} from 'react-dom/client';
import {Provider} from 'react-redux';
import {store} from './app/store';
import './Apps.scss';
import reportWebVitals from './reportWebVitals';
import {ThemeProvider} from "react-bootstrap"
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import MainLayout from "./Pages/MainLayout";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import "./Apps.scss"
import './index.scss';
import 'bootstrap/scss/bootstrap.scss';
import About from "./Pages/About";
import Users from "./Pages/Users";
import Trips from "./Pages/Trips";

const container = document.getElementById('root')!;
const root = createRoot(container);

const router = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout/>,
        errorElement: <h1>Error element</h1>,
        children: [{
            path: "/",
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
        path: "/login",
        element: <Login/>
    },
    {
        path: "/signup",
        element: <Signup/>
    }
], {basename:"/crm_logistic"})
root.render(
    <React.StrictMode>
        <Provider store={store}>
            <ThemeProvider
                breakpoints={['xl', 'lg', 'md', 'xs']}
                minBreakpoint="xs"
            >
                <RouterProvider router={router} />
            </ThemeProvider>
        </Provider>
    </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
