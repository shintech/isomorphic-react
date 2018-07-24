import C from '../store/constants'

function increment () {
  return async dispatch => {
    dispatch({
      type: C.INCREMENT
    })
  }
}

export default {
  increment
}
