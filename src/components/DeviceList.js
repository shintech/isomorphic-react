import React from 'react'
import { connect } from 'react-redux'
import Device from './Device'
import { fetchDevices, fetchDevicesSuccess, fetchDevicesError, toggleModal, changePage } from '../actions'

class DeviceList extends React.Component {
  render () {
    let { devices } = this.props

    const { loading } = this.props
    const { modal } = this.props

    return (
      <div className='devices'>
        {(loading) ? <h3>Loading...</h3>
          : <ul className='content-list'>
            {devices.map(device =>
              <Device onClick={() => { modal(device) }} key={device.id} {...device} />
            )}
          </ul>
        }
      </div>
    )
  }
}

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
