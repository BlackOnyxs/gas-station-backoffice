import { createSlice } from '@reduxjs/toolkit';
import { setObjectKey } from '../../helpers';

export const oilSlice = createSlice({
    name: 'oil',
    initialState: {
        isLoadingOils: false,
        oils: [],
        activeOil: null
    },
    reducers: {
        onSetActiveOil: (state, { payload }) => {
            state.activeOil = payload;
        },
        onCreateOil: (state, { payload }) => {
            state.oils.push( setObjectKey( payload ) );
            state.activeOil = null;
        },
        onDeleteOil: (state) => {
            state.oils = state.oils.filter( o => o._id !== state.activeOil._id );
            state.activeOil = null;
        },
        onLoadOils: (state, { payload }) => {
            state.isLoadingOils = false;
            payload.forEach( Oil => {
                const exist = state.oils.some( dbOil => dbOil._id === Oil._id );
                if ( !exist ) {
                    state.oils.push( setObjectKey( Oil ) );
                }
            });
        },
        onUpdateOil: (state, { payload}) => {
            state.oils = state.oils.map( Oil => {
                if ( Oil._id === payload._id ) {
                    return setObjectKey(payload);
                }
                return Oil;
            });
            state.activeOil = null;
        }
    }
});

export const { 
    onSetActiveOil,
    onCreateOil,
    onDeleteOil,
    onLoadOils,
    onUpdateOil,
 } = oilSlice.actions;