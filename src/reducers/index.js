import { combineReducers } from 'redux'
import home from './home'
import navbar from './navbar'
import devices from './devices'
import modal from './modal'

export default combineReducers({
  home,
  navbar,
  devices,
  modal
})
