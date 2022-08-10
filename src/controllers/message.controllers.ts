import { RequestHandler } from 'express'
/*  */
import { getUserId } from '../helpers'
import { Message } from '../models'


export const getMessagesByUser: RequestHandler = async ( req, res ) => {

	const { uid: from = '' } = req.params

	try {
		const bearer = req.headers['authorization'] as string
		const token = bearer.split(' ')[1]
		const uid = getUserId( token )
		const messages = await Message.find({
			$or: [
				{ from, to: uid },
				{ from: uid, to: from },
			]
		}).sort({ createdAt: -1 }).limit( 30 )

		return res.status( 200 ).json({
			messages
		})
	} catch ( error ) {
		
        console.log("🚀 ~ file: message.controllers.ts ~ line 12 ~ constgetMessagesByUser:RequestHandler= ~ error", error)
		return res.status( 500 ).json({
			msg: 'Oops! Algo salio mal!'
		})
	}
}	