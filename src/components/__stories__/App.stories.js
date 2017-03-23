import React from 'react'
import { storiesOf } from '@kadira/storybook'
import { withKnobs, text, boolean } from '@kadira/storybook-addon-knobs'
import AppItem from '../AppItem'

storiesOf('App', module)
  .addDecorator(withKnobs)
  .addWithInfo('App Item', 'An app item', () => (
    <AppItem
      text={text('text', 'Complete')}
      complete={boolean('Complete', false)}
    />
  ))
