import { createSlice } from "@reduxjs/toolkit";
import { setObjectKey } from "../../helpers";

export const sellInvoiceSlice = createSlice({
    name: 'sellInvoice',
    initialState: {
        isLoadingSellInvoices: true,
        sellInvoices: [],
        activeSellInvoice: null,
    },
    reducers: {
        onSetActiveSellInvoice: (state, {payload}) => {
            state.activeSellInvoice = payload;
        },
        onCreateSellInvoice: (state, {payload}) => {
            state.sellInvoices.push( setObjectKey( payload ) );
            state.activeSellInvoice = null;
        },
        onDeleteSellInvoice: (state, {payload}) => {
            state.sellInvoices.filter( si => si._id !== payload._id )
        },
        onLoadSellInvoices: (state, {payload}) => {
            state.isLoadingSellInvoices = false;
            payload.forEach( si => {
                const exist = state.sellInvoices.some( dbSi => dbSi._id === si._id );
                if ( !exist ) {
                    state.sellInvoices.push( setObjectKey( si ))
                }
            })
        },
        onResetSellInvoices: ( state ) => {
            state.sellInvoices = [];
        },
        onUpdateSellInvoice: (state, {payload}) => {
            state.sellInvoices =  state.sellInvoices.map( si => {
                if ( si._id === payload._id ) {
                    return setObjectKey( payload )
                };
                state.activeSellInvoice = null;
            })
        }
    }
});

export const {
    onSetActiveSellInvoice,
    onSetActiveProductType,
    onCreateSellInvoice,
    onDeleteSellInvoice,
    onLoadSellInvoices,
    onResetSellInvoices,
    onUpdateSellInvoice,
} = sellInvoiceSlice.actions;