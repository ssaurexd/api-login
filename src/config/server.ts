import express, { Express } from 'express'
import cors from 'cors'
/*  */
import RoutesApp from '../routes'
import Database from './db'


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
		
		this.initRoutes()
		this.initServer()
	}

	
	private initCors = () => {

		let whiteList: string[] = []
		const prodMode = process.env.PROD

		if( prodMode ) {

			whiteList = [
				''	
			]
		} else {

			whiteList = ['http://localhost:3000']
		}


		this.app.use( cors({
			origin: ( origin, cb ) => {

				if( origin && whiteList.indexOf( origin ) !== -1 || !origin ) cb( null, true )
				else cb( new Error('Not allowed by cors') )
			},
			optionsSuccessStatus: 200,
			credentials: true,
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