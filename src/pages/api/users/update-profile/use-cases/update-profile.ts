import { IProfileRepository } from '../repositories/prisma-profile.repository'

interface UpdateProfileRequest {
  userId: string
  bio: string
}

export class UpdateProfileUseCase {
  constructor(private readonly profileRepository: IProfileRepository) { }

  async execute({ userId, bio }: UpdateProfileRequest): Promise<void> {
    if (!bio.trim()) {
      throw new Error('Bio cannot be empty')
    }

    await this.profileRepository.update({
      userId,
      bio,
    })
  }
} 