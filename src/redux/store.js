import { configureStore } from '@reduxjs/toolkit'
import userSlice from '../components/userSlice';
import roleSlice from '../components/roleSlice';


export const store = configureStore({
    reducer: {
        users: userSlice,
        roles: roleSlice
    },
});