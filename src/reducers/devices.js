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

    case C.ADD_DEVICE:
      const retval = [
        {
          id: action.payload.id,
          serial: action.payload.serial,
          model: action.payload.model,
          manufacturer: action.payload.manufacturer
        },
        ...action.devices
      ]

      return {
        payload: retval,
        loading: false
      }

    default:
      return state
  }
}

export default devices
