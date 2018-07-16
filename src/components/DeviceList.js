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
        {(loading) ? <h3>Loading...</h3>
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
    },

    modal: (model) => {
      dispatch(toggleModal({ template: 'device', model: model }))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DeviceList)
