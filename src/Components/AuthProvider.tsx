import React, {ReactNode, useEffect} from 'react';
import {IsAuth} from "../hooks/IsAuth";
import {useNavigate} from "react-router-dom";
import {routes} from "../router";

interface IAuth {
    children: ReactNode;
}

const AuthProvider = ({children}: IAuth) => {
    const {isAuth, email} = IsAuth();
    const navigate = useNavigate()
    React.useEffect(()=>{
        if (isAuth)navigate(`${routes.main}`)
    })
    return (
        <div className={"auth-container"}>
            {children}
        </div>
    );
};

export default AuthProvider;