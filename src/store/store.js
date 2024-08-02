import { configureStore } from "@reduxjs/toolkit";
import todosReducer from "./todosSlice";
import accountSlice from "./accountSlice";

export const store = configureStore({
    reducer: {
        todos: todosReducer,
        account: accountSlice,
    },
})