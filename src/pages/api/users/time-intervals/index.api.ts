import { NextApiRequest, NextApiResponse } from 'next'
import { getServerSession } from 'next-auth'
import { z } from 'zod'
import { buildNextAuthOptions } from '../../auth/[...nextauth].api'
import { PrismaTimeIntervalsRepository } from './repositories/prisma-time-intervals.repository'
import { CreateTimeIntervalsUseCase } from './use-cases/create-time-intervals'

const timeIntervalsBodySchema = z.object({
  intervals: z.array(
    z.object({
      weekDay: z.number(),
      startTimeInMinutes: z.number(),
      endTimeInMinutes: z.number(),
    }),
  ),
})

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' })
  }

  const session = await getServerSession(
    req,
    res,
    buildNextAuthOptions(req, res),
  )

  if (!session) {
    return res.status(401).json({ message: 'Não autorizado' })
  }

  const { intervals } = timeIntervalsBodySchema.parse(req.body)

  const timeIntervalsRepository = new PrismaTimeIntervalsRepository()
  const createTimeIntervals = new CreateTimeIntervalsUseCase(
    timeIntervalsRepository,
  )

  try {
    await createTimeIntervals.execute({
      intervals,
      userId: session.user.id,
    })

    return res.status(201).end()
  } catch (error) {
    console.error(error)
    return res.status(400).json({ message: 'Error creating time intervals' })
  }
}
