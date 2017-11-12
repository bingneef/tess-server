import Mollie from 'mollie-api-node'
import constants from '../../config/constants'

export const mollie = new Mollie.API.Client
mollie.setApiKey(constants.tokens.mollie)

export const createPayment = async ({ amount, description }) => {
  return new Promise((resolve, reject) => {
    mollie.payments.create({
      amount,
      description,
      redirectUrl: `${constants.frontEnd.url}/account`,
      webhookUrl:  `${constants.staticUrl}/services/mollie-webhook/`,
    }, payment => {
      resolve(payment)
    })
  })
}
