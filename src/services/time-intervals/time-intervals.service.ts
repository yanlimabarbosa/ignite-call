import { api } from '../../lib/axios'
import { CreateTimeIntervalsRequest } from './types'

export class TimeIntervalsService {
  async create(request: CreateTimeIntervalsRequest) {
    await api.post('/users/time-intervals', request)
  }
} 