import { useDispatch, useSelector } from 'react-redux';
import { onCloseWorkersModal, onOpenWorkersModal, } from '../store/';

export const useUiStore = () => {

    const dispatch = useDispatch();

    const {
        isWorkersModalOpen,
    } = useSelector( state => state.ui );

    const openWorkersModal = () => {
        dispatch( onOpenWorkersModal() )
    }

    const closeWorkersModal = () => {
        dispatch( onCloseWorkersModal() )
    }

    return {
        //* Propiedades
        isWorkersModalOpen,
        //*Metodos
        closeWorkersModal,
        openWorkersModal,
    }
}