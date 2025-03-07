import { ITimeIntervalsRepository } from '../repositories/prisma-time-intervals.repository'

interface TimeInterval {
  weekDay: number
  startTimeInMinutes: number
  endTimeInMinutes: number
}

interface CreateTimeIntervalsRequest {
  intervals: TimeInterval[]
  userId: string
}

export class CreateTimeIntervalsUseCase {
  constructor(
    private readonly timeIntervalsRepository: ITimeIntervalsRepository,
  ) {}

  async execute({
    intervals,
    userId,
  }: CreateTimeIntervalsRequest): Promise<void> {
    if (intervals.length === 0) {
      throw new Error('No intervals provided')
    }

    const timeIntervals = intervals.map((interval) => ({
      ...interval,
      userId,
    }))

    await this.timeIntervalsRepository.createMany(timeIntervals)
  }
}
