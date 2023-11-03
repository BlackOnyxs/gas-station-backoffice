import { useDispatch, useSelector } from 'react-redux';
import gasApi from '../api/gasApi';
import { onDataError, onLoadData } from '../store';


export const useDashboardStore = () => {

    const dispatch = useDispatch();
    const {
        isLoadingDashboard,
        statistics,
        errorMessage,
    } = useSelector( state => state.dashboard );

    const startLoadData = async( startDate, endDate) => {
        try {
            const { data } = await gasApi.get(`/dashboard?startDate=${startDate}&endDate=${endDate}`);
            console.log(data)
            dispatch( onLoadData( data ) );
        } catch (error) {
            console.log(error)
            dispatch( onDataError(error.response.data.msg) )
        }
    }
    
    return {
        isLoadingDashboard,
        statistics,
        errorMessage,
        startLoadData
    }
}
