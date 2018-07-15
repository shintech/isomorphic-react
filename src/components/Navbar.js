import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

const Navbar = ({ changeActiveTab, modal, active }) =>
  <nav>
    <li onClick={() => { changeActiveTab('#/') }}>
      <Link className={active === '#/' || active === '' ? 'active' : null} to='/'>home</Link>
    </li>

    <li onClick={() => { changeActiveTab('#/devices') }}>
      <Link className={active === '#/devices' ? 'active' : null} to='/devices'>devices</Link>
    </li>

    <li onClick={() => { changeActiveTab('#/files') }}>
      <Link className={active === '#/files' ? 'active' : null} to='/files'>files</Link>
    </li>

    <div className='dropdown'>
      <button className='dropbtn'>actions &middot;</button>
      <div className='dropdown-content'>
        <a onClick={modal} id='create-new'>Create New</a>
        <a id='login' href='#/login'>Login</a>
        <a id='logout'>Logout</a>
      </div>
    </div>
  </nav>

Navbar.propTypes = {
  changeActiveTab: PropTypes.func,
  modal: PropTypes.func,
  active: PropTypes.string
}

const mapStateToProps = (state) => {
  return state
}

const mapDispatchToProps = (dispatch) => {
  return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(Navbar)
