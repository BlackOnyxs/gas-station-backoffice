import { useDispatch, useSelector } from 'react-redux';
import { onCloseTurnsModal, onCloseWorkersModal, onOpenTurnsModal, onOpenWorkersModal, } from '../store/';

export const useUiStore = () => {

    const dispatch = useDispatch();

    const {
        isWorkersModalOpen,
        isTurnsModalOpen
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

    return {
        //* Propiedades
        isWorkersModalOpen,
        isTurnsModalOpen,
        //*Metodos
        closeWorkersModal,
        openWorkersModal,
        openTurnsModal,
        closeTurnsModal,
    }
}