import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { plugins } from 'griddle-react'

const Device = ({ modal, rowData }) =>
  <li className='content-view'>
    <span className='device-serial'>{ rowData.serial }</span>
    <span className='device-manufacturer'>{ rowData.manufacturer }</span>
    <span className='device-model'>{ rowData.model }</span>
  </li>

Device.propTypes = {
  serial: PropTypes.string.isRequired,
  manufacturer: PropTypes.string.isRequired,
  model: PropTypes.string.isRequired
}

export default connect(
  (state, props) => ({
    rowData: plugins.LocalPlugin.selectors.rowDataSelector(state, props)
  })
)(Device)
