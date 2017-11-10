import { Credit } from '../../../../models'
import { createPayment } from '../../../mollie'

export default {
  Query: {
    getCredits: async ({ ctx }) => {
      return await Credit.find({userId: ctx.currentUser.id})
    },
  },
  Mutation: {
    createCredit: async ({ ctx }, { amount }) => {
      const paymentParams = {
        amount: amount / 100,
        description: 'TEST PAYMENT',
      }

      const payment = await createPayment(paymentParams)

      const creditParams = {
        userId: ctx.currentUser.id,
        credits: 100,
        payment: {
          kind: 'PAYMENT',
          method: 'IDEAL',
          status: 'OPEN',
          amount,
          currency: 'EUR',
          externalId: payment.id,
          description: payment.description,
          url: payment.links.paymentUrl,
        },
      }

      return await new Credit(creditParams).save()
    },
  }
}
