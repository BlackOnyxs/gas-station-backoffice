import { configureStore } from '@reduxjs/toolkit';
import { uiSlice, authSlice } from './';

export const store = configureStore({
    reducer: {
        auth: authSlice.reducer,
        ui: uiSlice.reducer,
    }
})