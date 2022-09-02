import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import gasApi from '../api/gasApi';
import { onCreateSchedule, onDeleteSchedule, onLoadSchedule, onSetActiveSchedule, onUpdateSchedule } from '../store';

export const useScheduleStore = () => {
    const dispatch = useDispatch();

    const { isLoadingSchedule, activeSchedule, schedule } = useSelector( state => state.schedule );

    const setActiveSchedule = ( schedule ) => {
        dispatch( onSetActiveSchedule( schedule ) );
    }

    const startDeleteSchedule = async( schedule ) => {
        try {
            await gasApi.delete( `/schedule/${ schedule._id }`);
            dispatch( onDeleteSchedule( schedule ) );
        } catch (error) {
            console.log(error)
        }
    }

    const starLoadingSchedule = async() => {
        try {
            const { data } = await gasApi.get('/schedule?limit=10');
            dispatch( onLoadSchedule( data.schedule ) );
        } catch (error) {
            console.log(error)
        }
    }

    const startSavingSchedule = async( schedule ) => {
        if ( schedule._id ) {
            try {
                const { data } = await gasApi.put(`/schedule/${ schedule._id }`, schedule);
                dispatch( onUpdateSchedule( data ) );
                console.log(data)
            } catch (error) {
                console.log(error)
            }
        } else {
            try {
                const { data } = await gasApi.post('/schedule', schedule);
                dispatch( onCreateSchedule( data ) );
                console.log(data)
            } catch (error) {
                console.log(error)
            }
        }
    }

    return {
        //Properties
        activeSchedule,
        isLoadingSchedule,
        schedule, 
        //Methods
        setActiveSchedule,
        startDeleteSchedule,
        starLoadingSchedule,
        startSavingSchedule,
    }
}
