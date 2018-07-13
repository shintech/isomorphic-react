import { Route, Switch } from 'react-router-dom'
import NavbarContainer from '../containers/NavbarContainer'
import HomeContainer from '../containers/HomeContainer'
require('../../assets/css/index.scss')

const App = () => {
  return (
    <Switch>
      <Route path='/'
        component={({match, location}) => (
          <div className='app'>
            <NavbarContainer />
            <Switch>
              <Route path='/' component={HomeContainer} />
            </Switch>
          </div>
        )} />
    </Switch>
  )
}

export default App
