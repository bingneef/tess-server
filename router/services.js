import Router from 'koa-router'
import { mollieWebhook } from '../controllers/servicesController'

const router = new Router()
router.prefix('/services')

router.all('/mollie-webhook', mollieWebhook)

export default router
