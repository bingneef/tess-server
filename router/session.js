import Router from 'koa-router'
import constants from '../config/constants'
import { login, signup } from '../controllers/sessionController'

const router = new Router()
router.prefix('/api/v1')

router.post('/login', login)
router.post('/signup', signup)

export default router
