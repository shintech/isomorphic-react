import express from 'express'
import path from 'path'
import { Provider } from 'react-redux'
import { compose } from 'redux'
import { StaticRouter } from 'react-router-dom'
import { renderToString } from 'react-dom/server'
import fs from 'fs'
import AppContainer from '../containers/AppContainer'
import storeFactory from '../store'
import bodyParser from 'body-parser'
import router from './router'
import initialState from './initialState'

const staticCSS = fs.readFileSync(
  path.join(__dirname, '../../public/bundle.css')
)

const fileAssets = express.static(
  path.join(__dirname, '../../public')
)

const serverStore = storeFactory(true, initialState)

const logger = (req, res, next) => {
  console.log(`${req.method} request for '${req.url}'`)
  next()
}

const makeClientStoreFrom = store => url =>
  ({
    store: storeFactory(false, store.getState()),
    url
  })

const addStoreToRequestPipeline = (req, res, next) => {
  req.store = serverStore
  next()
}

const renderComponentsToHTML = ({ url, store }) =>
  ({
    state: store.getState(),
    // css: defaultStyles,
    html: renderToString(
      <Provider store={store} key='provider'>
        <StaticRouter location={url} context={{}}>
          <AppContainer />
        </StaticRouter>
      </Provider>
    )
  })

const buildHTMLPage = ({html, state}) => `
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>Universal React</title>
    <style>${staticCSS}</style> 
  </head>
  <body>
    <div id="root">${html}</div>
    <script>
      window.__INITIAL_STATE__ = ${JSON.stringify(state)}
    </script>
    <script src="bundle.js"></script>
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
  .use(addStoreToRequestPipeline)
  .use('/api', router)
  .use(respond)
