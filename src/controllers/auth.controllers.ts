import { RequestHandler } from 'express'
import jwt from 'jsonwebtoken'
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

export const login: RequestHandler = async ( req, res ) => {

	const { email = '', password = '' } = req.body

	try {

		const user = await User.findOne({ email }) 

		if( !user ) return res.status( 400 ).json({
			msg: 'Email y/o Contraseñas incorrectos.'
		})

		const isPasswordEqual = await user.comparePassword( password )
		
		if( !isPasswordEqual ) return res.status( 400 ).json({
			msg: 'Email y/o Contraseñas incorrectos.'
		})

		const token = jwt.sign({ uid: user._id }, process.env.JWT_SEED!, { expiresIn: '30d' } )

		return res.status( 200 ).json({ token, user })
	} catch ( error ) {
		
        console.log("🚀 ~ file: auth.controllers.ts ~ line 41 ~ constlogin:RequestHandler= ~ error", error)
		return res.status( 500 ).json({
			msg: 'Oops! Algo salio mal!'
		})
	}
}