// Libraries
import React, {PureComponent} from 'react'
import _ from 'lodash'

// Components
import {ErrorHandling} from 'src/shared/decorators/errors'
import StatusIndicator from 'src/dataLoaders/components/lineProtocolWizard/verify/StatusIndicator'
import OnboardingButtons from 'src/onboarding/components/OnboardingButtons'
import FancyScrollbar from 'src/shared/components/fancy_scrollbar/FancyScrollbar'

// Types
import {Form} from 'src/clockface'
import {LineProtocolStepProps} from 'src/dataLoaders/components/lineProtocolWizard/LineProtocolWizard'

type Props = LineProtocolStepProps

@ErrorHandling
export class VerifyLineProtocolStep extends PureComponent<Props> {
  public render() {
    const {onDecrementCurrentStepIndex, onExit} = this.props

    return (
      <div className="onboarding-step">
        <Form onSubmit={onExit}>
          <div className="wizard-step--scroll-area">
            <FancyScrollbar autoHide={false}>
              <div className="wizard-step--scroll-content">
                <StatusIndicator />
              </div>
            </FancyScrollbar>
          </div>
          <OnboardingButtons
            onClickBack={onDecrementCurrentStepIndex}
            nextButtonText={'Finish'}
          />
        </Form>
      </div>
    )
  }
}

export default VerifyLineProtocolStep
