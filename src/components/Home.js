import { connect } from 'react-redux'
import { increment } from '../actions'

const Home = ({ increment, value }) =>
  <div>
    <h3>Home</h3>
    <p>{ value }</p>
    <button onClick={() => { increment() }}>Click</button>
  </div>

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
