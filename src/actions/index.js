import fetch from 'isomorphic-fetch'
import C from '../store/constants'

function thunk () {
  return {
    type: C.INCREMENT
  }
}

export function increment () {
  return async dispatch => {
    dispatch(thunk())
  }
}

export function fetchDevices () {
  return async dispatch => {
    dispatch(beginFetchDevices())

    try {
      let response = await fetch('/api/devices', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      })

      let devices = await response.json()

      dispatch(fetchDevicesSuccess(devices))
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

export function fetchDevicesError (error) {
  return {
    type: C.FETCH_DEVICES_ERROR,
    payload: error,
    loading: false
  }
}
