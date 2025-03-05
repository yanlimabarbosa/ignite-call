import { z } from 'zod'
import { timeIntervalsFormSchema } from '../schemas/time-intervals-form-schema'

export type TimeIntervalsFormOutput = z.output<typeof timeIntervalsFormSchema>
