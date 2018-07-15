const home = (state = {}, action) => {
  switch (action.type) {
    case 'INCREMENT':
      let value = state.value + 1

      return {
        value: value
      }

    default:
      return state
  }
}

export default home
