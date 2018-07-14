export const INCREMENT = 'INCREMENT'

function thunk () {
  return {
    type: INCREMENT
  }
}

export function increment () {
  return async dispatch => {
    dispatch(thunk())
  }
}
