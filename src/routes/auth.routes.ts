import { Router } from 'express'
import { body } from 'express-validator'
/*  */
import { authController } from '../controllers'
import { validateBody } from '../middlewares'


export const router = Router()

router.post( '/signup',  
	validateBody([
		body('email')
			.notEmpty({ ignore_whitespace: true }).withMessage('El email es requerido')
			.isEmail().withMessage('Email no valido'),
		body('password')
			.notEmpty({ ignore_whitespace: true }).withMessage('El password es requerido'),
		body('name')
			.notEmpty({ ignore_whitespace: true }).withMessage('El name es requerido'),
	]),
	authController.signup
)

router.post( '/login',
	validateBody([
		body('email')
			.notEmpty({ ignore_whitespace: true }).withMessage('El email es requerido')
			.isEmail().withMessage('Email no valido'),
		body('password')
			.notEmpty({ ignore_whitespace: true }).withMessage('El password es requerido'),
	]),
	authController.login
)