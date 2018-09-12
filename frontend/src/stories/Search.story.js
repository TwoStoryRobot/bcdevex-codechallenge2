import React from 'react'
import { storiesOf } from '@storybook/react'
import { host } from 'storybook-host'
import { withKnobs, text } from '@storybook/addon-knobs/react'
import { action } from '@storybook/addon-actions'
import docgen from '@twostoryrobot/storybook-addon-docgen'

import { create } from 'reworm'

import SearchBar from '../components/SearchBar'

storiesOf('SearchBar', module)
  .addDecorator(host())
  .addDecorator(withKnobs)
  .addDecorator(docgen(SearchBar))
  .add('Default', () => {
    return <SearchBar />
  })
