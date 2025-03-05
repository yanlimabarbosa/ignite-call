export interface TimeInterval {
  weekDay: number
  startTimeInMinutes: number
  endTimeInMinutes: number
}

export interface CreateTimeIntervalsRequest {
  intervals: TimeInterval[]
} 