import { Conversation } from '../../models'
import mapResponse from '../graphql/mapResponse'

export const batchGetConversationById = ids => {
  return new Promise(async (resolve, reject) => {
    const conversations = await Conversation.find({ _id: ids })
    const response = mapResponse(ids, 'id', conversations)
    resolve(response)
  })
}
