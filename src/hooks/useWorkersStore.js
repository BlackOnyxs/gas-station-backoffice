import { useDispatch, useSelector } from 'react-redux';

import { onCreateWorker, onDeleteWorker, onWorkerError, onLoadWorkers, onSetActiveWorker, onUpdateWorker, onClearWorkerErrorMessage } from '../store';
import gasApi from '../api/gasApi';

export const useWorkersStore = () => {
    const dispatch = useDispatch()

    const { workers, activeWorker, isLoadingWorkers, errorMessage } = useSelector( state =>  state.workers );

    const clearErrorMessage = () => {
        dispatch(onClearWorkerErrorMessage())
    }

    const setActiveWorker = ( worker ) => {
        dispatch( onSetActiveWorker( worker ) );
    }

    const startDeleteWorker = async( worker ) => {
        try {
            await gasApi.delete(`/users/${ worker.uid }`);
            dispatch( onDeleteWorker() );
        } catch (error) {
            console.log(error)
           dispatch( onWorkerError(error.response.data.msg) );
        }
        
    }

    const startLoadingWorkers = async(type) => {
        console.log(type)
        try {
            const { data } = await gasApi.get(`/users?limit=10&at=0&type=${type}`);
            dispatch( onLoadWorkers( data.users ) );
            // console.log(data.users)
            //TODO: pagination
        } catch (error) {
            console.log(error)
           dispatch( onWorkerError(error.response.data.msg) );
        }
    }

    const startSavingWorker = async( worker ) => {
        if ( worker.uid ) {
            try {
                console.log(worker)
                const { data } = await gasApi.put(`/users/${ worker.uid }`, worker);
                dispatch( onUpdateWorker( data ) );
            } catch (error) {
                console.log(error)
               dispatch( onWorkerError(error.response.data.msg) );
            }
        }else {
            try {
                const { data } = await gasApi.post('/users', worker);
                console.log(data)
                dispatch( onCreateWorker( data.user ) );
            } catch (error) {
                console.log(error.response.data.msg)
               dispatch( onWorkerError(error.response.data.msg) );
            }
        }
    }

  return {
    //Properties
    workers,
    activeWorker,
    isLoadingWorkers,
    errorMessage,
    //Methods
    setActiveWorker,
    startDeleteWorker,
    startLoadingWorkers,
    startSavingWorker,
    clearErrorMessage,
  }
}
