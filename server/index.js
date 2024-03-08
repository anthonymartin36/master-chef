import server from './server.js'
//const server = require('./server.js')

const PORT = import.meta.env.PORT || 10000

server.listen(PORT, function () {
  console.log('Listening on port', PORT)
})
