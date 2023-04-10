import React, {ReactNode, useEffect} from 'react';
import {IsAuth} from "../hooks/IsAuth";
import {useNavigate} from "react-router-dom";

interface IAuth {
    children: ReactNode;
}

const AuthProvider = ({children}: IAuth) => {
    const {isAuth, email} = IsAuth();

    return (
        <div className={"auth-container"}>
            {children}
        </div>
    );
};

export default AuthProvider;