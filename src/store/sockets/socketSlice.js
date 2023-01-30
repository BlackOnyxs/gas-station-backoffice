import { createSlice } from '@reduxjs/toolkit';
import { setObjectKey } from '../../helpers';

export const socketsSlice = createSlice({
    name: 'sockets',
    initialState: {
        socketInvoices: [],
        isLoading: true,
        activeInvoice: null 
    },
    reducers: {
        onAddInvoice: (state, {payload}) => {
            state.socketInvoices.push( setObjectKey( payload) );
        },
        onLoadInvoices: (state, {payload}) => {
            state.isLoading = false;
            console.log(payload)
            payload.forEach( si => {
                const exist = state.socketInvoices.some( dbSi => dbSi._id === si._id );
                if ( !exist ) {
                    state.socketInvoices.push( setObjectKey( si ))
                }
            });
        },
        onSetActiveSocketInvoice: ( state, {payload}) => {
            state.activeInvoice = payload;
        }
    }
});

export const { 
    onAddInvoice,
    onLoadInvoices, 
    onSetActiveSocketInvoice,
} = socketsSlice.actions;