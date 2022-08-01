import { IMessage } from '../interfaces'
import { Message, User } from '../models'


export const setUserOn = async ( uid: string ) => {

	const user = await User.findByIdAndUpdate( uid, {
		$set: {
			isOnline: true
		}
	})

	return user
}

export const setUserOFF = async ( uid: string ) => {

	const user = await User.findByIdAndUpdate( uid, {
		$set: {
			isOnline: false
		}
	})

	return user
}

export const getUsers = async () => {

	try {
		
		const users = await User.find({}).lean().select('-password')

		return users
	} catch ( error ) {
		
        console.log("🚀 ~ file: socket.controllers.ts ~ line 31 ~ getUsers ~ error", error)
		return []
	}
}

export const saveMsg = async ( msg: IMessage ) => {

	try {
		
		const msgCreated = await Message.create( msg )

		return msgCreated
	} catch ( error ) {
		
        console.log("🚀 ~ file: socket.controllers.ts ~ line 49 ~ saveMsg ~ error", error)
		return []
	}
}

