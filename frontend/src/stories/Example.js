import React from 'react'
import PropTypes from 'prop-types'
import { storiesOf } from '@storybook/react'
import { host } from 'storybook-host'
import { withKnobs, number, text } from '@storybook/addon-knobs/react'
import { action } from '@storybook/addon-actions'
import docgen from '@twostoryrobot/storybook-addon-docgen'

class Example extends React.Component {
  render() {
    return (
      <div>
        {this.props.text} - {this.props.number}
      </div>
    )
  }
}

Example.propTypes = {
  text: PropTypes.string.isRequired,
  number: PropTypes.number.isRequired
}

storiesOf('Example', module)
  .addDecorator(host())
  .addDecorator(withKnobs)
  .addDecorator(docgen(Example))
  .add('default', () => {
    const n = number('Some number', 10)
    const t = text('Some text', 'default')
    return <Example number={n} text={t} />
  })
