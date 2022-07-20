import 'dotenv/config'
/*  */
import { Server } from './config'


const serverApp = new Server()
serverApp.start()