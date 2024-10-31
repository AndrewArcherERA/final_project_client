import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";

export const signInUser = createAsyncThunk(
    "user/signInUser",
    async (data, thunkAPI) => {
        try {
            const url = "http://localhost:8080/auth/signIn";
            let response = await axios.post(url, data);
            response = {data: response.data, type: data.user_type};
            return response;
        } catch (error) {
            return thunkAPI.rejectWithValue({error: error.message});
        }
    }
);

export const updateUserInfo = createAsyncThunk(
    "user/updateUserInfo",
    async (data, thunkAPI) => {
        const {f_name, l_name, email, phone, company_name, user_type, token, userID} = data;
        try {
            const url = "http://localhost:8080/account/updateUserInfo";
            const config = {
                headers: {
                    Authorization: token,
                },
            };
            const body = {
                f_name: f_name,
                l_name: l_name,
                email: email,
                phone: phone,
                company_name: company_name,
                user_type: user_type,
                userID: userID
            };
            let response = await axios.put(url, body, config);
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue({error: error.message});
        }
    }
);

const initialState = {
    data: {},
    type: undefined,
    loginError: "",
    loading: false,
};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        logout: (state) => {
            state.data = {};
            state.type = undefined;

        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(signInUser.pending, (state) => {
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
            .addCase(updateUserInfo.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateUserInfo.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null;
                state.data.f_name = action.payload.f_name;
                state.data.l_name = action.payload.l_name;
                state.data.email = action.payload.email;
                state.data.phone = action.payload.phone;
                state.data.company_name = action.payload.company_name;
            })
            .addCase(updateUserInfo.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    },
});

export const {logout} = userSlice.actions;

export default userSlice.reducer;
