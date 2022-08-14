import { Router } from 'express'
import { ObjectId } from 'mongoose';
import { IMessage, IUser } from '../interfaces';


export const router = Router()
const basePath = 'https://ssaurexd-chat-server.herokuapp.com/api'
const Authorization = 'Bearer token'
const user = {
	email: 'examplo@example.com',
	isOnline: true,
	name: 'Exampla',
	role: 'user',
	_id: '237ydiuh7892hod38'
}

interface IEndpoints {
	url: string;
	method: 'PUT' | 'DELETE' | 'POST' | 'GET';
	body?: {
		field: string;
		required: boolean;
		uniqued?: boolean;
	}[];
	param?: string;
	headers?: {
		Authorization?: string
	};
	response: {
		user?: {
			email?: string;
			isOnline?: boolean;
			name?: string;
			role?: string;
			_id?: string;
		};
		msg?: string;
		data?: [] | IUser[];
		_id?: string;
		name?: string;
		email?: string; 
		role?: string; 
		token?: string;
		messages?: IMessage[];
	};
	query?: {
		q: string
	}
}

router.get( '/', ( req, res ) => {

	const doc: IEndpoints[] = [
		{
			url: `${ basePath }/user`,
			method: 'GET',
			headers: {
				Authorization
			},
			query: {
				q: 'parametro de busqueda por nombre'
			},
			response: {
				user
			}
		},
		{
			url: `${ basePath }/auth/signup`,
			method: 'POST',
			body: [
				{
					field: 'name',
					required: true
				},
				{
					field: 'password',
					required: true
				},
				{
					field: 'email',
					required: true,
					uniqued: true
				}
			],
			response: {
				user,
				token: 'token',
				msg: 'mensaje de error'
			}
		},
		{
			url: `${ basePath }/auth/login`,
			method: 'POST',
			body: [
				{
					field: 'password',
					required: true
				},
				{
					field: 'email',
					required: true
				}
			],
			response: {
				user,
				token: 'token',
				msg: 'mensaje de error'
			}
		},
		{
			url: `${ basePath }/oauth/google`,
			method: 'POST',
			body: [
				{
					field: 'name',
					required: true
				},
				{
					field: 'email',
					required: true
				}
			],
			response: {
				...user,
				token: 'token',
				msg: 'mensaje de error'
			}
		},
		{
			url: `${ basePath }/message/:uid`,
			method: 'POST',
			param: 'Id de usuario del que quiere los mensajes',
			headers: {
				Authorization
			},
			response: {
				messages: [
					{
						from: 'uid' as any,
						message: 'mensaje',
						to: 'uid' as any,
						_id: '234rfr13dqws2',
						createdAt: new Date()
					}
				]
			}
		},
	]

	return res.json({
		enpoints: doc
	})
})

