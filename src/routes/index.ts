import { Router } from 'express'
/*  */
import { router as userRouter } from './user.routes'

class RoutesApp {
	
	protected router = Router()

	setRouter = () => {
		this.router.use( '/user', userRouter )
	}

	getRouter = () => {
		this.setRouter()
		return this.router
	}
}

export default RoutesApp