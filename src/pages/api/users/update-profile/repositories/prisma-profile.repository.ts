import { prisma } from '../../../../../lib/prisma'

export interface UpdateProfileInput {
  userId: string
  bio: string
}

export interface IProfileRepository {
  update(data: UpdateProfileInput): Promise<void>
}

export class PrismaProfileRepository implements IProfileRepository {
  async update({ userId, bio }: UpdateProfileInput): Promise<void> {
    await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        bio,
      },
    })
  }
}
