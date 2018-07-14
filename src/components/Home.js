const Home = ({ increment, value }) =>
  <div>
    <h3>Home</h3>
    <p>{ value }</p>
    <button onClick={() => { increment() }}>Click</button>
  </div>

export default Home
