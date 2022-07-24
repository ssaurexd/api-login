import { User } from '../models'


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

