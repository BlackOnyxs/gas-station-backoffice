import { useDispatch, useSelector } from 'react-redux';
import gasApi from '../api/gasApi';
import { validOctane } from '../data/menus';
import { onClearFuelErrorMessage, onCreateFuel, onDeleteFuel, onFuelError, onLoadFuels, onSetActiveFuel, onUpdateFuel } from '../store';


export const useFuelStore = () => {
    const dispatch = useDispatch();
    
    const {
        isLoadingFuels,
        activeFuel,
        fuels,
        errorMessage,
    } = useSelector( state =>  state.fuels );

    const clearErrorMessage = () => {
        dispatch( onClearFuelErrorMessage() )
    }

    const setActiveFuel = ( fuel ) => {
        dispatch( onSetActiveFuel( fuel ) );
    }

    const startDeleteFuel = async() => {
        try {
            await gasApi.delete(`/fuels/${ activeFuel._id }`);
            dispatch( onDeleteFuel() ); 
        } catch (error) {
            console.log(error)
            dispatch( onFuelError(error.response.data.msg) )
        }
    }

    const startLoadingFuel = async() => {
        try {
            const { data } = await gasApi.get('/fuels?limit=10');
            dispatch( onLoadFuels( data.fuels ) );
        } catch (error) {
            console.log(error)
            dispatch( onFuelError(error.response.data.msg) )
        }
    }

     const startSavingFuel = async( fuel ) => {
        validOctane.map( o => {
            if ( o._id === fuel.octane ) {
              fuel.octane = o.value
            }
        })
        if ( fuel._id ) {
            try {
                const { data } =  await gasApi.put(`/fuels/${ fuel._id }`, fuel );
                dispatch( onUpdateFuel( data ) );
            } catch (error) {
                console.log(error)
                dispatch( onFuelError(error.response.data.msg) )
            }
        } else {
            try {
                const { data } = await gasApi.post('/fuels', fuel);
                dispatch( onCreateFuel( data.fuel ) ); 
                console.log(data)
            } catch (error) {
                console.log(error)
                dispatch( onFuelError(error.response.data.msg) )
            }
        }
     } 

    return {
        //Properties
        isLoadingFuels,
        activeFuel,
        fuels,
        errorMessage,
        //Methods
        clearErrorMessage,
        setActiveFuel,
        startDeleteFuel,
        startLoadingFuel,
        startSavingFuel,
    }
}
