import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const initialState = {
    data: {
        id: "",
        email: "",
        firstName: "",
        lastName: "",
        companyName: '',
        phone: ''
    },
    isLoggedIn: false,
    loginError: '',
    loading: false,
};

const consumerSlice = createSlice({
    name: 'consumer',
    initialState,
    reducers: {},
    // extraReducers: builder => {
    //     builder
    //     .
    // }
});

export const {} = consumerSlice.actions;

export default consumerSlice.reducer;
