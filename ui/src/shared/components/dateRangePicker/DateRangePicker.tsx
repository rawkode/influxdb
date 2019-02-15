// Libraries
import React, {PureComponent} from 'react'

// Components
import DatePicker from 'src/shared/components/dateRangePicker/DatePicker'

// Styles
import 'src/shared/components/dateRangePicker/DateRangePicker.scss'

// Types
import {TimeRange} from 'src/types'
import {Button, ComponentColor, ComponentSize} from '@influxdata/clockface'
import {ClickOutside} from '../ClickOutside'

interface Props {
  timeRange: TimeRange
  onSetTimeRange: (timeRange: TimeRange) => void
  onClickOutside: () => void
}

interface State {
  lower: string
  upper: string
}

class DateRangePicker extends PureComponent<Props, State> {
  constructor(props: Props) {
    super(props)
    const {
      timeRange: {lower, upper},
    } = props

    this.state = {lower, upper}
  }

  public render() {
    const {onClickOutside} = this.props
    const {upper, lower} = this.state

    return (
      <ClickOutside onClickOutside={onClickOutside}>
        <div className="range-picker react-datepicker-ignore-onclickoutside">
          <div className="range-picker--date-pickers">
            <DatePicker
              dateTime={lower}
              onSelectDate={this.handleSelectLower}
            />
            <DatePicker
              dateTime={upper}
              onSelectDate={this.handleSelectUpper}
            />
          </div>
          <Button
            color={ComponentColor.Primary}
            size={ComponentSize.Small}
            onClick={this.handleSetTimeRange}
            text="Apply Time Range"
          />
        </div>
      </ClickOutside>
    )
  }

  private handleSetTimeRange = (): void => {
    const {onSetTimeRange, timeRange} = this.props
    const {upper, lower} = this.state

    onSetTimeRange({...timeRange, lower, upper})
  }

  private handleSelectLower = (lower: string): void => {
    this.setState({lower})
  }

  private handleSelectUpper = (upper: string): void => {
    this.setState({upper})
  }
}

export default DateRangePicker
