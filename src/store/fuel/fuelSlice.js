import { createSlice } from '@reduxjs/toolkit';
import { setObjectKey } from '../../helpers/setObjectKey';

export const fuelSlice = createSlice({
    name: 'fuel',
    initialState: {
        isLoadingFuels: true,
        fuels: [],
        activeFuel: null
    },
    reducers: {
        onSetActiveFuel: (state, { payload }) => {
            state.activeFuel = payload;
        },
        onCreateFuel: (state, { payload }) => {
            state.fuels.push( setObjectKey( payload ) );
            state.activeFuel = null;
        },
        onDeleteFuel: (state) => {
            state.fuels = state.fuels.filter( f => f._id !== state.activeFuel._id );
            state.activeFuel = null;
        },
        onLoadFuels: (state, { payload }) => {
            state.isLoadingFuels = false;
            payload.forEach( fuel => {
                const exist = state.fuels.some( dbFuel => dbFuel._id === fuel._id );
                if ( !exist ) {
                    state.fuels.push( setObjectKey( fuel ) );
                }
            });
        },
        onUpdateFuel: (state, { payload}) => {
            state.fuels = state.fuels.map( fuel => {
                if ( fuel._id === payload._id ) {
                    return payload;
                }
                return fuel;
            })
        }
    }
});

export const { 
    onSetActiveFuel,
    onCreateFuel,
    onDeleteFuel,
    onLoadFuels,
    onUpdateFuel,
 } = fuelSlice.actions;