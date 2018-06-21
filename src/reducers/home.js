const home = (state = {}, action) => {
  switch (action.type) {
    case 'NEW_ACTION':
      const active = !state.active

      return {
        active: active,
        json: action.payload
      }

    default:
      return state
  }
}

export default home
