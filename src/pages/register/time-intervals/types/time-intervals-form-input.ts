import { z } from 'zod'
import { timeIntervalsFormSchema } from '../schemas/time-intervals-form-schema'

export type TimeIntervalsFormInput = z.input<typeof timeIntervalsFormSchema>
