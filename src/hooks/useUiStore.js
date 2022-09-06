import { useDispatch, useSelector } from 'react-redux';
import { onCloseScheduleModal, onCloseTurnsModal, onCloseWorkersModal, onOpenScheduleModal, onOpenTurnsModal, onOpenWorkersModal, } from '../store/';

export const useUiStore = () => {

    const dispatch = useDispatch();

    const {
        isWorkersModalOpen,
        isTurnsModalOpen,
        isScheduleModalOpen,
    } = useSelector( state => state.ui );

    const openWorkersModal = () => {
        dispatch( onOpenWorkersModal() )
    }

    const closeWorkersModal = () => {
        dispatch( onCloseWorkersModal() )
    }
    const openTurnsModal = () => {
        dispatch( onOpenTurnsModal() )
    }

    const closeTurnsModal = () => {
        dispatch( onCloseTurnsModal() )
    }
    const openScheduleModal = () => {
        dispatch( onOpenScheduleModal() )
    }

    const closeScheduleModal = () => {
        dispatch( onCloseScheduleModal() )
    }

    return {
        //* Propiedades
        isWorkersModalOpen,
        isTurnsModalOpen,
        isScheduleModalOpen,
        //*Metodos
        closeWorkersModal,
        openWorkersModal,
        openTurnsModal,
        closeTurnsModal,
        openScheduleModal,
        closeScheduleModal,
    }
}