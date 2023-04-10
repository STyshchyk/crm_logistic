import {useAppDispatch, useAppSelector} from "../app/hooks";
import {selectUser, userSlice} from "../app/Slices/userSlice";
import React from "react";
import {createUserWithEmailAndPassword, FacebookAuthProvider, getAuth, signInWithPopup} from "firebase/auth";
import {addFireStore, app, collectionType, db, faceProvider, IFireUser, provider} from "../firebase";
import {useNavigate} from "react-router-dom";

export interface IsAuthHook {
    isAuth: boolean,
    email: string,
    handleLogin: () => void
}

export enum AuthType_ {
    Google,
    EmailPass,
    Face
}

interface AuthType {
    email?: string,
    password?: string,
    authType: AuthType_
}

export function useSignUp() {
    const {number, email, name} = useAppSelector(selectUser)
    const dispatch = useAppDispatch();
    const auth = getAuth(app)
    const {setUser, deleteUser} = userSlice.actions
    const navigate = useNavigate();

    function handleLogin({email, password, authType}: AuthType) {
        authType == AuthType_.Google && signInWithPopup(auth, provider)
            .then((cred) => {
                dispatch(setUser({
                    token: cred.user.refreshToken,
                    email: cred.user.email,
                    id: cred.user.uid,
                    name: cred.user.displayName,
                    number: cred.user.phoneNumber ? "" : cred.user.phoneNumber
                }))
                const writeUser: IFireUser = {
                    email: cred.user.email,
                    name: cred.user.displayName,
                    role: "Admin",
                    number: cred.user.phoneNumber
                }
                addFireStore({db: db, setCollection: collectionType.users, addUser: writeUser})
                    .then(r => console.log("Wrote firebase"))
                    .catch(e => console.log("Error writing firebase"))

                console.log("signed thru google")
                navigate("/");
            }).catch((error) => {
                console.log(error)
            })

        if (email != null && password != null) {
            authType == AuthType_.EmailPass && createUserWithEmailAndPassword(auth, email, password)
                .then((cred) => {

                    const writeUser: IFireUser = {
                        email: cred.user.email,
                        name: cred.user.displayName,
                        role: "Admin",
                        number: cred.user.phoneNumber
                    }
                    addFireStore({db: db, setCollection: collectionType.users, addUser: writeUser})
                        .then(r => console.log("Wrote firebase"))
                        .catch(e => console.log("Error writing firebase"))
                    navigate("/");
                }).catch((error) => {
                    console.log(error)
                    alert(error);
                })
        }
        authType == AuthType_.Face && signInWithPopup(auth, faceProvider)// Not implemented
            .then((result) => {
                // The signed-in user info.
                const user = result.user;
                navigate("/");
                // ...
            })
            .catch((error) => {
                // Handle Errors here.
                const errorCode = error.code;
                const errorMessage = error.message;
                // The email of the user's account used.
                const email = error.customData.email;
                // The AuthCredential type that was used.
                const credential = FacebookAuthProvider.credentialFromError(error);

                // ...
            });
    }

    return [
        !!email,
        email,
        handleLogin
    ] as const;
}
