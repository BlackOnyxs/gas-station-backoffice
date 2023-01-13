import { createSlice } from '@reduxjs/toolkit';
import { setObjectKey } from '../../helpers';

export const buyInvoiceSlice = createSlice({
    name: 'buyInvoice',
    initialState: {
        isLoadingBuyInvoice: true,
        buyInvoices: [],
        activeBuyInvoice: null,
        errorMessage: undefined,
    },
    reducers: {
        onSetActiveBuyInvoice: (state, { payload }) => {
            state.activeBuyInvoice = payload;
        },
        onCreateBuyInvoice: (state, { payload }) => {
            state.buyInvoices.push( setObjectKey( payload ) );
            state.activeBuyInvoice = null;
        },
        onDeleteBuyInvoice: (state) => {
            state.buyInvoices = state.buyInvoices.filter( b => b._id !== state.activeBuyInvoice._id );
            state.activeBuyInvoice = null;
        },
        onLoadBuyInvoices: (state, { payload }) => {
            state.isLoadingBuyInvoice = false;
            payload.forEach( (buyInvoice) => {
                const exist = state.buyInvoices.some( dbBuyInvoice => dbBuyInvoice._id === buyInvoice._id );
                if ( !exist ) {
                    state.buyInvoices.push( setObjectKey( buyInvoice ) );
                }
            });
        },
        onResetBuyInvoices: ( state ) => {
            state.buyInvoices = [];
        },
        onUpdateBuyInvoice: (state, { payload}) => {
            state.buyInvoices = state.buyInvoices.map( buyInvoice => {
                if ( buyInvoice._id === payload._id ) {
                    return setObjectKey(payload);
                }
                return buyInvoice;
            });
            state.activeBuyInvoice = null;
        },
        onBuyInvoiceError: (state, {payload}) => {
            state.errorMessage = payload;
        },
        onClearBuyInvoiceErrorMessage: ( state ) => {
            state.errorMessage = undefined;
        }
        
    }
});

export const { 
    onSetActiveBuyInvoice,
    onCreateBuyInvoice,
    onDeleteBuyInvoice,
    onLoadBuyInvoices,
    onUpdateBuyInvoice,
    onResetBuyInvoices,
    onBuyInvoiceError,
    onClearBuyInvoiceErrorMessage,
 } = buyInvoiceSlice.actions;