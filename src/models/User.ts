import { Schema, model } from 'mongoose'
import bcrypt from 'bcrypt'
/*  */
import { IUser, IUserMethods, UserModel } from '../interfaces'


const userSchema = new Schema<IUser, UserModel, IUserMethods>({
	name: {
		type: String,
		required: true
	},
	email: {
		type: String,
		required: true,
		unique: true
	},
	password: {
		type: String,
		required: true
	},
	role: {
		type: String,
		enum: [ 'user', 'admin' ],
		default: 'user'
	},
	isOnline: {
		type: Boolean,
		required: true,
		default: false
	}
}, {
	timestamps: true
})

/* Encriptar el password del usuario antes de guardarlo */
userSchema.pre( 'save', async function( next ) {

	const salt = await bcrypt.genSalt()
	const passwordHashed = await bcrypt.hash( this.password, salt )

	this.password = passwordHashed
	next()
})
/* Quitar el password del documento */
userSchema.set( 'toJSON', {
	transform(doc, ret, options) {
		delete ret['password']
        return ret
	},
})
/* Acatualizar el campo updatedAt cuando se haga update */
userSchema.pre( 'updateOne', async function( next ) {

	this.updatedAt = new Date()
	next()
})
/* Verificar si la contraseña es correcta */
userSchema.method( 'comparePassword', async function( password: string ) {

	const isPasswordEqual: boolean = await bcrypt.compare( password, this.password ) 

	return isPasswordEqual
})

const User = model<IUser, UserModel>( 'User', userSchema )

export default User