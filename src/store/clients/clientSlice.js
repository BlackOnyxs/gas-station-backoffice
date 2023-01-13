import { createSlice } from '@reduxjs/toolkit';
import { setObjectKey } from '../../helpers';

export const clientSlice = createSlice({
    name: 'client',
    initialState: {
        isLoadingClients: true,
        clients: [],
        activeClient: null,
        errorMessage: undefined,
    },
    reducers: {
        onSetActiveClient: (state, { payload }) => {
            state.activeClient = payload
        },
        onCreateClient: (state, { payload }) => {
            state.clients.push( setObjectKey( payload ) );
            state.activeClient = null
        },
        onDeleteClient: (state) => {
            state.clients = state.clients.filter( p => p._id !== state.activeClient._id );
            state.activeClient = null
        },
        onLoadClients: (state, { payload }) => {
            state.isLoadingClients = false;
            payload.forEach( client => {
                const exist = state.clients.some( dbClient => dbClient._id === client._id );
                if ( !exist ) {
                    state.clients.push( setObjectKey( client ) );
                }
            });
        },
        onUpdateClient: (state, { payload }) => {
            state.clients = state.clients.map( client => {
                if ( client._id === payload._id ) {
                    return setObjectKey(payload);
                }
                return client;
            });
        },
        onClientError: (state, {payload}) => {
            state.errorMessage = payload;
        },
        onClearClientErrorMessage: ( state ) => {
            state.errorMessage = undefined;
        }
    }
});

export const { 
    onSetActiveClient,
    onCreateClient,
    onDeleteClient,
    onLoadClients,
    onUpdateClient,
    onClientError,
    onClearClientErrorMessage,
 } = clientSlice.actions;