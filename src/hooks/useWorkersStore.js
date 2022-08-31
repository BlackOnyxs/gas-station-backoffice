import { useDispatch, useSelector } from 'react-redux';

import { onCreateWorker, onLoadWorkers, onSetActiveWorker } from '../store';
import gasApi from '../api/gasApi';

export const useWorkersStore = () => {
    const dispatch = useDispatch()

    const { workers, activeWorker, isLoadingWorkers } = useSelector( state =>  state.workers );

    const setActiveWorker = ( worker ) => {
        dispatch( onSetActiveWorker( worker ) );
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
        if ( worker._id ) {
            try {
                
            } catch (error) {
                console.log(error.response.data.msg)
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
    startLoadingWorkers,
    startSavingWorker,
  }
}
