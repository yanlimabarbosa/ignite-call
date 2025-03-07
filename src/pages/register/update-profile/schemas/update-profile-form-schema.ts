import { z } from 'zod'

export const updateProfileFormSchema = z.object({
  bio: z.string(),
})
