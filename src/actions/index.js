import C from '../store/constants'

function thunk () {
  return {
    type: C.INCREMENT
  }
}

export function increment () {
  return async dispatch => {
    dispatch(thunk())
  }
}
