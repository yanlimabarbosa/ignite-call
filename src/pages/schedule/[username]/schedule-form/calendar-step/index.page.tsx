import { Text } from '@ignite-ui/react'
import { Calendar } from '../../../../../components/calendar'
import {
  Container,
  TimePicker,
  TimePickerHeader,
  TimePickerItem,
  TimePickerList,
} from './styles'

export default function CalendarStep() {
  const isDateSelected = true

  return (
    <Container isTimePickerOpen={isDateSelected}>
      <Calendar />

      {isDateSelected && (
        <TimePicker>
          <TimePickerHeader>
            terça feira <span>20 de setembro</span>
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
