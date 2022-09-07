import { useDispatch, useSelector } from 'react-redux';
import { onCloseProviderModal, onCloseScheduleModal, onCloseTurnsModal, onCloseWorkersModal, onOpenProviderModal, onOpenScheduleModal, onOpenTurnsModal, onOpenWorkersModal, } from '../store/';

export const useUiStore = () => {

    const dispatch = useDispatch();

    const {
        isWorkersModalOpen,
        isTurnsModalOpen,
        isScheduleModalOpen,
        isProviderModalOpen,
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
    const openProviderModal = () => {
        dispatch( onOpenProviderModal() )
    }

    const closeProviderModal = () => {
        dispatch( onCloseProviderModal() )
    }

    return {
        //* Propiedades
        isWorkersModalOpen,
        isTurnsModalOpen,
        isScheduleModalOpen,
        isProviderModalOpen,
        //*Metodos
        closeWorkersModal,
        openWorkersModal,
        openTurnsModal,
        closeTurnsModal,
        openScheduleModal,
        closeScheduleModal,
        openProviderModal,
        closeProviderModal,
    }
}