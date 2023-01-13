import { useDispatch, useSelector } from 'react-redux'
import gasApi from '../api/gasApi';
import { onClearClientErrorMessage, onClientError, onCreateClient, onDeleteClient, onLoadClients, onSetActiveClient, onUpdateClient } from '../store';

export const useClientStore = () => {
    const dispatch = useDispatch();
    const {
        isLoadingClients,
        clients,
        activeClient,
        errorMessage,
    } = useSelector( state => state.clients );

    const clearErrorMessage = () => {
        dispatch( onClearClientErrorMessage() )
    }

    const setActiveClient = ( client ) => {
        dispatch( onSetActiveClient( client ) );
    }

    const startDeleteClient = async() => {
        try {
            await gasApi.delete(`/clients/${ activeClient._id }`);
            dispatch( onDeleteClient( activeClient ) );
        } catch (error) {
            console.log(error)
            dispatch( onClientError(error.response.data.msg) );
        }
    }

    const startLoadClients = async() => {
        try {
            const { data } = await gasApi.get('/clients?limit=10');
            dispatch( onLoadClients( data.clients ) );
        } catch (error) {
            console.log(error);
            dispatch( onClientError(error.response.data.msg) );
        }
    }

    const startSavingClient = async( client ) => {
        if ( client._id ) {
            try {
                const { data } = await gasApi.put(`/clients/${ client._id }`, client);
                console.log(data);
                dispatch( onUpdateClient( data ) );
            } catch (error) {
                console.log(error);
                dispatch( onClientError(error.response.data.msg) );
            }
        } else {
            try {
                const { data } = await gasApi.post('/clients', client);
                console.log(data);
                dispatch( onCreateClient( data ) );
            } catch (error) {
                console.log(error);
                dispatch( onClientError(error.response.data.msg) );
            }
        }
    }

    return {
        // Properties
        isLoadingClients,
        clients,
        activeClient,
        errorMessage,
        //Methods
        clearErrorMessage,
        setActiveClient,
        startDeleteClient,
        startLoadClients,
        startSavingClient,
    }
}
