import { createSlice } from '@reduxjs/toolkit';
import { setObjectKey } from '../../helpers';

export const providerSlice = createSlice({
    name: 'provider',
    initialState: {
        isLoadingProviders: true,
        providers: [],
        activeProvider: null,
        errorMessage: undefined,
    },
    reducers: {
        onSetActiveProvider: (state, { payload }) => {
            state.activeProvider = payload
        },
        onCreateProvider: (state, { payload }) => {
            state.providers.push( setObjectKey( payload ) );
            state.activeProvider = null
        },
        onDeleteProvider: (state) => {
            state.providers = state.providers.filter( p => p._id !== state.activeProvider._id );
            state.activeProvider = null
        },
        onLoadProviders: (state, { payload }) => {
            state.isLoadingProviders = false;
            payload.forEach( provider => {
                const exist = state.providers.some( dbProvider => dbProvider._id === provider._id );
                if ( !exist ) {
                    state.providers.push( setObjectKey( provider ) );
                }
            });
        },
        onUpdateProvider: (state, { payload }) => {
            state.providers = state.providers.map( provider => {
                if ( provider._id === payload._id ) {
                    return setObjectKey(payload);
                }
                return provider;
            })
        },
        onProviderError: (state, {payload}) => {
            state.errorMessage = payload;
        },
        onClearProviderErrorMessage: ( state ) => {
            state.errorMessage = undefined;
        }
    }
});

export const { 
    onSetActiveProvider,
    onCreateProvider,
    onDeleteProvider,
    onLoadProviders,
    onUpdateProvider,
    onProviderError,
    onClearProviderErrorMessage,
 } = providerSlice.actions;