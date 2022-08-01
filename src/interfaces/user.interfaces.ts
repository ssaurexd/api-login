import { Document, Model, Schema } from 'mongoose'


export interface IUser {
	_id?:string; 
	email: string;
	password: string;
	name: string;
	createdAt?: Date;
	updatedAt?: Date;
	role: UserRoles,
	isOnline: boolean;
}
export type UserRoles = 'user' |  'admin'
export interface IUserMethods {
	comparePassword: ( password: string ) => Promise<boolean>;
}
export type UserModel = Model<IUser, {}, IUserMethods, {}, Document>