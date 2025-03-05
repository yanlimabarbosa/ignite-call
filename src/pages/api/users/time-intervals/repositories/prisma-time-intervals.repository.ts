import { prisma } from '../../../../../lib/prisma'

export interface CreateTimeIntervalInput {
  weekDay: number
  startTimeInMinutes: number
  endTimeInMinutes: number
  userId: string
}

export interface ITimeIntervalsRepository {
  createMany(intervals: CreateTimeIntervalInput[]): Promise<void>
}

export class PrismaTimeIntervalsRepository implements ITimeIntervalsRepository {
  async createMany(intervals: CreateTimeIntervalInput[]): Promise<void> {
    await Promise.all(
      intervals.map((interval) => {
        return prisma.userTimeInterval.create({
          data: {
            week_day: interval.weekDay,
            time_start_in_minutes: interval.startTimeInMinutes,
            time_end_in_minutes: interval.endTimeInMinutes,
            user_id: interval.userId,
          },
        })
      }),
    )
  }
}
