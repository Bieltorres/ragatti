import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isNavbarVisible: true, 
};

const navbarSlice = createSlice({
  name: 'navbar',
  initialState,
  reducers: {
    toggleNavbar: (state) => {
      state.isNavbarVisible = !state.isNavbarVisible;
    },
  },
});

export const { toggleNavbar } = navbarSlice.actions;

export default navbarSlice.reducer;
