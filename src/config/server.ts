import express, { Express } from 'express'
import { createServer } from 'http'
import cors from 'cors'
import { Server as IOServer } from 'socket.io'
/*  */
import RoutesApp from '../routes'
import Database from './db'
import { sessionMiddleware, passport } from '../middlewares'
import Sockets from './sockets'


class Server {

	public app: Express = express()
	private server = createServer( this.app )
	private io: IOServer = new IOServer( this.server, { cors: { origin: '*' } } )
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
		this.app.use( sessionMiddleware )
		this.app.use( passport.initialize() )
		this.app.use( passport.session() )

		this.initRoutes()
		this.initServer()
	}
	
	private initCors = () => {

		this.app.use( cors({
			origin: '*',
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