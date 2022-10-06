import { useDispatch, useSelector } from 'react-redux'
import gasApi from '../api/gasApi';
import { onCreateSellInvoice, onDeleteSellInvoice, onLoadSellInvoices, onResetSellInvoices, onSetActiveProductType, onSetActiveSellInvoice, onUpdateSellInvoice } from '../store/sellInvoices/sellInvoiceSlice';

export const useSellInvoiceStore = () => {

    const dispatch = useDispatch();
    const {
        isLoadingSellInvoices,
        activeSellInvoice,
        sellInvoices
    } = useSelector( state => state.sellInvoices );

    const setActiveSellInvoice = ( sellInvoice ) => {
        dispatch( onSetActiveSellInvoice( sellInvoice ) )
    }

    const startDeletingSellInvoice = async() => {
        try {
            await gasApi.delete(`/sellinvoices/${ activeSellInvoice._id }`);
            dispatch( onDeleteSellInvoice( activeSellInvoice ) ); 
        } catch (error) {
            console.log(error)
        }
    }

    const startLoadingSellInvoices = async( productType ) => {
        try {
            const { data } = await gasApi.get(`/sellinvoices?productType=${productType}`);
            dispatch( onLoadSellInvoices( data.invoices ) )
        } catch (error) {
            console.log(error)
        }
    }

    const startSavingSellInvoice = async( sellInvoice ) => {
        if ( sellInvoices._id ) {
            try {
                const { data } = await gasApi.put(`/sellinvoices/${sellInvoices._id}`, sellInvoice)
                console.log(data)
                // dispatch( onUpdateSellInvoice( data ) )
            } catch (error) {
                console.log(error)
            }
        }else{
            try {
                
                const { data } = await gasApi.post('/sellinvoices', sellInvoice );
                dispatch( onCreateSellInvoice( data.sellInvoice ) )
            } catch (error) {
                console.log(error)
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
        //methods
        setActiveSellInvoice,
        startDeletingSellInvoice,
        startLoadingSellInvoices,
        startSavingSellInvoice,
        resetSellInvoices,
    }
}
