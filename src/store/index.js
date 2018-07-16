import reducers from '../reducers'
import thunk from 'redux-thunk'
import { createStore, applyMiddleware } from 'redux'

const clientLogger = store => next => action => {
  let result
  console.groupCollapsed('dispatching', action.type)
  console.log('prev state', store.getState())
  console.log('action', action)
  result = next(action)
  console.log('next state', store.getState())
  console.groupEnd()
  return result
}

const serverLogger = store => next => action => {
  console.log(`dispatching server action ${action.type}...`)
  return next(action)
}

const middleWare = server => [
  thunk,
  (server) ? serverLogger : clientLogger
]

const storeFactory = (server = false, initialState = {}) =>
  applyMiddleware(...middleWare(server))(createStore)(
    reducers,
    initialState
  )

export default storeFactory
