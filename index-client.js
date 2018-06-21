import React from 'react'
import { hydrate } from 'react-dom'
import App from './dist/components/App'

window.React = React

alert('loaded rendering in browser') // eslint-disable-line

hydrate(
  <App data={__INITIAL_STATE__} />,
  document.getElementById('react-container')
)

alert('render complete') // eslint-disable-line
