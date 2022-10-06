import { createSlice } from '@reduxjs/toolkit';
import { setObjectKey } from '../../helpers';

export const inventorySlice = createSlice({
    name: 'inventory',
    initialState: {
       isLoadingProducts: true,
       products: [],
       activeProduct: null,
       activeProductType: ['fuels']
    },
    reducers: {
        onSetActiveProduct: (state, { payload }) => {
            state.activeProduct = payload;
        },
        onSetActiveProductType: (state, { payload }) => {
            console.log(payload)
            if ( !Array.isArray(payload) || payload.length === 1){
                state.activeProductType = [payload];
                state.products = [];
            } else {
                payload.forEach( f => {
                    const exits = state.activeProductType.some( e => e === f );
                    if ( !exits ) {
                        state.activeProductType.push(f);
                    }
                })
            }
            
        },
        onLoadPrducts: (state, { payload }) => {
            state.isLoadingProducts = false;
            payload.forEach( p => {
                const exist = state.products.some( dbP => dbP._id === p._id );
                if ( !exist ) {
                    state.products.push( setObjectKey( p ) );
                }
                return p;
            });
            state.activeProduct = null;
        }
    }
});

export const { 
    onSetActiveProduct,
    onSetActiveProductType,
    onLoadPrducts,
 } = inventorySlice.actions;