import server from './server.js'
//const server = require('./server.js')

const PORT = 3000

server.listen(PORT, function () {
  console.log('Listening on port', PORT)
})
