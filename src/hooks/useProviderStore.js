import { useDispatch, useSelector } from 'react-redux';

import gasApi from '../api/gasApi';
import { onClearProviderErrorMessage, onCreateProvider, onDeleteProvider, onLoadProviders, onProviderError, onSetActiveProvider, onUpdateProvider } from '../store';

export const useProviderStore = () => {
    const dispatch = useDispatch(); 
    
    const {
        isLoadingProviders,
        activeProvider,
        providers,
        errorMessage,
    } = useSelector( state => state.providers );

    const clearErrorMessage = () => {
        dispatch( onClearProviderErrorMessage() );
    }

    const setActiveProvider = ( provider ) => {
        dispatch( onSetActiveProvider( provider ) );
    }

    const startDeleteProvider = async() => {
        try {
            await gasApi.delete(`/providers/${ activeProvider._id }`);
            dispatch( onDeleteProvider( activeProvider ) );
        } catch (error) {
            console.log(error)
            dispatch( onProviderError(error.response.data.msg) );
        }
    }

    const startLoadProviders = async() => {
        try {
            const { data } = await gasApi.get('/providers?limit=10');
            dispatch( onLoadProviders( data.providers ) );
        } catch (error) {
            console.log(error);
            dispatch( onProviderError(error.response.data.msg) );
        }
    }

    const startSavingProvider = async( provider ) => {
        if ( provider._id ) {
            try {
                const { data } = await gasApi.put(`/providers/${ provider._id }`, provider);
                console.log(data);
                dispatch( onUpdateProvider( data ) );
            } catch (error) {
                console.log(error);
                dispatch( onProviderError(error.response.data.msg) );
            }
        }else {
            try {
                const { data } = await gasApi.post('/providers', provider);
                dispatch( onCreateProvider( data ) );
            } catch (error) {
                console.log(error);
                dispatch( onProviderError(error.response.data.msg) );
            }
        }
    }


    return {
        //Properties
        isLoadingProviders,
        activeProvider,
        providers,
        errorMessage,
        //Methods
        clearErrorMessage,
        setActiveProvider,
        startDeleteProvider,
        startLoadProviders,
        startSavingProvider,
    }
}
