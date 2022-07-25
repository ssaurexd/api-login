import { Schema } from 'mongoose'



export interface IMessage {
	from: Schema.Types.ObjectId;
	to: Schema.Types.ObjectId;
	message: string;
	isViewed: boolean;
}