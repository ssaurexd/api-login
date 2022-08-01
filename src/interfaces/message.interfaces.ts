import { Schema } from 'mongoose'



export interface IMessage {
	_id?: string;
	from: Schema.Types.ObjectId;
	to: Schema.Types.ObjectId;
	message: string;
	createdAt?: Date;
	updatedAt?: Date;
}