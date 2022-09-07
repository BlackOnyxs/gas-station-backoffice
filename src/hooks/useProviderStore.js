import { useDispatch, useSelector } from 'react-redux';

import gasApi from '../api/gasApi';
import { onCreateProvider, onDeleteProvider, onLoadProviders, onSetActiveProvider, onUpdateProvider } from '../store';


export const useProviderStore = () => {
    const dispatch = useDispatch();
    
    const {
        isLoadingProviders,
        activeProvider,
        providers,
    } = useSelector( state => state.providers );

    const setActiveProvider = ( provider ) => {
        dispatch( onSetActiveProvider( provider ) );
    }

    const startDeleteProvider = async() => {
        try {
            await gasApi.delete(`/providers/${ activeProvider._id }`);
            dispatch( onDeleteProvider( activeProvider ) );
        } catch (error) {
            console.log(error)
        }
    }

    const startLoadProviders = async() => {
        try {
            const { data } = await gasApi.get('/providers?limit=10');
            dispatch( onLoadProviders( data.providers ) );
        } catch (error) {
            console.log(error)
        }
    }

    const startSavingProvider = async( provider ) => {
        if ( provider._id ) {
            try {
                const { data } = await gasApi.put(`/providers/${ provider._id }`, provider);
                console.log(data);
                dispatch( onUpdateProvider( data ) );
            } catch (error) {
                console.log(error)
            }
        }else {
            try {
                const { data } = await gasApi.post('/providers', provider);
                dispatch( onCreateProvider( data ) );
            } catch (error) {
                console.log(error)
            }
        }
    }


    return {
        //Properties
        isLoadingProviders,
        activeProvider,
        providers,
        //Methods
        setActiveProvider,
        startDeleteProvider,
        startLoadProviders,
        startSavingProvider,
    }
}
