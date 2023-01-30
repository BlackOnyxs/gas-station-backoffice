import { useDispatch, useSelector } from 'react-redux'
import gasApi from '../api/gasApi';
import { onClearSellInvoiceErrorMessage, onCreateSellInvoice, onDeleteSellInvoice, onLoadSellInvoices, onResetSellInvoices, onSellInvoiceError, onSetActiveProductType, onSetActiveSellInvoice, onUpdateSellInvoice } from '../store/sellInvoices/sellInvoiceSlice';

export const useSellInvoiceStore = () => {

    const dispatch = useDispatch();
    const {
        isLoadingSellInvoices,
        activeSellInvoice,
        sellInvoices,
        errorMessage,
    } = useSelector( state => state.sellInvoices );

    const clearErrorMessage = () => {
        dispatch( onClearSellInvoiceErrorMessage() );
    }

    const setActiveSellInvoice = ( sellInvoice ) => {
        dispatch( onSetActiveSellInvoice( sellInvoice ) )
    }

    const startDeletingSellInvoice = async( productType ) => {
        try {
            await gasApi.delete(`/sellinvoice/${ activeSellInvoice._id }?productType=${productType}`);
            dispatch( onDeleteSellInvoice() ); 
        } catch (error) {
            console.log(error);
            dispatch( onSellInvoiceError(error.response.data.msg) )
        }
    }

    const startLoadingSellInvoices = async( productType ) => {
        if ( !productType ) {
            productType = 'fuels'
        }
        try {
            const { data } = await gasApi.get(`/sellinvoice?productType=${productType}`);
            dispatch( onLoadSellInvoices( data.invoices ) )
        } catch (error) {
            console.log(error);
            dispatch( onSellInvoiceError(error.response.data.msg) );
        }
    }

    const startSavingSellInvoice = async( sellInvoice ) => {
        console.log({'Update': sellInvoice})
        if ( sellInvoice._id ) {
            try {
                const { data } = await gasApi.put(`/sellinvoice/${sellInvoice._id}`, sellInvoice)
                console.log(data)
                dispatch( onUpdateSellInvoice( data.invoice ) )
            } catch (error) {
                console.log(error);
                dispatch( onSellInvoiceError(error.response.data.msg) );
            }
        }else{
            try {
                const { data } = await gasApi.post('/sellinvoice/mobile', sellInvoice );
                console.log(data)
                dispatch( onCreateSellInvoice( data.invoice ) )
            } catch (error) {
                console.log(error);
                dispatch( onSellInvoiceError(error.response.data.msg) );
            }
        }
    }
    const resetSellInvoices = () => {
        dispatch( onResetSellInvoices() )
     }

    return {
        //properties
        isLoadingSellInvoices,
        activeSellInvoice,
        sellInvoices,
        errorMessage,
        //methods
        clearErrorMessage,
        setActiveSellInvoice,
        startDeletingSellInvoice,
        startLoadingSellInvoices,
        startSavingSellInvoice,
        resetSellInvoices,
    }
}
