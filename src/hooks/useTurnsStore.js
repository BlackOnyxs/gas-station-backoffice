import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';

import gasApi from '../api/gasApi';
import { 
    onClearTurnErrorMessage, 
    onCreateTurn, 
    onDeleteTurn, 
    onLoadTurns, 
    onSetActiveTurn, 
    onUpdateTurn, 
    onTurnError 
} from '../store';


export const useTurnsStore = () => {
    const dispatch = useDispatch();

    const { isLoadingTurns, turns, activeTurn, errorMessage } = useSelector( state => state.turns );

    const clearErrorMessage = () => {
        dispatch( onClearTurnErrorMessage() );
    }

    const setActiveTurn = ( turn ) => {
        dispatch( onSetActiveTurn( turn ) );
    }

    const startDeleteTurn = async( turn ) => {
        try {
            await gasApi.delete(`/turns/${ turn._id }`);
            dispatch( onDeleteTurn() );
        } catch (error) {
            console.log(error)
            dispatch( onTurnError(error.response.data.msg) );
        }
    }

    const startLoadingTurns = async() => {
        try {
            const { data } = await gasApi.get('/turns?limit=10');
            dispatch( onLoadTurns( data.turns ) );
        } catch (error) {
            console.log(error)
            dispatch( onTurnError(error.response.data.msg) );
        }
    }

    const startSavingTurn = async( turn ) => {
        const format = 'HH:mm:ss';
        turn.startTime = moment(turn.startTime).format(format);
        turn.endTime = moment(turn.endTime).format(format);
        if ( turn._id ) {
            try {
                const { data } = await gasApi.put(`/turns/${ turn._id }`, turn);
                dispatch( onUpdateTurn( data ) )
                console.log( data )
            } catch (error) {
                console.log(error)
                dispatch( onTurnError(error.response.data.msg) );
            }
        } else {
            try {
                const { data } = await gasApi.post('/turns', turn);
                dispatch( onCreateTurn( data.turn ) )
            } catch (error) {
                console.log(error)
                dispatch( onTurnError(error.response.data.msg) );
            }
        }
    }

    return {    
        //Properties
        isLoadingTurns,
        activeTurn,
        turns,
        errorMessage,
        //Methods
        setActiveTurn,
        startDeleteTurn,
        startLoadingTurns,
        startSavingTurn,
        clearErrorMessage,
    }
}
