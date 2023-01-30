import { useDispatch, useSelector } from 'react-redux';
import gasApi from '../api/gasApi';
import { clearErrorMessage, onChecking, onLogin, onLogout } from '../store';

export const useAuthStore = () => {

    const dispatch = useDispatch();

    const {
        status, 
        user,
        errorMessage,
    } = useSelector( state => state.auth );

    const starLogin = async({ email, password }) => {
        dispatch( onChecking() );
        try {
             const { data } = await gasApi.post('/auth', { email, password });
             const { token, user:{ name, uid }} = data;
             localStorage.setItem('token', token );
             dispatch( onLogin({ name, uid }) );
        } catch (error) {
            console.log(error)
            dispatch( onLogout('Credenciales incorrectas.') );
            setTimeout( () => {
               dispatch( clearErrorMessage() );
            }, 10)
        }
    }

    const checkAuthToken = async() => {
        const token = localStorage.getItem('token');
        if ( !token ) return dispatch( onLogout() );

        try {
            const { data } = await gasApi.get('/auth/renew'); 
            const { token, user:{ name, uid }} = data;
             localStorage.setItem('token', token );
             dispatch( onLogin({ name, uid }) );
        } catch (error) {
            localStorage.clear();
            dispatch( onLogout() );
        }
    }

    const startLogout = () => {
        localStorage.clear();
        dispatch( onLogout() );
    }

    return {
        //propiedades
        status, 
        user,
        errorMessage,
        //Metodos
        starLogin,
        checkAuthToken,
        startLogout,
    }
}
