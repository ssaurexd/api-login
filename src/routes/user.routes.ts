import { Router } from 'express' 
import { isAuthenticatedAndAdmin } from '../middlewares'


export const router = Router()

router.post( '/hola', isAuthenticatedAndAdmin,( req, res ) => {
	return res.status( 200 ).json({
		msg: 'Hola mundo'
	})
})