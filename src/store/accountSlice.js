import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchAccountData = createAsyncThunk(
    'account/fetchAccountDataStatus',
    async (data) => {
        const result = await axios.post('https://dummyjson.com/auth/login', data, {
            headers: {
                'Content-Type': 'application/json'
              }
        });

        return result.data;
    }
)

export const accountSlice = createSlice({
    name: "account",
    initialState: null,
    extraReducers(builder) {
        builder.addCase(fetchAccountData.fulfilled, (state, {payload: data}) => {
            return data;
        })
    } 
});

export const {setAccountData} = accountSlice.actions;
export default accountSlice.reducer;
