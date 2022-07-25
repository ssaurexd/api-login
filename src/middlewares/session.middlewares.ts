import { RequestHandler } from 'express'
import jwt from 'jsonwebtoken'
/*  */
import { IUser } from '../interfaces'


export const isAuthenticated: RequestHandler = async ( req, res, next ) => {

	const bearer = req.headers['authorization'] 

	if( !bearer ) {

		return res.status( 401 ).json({
			msg: 'No Autorizado!'
		})
	}

	const token = bearer.split(' ')[1]

	try {
		
		jwt.verify( token, process.env.JWT_SEED! )
		next()
	} catch ( error ) {
		
		return res.status( 401 ).json({
			msg: 'No Autorizado!'
		})
	}
}
export const isAuthenticatedAndAdmin: RequestHandler = ( req, res, next ) => {

	next()
}