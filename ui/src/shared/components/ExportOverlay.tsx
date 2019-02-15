import React, {PureComponent} from 'react'
import {get} from 'lodash'

// Components
import {
  OverlayTechnology,
  OverlayBody,
  OverlayContainer,
  OverlayHeading,
  OverlayFooter,
} from 'src/clockface'
import {Button, ComponentColor} from '@influxdata/clockface'
import {Controlled as ReactCodeMirror} from 'react-codemirror2'

// Utils
import {downloadTextFile} from 'src/shared/utils/download'

// Styles
import 'src/shared/components/ImportOverlay.scss'

interface Props {
  isVisible: boolean
  onDismissOverlay: () => void
  resource: object
  resourceName: string
}

export default class ImportDashboardOverlay extends PureComponent<Props> {
  public render() {
    const {isVisible, resourceName, onDismissOverlay, resource} = this.props
    const options = {
      tabIndex: 1,
      mode: 'json',
      readonly: true,
      lineNumbers: true,
      autoRefresh: true,
      theme: 'time-machine',
      completeSingle: false,
    }
    return (
      <OverlayTechnology visible={isVisible}>
        <OverlayContainer maxWidth={800}>
          <OverlayHeading
            title={`Export ${resourceName}`}
            onDismiss={onDismissOverlay}
          />
          <OverlayBody>
            <ReactCodeMirror
              autoFocus={true}
              autoCursor={true}
              value={JSON.stringify(resource, null, 1)}
              options={options}
              onBeforeChange={this.doNothing}
              onTouchStart={this.doNothing}
            />
          </OverlayBody>
          <OverlayFooter>{this.submitButton}</OverlayFooter>
        </OverlayContainer>
      </OverlayTechnology>
    )
  }

  private doNothing = () => {}

  private get submitButton(): JSX.Element {
    const {resourceName} = this.props
    return (
      <Button
        text={`Export ${resourceName} as JSON`}
        onClick={this.handleExport}
        color={ComponentColor.Primary}
      />
    )
  }

  private handleExport = (): void => {
    const {resource, resourceName, onDismissOverlay} = this.props
    downloadTextFile(
      JSON.stringify(resource, null, 1),
      `${get(resource, 'name', resourceName)}.json`
    )
    onDismissOverlay()
  }
}
