import C from '../store/constants'

export function toggleModal (props) {
  const { model, template } = props

  return {
    type: C.TOGGLE_MODAL,
    template: template,
    model: model
  }
}

export default {
  toggleModal
}
