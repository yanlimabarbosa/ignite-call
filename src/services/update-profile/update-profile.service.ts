import { api } from '../../lib/axios'
import { UpdateProfileRequest } from './types'

export class UpdateProfileService {
  async update(request: UpdateProfileRequest): Promise<void> {
    await api.put('/users/update-profile', request)
  }
}
