import Router from 'koa-router'
import { graphqlKoa, graphiqlKoa } from 'apollo-server-koa'
import constants from '../config/constants'
import { promisify } from 'util'
import { mollie } from '../services/mollie'
import { Credit } from '../models'
import { sendException } from '../services/sentry'

const router = new Router()
import schema from '../services/graphql/schema/index'

router.all('/services/mollie-webhook', async (ctx, next) => {
  const paymentId = ctx.request.body.id

  await new Promise((resolve, reject) => {
    mollie.payments.get(
      paymentId,
      async payment => {
        try {
          const credit = await Credit.findOne({ 'payment.externalId': payment.id })

          credit.set({ 'payment.status': payment.status.toUpperCase() })
          await credit.save()

          ctx.status = 200
          resolve()
        } catch (e) {
          console.log(e)
          sendException(e)
          ctx.status = 500
          reject()
        }
      }
    )
  })
})

router.all('/graphql',
  (ctx, next) => graphqlKoa({
    schema,
    rootValue: {
      ctx,
    },
    // tracing: true,
    cacheControl: true,
  })(ctx, next)
)

if (process.env.NODE_ENV !== 'production') {
  router.get('/graphiql', graphiqlKoa({
    schema,
    endpointURL: '/graphql',
    subscriptionsEndpoint: `ws://${constants.baseUrl}:${constants.serverPort}/subscriptions`
  }))
}

// Other routes
router.all('/status', async (ctx) => {
  ctx.body = { alive: true }
})

export default router
