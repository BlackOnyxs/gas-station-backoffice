import { useDispatch, useSelector } from 'react-redux';
import gasApi from '../api/gasApi';
import { formatBuyInvoices } from '../helpers/formatBuyInvoices';
import { onLoadPrducts, onSetActiveProduct, onSetActiveProductType } from '../store/inventory/inventoySlice';

export const useInventoryStore = () => {
    const {
        isLoadingProducts,
        products,
        activeProduct,
        activeProductType,
    } = useSelector( state => state.inventory );

    const dispatch = useDispatch();

    const setActiveProduct = ( product ) => {
        dispatch( onSetActiveProduct( product ) );
    }

    const setActiveProductType = ( productType ) => {
        dispatch( onSetActiveProductType( productType ) );
    }

    const startLoadingProducts = async() => {
        try {
            const { data } = await gasApi.get(`/${ activeProductType }`);
            dispatch( onLoadPrducts( formatBuyInvoices( data ) ) );
        } catch (error) {
            console.log(error)
        }
    }

    return {
        // Properties
        isLoadingProducts,
        products,
        activeProduct,
        activeProductType,
        // Methods
        setActiveProduct,
        setActiveProductType,
        startLoadingProducts,
    }
}
