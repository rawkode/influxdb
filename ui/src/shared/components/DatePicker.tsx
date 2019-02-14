// Libraries
import React, {PureComponent} from 'react'
import ReactDatePicker from 'react-datepicker'

// Styles
import 'react-datepicker/dist/react-datepicker.css'

interface Props {
  dateTime: string
  onSelectDate: (date: string) => void
}

class DatePicker extends PureComponent<Props> {
  public render() {
    const {dateTime} = this.props
    const date = new Date(dateTime)

    return (
      <ReactDatePicker
        selected={date}
        onChange={this.handleChange}
        startOpen={true}
        dateFormat="YYYY-MM-dd HH:mm"
        showTimeSelect={true}
        timeFormat="HH:mm"
        shouldCloseOnSelect={false}
      />
    )
  }

  private handleChange = (date: Date): void => {
    const {onSelectDate} = this.props

    onSelectDate(date.toISOString())
  }
}

export default DatePicker
