import { Server }  from 'socket.io'
/*  */
import { checkJWT } from '../helpers'
import { socketController } from '../controllers'



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
            await socketController.setUserOn( uid )
            socket.join( uid );

            this.io.emit( 'get-users', await socketController.getUsers() )
            
            socket.on( 'disconnect', async() => {
                
                await socketController.setUserOFF( uid )
                this.io.emit( 'get-users', await socketController.getUsers() )
            })
        });
    }
}

export default Sockets