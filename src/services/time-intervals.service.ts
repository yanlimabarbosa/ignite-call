import { api } from '../lib/axios'
import { TimeIntervalsFormOutput } from '../pages/register/time-intervals/types/time-intervals-form-output'

export class TimeIntervalsService {
  async create(intervals: TimeIntervalsFormOutput) {
    await api.post('/api/users/time-intervals', {
      intervals,
    })
  }
}
