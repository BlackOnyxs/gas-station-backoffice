import { configureStore } from '@reduxjs/toolkit';
import { uiSlice, authSlice, WorkersSlice, turnsSlice } from './';

export const store = configureStore({
    reducer: {
        auth: authSlice.reducer,
        turns: turnsSlice.reducer,
        ui: uiSlice.reducer,
        workers: WorkersSlice.reducer,
    }
})