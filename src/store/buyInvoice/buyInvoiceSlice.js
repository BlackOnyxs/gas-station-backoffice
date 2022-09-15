import { createSlice } from '@reduxjs/toolkit';
import { setObjectKey } from '../../helpers';

export const buyInvoiceSlice = createSlice({
    name: 'buyInvoice',
    initialState: {
        isLoadingBuyInvoice: true,
        buyInvoices: [],
        products: [],
        providers: [],
        activeBuyIvoice: null
    },
    reducers: {
        onSetActiveBuyInvoice: (state, { payload }) => {
            state.activeBuyIvoice = payload;
        },
        onCreateBuyInvoice: (state, { payload }) => {
            state.buyInvoices.push( setObjectKey( payload ) );
            state.activeBuyIvoice = null;
        },
        onDeleteBuyInvoice: (state) => {
            state.buyInvoices = state.buyInvoices.filter( b => b._id !== state.activeBuyIvoice._id );
            state.activeBuyIvoice = null;
        },
        onLoadBuyInvoices: (state, { payload }) => {
            state.isLoadingBuyInvoice = false;
            if ( payload.length > 0 ) {
                if ( payload[payload.length-1].productType !== state.buyInvoices[state.buyInvoices.length-1] ) {
                    state.buyInvoices = [];
                }
            }
            payload.forEach( (buyInvoice) => {
                const exist = state.buyInvoices.some( dbBuyInvoice => dbBuyInvoice._id === buyInvoice._id );
                if ( !exist ) {
                    state.buyInvoices.push( setObjectKey( buyInvoice ) );
                }
            });
        },
        onUpdateBuyInvoice: (state, { payload}) => {
            state.buyInvoices = state.buyInvoices.map( buyInvoice => {
                if ( buyInvoice._id === payload._id ) {
                    return setObjectKey(payload);
                }
                return buyInvoice;
            });
            state.activeBuyIvoice = null;
        },
        onSetProducts: ( state, { payload } ) => {
            state.products = payload;
        }
    }
});

export const { 
    onSetActiveBuyInvoice,
    onCreateBuyInvoice,
    onDeleteBuyInvoice,
    onLoadBuyInvoices,
    onUpdateBuyInvoice,
    onSetProducts,
 } = buyInvoiceSlice.actions;