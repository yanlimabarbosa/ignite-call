import { User } from '@prisma/client'
import { NextApiRequest, NextApiResponse, NextPageContext } from 'next'
import { Adapter, AdapterAccount } from 'next-auth/adapters'
import { destroyCookie, parseCookies } from 'nookies'
import { prisma } from '../prisma'

/** @return { import("next-auth/adapters").Adapter } */
export function PrismaAdapter(
  req: NextApiRequest | NextPageContext['req'],
  res: NextApiResponse | NextPageContext['res'],
): Adapter {
  return {
    async createUser(user: User) {
      const { '@ignitecall:userId': userIdOnCookies } = parseCookies({ req })

      if (!userIdOnCookies) {
        throw new Error('User ID not found on cookies')
      }

      const prismaUser = await prisma.user.update({
        where: {
          id: userIdOnCookies,
        },
        data: {
          name: user.name,
          email: user.email,
          avatar_url: user.avatar_url,
        },
      })

      destroyCookie({ res }, '@ignitecall:userId', {
        path: '/',
      })

      return {
        id: prismaUser.id,
        name: prismaUser.name,
        email: prismaUser.email!,
        username: prismaUser.username,
        emailVerified: null,
        avatar_url: prismaUser.avatar_url!,
      }
    },

    async getUser(id) {
      const user = await prisma.user.findUnique({
        where: {
          id,
        },
      })

      if (!user) {
        return null
      }

      return {
        id: user.id,
        name: user.name,
        email: user.email!,
        username: user.username,
        emailVerified: null,
        avatar_url: user.avatar_url!,
      }
    },

    async getUserByEmail(email) {
      const user = await prisma.user.findUnique({
        where: {
          email,
        },
      })

      if (!user) {
        return null
      }

      return {
        id: user.id,
        name: user.name,
        email: user.email!,
        username: user.username,
        emailVerified: null,
        avatar_url: user.avatar_url!,
      }
    },

    async getUserByAccount({ providerAccountId, provider }) {
      const account = await prisma.account.findUnique({
        where: {
          provider_provider_account_id: {
            provider,
            provider_account_id: providerAccountId,
          },
        },
        include: {
          user: true,
        },
      })

      if (!account) {
        return null
      }

      const { user } = account

      return {
        id: user.id,
        name: user.name,
        email: user.email!,
        username: user.username,
        emailVerified: null,
        avatar_url: user.avatar_url!,
      }
    },

    async updateUser(user) {
      const prismaUser = await prisma.user.update({
        where: {
          id: user.id,
        },
        data: {
          name: user.name,
          email: user.email,
          avatar_url: user.avatar_url,
        },
      })

      return {
        id: prismaUser.id,
        name: prismaUser.name,
        username: prismaUser.username,
        email: prismaUser.email!,
        emailVerified: null,
        avatar_url: prismaUser.avatar_url!,
      }
    },

    // async deleteUser(userId) {
    //   await prisma.user.delete({
    //     where: {
    //       id: userId,
    //     },
    //   })
    // },

    async linkAccount(account: AdapterAccount) {
      await prisma.account.create({
        data: {
          user_id: account.userId,
          type: account.type,
          provider: account.provider,
          provider_account_id: account.providerAccountId,
          refresh_token: account.refresh_token,
          access_token: account.access_token,
          expires_at: account.expires_at,
          token_type: account.token_type,
          scope: account.scope,
          id_token: account.id_token,
          session_state: account.session_state,
        },
      })
    },

    // async unlinkAccount({ providerAccountId, provider }) {},

    async createSession({ sessionToken, userId, expires }) {
      await prisma.session.create({
        data: {
          session_token: sessionToken,
          user_id: userId,
          expires,
        },
      })

      return {
        sessionToken,
        userId,
        expires,
      }
    },

    async getSessionAndUser(sessionToken) {
      const prismaSession = await prisma.session.findUnique({
        where: {
          session_token: sessionToken,
        },
        include: {
          user: true,
        },
      })

      if (!prismaSession) {
        return null
      }

      const { user, ...session } = prismaSession

      return {
        session: {
          sessionToken: session.session_token,
          userId: session.user_id,
          expires: session.expires,
        },
        user: {
          id: user.id,
          name: user.name,
          email: user.email!,
          username: user.username,
          emailVerified: null,
          avatar_url: user.avatar_url!,
        },
      }
    },

    async updateSession({ sessionToken, userId, expires }) {
      const prismaSession = await prisma.session.update({
        where: {
          session_token: sessionToken,
        },
        data: {
          user_id: userId,
          expires,
        },
      })

      return {
        sessionToken: prismaSession.session_token,
        userId: prismaSession.user_id,
        expires: prismaSession.expires,
      }
    },

    async deleteSession(sessionToken) {
      await prisma.session.delete({
        where: {
          session_token: sessionToken,
        },
      })
    },

    // async createVerificationToken({ identifier, expires, token }) {},

    // async useVerificationToken({ identifier, token }) {},
  }
}
