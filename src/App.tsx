import React, {Suspense} from 'react';

import {IsAuth} from "./hooks/IsAuth";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import MainLayout from "./Pages/MainLayout";


function App() {

    const {isAuth: isAuthState, email} = IsAuth();

    return (
        <BrowserRouter>
            <Suspense fallback={<h1>Loading</h1>}>
                <Routes>
                    <Route path={"/"} element={<MainLayout/>}/>
                    <Route path={"Login"} element={<Login/>}/>
                    <Route path={"Signup"} element={<Signup/>}/>
                </Routes>
            </Suspense>
        </BrowserRouter>
    )
}

export default App;
