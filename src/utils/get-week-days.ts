export function getWeekDays() {
  const formatter = new Intl.DateTimeFormat('pt-BR', { weekday: 'long' })

  const daysOfWeekIndexes = Array.from(Array(7).keys())

  return daysOfWeekIndexes
    .map((day) => formatter.format(new Date(Date.UTC(2021, 5, day)))) // 2021 june starts with sunday
    .map((weekDay) => {
      return weekDay.substring(0, 1).toUpperCase().concat(weekDay.substring(1))
    })
}
