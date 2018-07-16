import React from 'react'
import { connect } from 'react-redux'
import Device from './Device'
import { fetchDevices, toggleModal } from '../actions'

class DeviceList extends React.Component {
  componentDidMount () {
    const { fetchDevices } = this.props

    fetchDevices()
  }

  render () {
    const { payload, loading } = this.props.devices
    const { modal } = this.props

    return (
      <div className='devices'>
        {(loading) ? <div className='loading'><h3>Loading...</h3></div>
          : <ul className='content-list'>
            {payload.map(device =>
              <Device onClick={() => { modal(device) }} key={device.id} {...device} />
            )}
          </ul>
        }
      </div>
    )
  }
}

export default connect(
  state => ({
    devices: state.devices,
    meta: state.meta
  }),

  dispatch => ({
    fetchDevices: () => {
      dispatch(fetchDevices())
    },

    modal: (model) => {
      dispatch(toggleModal({ template: 'device', model: model }))
    }
  })
)(DeviceList)
