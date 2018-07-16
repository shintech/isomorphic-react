import C from '../store/constants'

const devices = (state = {}, action) => {
  switch (action.type) {
    case C.FETCH_DEVICES_BEGIN:
      return {
        payload: action.payload,
        meta: action.meta,
        error: null,
        loading: true,
        currentPage: state.currentPage
      }

    case C.FETCH_DEVICES_SUCCESS:
      return {
        payload: action.payload,
        meta: action.meta,
        loading: false,
        error: null,
        currentPage: state.currentPage
      }

    case C.FETCH_DEVICES_ERROR:
      return {
        payload: action.payload,
        loading: false,
        error: null
      }

    default:
      return state
  }
}

export default devices
