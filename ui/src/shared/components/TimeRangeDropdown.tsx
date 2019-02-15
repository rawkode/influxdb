// Libraries
import React, {PureComponent} from 'react'

// Components
import {Dropdown} from 'src/clockface'
import DateRangePicker from 'src/shared/components/dateRangePicker/DateRangePicker'

// Constants
import {TIME_RANGES} from 'src/shared/constants/timeRanges'

// Types
import {TimeRange} from 'src/types'

interface Props {
  timeRange: TimeRange
  onSetTimeRange: (timeRange: TimeRange) => void
}

interface State {
  isDatePickerOpen: boolean
}

class TimeRangeDropdown extends PureComponent<Props, State> {
  constructor(props: Props) {
    super(props)

    this.state = {isDatePickerOpen: false}
  }

  public render() {
    const timeRange = this.timeRange

    return (
      <>
        {this.isDatePickerVisible && (
          <DateRangePicker
            timeRange={timeRange}
            onSetTimeRange={this.handleApplyTimeRange}
            onClickOutside={this.handleHideDatePicker}
          />
        )}
        <Dropdown
          selectedID={timeRange.label}
          onChange={this.handleChange}
          widthPixels={100}
        >
          {TIME_RANGES.map(({label}) => (
            <Dropdown.Item key={label} value={label} id={label}>
              {label}
            </Dropdown.Item>
          ))}
        </Dropdown>
      </>
    )
  }

  private get timeRange(): TimeRange {
    const {timeRange} = this.props

    if (timeRange.label === 'Date Picker') {
      return timeRange
    }

    const selectedTimeRange = TIME_RANGES.find(t => t.lower === timeRange.lower)

    if (!selectedTimeRange) {
      throw new Error('TimeRangeDropdown passed unknown TimeRange')
    }

    return selectedTimeRange
  }

  private get isDatePickerVisible() {
    return (
      this.state.isDatePickerOpen &&
      this.props.timeRange.label === 'Date Picker'
    )
  }

  private handleApplyTimeRange = (timeRange: TimeRange) => {
    this.props.onSetTimeRange(timeRange)
    this.handleHideDatePicker()
  }

  private handleHideDatePicker = () => {
    this.setState({isDatePickerOpen: false})
  }

  private handleChange = (label: string): void => {
    const {onSetTimeRange} = this.props
    const timeRange = TIME_RANGES.find(t => t.label === label)

    if (label === 'Date Picker') {
      const date = new Date().toISOString()
      timeRange.lower = date
      timeRange.upper = date
      onSetTimeRange(timeRange)
      this.setState({isDatePickerOpen: true})
      return
    }

    onSetTimeRange(timeRange)
  }
}

export default TimeRangeDropdown
