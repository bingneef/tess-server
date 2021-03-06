import constants from '../config/constants'
import { mollie } from '../services/mollie'
import { Credit } from '../models'
import { sendException } from '../services/sentry'
import { sendPaymentHook } from '../services/slack'

export const mollieWebhook = async (ctx, next) => {
  const paymentId = ctx.request.body.id

  await new Promise((resolve, reject) => {
    mollie.payments.get(
      paymentId,
      async payment => {
        try {
          const credit = await Credit.findOne({ 'payment.externalId': payment.id })

          credit.set({ 'payment.status': payment.status.toUpperCase() })
          await credit.save()

          if (credit.payment.status == 'PAID') {
            sendPaymentHook({amount: 10.00, name: 'test'})
          }

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
}
