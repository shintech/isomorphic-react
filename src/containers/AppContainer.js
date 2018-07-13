import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import App from '../components/App.js'

const mapStateToProps = (state) => {
  return state
}

const mapDispatchToProps = (dispatch) => {
  return {}
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App))
