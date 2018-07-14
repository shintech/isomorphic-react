import { connect } from 'react-redux'
import { increment } from '../actions'
import Home from '../components/Home'

const mapStateToProps = (state) => {
  return {
    value: state.home.value
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    increment: async () => {
      await dispatch(increment())
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)
