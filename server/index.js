import server from './server.js'
//const server = require('./server.js')

const PORT = process.env.PORT || 3000

server.listen(PORT, function () {
  console.log('Listening on port', PORT)
})
