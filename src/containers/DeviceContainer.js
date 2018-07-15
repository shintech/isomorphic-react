import { connect } from 'react-redux'
import { fetchDevices, fetchDevicesSuccess, fetchDevicesError, toggleModal, changePage } from '../actions'
import DeviceList from '../components/DeviceList'

const mapStateToProps = (state) => {
  return {
    devices: state.devices,
    meta: state.meta
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchDevices: () => {
      dispatch(fetchDevices())
        .then(response => {
          let { payload, meta } = response
          change(dispatch, meta, 1)

          !response.error ? dispatch(fetchDevicesSuccess({payload, meta})) : dispatch(fetchDevicesError(response))
        })
    },

    modal: (model) => {
      dispatch(toggleModal({ template: 'device', model: model }))
    }
  }
}

function change (dispatch, meta, page) {
  dispatch(changePage(meta, page))
}

export default connect(mapStateToProps, mapDispatchToProps)(DeviceList)
