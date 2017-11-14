import { User, Credit, Message } from '../../../../models'

export default {
  Query: {
    currentUser: async ({ ctx }) => ctx.currentUser,
    exploreUsers: async ({ ctx }) => await User.find(),
  },
  Mutation: {
    validateToken: async ({ ctx }, { token }) => await ctx.dataLoaders.user.load(token),
    createOrUpdateUser: async ({ ctx }, { user: { email, familyName, givenName, externalId, name, photoUrl } }) => {
      let user = await User.findOne({externalId})
      if (!user) {
        user = new User()
      }
      user.set({email, familyName, givenName, externalId, name, photoUrl, token: null})
      return await user.save()
    },
  },
  User: {
    creditsRemaining: async (user, _, __, { rootValue: { ctx } }) => {
      if (ctx.currentUser.kind !== 'BUDDY') {
        return -1
      }
      return user.creditsRemaining
    }
  }
}
