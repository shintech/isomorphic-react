import PropTypes from 'prop-types'

const Device = ({ serial = 'NA', model = '[unavailable]', manufacturer = 'NA', onClick }) =>
  <li className='content-view' onClick={onClick}>
    <span className='device-serial'>{ serial }</span>
    <span className='device-manufacturer'>{ manufacturer }</span>
    <span className='device-model'>{ model }</span>
  </li>

Device.propTypes = {
  serial: PropTypes.string.isRequired,
  manufacturer: PropTypes.string.isRequired,
  model: PropTypes.string.isRequired
}

export default Device
