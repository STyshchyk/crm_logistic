import {useAppDispatch} from "../app/hooks";
import {userSlice} from "../app/Slices/userSlice";
import React from "react";
import {getAuth, signOut} from "firebase/auth";
import {app} from "../firebase";
import {useNavigate} from "react-router-dom";

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

        if (auth.currentUser) {
            signOut(auth).then(() => {
                dispatch(deleteUser())
                navigate("login");
            }).catch((error) => {
                console.log("// An error happened.", error)
                setError({error: `${error}`, isError: true})
            });
        }
    }

    return {
        handleLogOut,
        isError: error.isError,
        errorMsg: error.error
    }
}
