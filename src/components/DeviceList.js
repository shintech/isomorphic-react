import React from 'react'
import Device from './Device'

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

export default DeviceList
