const modal = (state = {}, action) => {
  switch (action.type) {
    case 'TOGGLE_MODAL':
      let hidden = !state.hidden

      return {
        hidden: hidden,
        template: action.template,
        model: action.model
      }

    default:
      return state
  }
}

export default modal
