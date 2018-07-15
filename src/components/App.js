import { Route, Switch } from 'react-router-dom'
import Navbar from './Navbar'
import Home from '../components/Home'
import DeviceList from '../components/DeviceList'
require('../../assets/css/index.scss')

const App = () => {
  return (
    <Switch>
      <Route path='/'
        component={({match, location}) => (
          <div className='app'>
            <Navbar />
            <Switch>
              <Route exact path='/' component={Home} />
              <Route exact path='/devices' component={DeviceList} />
            </Switch>
          </div>
        )} />
    </Switch>
  )
}

export default App
