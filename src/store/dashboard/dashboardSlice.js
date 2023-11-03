import { createSlice } from '@reduxjs/toolkit';

export const dashboardSlice = createSlice({
    name: 'dashboard',
    initialState: {
        isLoadingDashboard: true,
        statistics: [],
        errorMessage: undefined,
    },
    reducers: {
        onLoadData: (state, { payload }) => {
            state.isLoadingDashboard = false;
            state.statistics = payload
        },
        onDataError: (state, {payload}) => {
            state.errorMessage = payload;
        },
        onClearDataErrorMessage: ( state ) => {
            state.errorMessage = undefined;
        }
    }
});

export const { 
    onLoadData,
    onDataError,
    onClearDataErrorMessage,
 } = dashboardSlice.actions;