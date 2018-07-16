const React = require('react')
const ignoreStyles = require('ignore-styles') // eslint-disable-line
const app = require('./dist/server')
const pkg = require('./package.json')
const chalk = require('chalk')

global.React = React

app().then(server => {
  server.set('port', process.env.PORT || 8000)
    .listen(
      server.get('port'),
      () => {
        console.log(`${chalk.bgBlack.cyan(pkg.name)} version ${chalk.bgBlack.yellow(pkg.version)} -> listening on port ${chalk.bgBlack.green(server.get('port'))}...`)
      }
    )
})
