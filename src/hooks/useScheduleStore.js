import { useDispatch, useSelector } from 'react-redux'
import gasApi from '../api/gasApi';
import { onClearScheduleErrorMessage, onCreateSchedule, onDeleteSchedule, onLoadSchedule, onScheduleError, onSetActiveSchedule, onUpdateSchedule } from '../store';

export const useScheduleStore = () => {
    const dispatch = useDispatch();

    const { isLoadingSchedule, activeSchedule, schedule, errorMessage } = useSelector( state => state.schedule );

    const clearErrorMessage = () => {
        dispatch( onClearScheduleErrorMessage() );
    }

    const setActiveSchedule = ( schedule ) => {
        dispatch( onSetActiveSchedule( schedule ) );
    }

    const startDeleteSchedule = async( schedule ) => {
        console.log(schedule)
        try {
            // const { data } = await gasApi.delete( `/schedule/${ schedule._id }`);
            await gasApi.post( `/schedule/delete`, schedule);
            // console.log(data)
            dispatch( onDeleteSchedule( schedule ) );
        } catch (error) {
            console.log(error)
            dispatch( onScheduleError(error.response.data.msg) )
        }
    }

    const starLoadingSchedule = async() => {
        try {
            const { data } = await gasApi.get('/schedule?limit=30');
            dispatch( onLoadSchedule( data.schedule ) );
            // console.log(data.schedule)
        } catch (error) {
            console.log(error)
            dispatch( onScheduleError(error.response.data.msg) )
        }
    }

    const startSavingSchedule = async( schedule ) => {
        console.log(schedule)
        if ( schedule._id ) {
            try {
                const { data } = await gasApi.put(`/schedule/${ schedule._id }`, schedule);
                dispatch( onUpdateSchedule( data ) );
            } catch (error) {
                console.log(error)
                dispatch( onScheduleError(error.response.data.msg) )
            }
        } else {
            try {
                const { data } = await gasApi.post('/schedule', schedule);
                dispatch( onCreateSchedule( data ) );
                console.log(data)
            } catch (error) {
                console.log(error)
                dispatch( onScheduleError(error.response.data.msg) )
            }
        }
    }

    return {
        //Properties
        activeSchedule,
        isLoadingSchedule,
        schedule, 
        errorMessage,
        //Methods
        setActiveSchedule,
        startDeleteSchedule,
        starLoadingSchedule,
        startSavingSchedule,
        clearErrorMessage,
    }
}
