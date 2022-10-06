import { configureStore } from '@reduxjs/toolkit';
import { 
    authSlice,
    buyInvoiceSlice,
    clientSlice,
    fuelSlice, 
    inventorySlice,
    uiSlice, 
    oilSlice,
    providerSlice, 
    sellInvoiceSlice,
    schedulaSlice, 
    turnsSlice, 
    WorkersSlice, 
} from './';

export const store = configureStore({
    reducer: {
        auth: authSlice.reducer,
        buyInvoices: buyInvoiceSlice.reducer,
        clients: clientSlice.reducer,
        fuels: fuelSlice.reducer,
        inventory: inventorySlice.reducer,
        oils: oilSlice.reducer,
        providers: providerSlice.reducer,
        schedule: schedulaSlice.reducer,
        turns: turnsSlice.reducer,
        sellInvoices: sellInvoiceSlice.reducer,
        ui: uiSlice.reducer,
        workers: WorkersSlice.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false
    })
})