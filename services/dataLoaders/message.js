import { Message } from '../../models'
import mapResponse from '../graphql/mapResponse'

export const batchGetMessageById = ids => {
  return new Promise(async (resolve, reject) => {
    const messages = await Message.find({ _id: ids })
    const response = mapResponse(ids, 'id', messages)
    resolve(response)
  })
}
