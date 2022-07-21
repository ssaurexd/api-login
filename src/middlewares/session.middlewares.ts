import { RequestHandler } from 'express'
import session from 'express-session'
import MongoStore from 'connect-mongo'


export const sessionMiddleware: RequestHandler = ( req, res, next ) => {

	return session({
		secret: process.env.SESSION_SECRET!,
		resave: false,
		saveUninitialized: false,
		store: MongoStore.create({
			mongoUrl: process.env.MONGO_URL	
		})
	})( req, res, next )
}