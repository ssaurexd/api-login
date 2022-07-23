import { RequestHandler } from 'express'
import session from 'express-session'
import MongoStore from 'connect-mongo'
/*  */
import { IUser } from '../interfaces'


export const sessionMiddleware: RequestHandler = ( req, res, next ) => {

	return session({
		secret: process.env.SESSION_SECRET!,
		resave: false,
		saveUninitialized: false,
		store: MongoStore.create({
			mongoUrl: process.env.MONGO_URL,
			ttl: 2592000 // 30 dias
		})
	})( req, res, next )
}

export const isAuthenticated: RequestHandler = ( req, res, next ) => {

	if( !req.user ) {

		return res.status( 401 ).json({
			msg: 'No autorizado!'
		})
	}
	next()
}
export const isAuthenticatedAndAdmin: RequestHandler = ( req, res, next ) => {

	const user = req.user as IUser | undefined

	if( !user || user.role !== 'admin' ) {

		return res.status( 401 ).json({
			msg: 'No autorizado!'
		})
	}
	next()
}