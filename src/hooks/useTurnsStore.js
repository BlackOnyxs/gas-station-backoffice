import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';

import gasApi from '../api/gasApi';
import { onCreateTurn, onDeleteTurn, onLoadTurns, onSetActiveTurn, onUpdateTurn } from '../store';


export const useTurnsStore = () => {
    const dispatch = useDispatch();

    const { isLoadingTurns, turns, activeTurn } = useSelector( state => state.turns );

    const setActiveTurn = ( turn ) => {
        dispatch( onSetActiveTurn( turn ) );
    }

    const startDeleteTurn = async( turn ) => {
        try {
            await gasApi.delete(`/turns/${ turn._id }`);
            dispatch( onDeleteTurn() );
        } catch (error) {
            console.log(error)
        }
    }

    const startLoadingTurns = async() => {
        try {
            const { data } = await gasApi.get('/turns?limit=10');
            dispatch( onLoadTurns( data.turns ) );
        } catch (error) {
            console.log(error)
        }
    }

    const startSavingTurn = async( turn ) => {
        const format = 'HH:mm:ss';
        turn.startTime = moment(turn.startTime).format(format);
        turn.endTime = moment(turn.endTime).format(format);
        if ( turn._id ) {
            try {
                const { data } = await gasApi.put(`/turns/${ turn._id }`, turn);
                dispatch( onUpdateTurn( data ))
            } catch (error) {
                console.log(error)
            }
        } else {
            try {
                const { data } = await gasApi.post('/turns', turn);
                dispatch( onCreateTurn( data.turn ) )
            } catch (error) {
                console.log(error)
            }
        }
    }

    return {    
        //Properties
        isLoadingTurns,
        activeTurn,
        turns,
        //Methods
        setActiveTurn,
        startDeleteTurn,
        startLoadingTurns,
        startSavingTurn,
    }
}
