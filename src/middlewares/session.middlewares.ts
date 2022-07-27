import { RequestHandler } from 'express'
import jwt from 'jsonwebtoken'
/*  */
import { IUser } from '../interfaces'
import { User } from '../models'


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
export const isAuthenticatedAndAdmin: RequestHandler = async ( req, res, next ) => {

	const bearer = req.headers['authorization'] 

	if( !bearer ) {

		return res.status( 401 ).json({
			msg: 'No Autorizado!'
		})
	}

	const token = bearer.split(' ')[1]

	try {
		
		const { uid } = jwt.verify( token, process.env.JWT_SEED! ) as { uid: string }
		const user = await User.findById( uid )

		if( user?.role !== 'admin' ) return res.status( 401 ).json({
			msg: 'No Autorizado!'
		})
		
		next()
	} catch ( error ) {
		
		return res.status( 401 ).json({
			msg: 'No Autorizado!'
		})
	}
}