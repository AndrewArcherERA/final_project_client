import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const signInUser = createAsyncThunk(
    "user/signInUser",
    async (data, thunkAPI) => {
        try{
            const url = 'http://localhost:8080/auth/signIn';
            let response = await axios.post(url, data);
            response = {data: response.data, type: data.user_type};
            return response;
        } catch (error) {
            if(error.status === 401) alert('Wrong email or password')
            return thunkAPI.rejectWithValue({error: error.message});
        }
    }
);

const initialState = {
    data: {},
    type: undefined,
    isLoggedIn: false,
    loginError: "",
    loading: false,
};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder
        .addCase(signInUser.pending, state => {
            state.loading = true;
            state.error = null;
        })
        .addCase(signInUser.fulfilled, (state, action) => {
            state.loading = false;
            state.error = null;
            state.data = action.payload.data;
            state.type = action.payload.type;
        })
        .addCase(signInUser.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        })
    }
});

export const {} = userSlice.actions;

export default userSlice.reducer;
