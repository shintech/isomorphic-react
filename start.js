const React = require('react')
const ignoreStyles = require('ignore-styles') // eslint-disable-line
const app = require('./dist/server/app')

global.React = React

app.set('port', process.env.PORT || 8000)
  .listen(
    app.get('port'),
    () => console.log('listening...')
  )
