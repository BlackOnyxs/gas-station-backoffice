import { createSlice } from '@reduxjs/toolkit';
import { setObjectKey } from '../../helpers';

export const buyInvoiceSlice = createSlice({
    name: 'buyInvoice',
    initialState: {
        isLoadingBuyInvoice: true,
        buyInvoices: [],
        products: [],
        providers: [],
        activeBuyIvoice: null,
        activeProductType: ['fuels']
    },
    reducers: {
        onSetActiveBuyInvoice: (state, { payload }) => {
            state.activeBuyIvoice = payload;
        },
        onSetActiveProductTye: (state, { payload }) => {
            console.log(payload)
            if ( !Array.isArray(payload) || payload.length === 1){
                state.activeProductType = [payload];
                state.buyInvoices = []
            } else {
                payload.forEach( f => {
                    const exits = state.activeProductType.some( e => e === f);
                    if ( !exits ) {
                        state.activeProductType.push(f);
                    }
                })
            }
            
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
    onSetActiveProductTye,
    onCreateBuyInvoice,
    onDeleteBuyInvoice,
    onLoadBuyInvoices,
    onUpdateBuyInvoice,
    onSetProducts,
 } = buyInvoiceSlice.actions;