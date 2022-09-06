import { configureStore } from '@reduxjs/toolkit';
import { uiSlice, authSlice, WorkersSlice, turnsSlice, schedulaSlice } from './';

export const store = configureStore({
    reducer: {
        auth: authSlice.reducer,
        schedule: schedulaSlice.reducer,
        turns: turnsSlice.reducer,
        ui: uiSlice.reducer,
        workers: WorkersSlice.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false
    })
})