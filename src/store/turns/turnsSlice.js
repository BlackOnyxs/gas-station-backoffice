import { createSlice } from '@reduxjs/toolkit';
import { setObjectKey } from '../../helpers/setObjectKey';

export const turnsSlice = createSlice({
    name: 'turns',
    initialState: {
        isLoadingTurns: true,
        turns: [],
        activeTurn: null
    },
    reducers: {
        onSetActiveTurn: (state, { payload }) => {
            state.activeTurn = payload;
        },
        onCreateTurn: (state, { payload }) => {
            state.turns.push( setObjectKey( payload ) );
            state.activeTurn = null;
        },
        onDeleteTurn: (state) => {
            if ( state.activeTurn ) {
                state.turns = state.turns.filter( turn =>  turn._id !== state.activeTurn._id );
                state.activeTurn = null;
            }
        },
        onLoadTurns: (state, { payload }) => {
            state.isLoadingTurns = false;
            payload.forEach( turn => {
                const exist = state.turns.some( dbTurn => dbTurn._id === turn._id );
                if ( !exist ) {
                    state.turns.push( setObjectKey( turn ) );
                }
            });
        },
        onUpdateTurn: (state, { payload }) => {
            state.turns = state.turns.map( turn => {
                if ( turn._id === payload._id ) {
                    return setObjectKey( payload );
                }
                return turn;
            })
        }
    }
});

export const { 
    onSetActiveTurn,
    onCreateTurn,
    onDeleteTurn,
    onLoadTurns,
    onUpdateTurn,
 } = turnsSlice.actions;