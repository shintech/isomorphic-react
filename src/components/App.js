import { Route, Switch } from 'react-router-dom'
import NavbarContainer from '../containers/NavbarContainer'

const App = ({ pagination, store }) => {
  return (
    <Switch>
      <Route path='/' component={NavbarContainer} />
    </Switch>
  )
}

export default App
