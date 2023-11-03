import { useDispatch, useSelector } from 'react-redux';
import gasApi from '../api/gasApi';
import { onBuyInvoiceError, onClearBuyInvoiceErrorMessage, onCreateBuyInvoice, onDeleteBuyInvoice, onLoadBuyInvoices, onResetBuyInvoices, onSetActiveBuyInvoice, onUpdateBuyInvoice } from '../store';

export const useBuyInvoiceStore = () => {
    const dispatch = useDispatch();
    
    const {
        isLoadingBuyInvoices,
        activeBuyInvoice,
        buyInvoices,
        products,
        errorMessage,
    } = useSelector( state =>  state.buyInvoices );

    const clearErrorMessage = () => {
        dispatch( onClearBuyInvoiceErrorMessage() ) 
    }

    const setActiveBuyInvoice = ( invoice ) => {
        dispatch( onSetActiveBuyInvoice( invoice ) );
    }

    const startDeleteBuyInvoice = async( productType ) => {
        try {
            await gasApi.delete(`/buyinvoice/${ activeBuyInvoice._id }?productType=${productType}`);
            dispatch( onDeleteBuyInvoice() ); 
        } catch (error) {
            console.log(error);
            dispatch( onBuyInvoiceError(error.response.data.msg) );
        }
    }

    const startLoadingBuyInvoices = async( productType ) => {
        if ( !productType ) {
            productType = 'fuels'
        }
        try {
            const { data } = await gasApi.get(`/buyinvoice?limit=7&productType=${ productType }`);
            console.log(data)
            dispatch( onLoadBuyInvoices( data.invoices ) );
        } catch (error) {
            console.log(error);
            dispatch( onBuyInvoiceError(error.response.data.msg) );
        }
    }

     const startSavingBuyInvoice = async( buyInvoice ) => {
        console.log({'beforeSent': buyInvoice})
        if ( buyInvoice._id ) {
            try {
                const { data } = await gasApi.put(`/buyinvoice/${ buyInvoice._id }`, buyInvoice );
                dispatch( onUpdateBuyInvoice( data.invoice ) );
                console.log(data)
            } catch (error) {
                console.log(error);
                dispatch( onBuyInvoiceError(error.response.data.msg) );
            }
        } else {
            try {
                const { data } = await gasApi.post('/buyinvoice', buyInvoice);
                dispatch( onCreateBuyInvoice( data.invoice ) ); 
                console.log(data)
            } catch (error) {
                console.log(error);
                dispatch( onBuyInvoiceError( error.response.data.msg ) );
            }
        }
     }

     const resetBuyInvoices = () => {
        dispatch( onResetBuyInvoices() )
     }
     
    return {
        //properties
        isLoadingBuyInvoices,
        activeBuyInvoice,
        buyInvoices,
        products,
        errorMessage,
        //Methods
        clearErrorMessage,
        setActiveBuyInvoice,
        startDeleteBuyInvoice,
        startLoadingBuyInvoices,
        startSavingBuyInvoice,
        resetBuyInvoices,
    }
}
