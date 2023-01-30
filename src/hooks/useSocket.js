import { useCallback, useEffect, useState } from 'react';
import { io } from 'socket.io-client';


export const useSocket = ( serverPath ) => {
    
    const [ socket, setSocket ] = useState(null);

    const connectSocket = useCallback( () => {

        const token = localStorage.getItem('token');
        console.log(token)
        const socketTemp = io( serverPath, { 
            transports: ['websocket'],
            autoConnect: true,
            forceNew: true,
            query: {
                'x-token': token
            }
        });
        setSocket( socketTemp );
    },[ serverPath ]);

    const disconnectSocket = useCallback( () => {
        socket?.disconnect();
    },[ socket ]);

    return {
        socket,
        connectSocket,
        disconnectSocket
    }
}