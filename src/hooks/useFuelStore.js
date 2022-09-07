import { useDispatch, useSelector } from 'react-redux';
import gasApi from '../api/gasApi';
import { onCreateFuel, onDeleteFuel, onLoadFuels, onSetActiveFuel, onUpdateFuel } from '../store';


export const useFuelStore = () => {
    const dispatch = useDispatch();
    
    const {
        isLoadingFuels,
        activeFuel,
        fuels,
    } = useSelector( state =>  state.fuels );

    const setActiveFuel = ( fuel ) => {
        dispatch( onSetActiveFuel( fuel ) );
    }

    const startDeleteFuel = async() => {
        try {
            await gasApi.delete(`/fuels/${ activeFuel._id }`);
            dispatch( onDeleteFuel() ); 
        } catch (error) {
            console.log(error)
        }
    }

    const startLoadingFuel = async() => {
        try {
            const { data } = await gasApi.get('/fuels?limit=10');
            dispatch( onLoadFuels( data.fuels ) );
        } catch (error) {
            console.log(error)
        }
    }

     const startSavingFuel = async( fuel ) => {
        if ( fuel._id ) {
            try {
                const { data } =  await gasApi.put(`/fuels/${ fuel._id }`, fuel );
                dispatch( onUpdateFuel( data ) );
            } catch (error) {
                console.log(error)
            }
        } else {
            try {
                const { data } = await gasApi.post('/fuels', fuel);
                dispatch( onCreateFuel( data ) ); 
                console.log(data);
            } catch (error) {
                console.log(error)
            }
        }
     } 

    return {
        //Properties
        isLoadingFuels,
        activeFuel,
        fuels,
        //Methods
        setActiveFuel,
        startDeleteFuel,
        startLoadingFuel,
        startSavingFuel,
    }
}
