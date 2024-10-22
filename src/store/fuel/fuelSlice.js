import { createSlice } from '@reduxjs/toolkit';
import { setObjectKey } from '../../helpers/setObjectKey';

export const fuelSlice = createSlice({
    name: 'fuel',
    initialState: {
        isLoadingFuels: true,
        fuels: [],
        activeFuel: null,
        errorMessage: undefined,
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
        onUpdateFuel: (state, { payload }) => {
            state.fuels = state.fuels.map( fuel => {
                if ( fuel._id === payload._id ) {
                    return setObjectKey(payload);
                }
                return fuel;
            });
            state.activeFuel = null;
        },
        onFuelError: (state, {payload}) => {
            state.errorMessage = payload;
        },
        onClearFuelErrorMessage: ( state ) => {
            state.errorMessage = undefined;
        }
    }
});

export const { 
    onSetActiveFuel,
    onCreateFuel,
    onDeleteFuel,
    onLoadFuels,
    onUpdateFuel,
    onFuelError,
    onClearFuelErrorMessage,
 } = fuelSlice.actions;