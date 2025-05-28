import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    name: null,
    isAdmin: false
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.name = action.payload.name;
            state.isAdmin = action.payload.name === 'admin';
        },
        clearUser: (state) => {
            state.name = null;
            state.isAdmin = false;
        }
    }
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer; 