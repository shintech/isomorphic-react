import { connect } from 'react-redux'
import { home } from '../actions'

const Home = ({ increment, value }) =>
  <div>
    <h3>Home</h3>
    <p>{ value }</p>
    <button onClick={() => { increment() }}>Click</button>
  </div>

export default connect(
  state => ({
    value: state.home.value
  }),

  dispatch => ({
    increment: () => {
      dispatch(home.increment())
    }
  })
)(Home)
