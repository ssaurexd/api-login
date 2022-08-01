import express, { Express } from 'express'
import { createServer } from 'http'
import cors from 'cors'
import { Server as IOServer } from 'socket.io'
/*  */
import RoutesApp from '../routes'
import Database from './db'
import {  } from '../middlewares'
import Sockets from './sockets'


class Server {

	public app: Express = express()
	private server = createServer( this.app )
	private io: IOServer = new IOServer( this.server, { } )
	private db = new Database()
	private routesApp = new RoutesApp()

	public start = async () => {

		await this.db.start()
		this.middlewares()
		this.initSockets()
	}

	private middlewares = () => {

		/* cors */
		this.initCors()
		/* habilitar el body */
		this.app.use( express.urlencoded({ extended: true }) )
		this.app.use( express.json() )

		this.initRoutes()
		this.initServer()
	}
	
	private initCors = () => {

		let whiteList: string[] = []
		
		if( process.env.NODE_ENV === 'production' ) {

			whiteList = [
				'https://ssaurexd-chat-client.herokuapp.com'
			]
		} else whiteList = ['http://localhost:3000', 'http://localhost:4000']
		this.app.use( cors({
			origin: ( origin, cb ) => {

				if( origin && whiteList.some( domain => domain === origin ) || !origin ) cb( null, true )
				else cb( new Error('Not allowed by cors') )
			},
			credentials: true
		}))
	}

	private initRoutes = () => {

		this.app.use( '/api', this.routesApp.getRouter() )
	}

	private initSockets = () => {

		new Sockets( this.io )
	}
	
	private initServer = () => {
		
		const PORT = process.env.PORT || 3000
		const basePath = process.env.BASE_PATH || ''

		this.server.listen( PORT, () => {

			console.log(`Server ON --> ${ basePath }:${ PORT}`)
		})
	}
}

export default Server