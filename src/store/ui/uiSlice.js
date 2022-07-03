
import { createSlice } from '@reduxjs/toolkit';

export const uiSlice = createSlice({
    name: 'ui',
    initialState: {
        isPeopleModalOpen: false
    },
    reducers: {
        onOpenPeopleModal: ( state ) => {
            state.isPeopleModalOpen = true 
        },
        onClosePeopleModal: ( state ) => {
            state.isPeopleModalOpen = false 
        },
    }
});

export const { onOpenPeopleModal, onClosePeopleModal } = uiSlice.actions;
