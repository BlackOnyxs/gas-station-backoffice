import { useDispatch, useSelector } from 'react-redux';
import gasApi from '../api/gasApi';
import { onCreateOil, onDeleteOil, onLoadOils, onSetActiveOil, onUpdateOil } from '../store';


export const useOilStore = () => {
    const dispatch = useDispatch();
    
    const {
        isLoadingOils,
        activeOil,
        oils,
    } = useSelector( state =>  state.oils );

    const setActiveOil = ( fuel ) => {
        dispatch( onSetActiveOil( fuel ) );
    }

    const startDeleteOil = async() => {
        try {
            await gasApi.delete(`/oils/${ activeOil._id }`);
            dispatch( onDeleteOil() ); 
        } catch (error) {
            console.log(error)
        }
    }

    const startLoadingOils = async() => {
        try {
            const { data } = await gasApi.get('/oils?limit=10');
            dispatch( onLoadOils( data.oils ) );
        } catch (error) {
            console.log(error)
        }
    }

     const startSavingOil = async( oil ) => {
        if ( oil._id ) {
            try {
                const { data } =  await gasApi.put(`/oils/${ oil._id }`, oil );
                dispatch( onUpdateOil( data ) );
            } catch (error) {
                console.log(error)
            }
        } else {
            try {
                const { data } = await gasApi.post('/oils', oil);
                dispatch( onCreateOil( data ) ); 
            } catch (error) {
                console.log(error)
            }
        }
     } 

    return {
        //Properties
        isLoadingOils,
        activeOil,
        oils,
        //Methods
        setActiveOil,
        startDeleteOil,
        startLoadingOils,
        startSavingOil,
    }
}
