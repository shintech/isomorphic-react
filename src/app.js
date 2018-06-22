import express from 'express'
import path from 'path'
import { Provider } from 'react-redux'
import { compose } from 'redux'
import { StaticRouter } from 'react-router-dom'
import { renderToString } from 'react-dom/server'
import App from './components/App.js'
import storeFactory from './store'
import bodyParser from 'body-parser'
import router from './router'
import initialState from './initialState'

const fileAssets = express.static(
  path.join(__dirname, '../public')
)

const serverStore = storeFactory(true, initialState)

const logger = (req, res, next) => {
  console.log(`${req.method} request for '${req.url}'`)
  next()
}

const addStoreToRequestPipeLine = (req, res, next) => {
  req.store = serverStore
  next()
}

const makeClientStoreFrom = store => url =>
  ({
    store: storeFactory(false, store.getState()),
    url
  })

const renderComponentsToHTML = ({ url, store }) =>
  ({
    state: store.getState(),
    // css: defaultStyles,
    html: renderToString(
      <Provider store={store}>
        <StaticRouter location={url} context={{}}>
          <App />
        </StaticRouter>
      </Provider>
    )
  })

const buildHTMLPage = ({html, state}) => `
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>Universal Color Organizer</title>
  </head>
  <body>
    <div id="react-container">${html}</div>
    <script>
      window.__INITIAL_STATE__ = ${JSON.stringify(state)}
    </script>
    <script src="js/bundle.js"></script>
  </body>
</html>
`

const htmlResponse = compose(
  buildHTMLPage,
  renderComponentsToHTML,
  makeClientStoreFrom(serverStore)
)

const respond = (req, res) =>
  res.status(200).send(htmlResponse(req.url))

module.exports = express()
  .use(logger)
  .use(fileAssets)
  .use(bodyParser.urlencoded({ extended: true }))
  .use(bodyParser.json())
  .use(addStoreToRequestPipeLine)
  .use('/api', router)
  .use(respond)
