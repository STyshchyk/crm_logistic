import {useAppDispatch, useAppSelector} from "../app/hooks";
import {selectUser, userSlice} from "../app/Slices/userSlice";
import React from "react";
import {onAuthStateChanged} from "firebase/auth";
import {auth} from "../firebase";
import {useNavigate} from "react-router-dom";
import {routes} from "../router";

export interface IsAuthHook {
    isAuth: boolean,
    email: string,
    handleLogin: () => void
}

export enum AuthType_ {
    Google,
    EmailPass,
    PhoneNumber
}

interface AuthType {
    email?: string,
    password?: string,
    authType: AuthType_
}


export function IsAuth():
    { email?: string | null, isAuth: boolean } {
    const {number, email: sliceEmail, name} = useAppSelector(selectUser)
    const dispatch = useAppDispatch();
    const {setUser, deleteUser} = userSlice.actions
    const navigate = useNavigate();

    React.useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                dispatch(setUser({
                    token: user.refreshToken,
                    email: user.email,
                    id: user.uid,
                    name: user.displayName,
                    number: user.phoneNumber,
                }))
                navigate(`${routes.main}`)
            }else  navigate(`${routes.login}`)
        })
    }, [])

    return {
        isAuth: !!sliceEmail,
        email: sliceEmail
    }
}

