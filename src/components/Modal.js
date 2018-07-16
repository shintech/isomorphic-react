import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { toggleModal } from '../actions'
import SingleDevice from '../components/SingleDevice'

const Modal = ({ hidden, modal, template, model }) => {
  if (hidden || !template) return <div className='hidden' />

  let html

  if (template === 'device') html = <SingleDevice device={model} />

  return (
    <div className='modal-container'>
      <div className='modal'>
        <div className='modal-header'>
          <span className='title'>Menu</span>
          <span className='close' onClick={modal}>&times;</span>
        </div>
        <div className='modal-body'>
          {html}

          <button onClick={modal}>Close</button>
        </div>
      </div>
    </div>
  )
}

Modal.propTypes = {
  hidden: PropTypes.bool.isRequired
}

const mapStateToProps = (state) => {
  return {
    hidden: state.modal.hidden,
    template: state.modal.template,
    model: state.modal.model
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    modal: (props) => {
      dispatch(toggleModal(props))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Modal)
