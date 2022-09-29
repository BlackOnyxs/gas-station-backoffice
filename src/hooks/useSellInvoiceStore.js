import { useDispatch, useSelector } from 'react-redux'
import gasApi from '../api/gasApi';
import { onCreateSellInvoice, onLoadSellInvoices, onSetActiveProductType, onSetActiveSellInvoice, onUpdateSellInvoice } from '../store/sellInvoices/sellInvoiceSlice';

export const useSellInvoiceStore = () => {

    const dispatch = useDispatch();
    const {
        isLoadingSellInvoices,
        products,
        activeProductType,
        clients,
        sellInvoices
    } = useSelector( state => state.sellInvoices );

    const setActiveSellInvoice = ( sellInvoice ) => {
        dispatch( onSetActiveSellInvoice( sellInvoice ) )
    }

    const setActiveProductType = ( activeProductType ) => {
        dispatch( onSetActiveProductType( activeProductType ) );
    }
    const startLoadingSellInvoices = async() => {
        try {
            const { data } = await gasApi.get(`/sellinvoices?productType=${activeProductType._id}`)
            console.log( data );
            dispatch( onLoadSellInvoices( data.invoices ) )
        } catch (error) {
            console.log(error)
        }
    }

    const startSavingSellInvoice = async( sellInvoices ) => {
        if ( sellInvoices._id ) {
            try {
                const { data } = await gasApi.put(`/sellinvoices/${sellInvoices._id}`)
                console.log(data)
                // dispatch( onUpdateSellInvoice( data ) )
            } catch (error) {
                console.log(error)
            }
        }else{
            try {
                const { data } = await gasApi.post('/sellinvoices');
                console.log(data)
                // dispatch( onCreateSellInvoice( data ) )
            } catch (error) {
                console.log(error)
            }
        }
    }

    return {
        //properties
        isLoadingSellInvoices,
        products,
        activeProductType,
        clients,
        sellInvoices,
        //methods
        setActiveSellInvoice,
        setActiveProductType,
        startLoadingSellInvoices,
        startSavingSellInvoice,
    }
}
