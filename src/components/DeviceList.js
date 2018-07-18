import React from 'react'
import { connect } from 'react-redux'
import Griddle, { plugins } from 'griddle-react'
import Device from './Device'
import CustomTableBody from './CustomTableBody'
import CustomTableComponent from './CustomTableComponent'
import { fetchDevices, toggleModal } from '../actions'

class DeviceList extends React.Component {
  componentDidMount () {
    const { fetchDevices } = this.props

    fetchDevices()
  }

  render () {
    const { payload, loading } = this.props.devices
    // const { modal } = this.props

    return (
      <div className='devices'>
        {(loading) ? <div className='loading'><h3>Loading...</h3></div>
          : <Griddle data={payload} plugins={[plugins.LocalPlugin]} styleConfig={styleConfig}
            components={{
              Row: Device,
              TableContainer: CustomTableComponent,
              TableBody: CustomTableBody
            }} />
        }
      </div>
    )
  }
}

const styleConfig = {
  icons: {
    TableHeadingCell: {
      sortDescendingIcon: <small>(desc)</small>,
      sortAscendingIcon: <small>(asc)</small>
    }
  },
  classNames: {
    Row: 'row-class'
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
