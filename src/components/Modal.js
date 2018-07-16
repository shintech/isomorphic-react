import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { toggleModal } from '../actions'
import SingleDevice from '../components/SingleDevice'
import AddDeviceForm from '../components/AddDeviceForm'

const Modal = ({ hidden, modal, template, model }) => {
  if (hidden || !template) return <div className='hidden' />

  let html

  if (template === 'device') html = <SingleDevice device={model} />
  if (template === 'form') html = <AddDeviceForm />

  return (
    <div className='modal-container'>
      <div className='modal'>
        <div className='modal-header'>
          <span className='title'>Menu</span>
          <span className='close' onClick={modal}>&times;</span>
        </div>
        <div className='modal-body'>
          {html}
        </div>
      </div>
    </div>
  )
}

Modal.propTypes = {
  hidden: PropTypes.bool.isRequired
}

export default connect(
  state => ({
    hidden: state.modal.hidden,
    template: state.modal.template,
    model: state.modal.model
  }),

  dispatch => ({
    modal: (props) => {
      dispatch(toggleModal(props))
    }
  })
)(Modal)
