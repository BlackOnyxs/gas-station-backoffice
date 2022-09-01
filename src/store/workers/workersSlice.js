import { createSlice } from '@reduxjs/toolkit';
import { setObjectKey } from '../../helpers/setObjectKey';

export const WorkersSlice = createSlice({
    name: 'Workers',
    initialState: {
        isLoadingWorkers: true,
        workers: [],
        activeWorker: null
    },
    reducers: {
        onSetActiveWorker: (state, { payload }) => {
            state.activeWorker = payload
        },
        onCreateWorker: (state, { payload }) => {
            state.workers.push( setObjectKey(payload) );
            state.activeWorker = null;
        },
        onDeleteWorker: (state) => {
            if ( state.activeWorker ) {
                state.workers = state.workers.filter( worker => worker.uid !== state.activeWorker.uid );
                state.activeWorker = null;
            }
        },
        onLoadWorkers: (state, { payload }) => {
            state.isLoadingWorkers = false;
            payload.forEach( worker => {
                const exist = state.workers.some( dbWorker => dbWorker.uid === worker.uid );
                if ( !exist ) {
                    state.workers.push( setObjectKey(worker) );
                }
                
            });
        },
        onUpdateWorker: (state, { payload }) => {
            state.workers = state.workers.map( worker => {
                if ( worker.uid === payload.uid ) {
                    return setObjectKey(payload);
                }
                return worker;
            });
        }
    }
});

export const {  
    onSetActiveWorker,
    onCreateWorker,
    onDeleteWorker,
    onLoadWorkers,
    onUpdateWorker,
} = WorkersSlice.actions;