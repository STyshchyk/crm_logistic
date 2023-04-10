import {useAppDispatch} from "../app/hooks";
import {userSlice} from "../app/Slices/userSlice";
import React from "react";
import {getAuth, signOut} from "firebase/auth";
import {app} from "../firebase";
import {useNavigate} from "react-router-dom";
import {routes} from "../router";

export interface IsAuthHook {
    isError: boolean
    errorMsg: string | null
    handleLogOut: () => void
}


export function useLogOut(): IsAuthHook {
    const dispatch = useAppDispatch();
    const [error, setError] = React.useState({error: "", isError: false})
    const auth = getAuth(app)
    const {setUser, deleteUser} = userSlice.actions
    const navigate = useNavigate();

    function handleLogOut() {
        console.log(auth.currentUser)
        if (auth.currentUser) {
            signOut(auth).then(() => {
                dispatch(deleteUser())
                navigate(`${routes.login}`)
            }).catch((error) => {
                console.log("// An error happened.", error)
                setError({error: `${error}`, isError: true})
            });
        }else{
            dispatch(deleteUser())
            navigate(`${routes.login}`)
        }

    }

    return {
        handleLogOut,
        isError: error.isError,
        errorMsg: error.error
    }
}
