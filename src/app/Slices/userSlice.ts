import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {RootState} from "../store";

export interface IUser {
    token: string | null,
    id: string | null,
    name:  string | null,
    email: string | null ,
    number: string  | null

}

const initialState: IUser = {
    token: "",
    id: "",
    name: "",
    email: "",
    number: ""
}

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUser(state, action: PayloadAction<IUser>) {
            state.email = action.payload.email;
            state.number = action.payload.number;
            state.id = action.payload.id;
            state.name = action.payload.name;
            state.token = action.payload.token;
        },
        deleteUser(state) {
            state.email = "";
            state.number = "";
            state.token = "";
            state.id = "";
            state.name = "";
        }
    }
})
export const selectUser = (state: RootState) => state.user;
export const {setUser, deleteUser} = userSlice.actions
const userReducer = userSlice.reducer;
export default userReducer;