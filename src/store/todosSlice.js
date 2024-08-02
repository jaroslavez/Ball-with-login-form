import { createSlice } from "@reduxjs/toolkit";

export const todosSlice = createSlice({
    name: "todos",
    initialState: null,
    reducers: {
        setTodos(state, {payload: todos}){
            return todos;
        }
    }
});

export const {setTodos} = todosSlice.actions;
export default todosSlice.reducer;

export function todosIdSelector(state) {
    return state.todos.id;
};

export function todosTitleSelector(state) {
    return state.todos.title;
}