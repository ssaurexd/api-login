import { Router } from 'express'
/*  */
import { router as userRouter } from './user.routes'
import { router as authRouter } from './auth.routes'
import { router as messagesRouter } from './messages.routes'
export { router as docRouter } from './doc.routes'

class RoutesApp {
	
	protected router = Router()

	setRouter = () => {
		this.router.use( '/user', userRouter )
		this.router.use( '/auth', authRouter )
		this.router.use( '/message', messagesRouter )
	}

	getRouter = () => {
		this.setRouter()
		return this.router
	}
}

export default RoutesApp