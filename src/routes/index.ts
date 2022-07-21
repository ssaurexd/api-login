import { Router } from 'express'
/*  */
import { router as userRouter } from './user.routes'
import { router as authRouter } from './auth.routes'

class RoutesApp {
	
	protected router = Router()

	setRouter = () => {
		this.router.use( '/user', userRouter )
		this.router.use( '/auth', authRouter )
	}

	getRouter = () => {
		this.setRouter()
		return this.router
	}
}

export default RoutesApp