import { useDispatch, useSelector } from 'react-redux'
import gasApi from '../api/gasApi';
import { onCreateClient, onDeleteClient, onLoadClients, onSetActiveClient, onUpdateClient } from '../store';

export const useClientStore = () => {
    const dispatch = useDispatch();
    const {
        isLoadingClients,
        clients,
        activeClient,
    } = useSelector( state => state.clients );

    const setActiveClient = ( client ) => {
        dispatch( onSetActiveClient( client ) );
    }

    const startDeleteClient = async() => {
        try {
            await gasApi.delete(`/clients/${ activeClient._id }`);
            dispatch( onDeleteClient( activeClient ) );
        } catch (error) {
            console.log(error)
        }
    }

    const startLoadClients = async() => {
        try {
            const { data } = await gasApi.get('/clients?limit=10');
            dispatch( onLoadClients( data.clients ) );
        } catch (error) {
            console.log(error)
        }
    }

    const startSavingClient = async( client ) => {
        if ( client._id ) {
            try {
                const { data } = await gasApi.put(`/clients/${ client._id }`);
                console.log(data);
            // dispatch( onUpdateClient( data ) );
            } catch (error) {
                console.log(error)
            }
        } else {
            try {
                const { data } = await gasApi.post('/clients');
                console.log(data);
                // dispatch( onCreateClient( data ) );
            } catch (error) {
                console.log(error)
            }
        }
    }

    return {
        // Properties
        isLoadingClients,
        clients,
        activeClient,
        //Methods
        setActiveClient,
        startDeleteClient,
        startLoadClients,
        startSavingClient,
    }
}
