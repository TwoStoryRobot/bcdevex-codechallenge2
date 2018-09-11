import React from 'react'
import { storiesOf } from '@storybook/react'
import { host } from 'storybook-host'
import { withKnobs, number, select } from '@storybook/addon-knobs/react'
import docgen from '@twostoryrobot/storybook-addon-docgen'
import LoadingIcon from 'mdi-react/LoadingIcon'

import Spinner from '../components/Spinner'

storiesOf('Spinner', module)
  .addDecorator(host())
  .addDecorator(withKnobs)
  .addDecorator(docgen(Spinner))
  .add('icon', () => {
    return (
      <Spinner>
        <LoadingIcon />
      </Spinner>
    )
  })
  .add('large icon', () => {
    return (
      <Spinner>
        <LoadingIcon size={64} />
      </Spinner>
    )
  })
  .add('text', () => {
    return <Spinner>Test child text</Spinner>
  })
  .add('with knobs', () => {
    const duration = number('Duration', 1)
    const timingFunction = select('Timing Function', [
      'ease',
      'linear',
      'ease-in',
      'ease-out',
      'ease-in-out'
    ])
    const direction = select('Direction', [
      'normal',
      'reverse',
      'alternate',
      'alternate-reverse'
    ])
    const playState = select('Play State', ['paused', 'running'], 'running')

    return (
      <Spinner {...{ duration, timingFunction, direction, playState }}>
        <LoadingIcon size={64} />
      </Spinner>
    )
  })
