// Libraries
import React, {PureComponent} from 'react'

// Components
import DatePicker from 'src/shared/components/DatePicker'

// Types
import {TimeRange} from 'src/types'
import {Button} from '@influxdata/clockface'

interface Props {
  timeRange: TimeRange
  onSetTimeRange: (timeRange: TimeRange) => void
}

interface State {
  lower: string
  upper: string
}

class CustomTimeRange extends PureComponent<Props, State> {
  constructor(props: Props) {
    super(props)
    const {
      timeRange: {lower, upper},
    } = props

    this.state = {lower, upper}
  }

  public render() {
    const {upper, lower} = this.state

    return (
      <div>
        <DatePicker dateTime={lower} onSelectDate={this.handleSelectLower} />
        <DatePicker dateTime={upper} onSelectDate={this.handleSelectUpper} />

        <Button onClick={this.handleSetTimeRange} text="Apply" />
      </div>
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

export default CustomTimeRange
