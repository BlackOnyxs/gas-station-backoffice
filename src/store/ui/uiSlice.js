
import { createSlice } from '@reduxjs/toolkit';

export const uiSlice = createSlice({
    name: 'ui',
    initialState: {
        isWorkersModalOpen: false,
        isTurnsModalOpen: false,
        isScheduleModalOpen: false,
        isProviderModalOpen: false,
    },
    reducers: {
        onOpenWorkersModal: ( state ) => {
            state.isWorkersModalOpen = true 
        },
        onCloseWorkersModal: ( state ) => {
            state.isWorkersModalOpen = false 
        },
        onOpenTurnsModal: ( state ) => {
            state.isTurnsModalOpen = true 
        },
        onCloseTurnsModal: ( state ) => {
            state.isTurnsModalOpen = false 
        },
        onOpenScheduleModal: ( state ) => {
            state.isScheduleModalOpen = true 
        },
        onCloseScheduleModal: ( state ) => {
            state.isScheduleModalOpen = false 
        },
        onOpenProviderModal: ( state ) => {
            state.isProviderModalOpen = true 
        },
        onCloseProviderModal: ( state ) => {
            state.isProviderModalOpen = false 
        },
    }
});

export const { 
    onOpenWorkersModal, 
    onCloseWorkersModal,
    onOpenTurnsModal,
    onCloseTurnsModal,
    onOpenScheduleModal,
    onCloseScheduleModal,
    onOpenProviderModal,
    onCloseProviderModal,
} = uiSlice.actions;
