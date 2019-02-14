// Libraries
import React, {PureComponent} from 'react'
import ReactDatePicker from 'react-datepicker'

// Styles
import 'react-datepicker/dist/react-datepicker.css'
import {Input} from 'src/clockface'

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
        onChange={this.handleSelectDate}
        startOpen={true}
        dateFormat="yyyy-MM-dd HH:mm"
        showTimeSelect={true}
        timeFormat="HH:mm"
        shouldCloseOnSelect={false}
        disabledKeyboardNavigation={true}
        customInput={this.customInput}
        calendarContainer={this.calendarContainer}
      />
    )
  }

  private get customInput() {
    return <Input customClass="react-datepicker-ignore-onclickoutside" />
  }

  private calendarContainer({children}): JSX.Element {
    return (
      <div className="react-datepicker-ignore-onclickoutside">{children}</div>
    )
  }

  private handleSelectDate = (date: Date): void => {
    const {onSelectDate} = this.props

    onSelectDate(date.toISOString())
  }
}

export default DatePicker
