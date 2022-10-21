import { createSlice } from '@reduxjs/toolkit';
import { formatSchedule } from '../../helpers';
import { setObjectKey } from '../../helpers/setObjectKey';

export const schedulaSlice = createSlice({
    name: 'schedula',
    initialState: {
        isLoadingSchedule: true,
        schedule: [],
        activeSchedule: null
    },
    reducers: {
        onSetActiveSchedule: (state, { payload }) => {
            state.activeSchedule = payload;
        },
        onCreateSchedule: (state, { payload }) => {
            state.schedule.push( payload );
            state.activeSchedule = null;
        },
        onDeleteSchedule: (state) => {
            state.schedule = state.schedule.filter( schedule => schedule._id !== state.activeSchedule._id );
            state.activeSchedule = null;
        },
        onLoadSchedule: (state, { payload }) => {
            state.isLoadingSchedule = false;
            payload.forEach( schedule => {
                const exist = state.schedule.some( dbSchedule => dbSchedule._id === schedule._id );
                // console.log(formatSchedule( schedule ))
                if ( !exist ) {
                    state.schedule.push( setObjectKey( formatSchedule( schedule ) ) );
                }
            })
        },
        onUpdateSchedule: (state, { payload }) => {
            state.schedule = state.schedule.map( schedule => {
                if ( schedule._id === payload._id ) {
                    return setObjectKey( payload );
                }
                return schedule;
            });
        }
    }
});

export const { 
    onSetActiveSchedule,
    onCreateSchedule,
    onDeleteSchedule,
    onLoadSchedule,
    onUpdateSchedule,
 } = schedulaSlice.actions;