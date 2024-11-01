import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";
import {useSelector} from "react-redux";

export const getCartItems = createAsyncThunk(
    "cart/getCartItems",
    async (data, thunkAPI) => {
        try {
            const config = {
                headers: {
                    Authorization: data.token
                }
            }
            const url = "https://arrowsupplies.net/cart/getCartItems";
            let response = await axios.get(url, config);
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue({error: error.message});
        }
    }
);

export const deleteCartItem = createAsyncThunk(
    'cart/deleteCartItem',
    async (data, thunkAPI) => {
        try {
            const config = {
                headers: {
                    Authorization: data.token
                }
            }
            const url = `https://arrowsupplies.net/cart/deleteCartItem/${data.productID}`;
            await axios.delete(url, config);
            return data.productID;
        } catch (error) {
            return thunkAPI.rejectWithValue({error: error.message});
        }
    }
)

export const updateQuantity = createAsyncThunk(
    'cart/updateQuantity',
    async (data, thunkAPI) => {
        try {
            const config = {
                headers: {
                    Authorization: data.token
                }
            }
            const body = {
                token: data.token,
                productID: data.productID,
                quantity: data.quantity
            }
            const url = `https://arrowsupplies.net/cart/updateQuantity`;
            await axios.post(url, body, config);
            return {quantity: data.quantity, productID: data.productID}
        } catch (error) {
            return thunkAPI.rejectWithValue({error: error.message});
        }
    }
)

const initialState = {
    items: [],
    loading: false,
    error: ""
};

const cartSlice = createSlice(
    {
        name: 'cart',
        initialState,
        reducers: {
            // clearCart: (state) => {
            //     state.items = [];
            // }
        },
        extraReducers: (builder) => {
            builder
                .addCase(getCartItems.pending, (state) => {
                    state.loading = true;
                    state.error = null;
                })
                .addCase(getCartItems.fulfilled, (state, action) => {
                    state.loading = false;
                    state.error = null;
                    state.items = action.payload;
                })
                .addCase(getCartItems.rejected, (state, action) => {
                    state.loading = false;
                    state.error = action.error.message;
                })
                .addCase(deleteCartItem.pending, (state) => {
                    state.loading = true;
                    state.error = null;
                })
                .addCase(deleteCartItem.fulfilled, (state, action) => {
                    state.loading = false;
                    state.error = null;
                    state.items = state.items.filter((item) => item.id !== action.payload);
                })
                .addCase(deleteCartItem.rejected, (state, action) => {
                    state.loading = false;
                    state.error = action.error.message;
                })
                .addCase(updateQuantity.pending, (state) => {
                    state.loading = true;
                    state.error = null;
                })
                .addCase(updateQuantity.fulfilled, (state, action) => {
                    state.loading = false;
                    state.error = null;
                    state.items = state.items.map((item) => {
                        if (item.id === action.payload.productID) {
                            item.quantity = action.payload.quantity
                        }
                        return item
                    });
                })
                .addCase(updateQuantity.rejected, (state, action) => {
                    state.loading = false;
                    state.error = action.error.message;
                })
        }
    }
)

export const {} = cartSlice.actions;

export default cartSlice.reducer;