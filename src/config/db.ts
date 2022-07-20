import mongoose from 'mongoose'


class Database {

	protected MONGO_URL = process.env.MONGO_URL || ''
	public start = async (): Promise<void> => {

		try {

			await mongoose.connect( this.MONGO_URL )
			console.log( 'Database ON' )
		} catch ( error ) {

			console.log('Database Error: ',  error )
			throw new Error( 'Database OFF' )
		}
	}
}

export default Database