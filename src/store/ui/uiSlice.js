
import { createSlice } from '@reduxjs/toolkit';

export const uiSlice = createSlice({
    name: 'ui',
    initialState: {
        isModalOpen: false,
        errorMessage: ''
    },
    reducers: {
        onOpenModal: ( state ) => {
            state.isModalOpen = true 
        },
        onCloseModal: ( state ) => {
            state.isModalOpen = false 
        },
        onErrorMessage: ( state, {payload}) => {
            state.errorMessage = payload;
        },
        onRemoveError: ( state ) => {
            state.errorMessage = ''
        }
    }
});

export const { 
    onOpenModal,
    onCloseModal,
    onErrorMessage,
    onRemoveError,
} = uiSlice.actions;
