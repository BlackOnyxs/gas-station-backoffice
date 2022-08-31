import { configureStore } from '@reduxjs/toolkit';
import { uiSlice, authSlice, WorkersSlice } from './';

export const store = configureStore({
    reducer: {
        auth: authSlice.reducer,
        ui: uiSlice.reducer,
        workers: WorkersSlice.reducer,
    }
})