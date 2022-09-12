import { configureStore } from '@reduxjs/toolkit';
import { 
    authSlice,
    buyInvoiceSlice,
    fuelSlice, 
    uiSlice, 
    oilSlice,
    providerSlice, 
    schedulaSlice, 
    turnsSlice, 
    WorkersSlice, 
} from './';

export const store = configureStore({
    reducer: {
        auth: authSlice.reducer,
        buyInvoices: buyInvoiceSlice.reducer,
        fuels: fuelSlice.reducer,
        oils: oilSlice.reducer,
        providers: providerSlice.reducer,
        schedule: schedulaSlice.reducer,
        turns: turnsSlice.reducer,
        ui: uiSlice.reducer,
        workers: WorkersSlice.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false
    })
})