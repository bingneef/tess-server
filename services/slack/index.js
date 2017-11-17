import Slack from 'slack-node'
import constants from '../../config/constants'

export const sendPaymentHook = ({ amount, name }) => {
  const slack = new Slack()
  slack.setWebhook(constants.thirdParty.slack.payment)

  slack.webhook({
    channel: '#tess',
    username: 'mollie-bot',
    icon_emoji: ':moneybag:',
    attachments: [
      {
        fallback: `New payment received for ${name} of ${amount}`,
        color: '#36a64f',
        pretext: 'New payment received',
        fields: [
            {
                title: 'Username',
                value: name,
                short: true
            },
            {
                title: 'Status',
                value: 'test',
                short: true
            },
            {
                title: 'Amount',
                value: amount,
                short: true
            },
            {
                title: 'Credits',
                value: amount,
                short: true
            }
        ],
        footer: 'Mollie API',
        ts: 123456789
      }
    ]
  }, (err, response) => {
    console.log(err, response)
  })

}
