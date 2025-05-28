import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    dataUser: null,
    entityType: null,
};

const dataUser = createSlice({
    name: 'dataUser',
    initialState,
    reducers: {
        setDataUser: (state, action) => {
            state.dataUser = action.payload;
        },
        clearDataUser : (state) => {
            state.dataUser = null;
        },
    },
});

export const {setDataUser, clearDataUser} = dataUser.actions;

export default dataUser.reducer;