import { Router } from 'express' 


export const router = Router()

router.post( '/hola', ( req, res ) => {
	return res.status( 200 ).json({
		msg: 'Hola mundo'
	})
})