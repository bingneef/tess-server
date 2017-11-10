import Mollie from 'mollie-api-node'
import { promisify } from 'util'

import constants from '../../config/constants'

export const mollie = new Mollie.API.Client
mollie.setApiKey(constants.tokens.mollie)

export const createPayment = async ({ amount, description }) => {
  const createAsync = promisify(mollie.payments.create)
  return new Promise((resolve, reject) => {
    mollie.payments.create({
      amount,
      description,
      redirectUrl: "http://localhost:3030/account",
      webhookUrl:  "https://08067fc7.ngrok.io/services/mollie-webhook/"
    }, payment => {
      resolve(payment)
    })
  })
}
