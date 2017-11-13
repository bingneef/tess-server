import Slack from 'slack-node'
import constants from '../../config/constants'

export const sendPaymentHook = ({ amount, name }) => {
  const slack = new Slack()
  slack.setWebhook(constants.thirdParty.slack.payment)
  const text = `New payment received for ${name} of ${amount}`

  slack.webhook({
    channel: "#tess",
    username: "mollie-bot",
    icon_emoji: ":money:",
    text,
  }, (err, response) => {
    console.log(err, response)
  })

}
