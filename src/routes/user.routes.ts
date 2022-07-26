import { Router } from 'express' 
/*  */
import { isAuthenticated, isAuthenticatedAndAdmin } from '../middlewares'
import { User } from '../models'
import { userController } from '../controllers'


export const router = Router()

router.get( '/', isAuthenticated, userController.getUsersByQuery )