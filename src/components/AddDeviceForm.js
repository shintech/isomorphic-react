import { connect } from 'react-redux'
import { addDevice, toggleModal } from '../actions'

const AddDeviceForm = (props) => {
  let _serial, _model, _manufacturer
  const { createNewDevice, devices, modal } = props

  const submit = e => {
    e.preventDefault()

    let serial = _serial.value
    let model = _model.value
    let manufacturer = _manufacturer.value

    createNewDevice({ serial, model, manufacturer }, devices.payload)
    modal()
  }

  /* eslint-disable */

  return (
    <form onSubmit={submit}>
      <ul className='form-style'> 
        <li className='form-group'>
          <label>Serial <span className="required">*</span></label>
          <input ref={input => _serial = input} type='text' placeholder='Serial' required />
        </li>

        <li className='form-group'>
          <label>Model Number <span className="required">*</span></label>
          <input ref={input => _model = input} type='text' placeholder='Model' required />
        </li>
        
        <li className='form-group'>
          <label>Manufacturer<span className="required">*</span></label>
          <input ref={input => _manufacturer = input} type='text' placeholder='Manufacturer' required />
        </li>
        
        <li>
          <button onClick={modal} type="button" className="close">Close</button>
          <button type="submit" className="submit">Submit</button>
        </li>
      </ul>
    </form>
  )

  /* eslint-enable */
}
export default connect(
  state => ({
    devices: state.devices
  }),

  dispatch => ({
    createNewDevice: (attrs, devices) => {
      dispatch(addDevice(attrs, devices))
    },

    modal: () => {
      dispatch(toggleModal({
        template: null,
        model: null
      }))
    }
  })
)(AddDeviceForm)
