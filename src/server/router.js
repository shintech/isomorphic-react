import { Router } from 'express'
import { increment } from '../actions'

const dispatchAndRespond = (req, res, action) => {
  req.store.dispatch(action())
  res.status(200).json(req.store.getState())
}

const router = Router()

router.get('/state', (req, res) =>
  res.status(200).json(req.store.getState())
)

router.post('/increment', (req, res) =>
  dispatchAndRespond(req, res, increment)
)

export default router
