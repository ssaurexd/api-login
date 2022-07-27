import { Router } from 'express' 
/*  */
import { isAuthenticated, isAuthenticatedAndAdmin } from '../middlewares'
import { messageController } from '../controllers'


export const router = Router()

router.get( '/:from', isAuthenticated, messageController.getMessagesByUser )