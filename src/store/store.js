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
    socketsSlice,
    turnsSlice, 
    WorkersSlice,
    dashboardSlice
} from './';

export const store = configureStore({
    reducer: {
        auth: authSlice.reducer,
        buyInvoices: buyInvoiceSlice.reducer,
        clients: clientSlice.reducer,
        dashboard: dashboardSlice.reducer,
        fuels: fuelSlice.reducer,
        inventory: inventorySlice.reducer,
        oils: oilSlice.reducer,
        providers: providerSlice.reducer,
        schedule: schedulaSlice.reducer,
        turns: turnsSlice.reducer,
        sellInvoices: sellInvoiceSlice.reducer,
        sockets: socketsSlice.reducer,
        ui: uiSlice.reducer,
        workers: WorkersSlice.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false
    })
})