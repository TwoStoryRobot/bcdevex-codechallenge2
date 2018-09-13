/* Search Story
 */

import React from 'react'
import { storiesOf } from '@storybook/react'
import { host } from 'storybook-host'
import { withKnobs } from '@storybook/addon-knobs/react'
import docgen from './addons/docgen'

import SearchBar from '../components/SearchBar'

import { create } from 'reworm'

storiesOf('SearchBar', module)
  .addDecorator(host({ width: 500 }))
  .addDecorator(withKnobs)
  .addDecorator(docgen(SearchBar))
  .add('Default', () => {
    const { get, set } = create({ value: '' })
    return get(s => (
      <SearchBar
        onChange={e => set({ value: e.target.value })}
        value={s.value}
      />
    ))
  })
  .add('Initial value', () => {
    const { get, set } = create({ value: 'initial' })
    return get(s => (
      <SearchBar
        onChange={e => set({ value: e.target.value })}
        value={s.value}
      />
    ))
  })

// this component doesn't really make sense to have knobs
