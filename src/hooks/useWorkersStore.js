import { useDispatch, useSelector } from 'react-redux';

import { onCreateWorker, onDeleteWorker, onLoadWorkers, onSetActiveWorker, onUpdateWorker } from '../store';
import gasApi from '../api/gasApi';

export const useWorkersStore = () => {
    const dispatch = useDispatch()

    const { workers, activeWorker, isLoadingWorkers } = useSelector( state =>  state.workers );

    const setActiveWorker = ( worker ) => {
        dispatch( onSetActiveWorker( worker ) );
    }

    const startDeleteWorker = async( worker ) => {
        try {
            const resp = await gasApi.delete(`/users/${ worker.uid }`);
            dispatch( onDeleteWorker() );
        } catch (error) {
            console.log(error)
        }
        
    }

    const startLoadingWorkers = async() => {
        try {
            const { data } = await gasApi.get('/users?limit=10');
            dispatch( onLoadWorkers( data.users ) );
            //TODO: pagination
        } catch (error) {
            console.log(error.response.data.msg)
        }
    }

    const startSavingWorker = async( worker ) => {
        if ( worker.uid ) {
            console.log(worker.uid)
            try {
                const { data } = await gasApi.put(`/users/${ worker.uid }`, worker);
                dispatch( onUpdateWorker( data ) );
            } catch (error) {
                console.log(error)
            }
        }else {
            try {
                const { data } = await gasApi.post('/users', worker);
                console.log(data)
                dispatch( onCreateWorker( data.user ) );
            } catch (error) {
                console.log(error.response.data.msg)
            }
        }
    }

  return {
    //Properties
    workers,
    activeWorker,
    isLoadingWorkers,
    //Methods
    setActiveWorker,
    startDeleteWorker,
    startLoadingWorkers,
    startSavingWorker,
  }
}
