import express from 'express'
import bodyParser from 'body-parser'
import path from 'path'
import fs from 'fs'
import morgan from 'morgan'
import favicon from 'serve-favicon'

import { Provider } from 'react-redux'
import { compose } from 'redux'
import { StaticRouter } from 'react-router-dom'
import { renderToString } from 'react-dom/server'

import App from '../components/App'
import configDB from './db'
import configRouter from './router'
import storeFactory from '../store'
import initialState from '../store/initialState'

export default async function (options) {
  const app = express()
  const db = configDB()
  const router = configRouter({ db })

  const fileAssets = express.static(
    path.join(__dirname, '../../public')
  )

  const serverStore = storeFactory(true, initialState)

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
      css: fs.readFileSync(path.join(__dirname, '../../public/bundle.css')),
      html: renderToString(
        <Provider store={store} key='provider'>
          <StaticRouter location={url} context={{}}>
            <App />
          </StaticRouter>
        </Provider>
      )
    })

  const buildHTMLPage = ({html, state, css}) => `
  <!DOCTYPE html>
  <html>
    <head>
      <meta charset="utf-8">
      <title>Universal React</title>
      <style>${css}</style> 
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

  app.use(morgan('dev'))
    .use(fileAssets)
    .use(favicon(path.join('public', 'images', 'favicon.png')))
    .use(bodyParser.urlencoded({ extended: true }))
    .use(bodyParser.json())
    .use(addStoreToRequestPipeline)
    .use('/api', router)
    .use(respond)

  return app
}
