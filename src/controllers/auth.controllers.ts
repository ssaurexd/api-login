import { RequestHandler } from 'express'
import passport from 'passport'
import connectMongo from 'connect-mongo'
/*  */
import { User } from '../models'
import { IUser } from '../interfaces'


export const signup: RequestHandler = async ( req, res ) => {

	const { name = '', email = '', password = '' } = req.body
	let user: IUser | null

	try {
		
		user = await User.findOne({ email })
	
		if( user ) return res.status( 403 ).json({
			msg: 'Ya hay una cuenta usando ese email.'
		})
	
		user = await User.create({ name, email, password })
		
		res.status( 200 ).json({
			user
		})
	} catch ( error ) {
		
        console.log("🚀 ~ file: auth.controllers.ts ~ line 16 ~ constsignup:RequestHandler= ~ error", error)
		return res.status( 500 ).json({
			msg: 'Oops, Algo salio mal!'
		})
	}
}	

export const login: RequestHandler = async ( req, res, next ) => {

	passport.authenticate( 'local', ( err, user, info ) => {

		if( !user ) return res.status( 401 ).json({
			msg: 'Email y/o Contraseña incorrectos.'
		})

		req.login( user, ( err ) => {
	
			if( err ) throw err
	
			res.status( 200 ).json({
				user
			})
		})
	})( req, res, next )
}

export const logout: RequestHandler = async ( req, res, next ) => {
	
	req.session.destroy(( err ) => {
		
		res.clearCookie('connect.sid')
		res.status( 204 ).end()
	})
}