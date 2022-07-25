import { Router } from 'express' 
import { isAuthenticated } from '../middlewares'
import { User } from '../models'


export const router = Router()

router.get( '/', isAuthenticated, async ( req, res ) => {

	const { q = '' } = req.query

	try {
		
		const users = await User.find({ name: { $regex: q, $options: 'i' } })

		return res.status( 200 ).json({
			data: users
		})
	} catch ( error ) {
        console.log("🚀 ~ file: user.routes.ts ~ line 22 ~ router.get ~ error", error)
		
		return res.status( 500 ).json({
			msg: 'Oops! Algo salio mal!'
		})
	}
})