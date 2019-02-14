// Libraries
import React, {PureComponent} from 'react'

// Components
import {Dropdown} from 'src/clockface'
import CustomTimeRange from 'src/shared/components/CustomTimeRange'

// Constants
import {TIME_RANGES} from 'src/shared/constants/timeRanges'

// Types
import {TimeRange} from 'src/types'

interface Props {
  timeRange: TimeRange
  onSetTimeRange: (timeRange: TimeRange) => void
}

class TimeRangeDropdown extends PureComponent<Props> {
  public render() {
    const timeRange = this.validateTimeRange()

    return (
      <>
        {this.isDatePickerSelected && (
          <CustomTimeRange
            timeRange={timeRange}
            onSetTimeRange={this.props.onSetTimeRange}
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

  private get isDatePickerSelected(): boolean {
    return this.props.timeRange.label === 'Date Picker'
  }

  private validateTimeRange = (): TimeRange => {
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

  private handleChange = (label: string): void => {
    const {onSetTimeRange} = this.props
    const timeRange = TIME_RANGES.find(t => t.label === label)

    if (label === 'Date Picker') {
      const date = new Date().toISOString()
      timeRange.lower = date
      timeRange.upper = date
    }

    onSetTimeRange(timeRange)
  }
}

export default TimeRangeDropdown
