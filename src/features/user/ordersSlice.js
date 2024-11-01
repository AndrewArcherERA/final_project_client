import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";
import {getCartItems} from "./cartSlice";

export const getOrders = createAsyncThunk(
    'orders/getOrders',
    async (data, thunkAPI) => {
        try {
            const url = `https://arrowsupplies.net/orders/getOrders/${data.user_type}`;
            const config = {
                headers: {
                    Authorization: data.token
                }
            }
            const response = await axios.get(url, config);
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue({error: error.message});
        }
    }
)

const initialState = {
    list: [],
    error: "",
    loading: false,
};

const orderSlice = createSlice({
    name: 'orders',
    initialState,
    reducers: {
        updateStatus: (state, action) => {
            state.list.forEach((order) => {
                if (order.id === action.payload.order_id)
                    order.delivery_status = 'received';
            })
        },
        updateStatusShipped: (state, action) => {
            state.list.forEach((order) => {
                if (order.id === action.payload.orderId)
                    order.delivery_status = 'shipped';
            })
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getOrders.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getOrders.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null;
                state.list = action.payload;
            })
            .addCase(getOrders.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
    }
})

export const {updateStatus, updateStatusShipped} = orderSlice.actions;

export default orderSlice.reducer;