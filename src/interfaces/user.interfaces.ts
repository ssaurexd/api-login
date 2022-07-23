import { Document, Model } from 'mongoose'


export interface IUser {
	_id?:string; 
	email: string;
	password: string;
	name: string;
	createdAt?: string;
	updatedAt?: string;
	role: UserRoles
}
export type UserRoles = 'user' |  'admin'
export interface IUserMethods {
	comparePassword: ( password: string ) => Promise<boolean>;
}
export type UserModel = Model<IUser, {}, IUserMethods, {}, Document>