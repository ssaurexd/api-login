import { Server }  from 'socket.io'
/*  */
import { checkJWT } from '../helpers'
import { socketController } from '../controllers'
import { IMessage } from '../interfaces'



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

            /* Cuando el cliente envia un msg */
            socket.on( 'send-personal-msg', async ( msg: IMessage ) => {
                
                const newMsg = await socketController.saveMsg( msg )
                this.io.to( msg.to.toString() ).emit( 'send-personal-msg', newMsg )
                this.io.to( msg.from.toString() ).emit( 'send-personal-msg', newMsg )
            })
            
            this.io.emit( 'get-users', await socketController.getUsers() )
            
            socket.on( 'disconnect', async() => {
                
                await socketController.setUserOFF( uid )
                this.io.emit( 'get-users', await socketController.getUsers() )
            })
        });
    }
}

export default Sockets