import { User } from '../../models'
import mapResponse from '../graphql/mapResponse'

export const batchGetUserByToken = tokens => {
  return new Promise(async (resolve, reject) => {
    const users = await User.find({ token: tokens })
    const response = mapResponse(tokens, 'token', users)
    resolve(response)
  })
}

export const batchGetUserById = ids => {
  return new Promise(async (resolve, reject) => {
    const users = await User.find({ _id: ids })
    const response = mapResponse(ids, 'id', users)
    resolve(response)
  })
}
