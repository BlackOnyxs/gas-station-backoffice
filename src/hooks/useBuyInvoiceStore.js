import { useDispatch, useSelector } from 'react-redux';
import gasApi from '../api/gasApi';
import { onCreateBuyInvoice, onDeleteBuyInvoice, onLoadBuyInvoices, onResetBuyInvoices, onSetActiveBuyInvoice, onUpdateBuyInvoice } from '../store';

export const useBuyInvoiceStore = () => {
    const dispatch = useDispatch();
    
    const {
        isLoadingBuyInvoices,
        activeBuyInvoice,
        activeProductType,
        buyInvoices,
        products,
    } = useSelector( state =>  state.buyInvoices );

    const setActiveBuyInvoice = ( fuel ) => {
        dispatch( onSetActiveBuyInvoice( fuel ) );
    }

    const startDeleteBuyInvoice = async() => {
        try {
            await gasApi.delete(`/buyinvoices/${ activeBuyInvoice._id }`);
            dispatch( onDeleteBuyInvoice() ); 
        } catch (error) {
            console.log(error)
        }
    }

    const startLoadingBuyInvoices = async( productType ) => {
        if ( !productType ) {
            productType = 'fuels'
        }
        try {
            const { data } = await gasApi.get(`/buyinvoices?limit=10&productType=${ productType }`);
            dispatch( onLoadBuyInvoices( data.invoices ) );
        } catch (error) {
            console.log(error)
        }
    }

     const startSavingBuyInvoice = async( buyInvoice ) => {
        if ( buyInvoice._id ) {
            try {
                const { data } =  await gasApi.put(`/buyinvoices/${ buyInvoice._id }`, buyInvoice );
                dispatch( onUpdateBuyInvoice( data ) );
            } catch (error) {
                console.log(error)
            }
        } else {
            try {
                const { data } = await gasApi.post('/buyinvoices', buyInvoice);
                dispatch( onCreateBuyInvoice( data.buyInvoice ) ); 
            } catch (error) {
                console.log(error)
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
        //Methods
        setActiveBuyInvoice,
        startDeleteBuyInvoice,
        startLoadingBuyInvoices,
        startSavingBuyInvoice,
        resetBuyInvoices,
    }
}
