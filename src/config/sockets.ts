import { Server }  from 'socket.io'
/*  */
import { checkJWT } from '../helpers'
import { setUserOFF, setUserOn } from '../controllers'



class Sockets {
    
    io: Server
    constructor( io: Server ) {

        this.io = io
        this.socketEvents();
    }

    socketEvents() {
        this.io.on('connection', async ( socket ) => {

            const [ valido, uid ] = checkJWT( socket.handshake.query['x-token'] as string  );

            if ( !valido || typeof uid !== 'string' ) {
                console.log('socket no identificado');
                return socket.disconnect();
            }

            await setUserOn( uid )
            socket.join( uid );
            
            socket.on( 'disconnect', async() => {

                await setUserOFF( uid )
            })
        });
    }
}

export default Sockets