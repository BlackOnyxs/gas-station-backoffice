import { useDispatch, useSelector } from 'react-redux';
import { onAddInvoice, onLoadInvoices, onSetActiveSocketInvoice } from '../store/sockets/socketSlice';

export const useSocketInvoice = () => {
    const {
        socketInvoices,
        isLoading,
        activeInvoice,
    } = useSelector( state => state.sockets );

    const dispatch = useDispatch();

    const getInvoices = ( invoices ) => {
        dispatch( onLoadInvoices( invoices ) );
    }

    const addInvoice = (invoice) => {
        dispatch( onAddInvoice(invoice) )
    }

    const setActiveInvoice = ( invoice ) => {
        dispatch( onSetActiveSocketInvoice( invoice ) );
    }
    return {
        //properties
        socketInvoices,
        isLoading,
        activeInvoice,
        //methods
        addInvoice,
        getInvoices,
        setActiveInvoice,
    }
}
