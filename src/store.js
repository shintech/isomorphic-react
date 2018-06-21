import reducers from './reducers'
import { createStore, applyMiddleware } from 'redux'

const clientLogger = store => next => action => {
  let result

  console.log('test client')

  result = result.next()

  return result
}

const serverLogger = store => next => action => {
  console.log('dispatching server action')
  return next(action)
}

const middleWare = server =>
  (server) ? serverLogger : clientLogger

const storeFactory = (server = false, initialState = {}) =>
  applyMiddleware(middleWare)(createStore)(
    reducers,
    initialState
  )

export default storeFactory
