import React from 'react'
import { hydrate } from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import AppContainer from './src/containers/AppContainer'
import storeFactory from './src/store'

const store = storeFactory(false, window.__INITIAL_STATE__)

window.React = React
window.store = store

// alert('loaded rendering in browser') // eslint-disable-line

hydrate(
  <Provider store={store}>
    <BrowserRouter>
      <AppContainer />
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
)

// alert('render complete') // eslint-disable-line
