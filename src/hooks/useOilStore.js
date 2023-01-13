import { useDispatch, useSelector } from 'react-redux';
import gasApi from '../api/gasApi';
import { onClearOilErrorMessage, onCreateOil, onDeleteOil, onLoadOils, onOilError, onSetActiveOil, onUpdateOil } from '../store';


export const useOilStore = () => {
    const dispatch = useDispatch();
    
    const {
        isLoadingOils,
        activeOil,
        oils,
        errorMessage
    } = useSelector( state =>  state.oils );

    const clearErrorMessage = () => {
        dispatch( onClearOilErrorMessage() )
    }

    const setActiveOil = ( fuel ) => {
        dispatch( onSetActiveOil( fuel ) );
    }

    const startDeleteOil = async() => {
        try {
            await gasApi.delete(`/oils/${ activeOil._id }`);
            dispatch( onDeleteOil() ); 
        } catch (error) {
            console.log(error)
            dispatch( onOilError(error.response.data.msg) )
        }
    }

    const startLoadingOils = async() => {
        try {
            const { data } = await gasApi.get('/oils?limit=10');
            dispatch( onLoadOils( data.oils ) );
        } catch (error) {
            console.log(error)
            dispatch( onOilError(error.response.data.msg) )
        }
    }

     const startSavingOil = async( oil ) => {
        if ( oil._id ) {
            try {
                const { data } =  await gasApi.put(`/oils/${ oil._id }`, oil );
                dispatch( onUpdateOil( data ) );
            } catch (error) {
                console.log(error)
                dispatch( onOilError(error.response.data.msg) )
            }
        } else {
            try {
                const { data } = await gasApi.post('/oils', oil);
                dispatch( onCreateOil( data.oil ) ); 
            } catch (error) {
                console.log(error)
                dispatch( onOilError(error.response.data.msg) )
            }
        }
     } 

    return {
        //Properties
        isLoadingOils,
        activeOil,
        oils,
        errorMessage,
        //Methods
        setActiveOil,
        startDeleteOil,
        startLoadingOils,
        startSavingOil,
        clearErrorMessage
    }
}
