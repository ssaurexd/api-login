import passport from 'passport'
import { Strategy as LocalStrategy } from 'passport-local'
import { Request } from 'express'
/*  */
import { User } from '../models'


passport.use( new LocalStrategy({
	usernameField: 'email',
	passwordField: 'password'
}, async ( email, password, done ) => {

	/* comprobamos que el usuario exista */
	const user = await User.findOne({ email })
	
	if( user && ( await user.comparePassword( password ) ) ) done( null, user )
	else done( null, false )
}))

passport.serializeUser(( user: any, done ) => {

	done(null, user._id)
})

passport.deserializeUser( async ( req: Request, id: string, done: any ) => {

	try {
		
		const user = await User.findById( id )
		done( null, user ) 
	} catch ( error ) {

		done( error )
	}
})

export default passport