const React = require('react')
const ignoreStyles = require('ignore-styles') // eslint-disable-line
const app = require('./dist/server')

global.React = React

app().then(server => {
  server.set('port', process.env.PORT || 8000)
    .listen(
      server.get('port'),
      () => console.log('listening...')
    )
})
