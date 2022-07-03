import { useDispatch, useSelector } from 'react-redux';
import { onClosePeopleModal, onOpenPeopleModal } from '../store/';

export const useUiStore = () => {

    const dispatch = useDispatch();

    const {
        isPeopleModalOpen,
    } = useSelector( state => state.ui );

    const openPeopleModal = () => {
        dispatch( onOpenPeopleModal() )
    }

    const closePeopleModal = () => {
        dispatch( onClosePeopleModal() )
    }

    return {
        //* Propiedades
        isPeopleModalOpen,
        //*Metodos
        openPeopleModal,
        closePeopleModal,
    }
}