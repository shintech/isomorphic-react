import { Route, Switch } from 'react-router-dom'
import NavbarContainer from '../containers/NavbarContainer'
import HomeContainer from '../containers/HomeContainer'
import DeviceContainer from '../containers/DeviceContainer'
require('../../assets/css/index.scss')

const App = () => {
  return (
    <Switch>
      <Route path='/'
        component={({match, location}) => (
          <div className='app'>
            <NavbarContainer />
            <Switch>
              <Route exact path='/' component={HomeContainer} />
              <Route exact path='/devices' component={DeviceContainer} />
            </Switch>
          </div>
        )} />
    </Switch>
  )
}

export default App
