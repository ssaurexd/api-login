import express, { Express } from 'express'
import cors from 'cors'
/*  */
import RoutesApp from '../routes'
import Database from './db'
import { sessionMiddleware, passport } from '../middlewares'


class Server {

	private app: Express = express()
	private db = new Database()
	private routesApp = new RoutesApp()

	public start = async () => {

		await this.db.start()
		this.middlewares()
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

		let whiteList: string[] = []
		
		if( process.env.NODE_ENV === 'production' ) {

			whiteList = [
				''	
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
	
	private initServer = () => {
		
		const PORT = process.env.PORT || 3000
		const basePath = process.env.BASE_PATH || ''

		this.app.listen( PORT, () => {

			console.log(`Server ON --> ${ basePath }:${ PORT}`)
		})
	}
}

export default Server