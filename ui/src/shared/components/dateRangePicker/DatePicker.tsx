// Libraries
import React, {PureComponent} from 'react'
import ReactDatePicker from 'react-datepicker'

// Styles
import 'react-datepicker/dist/react-datepicker.css'
import {Input} from 'src/clockface'
import {ComponentSize} from '@influxdata/clockface'

interface Props {
  dateTime: string
  onSelectDate: (date: string) => void
}

class DatePicker extends PureComponent<Props> {
  public render() {
    const {dateTime} = this.props
    const date = new Date(dateTime)

    return (
      <div className="range-picker--date-picker">
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
          popperContainer={this.popperContainer}
          popperClassName="range-picker--popper"
          calendarClassName="range-picker--calendar"
          dayClassName={() => 'range-picker--day'}
        />
      </div>
    )
  }

  private get customInput() {
    return (
      <Input
        widthPixels={335}
        size={ComponentSize.Medium}
        customClass="range-picker--input react-datepicker-ignore-onclickoutside"
      />
    )
  }

  private popperContainer({children}): JSX.Element {
    return <div className="range-picker--popper-container">{children}</div>
  }

  private calendarContainer({children}): JSX.Element {
    return (
      <div className="react-datepicker-ignore-onclickout range-picker--calendar-container">
        {children}
      </div>
    )
  }

  private handleSelectDate = (date: Date): void => {
    const {onSelectDate} = this.props

    onSelectDate(date.toISOString())
  }
}

export default DatePicker
