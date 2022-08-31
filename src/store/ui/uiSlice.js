
import { createSlice } from '@reduxjs/toolkit';

export const uiSlice = createSlice({
    name: 'ui',
    initialState: {
        isWorkersModalOpen: false
    },
    reducers: {
        onOpenWorkersModal: ( state ) => {
            state.isWorkersModalOpen = true 
        },
        onCloseWorkersModal: ( state ) => {
            state.isWorkersModalOpen = false 
        },
    }
});

export const { onOpenWorkersModal, onCloseWorkersModal } = uiSlice.actions;
