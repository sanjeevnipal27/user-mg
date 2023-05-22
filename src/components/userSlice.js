import { createSlice } from "@reduxjs/toolkit";

const initialState = [
    {
        id: 1001,
        name: "Sanjeevni",
        email: "sanjeevni@ball.com",
        username: "s.pal",
        mobile: "4323443234",
        roleKey: 101,
        password: "palSanju"
    }
];

const userSlice = createSlice({
    name: "users",
    initialState,
    reducers: {
        add: (state, action) => {
            const maxId = state.length ? Math.max(...state.map((o) => o.id)) : 1001;
            state.push({ ...action.payload, id: maxId + 1 });
        },
        remove: (state, action) => {
            const index = state.findIndex((u) => u.id === action.payload);
            state.splice(index, 1);
        },
        update: (state, action) => {
            const index = state.findIndex((u) => u.id === action.payload.id);
            state[index] = action.payload;
        },
    }
});

// Action creators are generated for each case reducer function
export const { add, remove, update } = userSlice.actions;

export default userSlice.reducer;