import { Router } from 'express'
import { increment } from '../actions'
import { devices } from './routes'

const dispatchAndRespond = (req, res, action) => {
  req.store.dispatch(action())
  res.status(200).json(req.store.getState())
}

const router = Router()

export default function (options) {
  router.get('/state', (req, res) =>
    res.status(200).json(req.store.getState())
  )

  router.post('/increment', (req, res) =>
    dispatchAndRespond(req, res, increment)
  )

  router.route('/devices')
    .get(devices(options).read.all)
    // .post(devices(options).create)

  router.route('/devices/:id')
    .get(devices(options).read.one)
    // .put(devices(options).update)
    // .delete(devices(options).destroy)

  return router
}
