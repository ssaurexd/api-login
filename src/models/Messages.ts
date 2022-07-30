import { Schema, model } from 'mongoose'
/*  */
import { IMessage } from '../interfaces'
import { User } from './User'


const messageSchema = new Schema<IMessage>({
	from: {
		type: Schema.Types.ObjectId,
		required: true,
		ref: User
	},
	to: {
		type: Schema.Types.ObjectId,
		required: true,
		ref: User
	},
	message: {
		type: String,
		required: true
	}
}, {
	timestamps: true
})

messageSchema.method( 'toJSON', function() {
    const { __v, ...object } = this.toObject();
    return object
})

export const Message = model( 'Message', messageSchema )
