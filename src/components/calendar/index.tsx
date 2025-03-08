import dayjs from 'dayjs'
import { CaretLeft, CaretRight } from 'phosphor-react'
import { useMemo, useState } from 'react'
import { getWeekDays } from '../../utils/get-week-days'
import {
  CalendarActions,
  CalendarBody,
  CalendarContainer,
  CalendarDay,
  CalendarHeader,
  CalendarTitle,
} from './styles'

interface CalendarProps {
  selectedDate?: Date | null
  onDateSelected: (date: Date) => void
}

export function Calendar({ selectedDate, onDateSelected }: CalendarProps) {
  const [currentDate, setCurrentDate] = useState(() => dayjs().set('date', 1))
  const shortWeekDays = getWeekDays({ short: true })

  const calendarWeeks = useMemo(() => {
    const firstDay = currentDate.startOf('month')
    const lastDay = currentDate.endOf('month')

    // Total days to display = empty days before month + days in month + empty days after
    const totalDays =
      firstDay.day() + // empty days before month start
      lastDay.date() + // days in month
      (6 - lastDay.day()) // empty days after month end

    // Generate all days (previous month + current + next month)
    const allDays = Array.from({ length: totalDays }).map((_, i) => {
      const date = firstDay.subtract(firstDay.day() - i, 'day')
      return {
        date,
        disabled:
          date.month() !== currentDate.month() ||
          date.endOf('day').isBefore(new Date()),
      }
    })

    // Split days into weeks
    return Array.from({ length: Math.ceil(totalDays / 7) }).map((_, i) => ({
      week: i + 1,
      days: allDays.slice(i * 7, (i + 1) * 7),
    }))
  }, [currentDate])

  return (
    <CalendarContainer>
      <CalendarHeader>
        <CalendarTitle>
          {currentDate.format('MMMM')} <span>{currentDate.format('YYYY')}</span>
        </CalendarTitle>

        <CalendarActions>
          <button
            onClick={() => setCurrentDate((prev) => prev.subtract(1, 'month'))}
            title="Previous month"
          >
            <CaretLeft />
          </button>
          <button
            onClick={() => setCurrentDate((prev) => prev.add(1, 'month'))}
            title="Next month"
          >
            <CaretRight />
          </button>
        </CalendarActions>
      </CalendarHeader>

      <CalendarBody>
        <thead>
          <tr>
            {shortWeekDays.map((weekDay) => (
              <th key={weekDay}>{weekDay}.</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {calendarWeeks.map(({ week, days }) => (
            <tr key={week}>
              {days.map(({ date, disabled }) => (
                <td key={date.toISOString()}>
                  <CalendarDay
                    onClick={() => onDateSelected(date.toDate())}
                    disabled={disabled}
                  >
                    {date.get('date')}
                  </CalendarDay>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </CalendarBody>
    </CalendarContainer>
  )
}
