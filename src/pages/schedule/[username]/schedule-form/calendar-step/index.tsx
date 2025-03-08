import { Text } from '@ignite-ui/react'
import dayjs from 'dayjs'
import { useState } from 'react'
import { Calendar } from '../../../../../components/calendar'
import {
  Container,
  TimePicker,
  TimePickerHeader,
  TimePickerItem,
  TimePickerList,
} from './styles'

export function CalendarStep() {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)

  const isDateSelected = !!selectedDate

  const weekDay = selectedDate ? dayjs(selectedDate).format('dddd') : null
  const describedDate = selectedDate
    ? dayjs(selectedDate).format('DD[ de ]MMMM')
    : null

  return (
    <Container isTimePickerOpen={isDateSelected}>
      <Calendar selectedDate={selectedDate} onDateSelected={setSelectedDate} />

      {isDateSelected && (
        <TimePicker>
          <TimePickerHeader>
            {weekDay}, <span>{describedDate}</span>
          </TimePickerHeader>

          <TimePickerList>
            <TimePickerItem>
              <Text>08:00</Text>
            </TimePickerItem>
            <TimePickerItem>
              <Text>09:00</Text>
            </TimePickerItem>
            <TimePickerItem disabled>
              <Text>10:00</Text>
            </TimePickerItem>
            <TimePickerItem>
              <Text>11:00</Text>
            </TimePickerItem>
            <TimePickerItem>
              <Text>12:00</Text>
            </TimePickerItem>
            <TimePickerItem>
              <Text>13:00</Text>
            </TimePickerItem>
            <TimePickerItem>
              <Text>14:00</Text>
            </TimePickerItem>
            <TimePickerItem>
              <Text>15:00</Text>
            </TimePickerItem>
            <TimePickerItem>
              <Text>16:00</Text>
            </TimePickerItem>
            <TimePickerItem>
              <Text>17:00</Text>
            </TimePickerItem>
            <TimePickerItem>
              <Text>18:00</Text>
            </TimePickerItem>
          </TimePickerList>
        </TimePicker>
      )}
    </Container>
  )
}
