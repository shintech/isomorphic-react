const navbar = (state = {}, action) => {
  switch (action.type) {
    case 'CHANGE_ACTIVE_TAB':
      return {
        active: action.payload
      }

    default:
      return state
  }
}

export default navbar
