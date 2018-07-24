import C from '../store/constants'
import fetch from 'isomorphic-fetch'

function addDevice (device, devices) {
  return async dispatch => {
    let payload

    try {
      let result = await fetch('/api/devices', {
        body: JSON.stringify(device),
        method: 'POST',
        headers: {
          'content-type': 'application/json'
        }
      })

      payload = await result.json()
    } catch (err) {
      throw new Error(err.message)
    }

    dispatch({
      type: C.ADD_DEVICE,
      payload,
      devices
    })
  }
}

function addDeviceSuccess (message) {
  return {
    type: C.ADD_DEVICE_SUCCESS,
    payload: message
  }
}

function addDeviceError (error) {
  return {
    type: C.ADD_DEVICE_ERROR,
    payload: error
  }
}

function fetchDevices (page) {
  return async dispatch => {
    dispatch(beginFetchDevices())

    try {
      let response = await fetch(`/api/devices`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      })

      let devices = await response.json()
      dispatch(fetchDevicesSuccess(devices))
      // dispatch(changePage(devices.meta, page || 1))
    } catch (err) {
      dispatch(fetchDevicesError(err))
    }
  }
}

function beginFetchDevices (devices) {
  return {
    type: C.FETCH_DEVICES_BEGIN,
    payload: {},
    meta: {},
    loading: true
  }
}

function fetchDevicesSuccess (devices) {
  return {
    type: C.FETCH_DEVICES_SUCCESS,
    payload: devices.response,
    meta: devices.meta,
    loading: false
  }
}

function fetchDevicesError (error) {
  return {
    type: C.FETCH_DEVICES_ERROR,
    payload: error,
    loading: false
  }
}

export default {
  addDevice,
  addDeviceSuccess,
  addDeviceError,
  fetchDevices,
  beginFetchDevices,
  fetchDevicesSuccess,
  fetchDevicesError
}
