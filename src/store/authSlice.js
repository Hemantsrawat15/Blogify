import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    status: false,
    userData: null
}


const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers:{ // exported using export default authSlice.reducer;
        // login,logout are actions of authSlice which are exported using export const {login,logout} = authSlice.actions; 
        login: (state,action) => {
            state.status = true;
            state.userData = action.payload.userData;
        },
        logout: (state,action)=>{
            state.status = false;
            state.userData = null;
        }
    }
});

export const {login,logout} = authSlice.actions;
export default authSlice.reducer;