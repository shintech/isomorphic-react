const home = (state = {}, action) => {
  switch (action.type) {
    case 'TEST':
      let incremental = state.incremental + 1
      return {
        incremental: incremental
      }

    default:
      return state
  }
}

export default home
